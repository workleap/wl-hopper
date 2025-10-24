/* eslint-disable max-len */

import { files } from "@docs/ai";
import { parse } from "@typescript-eslint/parser";
import type { TSESTree } from "@typescript-eslint/types";
import emojiRegex from "emoji-regex";
import { readFile } from "fs/promises";
import { join } from "path";
import { env } from "../env";
import { extractAllConstantStrings, findJSXElements, getAllDirectChildren, getAllProps, getComponentName, getDirectComponentChildren } from "../utils/jsx-helpers";
import { filterTokens, type TokenCategoryNode, type TokenFileRootNode } from "../utils/token-filters";
import { formatStyledSystemName } from "../utils/token-name-formatter";
import { validationMessage } from "../utils/validation-messages";

interface ValidationMessage {
    message: string;
    line?: number;
    column?: number;
}
interface ValidationResult {
    isValid: boolean;
    errors: ValidationMessage[];
    warnings: ValidationMessage[];
}

export async function validateHopperCode(code: string): Promise<ValidationResult> {
    const result: ValidationResult = {
        isValid: true,
        errors: [],
        warnings: []
    };

    // First, check if the code is empty or whitespace only
    if (!code || code.trim().length === 0) {
        result.isValid = false;
        result.errors.push({
            message: validationMessage("no-code-provided")
        });

        return result;
    }

    try {
        const ast = parse(code, {
            ecmaVersion: "latest",
            sourceType: "module",
            ecmaFeatures: {
                jsx: true
            }
        });

        // Find all JSX elements in the code
        const jsxElements = findJSXElements(ast);

        if (jsxElements.length === 0) {
            result.isValid = false;
            result.errors.push({
                message: validationMessage("no-jsx-found")
            });

            return result;
        }

        // Check for emojis in the entire code
        validateNoEmojis(code, result);

        // Check for native HTML elements
        validateTagNames(jsxElements, result);

        // Check for prohibited props usage
        validateProhibitedProps(jsxElements, result);

        // Check for layout components with single child
        validateLayoutComponents(jsxElements, result);

        // Check for unsafe props usage
        await validateUnsafePropsUsage(jsxElements, result);

        // Check for design system tokens usage
        await validateDesignSystemTokensUsage(jsxElements, result);

        // Validate component-specific rules
        validateComponentSpecificRules(jsxElements, result);

        result.isValid = result.errors.length === 0;
    } catch (error) {
        result.isValid = false;

        // Provide more detailed parsing error information
        if (error instanceof Error) {
            // Check for common parsing issues and provide helpful messages
            let errorMessage = validationMessage("parse-error", { message: error.message });

            if (error.message.includes("Identifier expected")) {
                errorMessage += validationMessage("parse-error-identifier");
            } else if (error.message.includes("Unexpected end of file")) {
                errorMessage += validationMessage("parse-error-eof");
            }

            result.errors.push({
                message: errorMessage
            });
        } else {
            result.errors.push({
                message: validationMessage("parse-error-unknown")
            });
        }
    }

    return result;
}


/**
 * Validates component-specific rules by grouping components by type and applying appropriate validation
 */
function validateComponentSpecificRules(jsxElements: TSESTree.JSXElement[], result: ValidationResult): void {
    // Group components by type for better validation reporting
    const componentInstances = new Map<string, TSESTree.JSXElement[]>();

    for (const element of jsxElements) {
        const componentName = getComponentName(element);
        if (componentName) {
            if (!componentInstances.has(componentName)) {
                componentInstances.set(componentName, []);
            }
            componentInstances.get(componentName)!.push(element);
        }
    }

    // Apply validation rules to all instances of each component type
    for (const [componentName, instances] of componentInstances) {
        for (let i = 0; i < instances.length; i++) {
            const element = instances[i];
            const instanceInfo = instances.length > 1 ? ` (instance ${i + 1} of ${instances.length})` : "";

            // Validate based on component type
            switch (componentName) {
                case "Button":
                    validateButtonComponent(element, result, instanceInfo);
                    break;
                case "Modal":
                    validateModalComponent(element, result, instanceInfo);
                    break;
                case "Div":
                    validateDivComponent(element, result, instanceInfo);
                    break;
            }
        }
    }
}

/**
 * Validates Button component structure
 * Rule: If the component is Button and if it has 2 children, one of them should be Text component.
 */
function validateButtonComponent(element: TSESTree.JSXElement, result: ValidationResult, instanceInfo: string = ""): void {
    const componentName = getComponentName(element);

    if (componentName !== "Button") {
        return;
    }

    const allChildren = getAllDirectChildren(element);
    const componentChildren = getDirectComponentChildren(element);

    // If Button has 2 total children (text + components), one of the components should be Text
    if (allChildren.length === 2) {
        const hasTextComponent = componentChildren.includes("Text");
        const hasTextContent = allChildren.some(child => child.type === "text");

        if (!hasTextComponent && hasTextContent) {
            result.errors.push({
                message: validationMessage("button-two-children-rule", {
                    instanceInfo,
                    children: componentChildren.length === 0 ? "none" : componentChildren.join(", ")
                }),
                line: element.loc?.start.line,
                column: element.loc?.start.column
            });
        }
    }
}

function validateModalComponent(element: TSESTree.JSXElement, result: ValidationResult, instanceInfo: string = ""): void {
    const componentName = getComponentName(element);

    if (componentName !== "Modal") {
        return;
    }

    const children = getDirectComponentChildren(element);
    const allowedChildren = ["Heading", "Content", "ButtonGroup"];

    // Check for invalid children
    const invalidChildren = children.filter(child => !allowedChildren.includes(child));

    if (invalidChildren.length > 0) {
        result.errors.push({
            message: validationMessage("modal-invalid-children", {
                instanceInfo,
                invalidChildren: invalidChildren.join(", ")
            }),
            line: element.loc?.start.line,
            column: element.loc?.start.column
        });
    }

    // Optional: Check if required children are present (this could be a warning)
    const missingChildren = allowedChildren.filter(required => !children.includes(required));
    if (missingChildren.length > 0) {
        result.errors.push({
            message: validationMessage("modal-missing-children", {
                instanceInfo,
                missingChildren: missingChildren.join(", ")
            }),
            line: element.loc?.start.line,
            column: element.loc?.start.column
        });
    }
}

/**
 * Validates Div component structure
 * Rule: If Div has display="flex" or display="grid", suggest using appropriate layout components
 */
function validateDivComponent(element: TSESTree.JSXElement, result: ValidationResult, instanceInfo: string = ""): void {
    // Check if the Div has display="flex" or display="grid" prop
    const openingElement = element.openingElement;
    if (openingElement.attributes) {
        for (const attribute of openingElement.attributes) {
            if (attribute.type === "JSXAttribute" &&
                attribute.name.type === "JSXIdentifier" &&
                attribute.name.name === "display") {
                // Extract all constant string values from the display prop
                const displayValues = extractAllConstantStrings(attribute.value);

                // Check each display value
                for (const displayValue of displayValues) {
                    if (displayValue === "flex") {
                        result.warnings.push({
                            message: validationMessage("div-flex-warning", { instanceInfo }),
                            line: element.loc?.start.line,
                            column: element.loc?.start.column
                        });
                    } else if (displayValue === "grid") {
                        result.warnings.push({
                            message: validationMessage("div-grid-warning", { instanceInfo }),
                            line: element.loc?.start.line,
                            column: element.loc?.start.column
                        });
                    }
                }
            }
        }
    }
}

/**
 * Validates layout components to ensure they have more than one child
 * Rule: Layout components (Stack, Inline, Flex, Grid, Div, Box) should typically have multiple children
 * - Only validates when there's exactly one COMPONENT child AND no other content
 * - Div gets a warning (could be intentional)
 * - Other layout components get an error (should not be used for single child)
 */
function validateLayoutComponents(jsxElements: TSESTree.JSXElement[], result: ValidationResult): void {
    for (const element of jsxElements) {
        const componentName = getComponentName(element);

        if (!componentName || !LAYOUT_COMPONENTS.has(componentName)) {
            continue;
        }

        const componentChildren = getDirectComponentChildren(element);
        const allChildren = getAllDirectChildren(element);

        if (componentName === "Div" || componentName === "Box") {
            // Warning for Div and Box
            if (componentChildren.length === 1 && allChildren.length === 1) {
                result.warnings.push({
                    message: validationMessage("layout-single-child-warning", { componentName }),
                    line: element.loc?.start.line,
                    column: element.loc?.start.column
                });
            }
        } else {
            // Error for other layout components
            if (componentChildren.length <= 1) {
                result.errors.push({
                    message: validationMessage("layout-single-child-error", { componentName }),
                    line: element.loc?.start.line,
                    column: element.loc?.start.column
                });
            }
        }
    }
}

const EMOJI_REGEX = emojiRegex();

function validateNoEmojis(code: string, result: ValidationResult): void {
    // Use the emoji-regex library for accurate emoji detection
    const regex = EMOJI_REGEX;

    const lines = code.split("\n");

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        const line = lines[lineIndex];
        const matches = line.matchAll(regex);

        for (const match of matches) {
            result.errors.push({
                message: validationMessage("emoji-detected", {
                    emoji: match[0],
                    position: (match.index || 0) + 1
                }),
                line: lineIndex + 1,
                column: (match.index || 0) + 1
            });
        }
    }
}

// Move nativeHtmlElements to module scope to avoid recreating the Set on every function call
const NATIVE_HTML_ELEMENTS = new Set([
    "div", "span", "button", "input", "p", "h1", "h2", "h3", "h4", "h5", "h6",
    "a", "img", "ul", "ol", "li", "form", "section", "article", "header",
    "footer", "nav", "table", "tr", "td", "th", "tbody", "thead", "tfoot",
    "svg", "path", "iframe"
]);

const NOT_RECOMMENDED_COMPONENTS = new Map<string, string>([
    ["Box", "Using '<Box>' is STRONGLY discouraged. The '<Box>' component should not be used in place of standard HTML elements. Use '<Div>' or '<Span>' directly for that purpose."]
]);

const PROHIBITED_PROPS = ["className", "style"];

// Layout components that should typically have multiple children
const LAYOUT_COMPONENTS = new Set([
    "Stack", "Inline", "Flex", "Grid", "Div", "Box"
]);

function validateTagNames(jsxElements: TSESTree.JSXElement[], result: ValidationResult): void {
    for (const element of jsxElements) {
        const componentName = getComponentName(element);
        if (!componentName) {
            continue;
        }

        if (NATIVE_HTML_ELEMENTS.has(componentName)) {
            result.errors.push({
                message: validationMessage("native-html-not-allowed", {
                    element: componentName,
                    guideSection: "styles"
                }),
                line: element.loc?.start.line,
                column: element.loc?.start.column
            });
        } else if (NOT_RECOMMENDED_COMPONENTS.has(componentName)) {
            const message = NOT_RECOMMENDED_COMPONENTS.get(componentName);
            if (message) {
                result.warnings.push({
                    message,
                    line: element.loc?.start.line,
                    column: element.loc?.start.column
                });
            }
        }
    }
}

function validateProhibitedProps(jsxElements: TSESTree.JSXElement[], result: ValidationResult): void {
    for (const { loc, propName } of getAllProps(jsxElements)) {
        // Check if the prop is in the prohibited list
        if (PROHIBITED_PROPS.includes(propName)) {
            result.errors.push({
                message: validationMessage("prohibited-prop", { prop: propName }),
                line: loc?.start.line,
                column: loc?.start.column
            });
        }
    }
}

// Cache for allowed unsafe props to avoid repeated file I/O
let _unsafePropsCache: Set<string> | null = null;

async function getUnsafeProps() {
    // Return cached value if available
    if (_unsafePropsCache !== null) {
        return _unsafePropsCache;
    }

    try {
        // Get the path to the unsafe props data file
        const unsafePropsDataPath = join(env.DOCS_PATH, files.styledSystem.unsafePropsData.path);
        const fileContents = await readFile(unsafePropsDataPath, "utf-8");
        const unsafePropsData = JSON.parse(fileContents);

        if (Array.isArray(unsafePropsData)) {
            // Cache the result before returning
            _unsafePropsCache = new Set(unsafePropsData);

            return _unsafePropsCache;
        }
        throw new Error(validationMessage("unsafe-props-invalid-format"));
    } catch {
        throw new Error(validationMessage("unsafe-props-load-error"));
    }
}

async function getTokenSupportedProps(): Promise<Set<string>> {
    const unsafeProps = await getUnsafeProps();

    return new Set(Array.from(unsafeProps).map(prop => prop.replace("UNSAFE_", "")));
}

// Cache for allowed tokens to avoid repeated file I/O
let _allTokensCache: Set<string> | null = null;

async function getAllTokens(): Promise<Set<string>> {
    // Return cached value if available
    if (_allTokensCache !== null) {
        return _allTokensCache;
    }

    try {
        // Get the path to the tokens data file (use full version)
        const tokensDataPath = join(env.DOCS_PATH, files.tokens.maps.all.path);
        const fileContents = await readFile(tokensDataPath, "utf-8");
        const tokensData = JSON.parse(fileContents);

        // Recursively extract all propValue fields from the nested object structure
        const extractPropValues = (obj: unknown): string[] => {
            const values: string[] = [];

            if (typeof obj === "string") {
                values.push(obj);
            } else if (Array.isArray(obj)) {
                for (const item of obj) {
                    values.push(...extractPropValues(item));
                }
            } else if (obj !== null && typeof obj === "object") {
                const record = obj as Record<string, unknown>;
                // Check if this is a token object with propValue
                if ("propValue" in record && typeof record.propValue === "string") {
                    values.push(record.propValue);
                } else {
                    // Recursively process nested objects
                    for (const value of Object.values(record)) {
                        values.push(...extractPropValues(value));
                    }
                }
            }

            return values;
        };

        const allValues = extractPropValues(tokensData);

        // Cache the result before returning
        _allTokensCache = new Set(allValues);

        return _allTokensCache;
    } catch (e) {
        console.error("error:", e);
        throw new Error(validationMessage("tokens-load-error"), { cause: e });
    }
}

// Cache for all tokens data to avoid repeated file I/O
let _allTokensDataCache: TokenFileRootNode | null = null;

async function getAllTokensData(): Promise<TokenFileRootNode> {
    // Return cached value if available
    if (_allTokensDataCache !== null) {
        return _allTokensDataCache;
    }

    try {
        // Get the path to the tokens data file (use full version)
        const tokensDataPath = join(env.DOCS_PATH, files.tokens.maps.all.path);
        const fileContents = await readFile(tokensDataPath, "utf-8");
        const tokensData = JSON.parse(fileContents) as TokenFileRootNode;

        // Cache the result before returning
        _allTokensDataCache = tokensData;

        return _allTokensDataCache;
    } catch (e) {
        console.error("error:", e);
        throw new Error(validationMessage("token-data-load-error"), { cause: e });
    }
}

// Props that accept percentage values without requiring UNSAFE_ prefix
const PERCENTAGE_SAFE_PROPS = new Set([
    "width",
    "height",
    "maxWidth",
    "minWidth",
    "maxHeight",
    "minHeight"
]);

/**
 * Checks if a prop is an invalid UNSAFE_ usage with percentage values
 * Returns true if this is an invalid UNSAFE_ percentage prop (error already reported)
 * Returns false if this is not a percentage-related issue (needs further validation)
 */
function isInvalidUnsafePercentageProp(
    propName: string,
    propValue: string,
    loc: TSESTree.SourceLocation | undefined,
    result: ValidationResult
): boolean {
    // Only check UNSAFE_ props
    if (!propName.startsWith("UNSAFE_")) {
        return false;
    }

    const safePropName = propName.replace("UNSAFE_", "");

    // Not a percentage-safe prop - not our concern
    if (!PERCENTAGE_SAFE_PROPS.has(safePropName)) {
        return false;
    }

    if (!propValue.endsWith("%")) {
        return false;
    }

    // This is an invalid case: UNSAFE_ prefix used with percentage on a percentage-safe prop
    result.errors.push({
        message: validationMessage("unsafe-percentage-error", {
            propName,
            value: propValue,
            safePropName
        }),
        line: loc?.start.line,
        column: loc?.start.column
    });

    return true; // This is invalid and error was reported
}

/**
 * Checks if an UNSAFE_ prop is not in the allowed list and reports an error
 * Returns true if this is an invalid UNSAFE_ prop (error already reported)
 * Returns false if this is a valid UNSAFE_ prop (no error)
 */
function isDisallowedUnsafeProp(
    propName: string,
    allowedUnsafeProps: Set<string>,
    loc: TSESTree.SourceLocation | undefined,
    result: ValidationResult
): boolean {
    // Check if the UNSAFE_ prop is in the allowed list
    if (allowedUnsafeProps.has(propName)) {
        return false; // Valid UNSAFE_ prop
    }

    // Invalid UNSAFE_ prop - generate appropriate error message
    const safePropName = propName.replace("UNSAFE_", "");

    // Check if the safe version would be prohibited
    if (PROHIBITED_PROPS.includes(safePropName)) {
        result.errors.push({
            message: validationMessage("unsafe-prop-prohibited", {
                propName,
                safePropName,
                guideSection: "styles"
            }),
            line: loc?.start.line,
            column: loc?.start.column
        });
    } else {
        result.errors.push({
            message: validationMessage("unsafe-prop-invalid", {
                propName,
                safePropName
            }),
            line: loc?.start.line,
            column: loc?.start.column
        });
    }

    return true; // This is invalid and error was reported
}

/**
 * Checks if an UNSAFE_ prop value has an equivalent design token
 * If equivalent tokens exist, suggests using them instead of the raw CSS value
 */
async function isInvalidUseOfCustomValue(
    propName: string,
    propValue: string,
    loc: TSESTree.SourceLocation | undefined,
    result: ValidationResult
): Promise<boolean> {
    const safePropName = propName.replace("UNSAFE_", "");

    try {
        // First check if the value is already a valid token propValue
        // If it is, the existing validation (validateDesignSystemTokensUsage) will handle it
        const allTokens = await getAllTokens();
        if (allTokens.has(propValue)) {
            // This is a valid token value. It is not this function's job to validate it.
            return false;
        }

        const allTokensData = await getAllTokensData();
        const filteredTokens = filterTokens(allTokensData, [], [propValue], [safePropName]);
        const equivalentTokens = new Set<string>();

        for (const categories of Object.values(filteredTokens) as Record<string, TokenCategoryNode>[]) {
            // Iterate through categories
            for (const categoryNode of Object.values(categories)) {
                // Extract propValues from tokens
                for (const tokenValue of Object.values(categoryNode.tokens)) {
                    equivalentTokens.add(tokenValue.propValue);
                }
            }
        }

        // If equivalent tokens exist, suggest using them instead
        if (equivalentTokens.size > 0) {
            // Generate suggestions - limit to a reasonable number for readability
            const suggestions = Array.from(equivalentTokens).slice(0, 10);
            const moreCount = equivalentTokens.size > 10 ? equivalentTokens.size - 10 : 0;
            const moreText = moreCount > 0 ? ` (and ${moreCount} more)` : "";

            result.errors.push({
                message: validationMessage("unsafe-has-token-equivalent", {
                    value: propValue,
                    propName,
                    safePropName,
                    suggestions: suggestions.join(", "),
                    moreText
                }),
                line: loc?.start.line,
                column: loc?.start.column
            });
            return true;
        }

        return false;
    } catch (error) {
        // If we can't load token data, just skip this validation
        // Don't fail the entire validation because of this
        console.error("Failed to check for token equivalents:", error);
        throw error;
    }
}

async function validateUnsafePropsUsage(jsxElements: TSESTree.JSXElement[], result: ValidationResult) {
    // Load the allowed unsafe props list
    const allowedUnsafeProps = new Set(await getUnsafeProps());

    // Check each JSX element for UNSAFE_ props
    for (const { propValue, loc, propName } of getAllProps(jsxElements)) {
        // Skip non-UNSAFE props
        if (!propName.startsWith("UNSAFE_")) {
            continue;
        }
        // Check if this is a disallowed UNSAFE_ prop
        // If so, error is already reported and we skip further validation
        if (isDisallowedUnsafeProp(propName, allowedUnsafeProps, loc, result)) {
            continue;
        }

        const values = extractAllConstantStrings(propValue);
        let invalidValuesCount = 0;
        const propValuesValidation: ValidationResult =
        {
            isValid: true,
            errors: [],
            warnings: []
        };

        for (const value of values) {
            // Check if this is an invalid percentage-safe prop with percentage value
            // If so, error is already reported and we skip further validation
            if (isInvalidUnsafePercentageProp(propName, value, loc, propValuesValidation)) {
                invalidValuesCount++;
                continue;
            }

            // At this point, the UNSAFE_ prop is valid, now check if the CSS value has a token equivalent
            // Only check string literal values
            if (await isInvalidUseOfCustomValue(propName, value, loc, propValuesValidation)){
                invalidValuesCount++;
                continue;
            }
        }

        if (invalidValuesCount === values.length) {
            result.errors.push(...propValuesValidation.errors);
            result.warnings.push(...propValuesValidation.warnings);
            result.isValid = result.isValid && propValuesValidation.isValid;
        }
    }
}


function isInvalidUnsafeProp(propName: string, tokenSupportedProps: Set<string>): boolean {
    const safePropName = propName.replace("UNSAFE_", "");

    return propName.startsWith("UNSAFE_") && !tokenSupportedProps.has(safePropName);
}

async function validateDesignSystemTokensUsage(jsxElements: TSESTree.JSXElement[], result: ValidationResult) {
    // Load the allowed unsafe props list
    const tokenSupportedProps = await getTokenSupportedProps();
    const allowedTokens = await getAllTokens();

    for (const { propValue, propName, loc } of getAllProps(jsxElements)) {
        // Skip invalid UNSAFE_ props as they are handled in another validation
        if (isInvalidUnsafeProp(propName, tokenSupportedProps)) {
            continue;
        }

        // Extract all constant string values from the prop
        const constantStrings = extractAllConstantStrings(propValue);

        // Check each constant string value
        for (const originalValue of constantStrings) {
            // Validate token format for token-supported props
            if (tokenSupportedProps.has(propName)) {
                validateTokenFormat(originalValue, propName, loc, result);
            } else if (allowedTokens.has(originalValue)) {// Ensure tokens are not used for not token-supported props
                validateTokenUsageOnUnsupportedProp(originalValue, propName, loc, result);
            }
        }
    }
}

function validateTokenFormat(
    originalValue: string,
    propName: string,
    loc: TSESTree.SourceLocation | undefined,
    result: ValidationResult
): void {
    const formatted = formatStyledSystemName(originalValue, null);
    if (formatted !== originalValue && formatted.length < originalValue.length) {
        result.errors.push({
            message: validationMessage("token-format-error", {
                value: originalValue,
                propName,
                formatted
            }),
            line: loc?.start.line,
            column: loc?.start.column
        });
    }
}

function validateTokenUsageOnUnsupportedProp(
    originalValue: string,
    propName: string,
    loc: TSESTree.SourceLocation | undefined,
    result: ValidationResult
): void {
    //this approach could be a bit flaky as some tokens might coincidentally match valid non-token values
    //for example variant="primary" is valid. So, we only check for tokens with "-" or "_" which are unlikely to be valid non-token values
    if (!originalValue.includes("-") && !originalValue.includes("_")) {
        return;
    }

    // If the prop is not in the token-supported list, make sure tokens are not used
    // (e.g. top="core_0", or UNSAFE_color="danger-selected")
    if (propName.startsWith("UNSAFE_")) {
        const suggestedProp = propName.replace("UNSAFE_", "");
        result.errors.push({
            message: validationMessage("token-not-allowed-unsafe", {
                value: originalValue,
                propName,
                suggestedProp,
                guideSection: "styles"
            }),
            line: loc?.start.line,
            column: loc?.start.column
        });
    } else {
        result.errors.push({
            message: validationMessage("token-not-allowed", {
                value: originalValue,
                propName,
                guideSection: "styles"
            }),
            line: loc?.start.line,
            column: loc?.start.column
        });
    }
}

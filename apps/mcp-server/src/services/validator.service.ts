// TODO: Mahmoud, can you look into this? seems like a valid error
/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */

import { files } from "@docs/ai";
import { parse } from "@typescript-eslint/parser";
import type { TSESTree } from "@typescript-eslint/types";
import emojiRegex from "emoji-regex";
import { readFile } from "fs/promises";
import { join } from "path";
import type { GuideSection } from "../config/constants";
import { env } from "../env";
import { filterTokens, type TokenCategoryNode, type TokenFileRootNode } from "../utils/token-filters";
import { formatStyledSystemName } from "../utils/token-name-formatter";

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

/**
 * Validates component structure according to Hopper Design System rules
 */
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
            message: "No code provided. Please provide valid TypeScript/JSX code to validate."
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
                message: "No JSX components found in the provided code."
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
            let errorMessage = `Failed to parse code: ${error.message}`;

            if (error.message.includes("Identifier expected")) {
                errorMessage += "\n\nPlease ensure the code is valid TypeScript/JSX syntax. Common issues include:";
                errorMessage += "\n- Missing semicolons or brackets";
                errorMessage += "\n- Invalid JSX syntax";
                errorMessage += "\n- Incomplete component declarations";
            } else if (error.message.includes("Unexpected end of file")) {
                errorMessage += "\n\nThe code appears to be incomplete. Please provide the full component code.";
            }

            result.errors.push({
                message: errorMessage
            });
        } else {
            result.errors.push({
                message: "Failed to parse code due to unknown error. Please ensure the code is valid TypeScript/JSX."
            });
        }
    }

    return result;
}

/**
 * Recursively finds all JSX elements in the AST
 */
//
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function findJSXElements(node: any): TSESTree.JSXElement[] {
    const elements: TSESTree.JSXElement[] = [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function traverse(n: any) {
        if (!n || typeof n !== "object") {
            return;
        }

        if (n.type === "JSXElement") {
            elements.push(n as TSESTree.JSXElement);
        }

        // Traverse all properties
        for (const key in n) {
            //TODO: Mahmoud can we use Object.hasOwn(obj, prop) here?
            // eslint-disable-next-line no-prototype-builtins
            if (n.hasOwnProperty(key)) {
                const value = n[key];
                if (Array.isArray(value)) {
                    value.forEach(traverse);
                } else if (value && typeof value === "object") {
                    traverse(value);
                }
            }
        }
    }

    traverse(node);

    return elements;
}

/**
 * Gets the component name from a JSX element
 */
function getComponentName(element: TSESTree.JSXElement): string | null {
    const openingElement = element.openingElement;
    if (openingElement.name.type === "JSXIdentifier") {
        return openingElement.name.name;
    }

    return null;
}

/**
 * Generator function that yields JSX attributes from a list of JSX elements
 */
function* getAllProps(jsxElements: TSESTree.JSXElement[]) {
    for (const element of jsxElements) {
        const openingElement = element.openingElement;
        if (openingElement.attributes) {
            for (const attribute of openingElement.attributes) {
                if (attribute.type === "JSXAttribute" && attribute.name.type === "JSXIdentifier") {
                    const propName = attribute.name.name;
                    yield { propValue: attribute.value, propName, loc: attribute.loc };
                }
            }
        }
    }
}

/**
 * Gets direct children components from a JSX element (excludes text nodes and expressions)
 */
function getDirectComponentChildren(element: TSESTree.JSXElement): string[] {
    const children: string[] = [];

    for (const child of element.children) {
        if (child.type === "JSXElement") {
            const childName = getComponentName(child);
            if (childName) {
                children.push(childName);
            }
        }
    }

    return children;
}

/**
 * Gets all direct children (components + text nodes) from a JSX element
 */
function getAllDirectChildren(element: TSESTree.JSXElement): Array<{ type: "component" | "text"; name: string }> {
    const children: Array<{ type: "component" | "text"; name: string }> = [];

    for (const child of element.children) {
        if (child.type === "JSXElement") {
            const childName = getComponentName(child);
            if (childName) {
                children.push({ type: "component", name: childName });
            }
        } else if (child.type === "JSXText") {
            // Only count non-whitespace text nodes
            const text = child.value.trim();
            if (text.length > 0) {
                children.push({ type: "text", name: "text" });
            }
        } else if (child.type === "JSXExpressionContainer") {
            // Handle expressions like {variable} or {someFunction()}
            children.push({ type: "text", name: "expression" });
        }
    }

    return children;
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
                message: `Button component${instanceInfo} with 2 children must include a Text component when containing text content. Found children: ${componentChildren.join(", ")}${componentChildren.length === 0 ? "none" : ""} (plus text content)`,
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
            message: `Modal component${instanceInfo} can only have Header, Content, and ButtonGroup as direct children. Found invalid children: ${invalidChildren.join(", ")}`,
            line: element.loc?.start.line,
            column: element.loc?.start.column
        });
    }

    // Optional: Check if required children are present (this could be a warning)
    const missingChildren = allowedChildren.filter(required => !children.includes(required));
    if (missingChildren.length > 0) {
        result.errors.push({
            message: `Modal component${instanceInfo} is missing recommended children: ${missingChildren.join(", ")}`,
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
                // Check if the value is "flex" or "grid"
                if (attribute.value?.type === "Literal" &&
                    typeof attribute.value.value === "string") {
                    const displayValue = attribute.value.value;

                    if (displayValue === "flex") {
                        result.warnings.push({
                            message: `Div component${instanceInfo} with display="flex" should probably be replaced with a more semantic layout component. Consider using <Stack> for vertical layouts, <Inline> for horizontal layouts with wrapping, or <Flex> for custom flex layouts.`,
                            line: element.loc?.start.line,
                            column: element.loc?.start.column
                        });
                    } else if (displayValue === "grid") {
                        result.warnings.push({
                            message: `Div component${instanceInfo} with display="grid" should probably be replaced with the <Grid> component for better design consistency and built-in grid functionality.`,
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
                    message: `'${componentName}' component has only one child. This might be unnecessary — consider merging the '${componentName}' props directly into the child component if possible.`,
                    line: element.loc?.start.line,
                    column: element.loc?.start.column
                });
            }
        } else {
            // Error for other layout components
            if (componentChildren.length <= 1) {
                result.errors.push({
                    message: `'${componentName}' component has only one child. Layout components MUST not be used with only one child. Consider removing it or replacing it with a more appropriate component.`,
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
                message: `Emoji '${match[0]}' detected at position ${(match.index || 0) + 1}. Emojis are not allowed in Hopper components. Consider using Hopper's Icon component or text alternatives for better accessibility and consistency.`,
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
            const message = `Native HTML element '<${componentName}>' is not allowed. Use Hopper components instead for better design consistency. For example, consider using semantic components like Card, Box, Stack, Text, or Button, or use the direct Hopper equivalent like Div, Span, etc. If no direct equivalent exists, consider using the 'htmlElement' function. Check the '${"styles" as GuideSection}' guide for more details.`;

            result.errors.push({
                message,
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
            const message = `Using '${propName}' prop is **STRONGLY** discouraged. Check the Hopper 'styles' guide for details.`;

            result.errors.push({
                message,
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
        throw new Error("Invalid format for unsafe props data.");
    } catch {
        throw new Error("Failed to load the list of allowed UNSAFE_ props for validation.");
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
        throw new Error("Failed to load the list of allowed design tokens for validation.", { cause: e });
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
        throw new Error("Failed to load the full token data for validation.", { cause: e });
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
    propValue: TSESTree.JSXAttribute["value"],
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

    // Percentage-safe prop but not a string value - not our concern
    if (!isStringValue(propValue)) {
        return false;
    }

    // Percentage-safe prop with string value but not a percentage - not our concern
    if (!propValue.value.endsWith("%")) {
        return false;
    }

    // This is an invalid case: UNSAFE_ prefix used with percentage on a percentage-safe prop
    const message = `The prop '${propName}' with percentage value '${propValue.value}' should not use the UNSAFE_ prefix. Change it to '${safePropName}="${propValue.value}"' instead. Width and height properties accept percentage values directly.`;

    result.errors.push({
        message,
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
        const message = `The prop '${propName}' is not a valid UNSAFE_ prop, and '${safePropName}' is prohibited in Hopper. Check the Hopper ${"styles" satisfies GuideSection}' guide for proper styling alternatives.`;
        result.errors.push({
            message,
            line: loc?.start.line,
            column: loc?.start.column
        });
    } else {
        const message = `The prop '${propName}' is not a valid UNSAFE_ prop. Use '${safePropName}' directly instead.`;
        result.errors.push({
            message,
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
async function checkUnsafePropHasTokenEquivalent(
    propName: string,
    propValue: TSESTree.JSXAttribute["value"],
    loc: TSESTree.SourceLocation | undefined,
    result: ValidationResult
): Promise<void> {
    if (!isStringValue(propValue)) {
        return;
    }

    const safePropName = propName.replace("UNSAFE_", "");

    try {
        // First check if the value is already a valid token propValue
        // If it is, the existing validation (validateDesignSystemTokensUsage) will handle it
        const allTokens = await getAllTokens();
        if (allTokens.has(propValue.value)) {
            // This is a valid token value. It is not this function's job to validate it.
            return;
        }

        const allTokensData = await getAllTokensData();
        const filteredTokens = filterTokens(allTokensData, [], [propValue.value], [safePropName]);
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
            const moreSuggestions = equivalentTokens.size > 10 ? ` (and ${equivalentTokens.size - 10} more)` : "";

            const message = `The CSS value '${propValue.value}' for '${propName}' has equivalent design tokens. Consider using the safe prop '${safePropName}' with one of these token values: ${suggestions.join(", ")}${moreSuggestions}.`;

            result.errors.push({
                message,
                line: loc?.start.line,
                column: loc?.start.column
            });
        }
    } catch (error) {
        // If we can't load token data, just skip this validation
        // Don't fail the entire validation because of this
        console.error("Failed to check for token equivalents:", error);
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

        // Check if this is an invalid percentage-safe prop with percentage value
        // If so, error is already reported and we skip further validation
        if (isInvalidUnsafePercentageProp(propName, propValue, loc, result)) {
            continue;
        }

        // Check if this is a disallowed UNSAFE_ prop
        // If so, error is already reported and we skip further validation
        if (isDisallowedUnsafeProp(propName, allowedUnsafeProps, loc, result)) {
            continue;
        }

        // At this point, the UNSAFE_ prop is valid, now check if the CSS value has a token equivalent
        // Only check string literal values
        await checkUnsafePropHasTokenEquivalent(propName, propValue, loc, result);
    }
}

function isStringValue(propValue: TSESTree.JSXAttribute["value"]): propValue is TSESTree.Literal & { value: string } {
    return !!propValue && propValue.type === "Literal" && typeof propValue.value === "string";
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
        // Only process string literal values
        if (!isStringValue(propValue) || isInvalidUnsafeProp(propName, tokenSupportedProps)) {
            continue;
        }

        const originalValue = propValue.value;

        // Validate token format for token-supported props
        if (tokenSupportedProps.has(propName)) {
            validateTokenFormat(originalValue, propName, loc, result);
        } else if (allowedTokens.has(originalValue)) { // Ensure tokens are not used for not token-supported props
            validateTokenUsageOnUnsupportedProp(originalValue, propName, loc, result);
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
        const message = `The token value '${originalValue}' for prop '${propName}' is wrong. Change it to '${formatted}'.`;
        result.errors.push({
            message,
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
        const message = `The token value '${originalValue}' is not allowed for prop '${propName}'. You have to use the safe prop '${suggestedProp}' directly when tokens are available. Check the Hopper '${"styles" satisfies GuideSection}' guide for details.`;
        result.errors.push({
            message,
            line: loc?.start.line,
            column: loc?.start.column
        });
    } else {
        const message = `The token value '${originalValue}' is not allowed for prop '${propName}'. Only certain props support design tokens. Check the Hopper '${"styles" satisfies GuideSection}' guide for details.`;
        result.errors.push({
            message,
            line: loc?.start.line,
            column: loc?.start.column
        });
    }
}

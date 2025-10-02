/* eslint-disable max-len */

import { files } from "@docs/ai";
import { parse } from "@typescript-eslint/parser";
import type { TSESTree } from "@typescript-eslint/types";
import emojiRegex from "emoji-regex";
import { readFile } from "fs/promises";
import { join } from "path";
import { env } from "../env";
import type { GuideSection } from "./docs";
import { formatStyledSystemName } from "./formatStyledSystemName";

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
export async function validateComponentStructure(code: string): Promise<ValidationResult> {
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

        // Check for unsafe props usage
        await validateUnsafePropsUsage(jsxElements, result);

        // Check for design system tokens usage
        await validateDesignSystemTokensUsage(jsxElements, result);

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
                    // Add more component validations here as needed
                    default:
                        // For now, we only validate Button and Modal components
                        break;
                }
            }
        }

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
        if (!n || typeof n !== "object") {return;}

        if (n.type === "JSXElement") {
            elements.push(n as TSESTree.JSXElement);
        }

        // Traverse all properties
        for (const key in n) {
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
 * Gets direct children components from a JSX element
 */
function getDirectChildren(element: TSESTree.JSXElement): string[] {
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
 * Validates Button component structure
 * Rule: If the component is Button and if it has 2 children, one of them should be Text component.
 */
function validateButtonComponent(element: TSESTree.JSXElement, result: ValidationResult, instanceInfo: string = ""): void {
    const componentName = getComponentName(element);

    if (componentName !== "Button") {
        return;
    }

    const allChildren = getAllDirectChildren(element);
    const componentChildren = getDirectChildren(element);

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

    const children = getDirectChildren(element);
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
        // Get the path to the tokens data file
        const tokensDataPath = join(env.DOCS_PATH, files.tokens.maps.brief.all.path);
        const fileContents = await readFile(tokensDataPath, "utf-8");
        const tokensData = JSON.parse(fileContents);

        // Recursively extract all values from the nested object structure
        const extractValues = (obj: unknown): string[] => {
            const values: string[] = [];

            if (typeof obj === "string") {
                values.push(obj);
            } else if (Array.isArray(obj)) {
                for (const item of obj) {
                    values.push(...extractValues(item));
                }
            } else if (obj !== null && typeof obj === "object") {
                for (const value of Object.values(obj)) {
                    values.push(...extractValues(value));
                }
            }

            return values;
        };

        const allValues = extractValues(tokensData);

        // Cache the result before returning
        _allTokensCache = new Set(allValues);

        return _allTokensCache;
    } catch (e) {
        console.error("error:", e);
        throw new Error("Failed to load the list of allowed design tokens for validation.", { cause: e });
    }
}

async function validateUnsafePropsUsage(jsxElements: TSESTree.JSXElement[], result: ValidationResult) {
    // Load the allowed unsafe props list
    const allowedUnsafeProps = new Set(await getUnsafeProps());

    // Check each JSX element for UNSAFE_ props
    for (const { loc, propName } of getAllProps(jsxElements)) {
        // Check if prop starts with UNSAFE_
        if (propName.startsWith("UNSAFE_")) {
            // Check if it's in the allowed list
            if (!allowedUnsafeProps.has(propName)) {
                const suggestedProp = propName.replace("UNSAFE_", "");
                let message: string;

                // Check if the suggested prop is in the prohibited list
                if (PROHIBITED_PROPS.includes(suggestedProp)) {
                    message = `The prop ${propName}' is not a valid UNSAFE_ prop, and ${suggestedProp}' is prohibited in Hopper. Check the Hopper ${"styles" satisfies GuideSection}' guide for proper styling alternatives.`;
                } else {
                    message = `The prop ${propName}' is not a valid UNSAFE_ prop. You can use ${suggestedProp}' directly instead.`;
                }

                result.errors.push({
                    message,
                    line: loc?.start.line,
                    column: loc?.start.column
                });
            }
        }
    }
}

async function validateDesignSystemTokensUsage(jsxElements: TSESTree.JSXElement[], result: ValidationResult) {
    // Load the allowed unsafe props list
    const tokenSupportedProps = await getTokenSupportedProps();
    const allowedTokens = await getAllTokens();

    for (const { propValue, propName, loc } of getAllProps(jsxElements)) {
        // Skip invalid UNSAFE_ props as they are handled in another validation
        const safePropName = propName.replace("UNSAFE_", "");
        if (propName.startsWith("UNSAFE_") && !tokenSupportedProps.has(safePropName)) {
            continue;
        }

        // Only process string literal values
        if (!propValue || propValue.type !== "Literal" || typeof propValue.value !== "string") {
            continue;
        }

        const originalValue = propValue.value;

        // Validate token format for token-supported props
        if (tokenSupportedProps.has(propName)) {
            validateTokenFormat(originalValue, propName, loc, result);
            continue;
        }

        // Ensure tokens are not used on unsupported props
        if (allowedTokens.has(originalValue)) {
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

// TODO: Mahmoud check these disables
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import type { TSESTree } from "@typescript-eslint/types";

/**
 * Recursively finds all JSX elements in the AST
 */
export function findJSXElements(node: any): TSESTree.JSXElement[] {
    const elements: TSESTree.JSXElement[] = [];

    function traverse(n: any) {
        if (!n || typeof n !== "object") {
            return;
        }

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
export function getComponentName(element: TSESTree.JSXElement): string | null {
    const openingElement = element.openingElement;
    if (openingElement.name.type === "JSXIdentifier") {
        return openingElement.name.name;
    }

    return null;
}

export interface PropInfo {
    propValue: TSESTree.JSXAttribute["value"];
    propName: string;
    loc: TSESTree.SourceLocation | undefined;
}

/**
 * Generator function that yields JSX attributes from a list of JSX elements
 */
export function* getAllProps(jsxElements: TSESTree.JSXElement[]): Generator<PropInfo> {
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
export function getDirectComponentChildren(element: TSESTree.JSXElement): string[] {
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
export function getAllDirectChildren(element: TSESTree.JSXElement): Array<{ type: "component" | "text"; name: string }> {
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
 * Extracts all constant string values from a JSX attribute value
 * Handles:
 * - Simple string literals: "value"
 * - Conditional expressions: condition ? "a" : "b"
 * - Object expressions with responsive values: { base: "x", md: "y" }
 * - Nested combinations: { base: "x", md: condition ? "y" : "z" }
 *
 * Excludes:
 * - String fragments from concatenation: value + "px" (won't extract "px")
 * - Template literal fragments: `${value}px` (won't extract partial strings)
 * - Logical AND operands: state && "value" (won't extract "value")
 *
 * @param propValue The JSX attribute value to extract strings from
 * @returns An array of all constant string values found that represent complete prop values
 */
export function extractAllConstantStrings(propValue: TSESTree.JSXAttribute["value"]): string[] {
    const strings: string[] = [];

    /**
     * Extracts strings from a node, considering the context.
     * @param node The node to extract from
     * @param isDirectValue Whether this node represents a direct prop value (not part of concatenation/computation)
     */
    function extractFromNode(node: any, isDirectValue: boolean = true): void {
        if (!node) {
            return;
        }

        switch (node.type) {
            case "Literal":
                // Only extract string literals that are direct values, not parts of concatenation
                if (typeof node.value === "string" && isDirectValue) {
                    strings.push(node.value);
                }
                break;

            case "ConditionalExpression":
                // Ternary operator: condition ? consequent : alternate
                // Both branches are direct values for the prop
                extractFromNode(node.consequent, true);
                extractFromNode(node.alternate, true);
                break;

            case "ObjectExpression":
                // ** In future, we might only want to extract known responsive prop keys **
                // Object literal: { base: "x", md: "y" }
                // Property values are direct values for responsive props
                // Only extract first-level values, nested objects are not valid responsive props
                for (const property of node.properties) {
                    if (property.type === "Property") {
                        const value = property.value;
                        // Only skip nested ObjectExpressions
                        // Arrays and other values at first level should still be processed
                        if (value && value.type !== "ObjectExpression") {
                            extractFromNode(value, true);
                        }
                    }
                }
                break;

            case "ArrayExpression":
                // Array literal: ["x", "y"]
                // Array elements are direct values
                for (const element of node.elements) {
                    extractFromNode(element, true);
                }
                break;

            case "JSXExpressionContainer":
                // JSX expression container: {expression}
                extractFromNode(node.expression, isDirectValue);
                break;

            case "LogicalExpression":
                // Logical expressions need special handling
                if (node.operator === "||" || node.operator === "&&" || node.operator === "??") {
                    // OR expression: value || "default"
                    // The right side is a fallback value, so it's a direct prop value
                    extractFromNode(node.left, true);
                    extractFromNode(node.right, true);
                }
                break;

            case "TemplateLiteral":
                // Template literals like `${value}px`
                // Don't extract partial strings - only extract if the entire template is static
                if (node.expressions.length === 0) {
                    // No expressions, so the entire template is a static string
                    const fullString = node.quasis.map((q: any) => q.value.raw).join("");
                    if (isDirectValue) {
                        strings.push(fullString);
                    }
                }
                // If there are expressions, we don't extract anything as it's a computed value
                break;

            case "BinaryExpression":
                // Binary expressions like value + "px"
                // Don't extract operands as they're fragments being concatenated
                // We explicitly don't traverse into binary expression operands
                break;

            case "UnaryExpression":
                // Unary expressions like !condition
                // These don't produce string values, so we skip them
                break;

            case "MemberExpression":
                // Member expressions like obj.prop - we skip these as they're not constants
                break;

            case "Identifier":
                // Variables - we skip these as they're not constants
                break;

            case "CallExpression":
                // Function calls - we skip these as they're not constants
                break;

            case "AssignmentExpression":
            case "UpdateExpression":
            case "SequenceExpression":
                // These shouldn't appear in prop values, but skip them if they do
                break;

            default:
                // For unknown node types, conservatively don't extract anything
                // This prevents us from accidentally extracting fragments
                break;
        }
    }

    // Handle different types of prop values
    if (!propValue) {
        return strings;
    }

    if (propValue.type === "Literal" && typeof propValue.value === "string") {
        // Direct string literal attribute: prop="value"
        strings.push(propValue.value);
    } else if (propValue.type === "JSXExpressionContainer") {
        // Expression attribute: prop={expression}
        extractFromNode(propValue.expression, true);
    }

    // Remove duplicates and return
    return [...new Set(strings)];
}

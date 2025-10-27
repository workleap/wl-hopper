import type { TSESTree } from "@typescript-eslint/types";
import emojiRegex from "emoji-regex";
import { LAYOUT_COMPONENTS, NATIVE_HTML_ELEMENTS, NOT_RECOMMENDED_COMPONENTS, PROHIBITED_PROPS } from "./constants";
import { getAllDirectChildren, getAllProps, getComponentName, getDirectComponentChildren } from "./jsx-helpers";
import type { ValidationResult } from "./types";
import { validationMessage } from "./validation-messages";

const EMOJI_REGEX = emojiRegex();

export function validateNoEmojis(code: string, result: ValidationResult): void {
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

export function validateTagNames(jsxElements: TSESTree.JSXElement[], result: ValidationResult): void {
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

export function validateProhibitedProps(jsxElements: TSESTree.JSXElement[], result: ValidationResult): void {
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

/**
 * Validates layout components to ensure they have more than one child
 * Rule: Layout components (Stack, Inline, Flex, Grid, Div, Box) should typically have multiple children
 * - Only validates when there's exactly one COMPONENT child AND no other content
 * - Div gets a warning (could be intentional)
 * - Other layout components get an error (should not be used for single child)
 */
export function validateLayoutComponents(jsxElements: TSESTree.JSXElement[], result: ValidationResult): void {
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

// TODO: Mahmoud, can you look into this? seems like a valid error

import { parse } from "@typescript-eslint/parser";
import type { TSESTree } from "@typescript-eslint/types";
import {
    validateLayoutComponents,
    validateNoEmojis,
    validateProhibitedProps,
    validateTagNames
} from "./basicValidators";
import { validateComponentSpecificRules } from "./componentValidators";
import { extractAllConstantStrings, findJSXElements, getAllProps } from "./jsxHelpers";
import { isToken, validateDesignSystemTokensUsage } from "./tokenValidator";
import type { ValidationMessage, ValidationResult } from "./types";
import { validateUnsafePropsUsage } from "./unsafePropsValidator";
import { validationMessage } from "./validationMessages";

export const MAX_PROP_VALUES = 1000;
export const MAX_DIAGNOSTICS = 50;
export const MAX_MESSAGE_LENGTH = 1000;

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

        // Validate if prop values are acceptable
        await validatePropValues(jsxElements, result);

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

    result.errors = limitDiagnostics(result.errors);
    result.warnings = limitDiagnostics(result.warnings);

    return result;
}

function limitDiagnostics(messages: ValidationMessage[]): ValidationMessage[] {
    // Messages can embed user values, so cap each one too.
    const kept = messages
        .slice(0, MAX_DIAGNOSTICS)
        .map(item =>
            item.message.length <= MAX_MESSAGE_LENGTH
                ? item
                : { ...item, message: `${item.message.slice(0, MAX_MESSAGE_LENGTH)}... (truncated)` }
        );

    if (messages.length > MAX_DIAGNOSTICS) {
        kept.push({
            message: validationMessage("diagnostics-truncated", { count: messages.length - MAX_DIAGNOSTICS })
        });
    }

    return kept;
}

async function validatePropValues(jsxElements: TSESTree.JSXElement[], result: ValidationResult) {
    let valueCount = 0;

    for (const prop of getAllProps(jsxElements)) {
        valueCount += extractAllConstantStrings(prop.propValue).length;
        if (valueCount > MAX_PROP_VALUES) {
            result.errors.push({ message: validationMessage("too-many-prop-values", { max: MAX_PROP_VALUES }) });

            return;
        }

        if (prop.propName.startsWith("UNSAFE_")) {
            await validateUnsafePropsUsage(prop, result, isToken);
        } else {
            await validateDesignSystemTokensUsage(prop, result);
        }
    }
}

// TODO: Mahmoud, can you look into this? seems like a valid error

import { parse } from "@typescript-eslint/parser";
import type { TSESTree } from "@typescript-eslint/types";
import { validateLayoutComponents, validateNoEmojis, validateProhibitedProps, validateTagNames } from "./basicValidators";
import { validateComponentSpecificRules } from "./componentValidators";
import { findJSXElements, getAllProps } from "./jsxHelpers";
import { isToken, validateDesignSystemTokensUsage } from "./tokenValidator";
import type { ValidationResult } from "./types";
import { validateUnsafePropsUsage } from "./unsafePropsValidator";
import { validationMessage } from "./validationMessages";

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

    return result;
}

async function validatePropValues(jsxElements: TSESTree.JSXElement[], result: ValidationResult) {
    for (const prop of getAllProps(jsxElements)) {
        if (prop.propName.startsWith("UNSAFE_")) {
            await validateUnsafePropsUsage(prop, result, isToken);
        } else {
            await validateDesignSystemTokensUsage(prop, result);
        }
    }
}

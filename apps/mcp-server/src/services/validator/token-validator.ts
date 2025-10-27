import type { TSESTree } from "@typescript-eslint/types";
import { formatStyledSystemName } from "../../utils/token-name-formatter";
import { getAllTokens, getTokenSupportedProps } from "./data";
import { extractAllConstantStrings, type PropInfo } from "./jsx-helpers";
import type { ValidationResult } from "./types";
import { mergeResults } from "./types";
import { validationMessage } from "./validation-messages";

export async function isToken(value: string): Promise<boolean> {
    const allTokens = await getAllTokens();

    return allTokens.has(value);
}

async function isTokenSupportedProp(propName: string): Promise<boolean> {
    const tokenSupportedProps = await getTokenSupportedProps();

    return tokenSupportedProps.has(propName);
}

async function validateTokenFormat(
    originalValue: string,
    propName: string,
    loc: TSESTree.SourceLocation | undefined,
    result: ValidationResult
): Promise<boolean> {
    if (!await isTokenSupportedProp(propName) || await isToken(originalValue)) {
        return true;
    }

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

        return false;
    }

    return true;
}

async function validateTokenUsageOnUnsupportedProp(
    propValue: string,
    propName: string,
    loc: TSESTree.SourceLocation | undefined,
    result: ValidationResult
): Promise<boolean> {
    // this approach could be a bit flaky as some tokens might coincidentally match valid non-token values
    // for example variant="primary" is valid. So, we only check for tokens with "-" or "_" which are unlikely to be valid non-token values
    if (!propValue.includes("-") && !propValue.includes("_")) {
        return true;
    }

    if (await isTokenSupportedProp(propName) || !await isToken(propValue)) {
        return true;
    }

    // This function should only handle non-UNSAFE_ props
    // UNSAFE_ props are handled separately in validateUnsafePropsUsage
    result.errors.push({
        message: validationMessage("token-not-allowed", {
            value: propValue,
            propName,
            guideSection: "styles"
        }),
        line: loc?.start.line,
        column: loc?.start.column
    });

    return false;
}

export async function validateDesignSystemTokensUsage({ propValue, propName, loc }: PropInfo, result: ValidationResult) {
    const values = extractAllConstantStrings(propValue);
    let invalidValuesCount = 0;
    const propValuesValidation: ValidationResult =
        {
            isValid: true,
            errors: [],
            warnings: []
        };

    for (const value of values) {
        if (!await validateTokenFormat(value, propName, loc, propValuesValidation)) {
            invalidValuesCount++;
        } else if (!await validateTokenUsageOnUnsupportedProp(value, propName, loc, propValuesValidation)) {
            invalidValuesCount++;
        }
    }

    if (invalidValuesCount === values.length) {
        mergeResults(result, propValuesValidation);
    }
}

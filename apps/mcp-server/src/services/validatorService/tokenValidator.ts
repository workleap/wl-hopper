import type { TSESTree } from "@typescript-eslint/types";
import { formatStyledSystemName } from "../../utils/tokenNameFormatter";
import { getAllTokens, getTokenSupportedProps } from "./data";
import { extractAllConstantStrings, type PropInfo } from "./jsxHelpers";
import type { ValidationResult } from "./types";
import { mergeResults } from "./types";
import { validationMessage } from "./validationMessages";

// Color-related props that should not use core color tokens
export const COLOR_PROPS = new Set([
    "backgroundColor",
    "color",
    "borderColor",
    "fill",
    "stroke",
    "outlineColor",
    "caretColor",
    "textDecorationColor"
]);

// Core color tokens always start with "core_" prefix (e.g., "core_coastal-25", "core_sapphire-500")
const CORE_TOKEN_PREFIX = "core_";

export async function isToken(value: string): Promise<boolean> {
    const allTokens = await getAllTokens();

    return allTokens.has(value);
}

export function isCoreToken(value: string): boolean {
    // Core color tokens always have the "core_" prefix in their propValue
    return value.startsWith(CORE_TOKEN_PREFIX);
}

async function isTokenSupportedProp(propName: string): Promise<boolean> {
    const tokenSupportedProps = await getTokenSupportedProps();

    return tokenSupportedProps.has(propName);
}

export function validateNoCoreColorToken(
    propValue: string,
    propName: string,
    loc: TSESTree.SourceLocation | undefined,
    result: ValidationResult,
    displayPropName?: string
): boolean {
    // Only check color-related props
    if (!COLOR_PROPS.has(propName)) {
        return true;
    }

    // Check if this is a core color token
    if (!isCoreToken(propValue)) {
        return true;
    }

    result.errors.push({
        message: validationMessage("core-color-token-not-allowed", {
            value: propValue,
            propName: displayPropName ?? propName,
            guideSection: "tokens"
        }),
        line: loc?.start.line,
        column: loc?.start.column
    });

    return false;
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
        } else if (!validateNoCoreColorToken(value, propName, loc, propValuesValidation)) {
            invalidValuesCount++;
        }
    }

    if (invalidValuesCount === values.length) {
        mergeResults(result, propValuesValidation);
    }
}

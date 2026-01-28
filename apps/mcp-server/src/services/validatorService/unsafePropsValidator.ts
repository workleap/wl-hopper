import type { TSESTree } from "@typescript-eslint/types";
import { filterTokens, type TokenCategoryNode } from "../../utils/tokenFilters";
import { PERCENTAGE_SAFE_PROPS, PROHIBITED_PROPS } from "./constants";
import { EXACT_CSS_MATCH_CONFIG } from "./cssValueMatcher";
import { getAllTokensData, getUnsafeProps } from "./data";
import { extractAllConstantStrings, type PropInfo } from "./jsxHelpers";
import { validateNoCoreColorToken } from "./tokenValidator";
import type { ValidationResult } from "./types";
import { mergeResults } from "./types";
import { validationMessage } from "./validationMessages";

/**
 * Checks if a prop is an invalid UNSAFE_ usage with percentage values
 * Returns true if this is an invalid UNSAFE_ percentage prop (error already reported)
 * Returns false if this is not a percentage-related issue (needs further validation)
 */
function validatePercentageUsageWithUnsafeProp(
    propName: string,
    propValue: string,
    loc: TSESTree.SourceLocation | undefined,
    result: ValidationResult
): boolean {
    if (!propValue.endsWith("%")) {
        return true;
    }
    const safePropName = propName.replace("UNSAFE_", "");

    // Not a percentage-safe prop - not our concern
    if (!PERCENTAGE_SAFE_PROPS.has(safePropName)) {
        return true;
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

    return false; // This is invalid and error was reported
}

async function isValidUnsafeProp(propName: string): Promise<boolean> {
    return (await getUnsafeProps()).has(propName);
}

/**
 * Checks if an UNSAFE_ prop is not in the allowed list and reports an error
 * Returns true if this is an invalid UNSAFE_ prop (error already reported)
 * Returns false if this is a valid UNSAFE_ prop (no error)
 */
async function isDisallowedUnsafeProp(
    propName: string,
    loc: TSESTree.SourceLocation | undefined,
    result: ValidationResult
): Promise<boolean> {
    if (await isValidUnsafeProp(propName)) {
        return false;
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
 * Checks if a token value is being used with an UNSAFE_ prop
 * Tokens should use the safe prop directly, not UNSAFE_
 * Returns true if this is invalid usage (error already reported)
 */
async function validateTokenUsageWithUnsafeProp(
    propName: string,
    propValue: string,
    loc: TSESTree.SourceLocation | undefined,
    result: ValidationResult,
    isToken: (value: string) => Promise<boolean>
): Promise<boolean> {
    if (!await isToken(propValue)) {
        return true;
    }

    // If the prop is UNSAFE_, suggest using the safe version
    const safeProp = propName.replace("UNSAFE_", "");

    result.errors.push({
        message: validationMessage("token-not-allowed-unsafe", {
            value: propValue,
            propName,
            suggestedProp: safeProp,
            guideSection: "styles"
        }),
        line: loc?.start.line,
        column: loc?.start.column
    });

    return false;
}

/**
 * Checks if an UNSAFE_ prop value has an equivalent design token
 * If equivalent tokens exist, suggests using them instead of the raw CSS value
 */
async function validateUseOfCustomValueWithUnsafeProp(
    propName: string,
    propValue: string,
    loc: TSESTree.SourceLocation | undefined,
    result: ValidationResult,
    isToken: (value: string) => Promise<boolean>
): Promise<boolean> {
    const safePropName = propName.replace("UNSAFE_", "");

    try {
        // First check if the value is already a valid token propValue
        // If it is, the existing validation (validateDesignSystemTokensUsage) will handle it
        if (await isToken(propValue)) {
            // This is a valid token value. It is not this function's job to validate it.
            return true;
        }

        const allTokensData = await getAllTokensData();
        const filteredTokens = filterTokens(allTokensData, {
            tokenNames: [],
            cssValues: [propValue],
            supportedProps: [safePropName],
            cssMatchTolerances: EXACT_CSS_MATCH_CONFIG
        });
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

            return false;
        }

        return true;
    } catch (error) {
        // If we can't load token data, just skip this validation
        // Don't fail the entire validation because of this
        console.error("Failed to check for token equivalents:", error);
        throw error;
    }
}

export async function validateUnsafePropsUsage(
    { propValue, loc, propName }: PropInfo,
    result: ValidationResult,
    isToken: (value: string) => Promise<boolean>
) {
    // Check if this is a disallowed UNSAFE_ prop
    // If so, error is already reported and we skip further validation
    if (await isDisallowedUnsafeProp(propName, loc, result)) {
        return true;
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
        if (!validatePercentageUsageWithUnsafeProp(propName, value, loc, propValuesValidation)) {
            invalidValuesCount++;
        } else if (!await validateTokenUsageWithUnsafeProp(propName, value, loc, propValuesValidation, isToken)) {
            invalidValuesCount++;
        } else if (!await validateUseOfCustomValueWithUnsafeProp(propName, value, loc, propValuesValidation, isToken)) {
            invalidValuesCount++;
        } else if (!validateNoCoreColorToken(value, propName.replace("UNSAFE_", ""), loc, propValuesValidation, propName)) {
            invalidValuesCount++;
        }
    }

    if (invalidValuesCount === values.length) {
        mergeResults(result, propValuesValidation);
    }
}

import { matchesCssValue } from "./cssValueMatcher";

interface TokenNode {
    cssValue: string;
    propValue: string;
}

export function isTokenNode(obj: unknown): obj is TokenNode {
    return (
        typeof obj === "object" &&
        obj !== null &&
        "cssValue" in obj &&
        "propValue" in obj
    );
}

/**
 * Recursively filters design tokens by their CSS values.
 * Works on full token data structure with cssValue property.
 *
 * @param obj - Token data object (must be from full files with cssValue)
 * @param cssValues - Array of CSS values to match against
 * @param depth - Current depth in the token hierarchy
 */
export function filterTokensByCssValues(obj: unknown, cssValues: string[], depth = 1): unknown {
    if (typeof obj !== "object" || obj === null) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(item => filterTokensByCssValues(item, cssValues, depth));
    }

    const result: Record<string, unknown> = {};
    const objRecord = obj as Record<string, unknown>;

    for (const [key, value] of Object.entries(objRecord)) {
        if (isTokenNode(value)) {
            const shouldInclude = cssValues.some(searchValue =>
                matchesCssValue(value.cssValue, searchValue)
            );

            if (shouldInclude) {
                result[key] = value;
            }
        } else if (typeof value === "object" && value !== null && !Array.isArray(value)) {
            const filtered = filterTokensByCssValues(value, cssValues, depth + 1);
            if (Object.keys(filtered as Record<string, unknown>).length > 0) {
                result[key] = filtered;
            }
        }
    }

    return result;
}

/**
 * Recursively filters a tokens object by the specified keys.
 * Only includes tokens whose keys contain any of the filter keys.
 * Filtering only happens at the leaf level (actual design tokens), not at category levels.
 *
 * Token structure:
 * - Level 1: semantic/core (top level categories)
 * - Level 2: category (e.g., color, typography, etc.)
 * - Level 3: token (the actual leaf nodes)
 */
export function filterTokensByKeys(obj: unknown, filterKeys: string[], depth = 1): unknown {
    if (typeof obj !== "object" || obj === null) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(item => filterTokensByKeys(item, filterKeys, depth));
    }

    const result: Record<string, unknown> = {};
    const objRecord = obj as Record<string, unknown>;

    for (const [key, value] of Object.entries(objRecord)) {
        // Check if this is a leaf node (token at level 3)
        const isLeafNode = depth === 3;

        if (isLeafNode) {
            // Only at leaf level (level 3), check if the key matches the filter
            const shouldInclude = filterKeys.some(filterKey =>
                key.includes(filterKey)
            );

            if (shouldInclude) {
                result[key] = value;
            }
        } else if (typeof value === "object" && value !== null && !Array.isArray(value)) {
            // For category nodes (level 1 and 2), recursively filter and include if children match
            const filtered = filterTokensByKeys(value, filterKeys, depth + 1);
            // Only include if the filtered result has keys
            if (Object.keys(filtered as Record<string, unknown>).length > 0) {
                result[key] = filtered;
            }
        }
    }

    return result;
}

/**
 * Converts full token data to brief format (removes cssValue, keeps only propValue)
 *
 * @param obj - Token data in full format with cssValue and propValue
 * @returns Token data in brief format (propValue strings only)
 */
export function convertToBriefFormat(obj: unknown): unknown {
    if (typeof obj !== "object" || obj === null) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(item => convertToBriefFormat(item));
    }

    const result: Record<string, unknown> = {};
    const objRecord = obj as Record<string, unknown>;

    for (const [key, value] of Object.entries(objRecord)) {
        if (isTokenNode(value)) {
            // This is a token leaf node - extract just the propValue
            result[key] = value.propValue;
        } else if (typeof value === "object" && value !== null) {
            // Recurse for nested objects
            result[key] = convertToBriefFormat(value);
        } else {
            result[key] = value;
        }
    }

    return result;
}

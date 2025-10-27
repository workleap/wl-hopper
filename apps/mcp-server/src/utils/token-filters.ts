import { CssMatchConfig, matchesCssValue } from "./css-value-matcher";

interface TokenNode {
    cssValue: string;
    propValue: string;
}

export interface TokenCategoryNode {
    tokens: Record<string, TokenNode>;
    supportedProps?: string[];
}
export interface TokenFileRootNode {
    core?: Record<string, TokenCategoryNode>;
    semantic?: Record<string, TokenCategoryNode>;
}

interface TokenCategoryBriefNode {
    tokens: Record<string, string>;
    supportedProps?: string[];
}

export interface TokenFileBriefRootNode {
    core?: Record<string, TokenCategoryBriefNode>;
    semantic?: Record<string, TokenCategoryBriefNode>;
}

function filterBySupportedProps(root: TokenFileRootNode, supportedProps: string[]): TokenFileRootNode {
    const result: TokenFileRootNode = {} as TokenFileRootNode;

    // Iterate through top-level keys (core/semantic)
    for (const [topLevelKey, categories] of Object.entries(root) as [keyof TokenFileRootNode, Record<string, TokenCategoryNode>][]) {
        const filteredCategories: Record<string, TokenCategoryNode> = {};

        // Iterate through categories
        for (const [categoryKey, categoryNode] of Object.entries(categories)) {
            // Check if this category supports any of the requested props
            if (categoryNode.supportedProps) {
                // Calculate intersection of category's supportedProps and filter's supportedProps
                const filteredSupportedProps = categoryNode.supportedProps.filter(prop =>
                    supportedProps.includes(prop)
                );

                // Only include the category if there's at least one matching prop
                if (filteredSupportedProps.length > 0) {
                    // Include the category with filtered supportedProps
                    filteredCategories[categoryKey] = {
                        ...categoryNode,
                        supportedProps: filteredSupportedProps
                    };
                }
            }
        }

        // Only include top-level key if it has matching categories
        if (Object.keys(filteredCategories).length > 0) {
            result[topLevelKey] = filteredCategories;
        }
    }

    return result;
}

function filterByCssValues(root: TokenFileRootNode, cssValues: string[], tolerances?: Partial<CssMatchConfig["tolerances"]>): TokenFileRootNode {
    const result: TokenFileRootNode = {} as TokenFileRootNode;

    // Iterate through top-level keys (core/semantic)
    for (const [topLevelKey, categories] of Object.entries(root) as [keyof TokenFileRootNode, Record<string, TokenCategoryNode>][]) {
        const filteredCategories: Record<string, TokenCategoryNode> = {};

        // Iterate through categories
        for (const [categoryKey, categoryNode] of Object.entries(categories)) {
            const filteredTokens: Record<string, TokenNode> = {};

            // Filter tokens by CSS values
            for (const [tokenKey, tokenValue] of Object.entries(categoryNode.tokens)) {
                const shouldInclude = cssValues.some(searchValue =>
                    matchesCssValue(tokenValue.cssValue, searchValue, { tolerances })
                );

                if (shouldInclude) {
                    filteredTokens[tokenKey] = tokenValue;
                }
            }

            // Only include category if it has matching tokens
            if (Object.keys(filteredTokens).length > 0) {
                filteredCategories[categoryKey] = {
                    ...categoryNode,
                    tokens: filteredTokens
                };
            }
        }

        // Only include top-level key if it has categories with matching tokens
        if (Object.keys(filteredCategories).length > 0) {
            result[topLevelKey] = filteredCategories;
        }
    }

    return result;
}

function filterByTokenNames(root: TokenFileRootNode, tokenNames: string[]): TokenFileRootNode {
    const result: TokenFileRootNode = {} as TokenFileRootNode;

    const sanitizedTokenNames = tokenNames.map(key =>
        key.replace(/^-+/, "").replace("hop-", "")
    );

    // Iterate through top-level keys (core/semantic)
    for (const [topLevelKey, categories] of Object.entries(root) as [keyof TokenFileRootNode, Record<string, TokenCategoryNode>][]) {
        const filteredCategories: Record<string, TokenCategoryNode> = {};

        // Iterate through categories
        for (const [categoryKey, categoryNode] of Object.entries(categories)) {
            const filteredTokens: Record<string, TokenNode> = {};

            // Filter tokens at the leaf level
            for (const [tokenKey, tokenValue] of Object.entries(categoryNode.tokens)) {
                const shouldInclude = sanitizedTokenNames.some(filterKey =>
                    tokenKey.includes(filterKey)
                );

                if (shouldInclude) {
                    filteredTokens[tokenKey] = tokenValue;
                }
            }

            // Only include category if it has matching tokens
            if (Object.keys(filteredTokens).length > 0) {
                filteredCategories[categoryKey] = {
                    ...categoryNode,
                    tokens: filteredTokens
                };
            }
        }

        // Only include top-level key if it has categories with matching tokens
        if (Object.keys(filteredCategories).length > 0) {
            result[topLevelKey] = filteredCategories;
        }
    }

    return result;
}

export interface FilterTokensOptions {
    tokensData: TokenFileRootNode;
    tokenNames?: string[];
    cssValues?: string[];
    supportedProps?: string[];
    cssMatchTolerances?: Partial<CssMatchConfig["tolerances"]>;
}

export function filterTokens(options: FilterTokensOptions) {
    const {
        tokensData,
        tokenNames = [],
        cssValues = [],
        supportedProps = [],
        cssMatchTolerances
    } = options;

    //sanitize inputs
    const sanitizedTokenNames = tokenNames.map(name => name.trim()).filter(name => name !== "");
    const sanitizedCssValues = cssValues.map(value => value.trim()).filter(value => value !== "");
    const sanitizedSupportedProps = supportedProps.map(prop => prop.trim()).filter(prop => prop !== "");

    let filteredTokensData = tokensData;

    if (sanitizedSupportedProps.length > 0) {
        filteredTokensData = filterBySupportedProps(filteredTokensData, sanitizedSupportedProps);
    }

    if (sanitizedTokenNames.length > 0) {
        filteredTokensData = filterByTokenNames(filteredTokensData, sanitizedTokenNames);
    }

    if (sanitizedCssValues.length > 0) {
        filteredTokensData = filterByCssValues(filteredTokensData, sanitizedCssValues, cssMatchTolerances);
    }

    return filteredTokensData;
}

/**
 * Converts full token data to brief format (removes cssValue, keeps only propValue)
 *
 * @param root - Token data in full format with cssValue and propValue
 * @returns Token data in brief format (propValue strings only)
 */
export function convertToBriefFormat(root: TokenFileRootNode): TokenFileBriefRootNode {
    const result: TokenFileBriefRootNode = {} as TokenFileBriefRootNode;

    // Iterate through top-level keys (core/semantic)
    for (const [topLevelKey, categories] of Object.entries(root) as [keyof TokenFileBriefRootNode, Record<string, TokenCategoryNode>][]) {
        const briefCategories: Record<string, TokenCategoryBriefNode> = {};

        // Iterate through categories
        for (const [categoryKey, categoryNode] of Object.entries(categories)) {
            const briefTokens: Record<string, string> = {};

            // Convert each token to brief format (propValue only)
            for (const [tokenKey, tokenValue] of Object.entries(categoryNode.tokens)) {
                briefTokens[tokenKey] = tokenValue.propValue;
            }

            // Create brief category node
            briefCategories[categoryKey] = {
                tokens: briefTokens,
                ...(categoryNode.supportedProps && { supportedProps: categoryNode.supportedProps })
            };
        }

        result[topLevelKey] = briefCategories;
    }

    return result;
}

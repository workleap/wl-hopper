import { existsSync } from "fs";
import { readFile } from "fs/promises";
import { join } from "path";
import type { ColorScheme, Theme, TokenCategory } from "../config/constants";
import { DefaultColorScheme, DefaultTheme } from "../config/constants";
import { getTokenMapFiles } from "../config/fileMappings";
import { env } from "../env";
import { content } from "../utils/formatter";
import { convertToBriefFormat, filterTokens, type TokenFileRootNode } from "../utils/tokenFilters";

const tokenDataCache: Map<string, TokenFileRootNode> = new Map();

function getCacheKey(path: string, theme: Theme, colorScheme: ColorScheme): string {
    return `${theme}:${colorScheme}:${path}`;
}

async function loadTokenData(
    path: string,
    category: TokenCategory,
    theme: Theme,
    colorScheme: ColorScheme
): Promise<TokenFileRootNode> {
    const cacheKey = getCacheKey(path, theme, colorScheme);

    if (!tokenDataCache.has(cacheKey)) {
        const tokensMap = join(env.DOCS_PATH, path);
        if (!existsSync(tokensMap)) {
            const error = new Error(
                `Tokens map not found for category: ${category}, theme: ${theme}, colorScheme: ${colorScheme}, path: ${tokensMap}`
            );
            throw error;
        }

        const fileContent = await readFile(tokensMap, "utf-8");
        const tokensData = JSON.parse(fileContent) as TokenFileRootNode;
        tokenDataCache.set(cacheKey, tokensData);
    }

    return tokenDataCache.get(cacheKey)!;
}

export function clearTokenDataCache() {
    tokenDataCache.clear();
}

export async function getDesignTokens(
    category: TokenCategory,
    filter_by_token_names: string[] | undefined = [],
    filter_by_css_values: string[] | undefined = [],
    filter_by_supported_props: string[] | undefined = [],
    include_css_values: boolean,
    theme: Theme = DefaultTheme,
    colorScheme: ColorScheme = DefaultColorScheme
) {
    const mapFiles = getTokenMapFiles(theme, colorScheme)[category];

    const result = await Promise.all(mapFiles.map(async map => {
        try {
            const tokensData = await loadTokenData(map.path, category, theme, colorScheme);
            const filteredTokensData = filterTokens(tokensData, {
                tokenNames: filter_by_token_names,
                cssValues: filter_by_css_values,
                supportedProps: filter_by_supported_props
            });

            const partialResult = include_css_values ? filteredTokensData : convertToBriefFormat(filteredTokensData);

            return isEmptyObject(partialResult) ? undefined : content(JSON.stringify(partialResult, null, 2));
        } catch (error) {
            if (error instanceof Error && error.message.includes("Tokens map not found")) {
                throw error;
            }

            throw new Error(`Error filtering tokens: ${error instanceof Error ? error.message : "Unknown error"}`, { cause: error });
        }
    }));

    return result.filter(item => item !== undefined);
}

function isEmptyObject(obj: object): boolean {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

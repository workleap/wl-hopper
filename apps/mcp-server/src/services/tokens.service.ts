import { existsSync } from "fs";
import { readFile } from "fs/promises";
import { join } from "path";
import type { TokenCategory } from "../config/constants";
import { TokenMapFiles } from "../config/file-mappings";
import { env } from "../env";
import { content, errorContent } from "../utils/formatter";
import { convertToBriefFormat, filterTokens, type TokenFileRootNode } from "../utils/token-filters";

const tokenDataCache: Map<string, TokenFileRootNode> = new Map();

async function loadTokenData(path: string, category: TokenCategory): Promise<TokenFileRootNode> {
    if (!tokenDataCache.has(path)) {
        const tokensMap = join(env.DOCS_PATH, path);
        if (!existsSync(tokensMap)) {
            const error = new Error(`Tokens map not found for category: ${category}, path: ${tokensMap}`);
            throw error;
        }

        const fileContent = await readFile(tokensMap, "utf-8");
        const tokensData = JSON.parse(fileContent) as TokenFileRootNode;
        tokenDataCache.set(path, tokensData);
    }

    return tokenDataCache.get(path)!;
}

export function clearTokenDataCache() {
    tokenDataCache.clear();
}

export async function getDesignTokens(
    category: TokenCategory,
    filter_by_token_names: string[] | undefined = [],
    filter_by_css_values: string[] | undefined = [],
    filter_by_supported_props: string[] | undefined = [],
    include_css_values: boolean
) {
    const mapFiles = TokenMapFiles[category];

    const result = await Promise.all(mapFiles.map(async map => {
        try {
            const tokensData = await loadTokenData(map.path, category);
            const filteredTokensData = filterTokens({
                tokensData,
                tokenNames: filter_by_token_names,
                cssValues: filter_by_css_values,
                supportedProps: filter_by_supported_props
            });

            const partialResult = include_css_values ? filteredTokensData : convertToBriefFormat(filteredTokensData);

            return isEmptyObject(partialResult) ? undefined : content(JSON.stringify(partialResult, null, 2));
        } catch (error) {
            if (error instanceof Error && error.message.includes("Tokens map not found")) {
                return errorContent(error, error.message);
            }

            return errorContent(error, `Error filtering tokens: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
    }));

    return result.filter(item => item !== undefined);
}

function isEmptyObject(obj: object): boolean {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

import { files } from "@docs/ai";
import { readFile } from "fs/promises";
import { join } from "path";
import { env } from "../../env";
import type { TokenCategoryNode, TokenFileRootNode } from "../../utils/tokenFilters";
import { validationMessage } from "./validationMessages";

// Cache for allowed unsafe props to avoid repeated file I/O
let _unsafePropsCache: Set<string> | null = null;

export async function getUnsafeProps() {
    // Return cached value if available
    if (_unsafePropsCache !== null) {
        return _unsafePropsCache;
    }

    try {
        // Get the path to the unsafe props data file
        const unsafePropsDataPath = join(env.DOCS_PATH, files.styledSystem.unsafePropsData.path);
        const fileContents = await readFile(unsafePropsDataPath, "utf-8");
        const unsafePropsData = JSON.parse(fileContents);

        if (Array.isArray(unsafePropsData)) {
            // Cache the result before returning
            _unsafePropsCache = new Set(unsafePropsData);

            return _unsafePropsCache;
        }
        throw new Error(validationMessage("unsafe-props-invalid-format"));
    } catch {
        throw new Error(validationMessage("unsafe-props-load-error"));
    }
}

let _tokenSupportedPropsCache: Set<string> | null = null;
export async function getTokenSupportedProps(): Promise<Set<string>> {
    // Return cached value if available
    if (_tokenSupportedPropsCache !== null) {
        return _tokenSupportedPropsCache;
    }

    const unsafeProps = await getUnsafeProps();

    // Compute the supported props and cache the result
    _tokenSupportedPropsCache = new Set(Array.from(unsafeProps).map(prop => prop.replace("UNSAFE_", "")));

    return _tokenSupportedPropsCache;
}

// Cache for all tokens data to avoid repeated file I/O
let _allTokensDataCache: TokenFileRootNode | null = null;

export async function getAllTokensData(): Promise<TokenFileRootNode> {
    // Return cached value if available
    if (_allTokensDataCache !== null) {
        return _allTokensDataCache;
    }

    try {
        // Get the path to the tokens data file (use full version, default to workleap/light)
        const tokensDataPath = join(env.DOCS_PATH, files.tokens.maps.workleap.light.all.path);
        const fileContents = await readFile(tokensDataPath, "utf-8");
        const tokensData = JSON.parse(fileContents) as TokenFileRootNode;

        // Cache the result before returning
        _allTokensDataCache = tokensData;

        return _allTokensDataCache;
    } catch (e) {
        console.error("error:", e);
        throw new Error(validationMessage("token-data-load-error"), { cause: e });
    }
}

// Cache for allowed tokens to avoid repeated file I/O
let _allTokensCache: Set<string> | null = null;

export async function getAllTokens(): Promise<Set<string>> {
    // Return cached value if available
    if (_allTokensCache !== null) {
        return _allTokensCache;
    }

    const tokensData = await getAllTokensData();

    // Extract all propValue fields from the token data structure
    const allValues: string[] = [];

    // Iterate through top-level keys (core/semantic)
    for (const categories of Object.values(tokensData) as Record<string, TokenCategoryNode>[]) {
        // Iterate through categories
        for (const categoryNode of Object.values(categories)) {
            // Iterate through tokens and extract propValues
            for (const tokenValue of Object.values(categoryNode.tokens)) {
                allValues.push(tokenValue.propValue);
            }
        }
    }

    // Cache the result before returning
    _allTokensCache = new Set(allValues);

    return _allTokensCache;
}

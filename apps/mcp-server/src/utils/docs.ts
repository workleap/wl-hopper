import { files } from "@docs/ai";
import type { TextContent } from "@modelcontextprotocol/sdk/types.js";
import { existsSync } from "fs";
import { readFile } from "fs/promises";
import { join } from "path";
import rehypeParse from "rehype-parse";
import rehypeRemark from "rehype-remark";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import { env } from "../env";
import { content, errorContent } from "./content";
import type { PaginatedResult } from "./cursor-pagination";
import { trackError } from "./logging";
import { readMarkdownFile } from "./readMarkdownFile";
import { convertToBriefFormat, filterTokens, type TokenFileRootNode } from "./tokenUtils";

export const TokenCategories = [
    "semantic-color", "semantic-elevation", "semantic-shape", "semantic-space", "semantic-typography", "core-border-radius", "core-color",
    "core-dimensions", "core-font-family", "core-font-size", "core-font-weight", "core-line-height", "core-motion", "core-shadow",
    "all", "all-core", "all-semantic"] as const;
export const GuideSections = ["installation", "styles", "tokens", "color-schemes", "components-list", "icons", "layout", "controlled-mode", "forms", "slots", "internationalization", "escape-hatches", "figma-conventions", "tooling-cli"] as const;

export type GuideSection = typeof GuideSections[number];
export type TokenCategory = typeof TokenCategories[number];

export interface UrlGuideFile {
    url: string;
    size?: number;
    estimatedTokens?: number;
}

export const GuideFiles: Record<GuideSection, typeof files.gettingStarted.index | UrlGuideFile> = {
    installation: files.gettingStarted.index,
    styles: files.styledSystem.index,
    icons: files.icons.brief.index,
    "components-list": files.components.full.componentList,
    "color-schemes": files.components.concepts.colorSchemes,
    layout: files.components.concepts.layout,
    "controlled-mode": files.components.concepts.controlledMode,
    forms: files.components.concepts.forms,
    slots: files.components.concepts.slots,
    internationalization: files.components.concepts.internationalization,
    "escape-hatches": files.styledSystem.escapeHatches,
    "figma-conventions": files.ai.figmaConventions,
    tokens: files.tokens.overview.introduction,
    "tooling-cli": {
        url: "https://raw.githubusercontent.com/workleap/wl-design-systems-migrations/refs/heads/main/README.md"
    }
};

export const TokenGuideFiles: Record<TokenCategory, typeof files.gettingStarted.index> = {
    "semantic-color": files.tokens.semantic.color,
    "semantic-elevation": files.tokens.semantic.elevation,
    "semantic-shape": files.tokens.semantic.shape,
    "semantic-space": files.tokens.semantic.space,
    "semantic-typography": files.tokens.semantic.typography,
    "core-border-radius": files.tokens.core.borderRadius,
    "core-color": files.tokens.core.color,
    "core-dimensions": files.tokens.core.dimensions,
    "core-font-family": files.tokens.core.fontFamily,
    "core-font-size": files.tokens.core.fontSize,
    "core-font-weight": files.tokens.core.fontWeight,
    "core-line-height": files.tokens.core.lineHeight,
    "core-motion": files.tokens.core.motion,
    "core-shadow": files.tokens.core.shadow,
    "all-semantic": files.tokens.semantic.index,
    "all-core": files.tokens.core.index,
    all: files.tokens.index
};

export const TokenMapFiles: Record<TokenCategory, typeof files.gettingStarted.index[]> = {
    all: [files.tokens.maps.all],
    "all-core": [files.tokens.maps.core],
    "all-semantic": [files.tokens.maps.semantic],
    "core-border-radius": [files.tokens.maps.coreBorderRadius],
    "core-color": [files.tokens.maps.coreColor],
    "core-dimensions": [files.tokens.maps.coreSize],
    "core-font-family": [files.tokens.maps.coreFontFamily],
    "core-font-size": [files.tokens.maps.coreFontSize],
    "core-font-weight": [files.tokens.maps.coreFontWeight],
    "core-line-height": [files.tokens.maps.coreLineHeight],
    "core-motion": [files.tokens.maps.coreDuration, files.tokens.maps.coreTimingFunction],
    "core-shadow": [files.tokens.maps.coreShadow],
    "semantic-shape": [files.tokens.maps.semanticBorderRadius],
    "semantic-space": [files.tokens.maps.semanticSize],
    "semantic-typography": [
        files.tokens.maps.semanticFontFamily,
        files.tokens.maps.semanticFontSize,
        files.tokens.maps.semanticFontWeight,
        files.tokens.maps.semanticLineHeight,
        files.tokens.maps.semanticTopOffset
    ],
    "semantic-color": [files.tokens.maps.semanticColor],
    "semantic-elevation": [files.tokens.maps.semanticShadow]
};

function getPaginatedContent(result: PaginatedResult): TextContent | TextContent[] {
    const paginationInfo = result.totalPages && result.currentPage
        ? `Page ${result.currentPage} of ${result.totalPages}`
        : "";

    return [content(result.content),
        ...(result.hasMore ? [
            content(`${paginationInfo}. You MUST call this tool again with the cursor "${result.nextCursor}" to fetch remaining content if what you are looking for is not in the current page.`)
        ] : [])
    ];
}

export async function getComponentUsage(componentName: string) {
    const camelCaseName = componentName.charAt(0).toLowerCase() + componentName.slice(1);

    if (!(camelCaseName in files.components.usage)) {
        const error = new Error(`Invalid component name requested: ${componentName}`);

        return errorContent(error, `Invalid component name requested: ${componentName}`);
    }

    const docFilePath = join(env.DOCS_PATH, files.components.usage[camelCaseName as keyof typeof files.components.usage].path);

    if (!existsSync(docFilePath)) {
        const error = new Error(`${componentName}'s documentation not found: ${docFilePath}`);

        return errorContent(error, "Error reading component documentation: File not found.");
    }

    try {
        return getPaginatedContent(
            await readMarkdownFile(docFilePath)
        );
    } catch (error) {
        return errorContent(error, `Error reading component props: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
}

export function getComponentBriefApi(componentName: string) {
    const camelCaseName = componentName.charAt(0).toLowerCase() + componentName.slice(1);

    if (camelCaseName in files.components.api.brief) {
        return readComponentApi(files.components.api.brief[camelCaseName as keyof typeof files.components.api.brief].path);
    }

    const error = new Error(`Invalid component name requested: ${componentName}`);

    return errorContent(error, `Invalid component name requested: ${componentName}`);
}

export function getComponentFullApi(componentName: string) {
    const camelCaseName = componentName.charAt(0).toLowerCase() + componentName.slice(1);

    if (camelCaseName in files.components.api.full) {
        return readComponentApi(files.components.api.full[camelCaseName as keyof typeof files.components.api.full].path);
    }

    const error = new Error(`Invalid component name requested: ${componentName}`);

    return errorContent(error, `Invalid component name requested: ${componentName}`);
}


async function readComponentApi(relativePath: string) {
    const docFilePath = join(env.DOCS_PATH, relativePath);

    if (!existsSync(docFilePath)) {
        const error = new Error(`${relativePath}'s api not found: ${docFilePath}`);

        return errorContent(error, "Error reading component api: File not found.");
    }

    try {
        const sectionContent = await readFile(docFilePath, "utf-8");

        return content(sectionContent);
    } catch (error) {
        return errorContent(error, `Error reading component api: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
}

async function getLocalGuide(path: string, section: GuideSection, pageSize?: number, cursor?: string) {
    const guidePath = join(env.DOCS_PATH, path);

    if (!existsSync(guidePath)) {
        const error = new Error(`Guide not found for section: ${section}, path: ${guidePath}`);

        return errorContent(error, `Guide not found for section: ${section}`);
    }

    try {
        return getPaginatedContent(
            await readMarkdownFile(guidePath, pageSize, cursor)
        );
    } catch (error) {
        return errorContent(error, `Error reading guide: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
}

async function getRemoteGuide(url: string) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            const error = new Error(`Failed to fetch guide: ${response.statusText}, URL: ${url}`);
            trackError(error);
            throw error;
        }

        const markdownContent = await response.text();

        return content(markdownContent);
    } catch (error) {
        return errorContent(error, `Error fetching guide from URL: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
}

export async function getGuide(section: GuideSection, pageSize?: number, cursor?: string) {
    if (!Object.keys(GuideFiles).includes(section)) {
        const error = new Error(`Invalid guide section requested: ${section}`);

        return errorContent(error);
    }

    const guideFile = GuideFiles[section];

    if ("url" in guideFile) {
        return getRemoteGuide(guideFile.url);
    }

    return getLocalGuide(guideFile.path, section, pageSize, cursor);
}

export async function getLlmsFull(pageSize?: number, cursor?: string) {
    const guidePath = join(env.DOCS_PATH, files.llmsFull.path);

    if (!existsSync(guidePath)) {
        const error = new Error(`llms-full.txt not found, path: ${guidePath}`);

        return errorContent(error, "llms-full.txt not found");
    }

    try {
        return getPaginatedContent(
            await readMarkdownFile(guidePath, pageSize, cursor)
        );
    } catch (error) {
        return errorContent(error, `Error reading guide: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
}

export async function getDesignTokenGuide(category: TokenCategory, pageSize?: number, cursor?: string) {
    if (!Object.keys(TokenGuideFiles).includes(category)) {
        const error = new Error(`Invalid design token category requested: ${category}`);

        return errorContent(error);
    }

    const guidePath = join(env.DOCS_PATH, TokenGuideFiles[category].path);

    if (!existsSync(guidePath)) {
        const error = new Error(`Guide not found for category: ${category}, path: ${guidePath}`);

        return errorContent(error, `Guide not found for category: ${category}`);
    }

    try {
        return getPaginatedContent(
            await readMarkdownFile(guidePath, pageSize, cursor)
        );
    } catch (error) {
        return errorContent(error, `Error reading guide: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
}

// Cache for token data by file path
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
    include_css_values: boolean
) {
    const mapFiles = TokenMapFiles[category];
    const normalizedTokenNames = filter_by_token_names.map(key =>
        key.replace(/^-+/, "").replace("hop-", "")
    );

    return await Promise.all(mapFiles.map(async map => {
        try {
            const tokensData = await loadTokenData(map.path, category);
            const filteredTokensData = filterTokens(tokensData, normalizedTokenNames, filter_by_css_values);

            const result = include_css_values ? filteredTokensData : convertToBriefFormat(filteredTokensData);

            return content(JSON.stringify(result, null, 2));
        } catch (error) {
            if (error instanceof Error && error.message.includes("Tokens map not found")) {
                return errorContent(error, error.message);
            }

            return errorContent(error, `Error filtering tokens: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
    }));
}

export async function getDocumentContentResult(url: string) {
    if (!url.startsWith("https://hopper.workleap.design")) {
        const error = new Error(`Invalid URL: ${url}. Please provide a URL from the hopper.workleap.design domain.`);

        return errorContent(error, `Invalid URL: ${url}. Please provide a URL from the hopper.workleap.design domain.`);
    }
    try {
        return content(await fetchDocumentContent(url));
    } catch (error) {
        return errorContent(error, `Error fetching content: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
}

export async function fetchDocumentContent(url: string) {
    const response = await fetch(url);
    if (!response.ok) {
        const error = new Error(`Failed to fetch documentation: ${response.statusText}, URL: ${url}`);
        trackError(error);
        throw error;
    }
    const docsContent = await response.text();

    // just fetch the content inside the <main> tag
    const mainContentMatch = docsContent.match(/<main[^>]*>([\s\S]*?)<\/main>/);
    if (mainContentMatch && mainContentMatch[1]) {
        const mainContent = mainContentMatch[1];
        // Remove any <script> tags from the main content
        const cleanedContent = mainContent.replace(/<script[^>]*>[\s\S]*?<\/script>/g, "");

        const file = await unified()
            .use(rehypeParse)
            .use(rehypeRemark)
            .use(remarkStringify)
            .process(cleanedContent);

        return String(file);
    }

    const error = new Error(`The fetch url doesn't contain <main> tag: ${url}`);
    trackError(error);
    throw error;
}


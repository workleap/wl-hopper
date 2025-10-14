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

export const TokenMapFiles: Record<TokenCategory, { brief: typeof files.gettingStarted.index[]; full: typeof files.gettingStarted.index[] }> = {
    all: {
        brief: [files.tokens.maps.brief.all],
        full: [files.tokens.maps.full.all]
    },
    "all-core": {
        brief: [files.tokens.maps.brief.core],
        full: [files.tokens.maps.full.core]
    },
    "all-semantic": {
        brief: [files.tokens.maps.brief.semantic],
        full: [files.tokens.maps.full.semantic]
    },
    "core-border-radius": {
        brief: [files.tokens.maps.brief.coreBorderRadius],
        full: [files.tokens.maps.full.coreBorderRadius]
    },
    "core-color": {
        brief: [files.tokens.maps.brief.coreColor],
        full: [files.tokens.maps.full.coreColor]
    },
    "core-dimensions": {
        brief: [files.tokens.maps.brief.coreSize],
        full: [files.tokens.maps.full.coreSize]
    },
    "core-font-family": {
        brief: [files.tokens.maps.brief.coreFontFamily],
        full: [files.tokens.maps.full.coreFontFamily]
    },
    "core-font-size": {
        brief: [files.tokens.maps.brief.coreFontSize],
        full: [files.tokens.maps.full.coreFontSize]
    },
    "core-font-weight": {
        brief: [files.tokens.maps.brief.coreFontWeight],
        full: [files.tokens.maps.full.coreFontWeight]
    },
    "core-line-height": {
        brief: [files.tokens.maps.brief.coreLineHeight],
        full: [files.tokens.maps.full.coreLineHeight]
    },
    "core-motion": {
        brief: [files.tokens.maps.brief.coreDuration, files.tokens.maps.brief.coreTimingFunction],
        full: [files.tokens.maps.full.coreDuration, files.tokens.maps.full.coreTimingFunction]
    },
    "core-shadow": {
        brief: [files.tokens.maps.brief.coreShadow],
        full: [files.tokens.maps.full.coreShadow]
    },
    "semantic-shape": {
        brief: [files.tokens.maps.brief.semanticBorderRadius],
        full: [files.tokens.maps.full.semanticBorderRadius]
    },
    "semantic-space": {
        brief: [files.tokens.maps.brief.semanticSize],
        full: [files.tokens.maps.full.semanticSize]
    },
    "semantic-typography": {
        brief: [
            files.tokens.maps.brief.semanticFontFamily,
            files.tokens.maps.brief.semanticFontSize,
            files.tokens.maps.brief.semanticFontWeight,
            files.tokens.maps.brief.semanticLineHeight,
            files.tokens.maps.brief.semanticTopOffset,
            files.tokens.maps.brief.semanticBottomOffset
        ], full: [
            files.tokens.maps.full.semanticFontFamily,
            files.tokens.maps.full.semanticFontSize,
            files.tokens.maps.full.semanticFontWeight,
            files.tokens.maps.full.semanticLineHeight,
            files.tokens.maps.full.semanticTopOffset
        ] },
    "semantic-color": {
        brief: [files.tokens.maps.brief.semanticColor],
        full: [files.tokens.maps.full.semanticColor]
    },
    "semantic-elevation": {
        brief: [files.tokens.maps.brief.semanticShadow],
        full: [files.tokens.maps.full.semanticShadow]
    }
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
function filterTokensByKeys(obj: unknown, filterKeys: string[], depth = 1): unknown {
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

export async function getDesignTokensMap(category: TokenCategory, filter_by_names: string[] | undefined, mode: "brief" | "full") {
    return await Promise.all(TokenMapFiles[category][mode].map(async map => {
        const tokensMap = join(env.DOCS_PATH, map.path);

        if (!existsSync(tokensMap)) {
            const error = new Error(`Tokens map not found for category: ${category}, path: ${tokensMap}`);

            return errorContent(error, `Tokens map not found for category: ${category}, path: ${tokensMap}`);
        }
        const fileContent = await readFile(tokensMap, "utf-8");

        // Apply filtering if filter_by_names is provided
        if (filter_by_names && filter_by_names.length > 0) {
            try {
                const tokensData = JSON.parse(fileContent);

                // Normalize filter keys by removing leading dashes
                const normalizedFilterKeys = filter_by_names.map(key =>
                    key.replace(/^-+/, "").replace("hop-", "")
                );

                // Filter the tokens recursively
                const filteredData = filterTokensByKeys(tokensData, normalizedFilterKeys);

                return content(JSON.stringify(filteredData, null, 2));
            } catch (error) {
                return errorContent(error, `Error filtering tokens: ${error instanceof Error ? error.message : "Unknown error"}`);
            }
        }

        return content(fileContent);
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


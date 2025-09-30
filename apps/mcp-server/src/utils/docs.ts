import { files } from "@docs/ai";
import { existsSync } from "fs";
import { readFile } from "fs/promises";
import { join } from "path";
import rehypeParse from "rehype-parse";
import rehypeRemark from "rehype-remark";
import remarkStringify from "remark-stringify";
import { unified } from "unified";

import { env } from "../env.js";

import type { TextContent } from "@modelcontextprotocol/sdk/types.js";
import { content, errorContent } from "./content.js";
import type { PaginatedResult } from "./cursor-pagination.js";
import { trackError } from "./logging.js";
import { readMarkdownFile } from "./readMarkdownFile.js";

export const TokenCategories = [
    "semantic-color", "semantic-elevation", "semantic-shape", "semantic-space", "semantic-typography", "core-border-radius", "core-color",
    "core-dimensions", "core-font-family", "core-font-size", "core-font-weight", "core-line-height", "core-motion", "core-shadow",
    "all", "all-core", "all-semantic"] as const;
export const GuideSections = ["installation", "styles", "color-schemes", "components-list", "react-icons", "svg-icons", "layout", "controlled-mode", "forms", "slots", "internationalization", "escape-hatches"] as const;

export type GuideSection = typeof GuideSections[number];
export type TokenCategory = typeof TokenCategories[number];

export const GUIDE_FILES: Record<GuideSection | "all", typeof files.gettingStarted.index> = {
    installation: files.gettingStarted.index,
    styles: files.styledSystem.index,
    "react-icons": files.icons.reactIcons.index,
    "svg-icons": files.icons.svgIcons.index,
    "components-list": files.components.full.componentList,

    "color-schemes": files.components.concepts.colorSchemes,
    layout: files.components.concepts.layout,
    "controlled-mode": files.components.concepts.controlledMode,
    forms: files.components.concepts.forms,
    slots: files.components.concepts.slots,
    internationalization: files.components.concepts.internationalization,
    "escape-hatches": files.styledSystem.unsafeProps,
    all: files.llmsFull
};

export const TOKEN_GUIDE_FILES: Record<TokenCategory, typeof files.gettingStarted.index> = {
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

export const TOKEN_MAP_FILES: Record<TokenCategory, { brief: typeof files.gettingStarted.index[]; full: typeof files.gettingStarted.index[] }> = {
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

export async function getGuide(section: GuideSection | "all", pageSize?: number, cursor?: string) {
    if (!Object.keys(GUIDE_FILES).includes(section)) {
        const error = new Error(`Invalid guide section requested: ${section}`);

        return errorContent(error);
    }

    const guidePath = join(env.DOCS_PATH, GUIDE_FILES[section].path);

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

export async function getDesignTokenGuide(section: TokenCategory, pageSize?: number, cursor?: string) {
    if (!Object.keys(GUIDE_FILES).includes(section)) {
        const error = new Error(`Invalid guide section requested: ${section}`);

        return errorContent(error);
    }

    const guidePath = join(env.DOCS_PATH, TOKEN_GUIDE_FILES[section].path);

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

export async function getDesignTokensMap(category: TokenCategory, mode: "brief" | "full") {
    return await Promise.all(TOKEN_MAP_FILES[category][mode].map(async map => {
        const tokensMap = join(env.DOCS_PATH, map.path);

        if (!existsSync(tokensMap)) {
            const error = new Error(`Tokens map not found for category: ${category}, path: ${tokensMap}`);

            return errorContent(error, `Tokens map not found for category: ${category}`);
        }
        const fileContent = await readFile(tokensMap, "utf-8");

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


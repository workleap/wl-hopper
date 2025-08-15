import { files } from "@docs/ai";
import { existsSync } from "fs";
import { readFile } from "fs/promises";
import { join } from "path";
import rehypeParse from "rehype-parse";
import rehypeRemark from "rehype-remark";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import { env } from "../env.js";
import { content, errorContent } from "./content.js";
import { trackError } from "./logging.js";
import { readMarkdownFile } from "./readMarkdownFile.js";

export const TokenCategories = ["semantic-color", "semantic-elevation", "semantic-shape", "semantic-space", "semantic-typography", "core-border-radius", "core-color", "core-dimensions", "core-font-family", "core-font-size", "core-font-weight", "core-line-height", "core-motion", "core-shadow"] as const;
export const GuideSections = ["all", "installation", "styles", "color-schemes", "components-list", "react-icons", "svg-icons", "layout", "controlled-mode", "forms", "slots", "internationalization"] as const;

export type GuideSection = typeof GuideSections[number];
export type TokenCategory = typeof TokenCategories[number];

const guidesPath: Record<GuideSection | TokenCategory, string> = {
    all: files.llmsFull,
    installation: files.gettingStarted.installation,
    styles: files.styledSystem.index,
    "react-icons": files.icons.reactIcons.index,
    "svg-icons": files.icons.svgIcons.index,
    "components-list": files.components.full.componentList,

    "color-schemes": files.components.concepts.colorSchemes,
    "layout": files.components.concepts.layout,
    "controlled-mode": files.components.concepts.controlledMode,
    "forms": files.components.concepts.forms,
    "slots": files.components.concepts.slots,
    "internationalization": files.components.concepts.internationalization,

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
    "core-shadow": files.tokens.core.shadow
};

export async function getComponentDocumentation(componentName: string, section: "usage" | "api", startLine?: number, endLine?: number) {
    const docFilePath = join(env.DOCS_PATH, "components", section === "usage" ? `usage/${componentName}.md` : `api/${componentName}.json`);

    if (!existsSync(docFilePath)) {
        const error = new Error(`${componentName}'s documentation not found: ${docFilePath}`);
        return errorContent(error, "Error reading component documentation: File not found.");
    }

    try {
        const sectionContent = section === "usage"
            ? await readMarkdownFile(docFilePath, startLine, endLine)
            : await readFile(docFilePath, "utf-8");

        return content(sectionContent);
    } catch (error) {
        return errorContent(error, `Error reading component props: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
}

export async function getGuideDocumentation(section: GuideSection | TokenCategory, startLine?: number, endLine?: number) {

    if (!Object.keys(guidesPath).includes(section)) {
        const error = new Error(`Invalid guide section requested: ${section}`);
        return errorContent(error);
    }

    const guidePath = join(env.DOCS_PATH, guidesPath[section]);

    if (!existsSync(guidePath)) {
        const error = new Error(`Guide not found for section: ${section}, path: ${guidePath}`);
        return errorContent(error, `Guide not found for section: ${section}`);
    }

    try {
        const sectionContent = await readMarkdownFile(guidePath, startLine, endLine);
        return content(sectionContent);
    } catch (error) {
        return errorContent(error, `Error reading guide: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
}

export async function getDocumentInfo(type: "component" | "guide", name: string) {
    try {
        let filePath: string;

        if (type === "component") {
            filePath = join(env.DOCS_PATH, "components", `usage/${name}.md`);
        } else {

            if (!(name in guidesPath)) {
                const error = new Error(`Invalid guide name: ${name}`);
                return errorContent(error, `Invalid guide name: ${name}`);
            }

            filePath = join(env.DOCS_PATH, guidesPath[name as GuideSection]);
        }

        if (!existsSync(filePath)) {
            const error = new Error(`File not found: ${filePath}`);
            return errorContent(error, `Guide file not found: ${filePath}`);
        }

        const fileContent = await readFile(filePath, "utf-8");
        const lines = fileContent.split('\n');
        const totalLines = lines.length;
        const fileSize = fileContent.length;

        return content(JSON.stringify({filePath, totalLines, fileSize}, null, 2));
    } catch (error) {
        return errorContent(error, `Error getting document info: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
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


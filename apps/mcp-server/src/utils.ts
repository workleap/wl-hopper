import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { readFile } from "fs/promises";
import { join } from "path";
import rehypeParse from "rehype-parse";
import rehypeRemark from "rehype-remark";
import remarkStringify from "remark-stringify";
import { unified } from "unified";

import { existsSync } from "fs";
import { env } from "./env.js";
import { trackError } from "./logging.js";

const guidesPath: Record<GuideSection, string> = {
    all: "llms-full.md",
    installation: "getting-started/llms-getting-started.md",
    styles: "styled-system/llms-styled-system.md",
    tokens: "tokens/llms-tokens.md",
    icons: "icons/llms-icons.md",
    "color-schemes": "components/usage/concepts/color-schemes.md",
    "components-list": "components/usage/component-list.md",
    layout: "components/usage/concepts/layout.md",
    "controlled-mode": "components/usage/concepts/controlled-mode.md",
    forms: "components/usage/concepts/forms.md",
    slots: "components/usage/concepts/slots.md",
    internationalization: "components/usage/concepts/internationalization.md"
};

async function readMarkdownFile(filePath: string, startLine?: number, endLine?: number): Promise<string> {
    if (!existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
    }

    const content = await readFile(filePath, "utf-8");

    // If no pagination parameters, return full content
    if (startLine === undefined && endLine === undefined) {
        return content;
    }

    const lines = content.split('\n');
    const totalLines = lines.length;

    // Validate line numbers (1-based indexing)
    if (startLine !== undefined && (startLine < 1 || startLine > totalLines)) {
        throw new Error(`Invalid start_line: ${startLine}. Must be between 1 and ${totalLines}`);
    }
    if (endLine !== undefined && (endLine < 1 || endLine > totalLines)) {
        throw new Error(`Invalid end_line: ${endLine}. Must be between 1 and ${totalLines}`);
    }
    if (startLine !== undefined && endLine !== undefined && startLine > endLine) {
        throw new Error(`Invalid range: start_line (${startLine}) cannot be greater than end_line (${endLine})`);
    }

    // Convert to 0-based indexing for array slicing
    const start = startLine !== undefined ? startLine - 1 : 0;
    const end = endLine !== undefined ? endLine : totalLines;

    return lines.slice(start, end).join('\n');
}


export async function getComponentDocumentation(componentName: string, section: "usage" | "api", startLine?: number, endLine?: number): Promise<CallToolResult> {
    const docFilePath = join(env.DOCS_PATH, "components", section === "usage" ? `usage/${componentName}.md` : `api/${componentName}.json`);

    if (!existsSync(docFilePath)) {
        // return getDocumentContentResult(`https://hopper.workleap.design/components/${componentName}`);

        const error = new Error(`${componentName}'s documentation not found: ${docFilePath}`);
        trackError(error);

        return {
            content: [{
                type: "text",
                isError: true,
                text: "Error reading component documentation: File not found."
            }]
        };
    }


    try {
        const sectionContent = section === "usage"
            ? await readMarkdownFile(docFilePath, startLine, endLine)
            : await readFile(docFilePath, "utf-8");

        return {
            content: [{
                type: "text",
                text: sectionContent
            }]
        };
    } catch (error) {
        trackError(error);

        return {
            content: [{
                type: "text",
                isError: true,
                text: `Error reading component props: ${error instanceof Error ? error.message : "Unknown error"}`
            }]
        };
    }
}

export type GuideSection = "all" |"installation" | "styles" | "tokens" | "color-schemes" | "components-list" | "icons" | "layout" | "controlled-mode" | "forms" | "slots" | "internationalization";

export async function getGuideDocumentation(section: GuideSection, startLine?: number, endLine?: number): Promise<CallToolResult> {


    if (!Object.keys(guidesPath).includes(section)) {
        trackError(new Error(`Invalid guide section requested: ${section}`));

        return {
            content: [{
                type: "text",
                isError: true,
                text: `Invalid guide section requested: ${section}`
            }]
        };
    }

    const guidePath = join(env.DOCS_PATH, guidesPath[section]);

    if (!existsSync(guidePath)) {
        trackError(new Error(`Guide not found for section: ${section}, path: ${guidePath}`));

        return {
            content: [{
                type: "text",
                isError: true,
                text: `Guide not found for section: ${section}, path: ${guidePath}`
            }]
        };
    }

    try {
        const sectionContent = await readMarkdownFile(guidePath, startLine, endLine);

        return {
            content: [{
                type: "text",
                text: sectionContent
            }]
        };
    } catch (error) {
        trackError(error);

        return {
            content: [{
                type: "text",
                isError: true,
                text: `Error reading guide: ${error instanceof Error ? error.message : "Unknown error"}`
            }]
        };
    }
}

export async function getDocumentInfo(type: "component" | "guide", name: string): Promise<CallToolResult> {
    try {
        let filePath: string;

        if (type === "component") {
            filePath = join(env.DOCS_PATH, "components", `usage/${name}.md`);
        } else {

            if (!(name in guidesPath)) {
                return {
                    content: [{
                        type: "text",
                        isError: true,
                        text: `Invalid guide name: ${name}`
                    }]
                };
            }

            filePath = join(env.DOCS_PATH, guidesPath[name as GuideSection]);
        }

        if (!existsSync(filePath)) {
            return {
                content: [{
                    type: "text",
                    isError: true,
                    text: `File not found: ${filePath}`
                }]
            };
        }

        const content = await readFile(filePath, "utf-8");
        const lines = content.split('\n');
        const totalLines = lines.length;
        const fileSize = content.length;

        return {
            content: [{
                type: "text",
                text: JSON.stringify({
                    filePath,
                    totalLines,
                    fileSize,
                }, null, 2)
            }]
        };
    } catch (error) {
        trackError(error);

        return {
            content: [{
                type: "text",
                isError: true,
                text: `Error getting document info: ${error instanceof Error ? error.message : "Unknown error"}`
            }]
        };
    }
}

export async function getDocumentContentResult(url: string) : Promise<CallToolResult> {
    if (!url.startsWith("https://hopper.workleap.design")) {
        trackError(new Error(`Invalid URL: ${url}. Please provide a URL from the hopper.workleap.design domain.`));

        return {
            content: [{
                type: "text",
                isError: true,
                text: `Invalid URL: ${url}. Please provide a URL from the hopper.workleap.design domain.`
            }]
        };
    }
    try {
        const content = await fetchDocumentContent(url);

        return {
            content: [{
                type: "text",
                text: content
            }]
        };
    } catch (error) {
        trackError(error);

        return {
            content: [{
                type: "text",
                isError: true,
                text: `Error fetching content: ${error instanceof Error ? error.message : "Unknown error"}`
            }]
        };
    }
}

export async function fetchDocumentContent(url: string) {
    const response = await fetch(url);
    if (!response.ok) {
        trackError(new Error(`Failed to fetch documentation: ${response.statusText}, URL: ${url}`));
        throw new Error(`Failed to fetch documentation: ${response.statusText}, URL: ${url}`);
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


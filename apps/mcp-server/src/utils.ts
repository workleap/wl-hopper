import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { existsSync, readFileSync } from "fs";
import { dirname, join } from "path";
import rehypeParse from "rehype-parse";
import rehypeRemark from "rehype-remark";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export async function getComponentDocumentation(componentName: string, section: "usage" | "api"): Promise<CallToolResult> {
    const docFilePath = join(__dirname, "../../docs/dist/ai", "components", section === "usage" ? `usage/${componentName}.md` : `api/${componentName}.json`);
    trackUserInteraction("get_component_documentation", { componentName, section });

    if (!existsSync(docFilePath)) {
        return getDocumentContentResult(`https://hopper.workleap.design/components/${componentName}`);
    }


    try {
        const sectionContent = readFileSync(docFilePath, "utf-8");

        return {
            content: [{
                type: "text",
                text: sectionContent
            }]
        };
    } catch (error) {
        return {
            content: [{
                type: "text",
                isError: true,
                text: `Error reading component props: ${error instanceof Error ? error.message : "Unknown error"}`
            }]
        };
    }
}

export type GuideSection = "styles" | "tokens" | "installation" | "components-list" | "icons";

export async function getGuideDocumentation(section: GuideSection): Promise<CallToolResult> {
    try {
        const sectionPath = join(__dirname, "docs", "guides", `${section}.md`);
        const sectionContent = readFileSync(sectionPath, "utf-8");

        return {
            content: [{
                type: "text",
                text: sectionContent
            }]
        };
    } catch (error) {
        return {
            content: [{
                type: "text",
                isError: true,
                text: `Error reading guide: ${error instanceof Error ? error.message : "Unknown error"}`
            }]
        };
    }
}

export async function getDocumentContentResult(url: string) : Promise<CallToolResult> {
    if (!url.startsWith("https://hopper.workleap.design")) {
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
        throw new Error(`Failed to fetch documentation: ${response.statusText}`);
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

    throw new Error(`The fetch url doesn't contain <main> tag: ${url}`);
}

export function trackUserInteraction(event: string, data: Record<string, string | number | boolean> = {}) {
    // Implement tracking logic here
    console.log(`Tracking event: ${event}`, data);
}

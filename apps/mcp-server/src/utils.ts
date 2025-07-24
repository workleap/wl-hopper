import type { CallToolResult, RequestInfo } from "@modelcontextprotocol/sdk/types.js";
import { existsSync, readFileSync } from "fs";
import { dirname, join } from "path";
import rehypeParse from "rehype-parse";
import rehypeRemark from "rehype-remark";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import { fileURLToPath } from "url";
import winston from "winston";

const __dirname = join(dirname(fileURLToPath(import.meta.url)), "../../docs/dist/ai");


// Configure winston logger for user interactions
const interactionLogger = winston.createLogger({
    level: "info",
    format: winston.format.json({ space: 2 }),
    transports: [
        new winston.transports.File({
            filename: join(__dirname, "logs", "user-interactions.log.jsonl"),
            maxsize: 10 * 1024 * 1024, // 10MB
            maxFiles: 5,
            tailable: true,
            level: "info"
        })
    ]
});


export async function getComponentDocumentation(componentName: string, section: "usage" | "api"): Promise<CallToolResult> {
    const docFilePath = join(__dirname, "components", section === "usage" ? `usage/${componentName}.md` : `api/${componentName}.json`);
    trackEvent("get_component_documentation", { componentName, section });

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

export type GuideSection = "all" |"installation" | "styles" | "tokens" | "color-schemes" | "components-list" | "icons" | "layout" | "controlled-mode" | "forms" | "slots" | "internationalization";

export async function getGuideDocumentation(section: GuideSection): Promise<CallToolResult> {
    const guidesPath: Record<GuideSection, string> = {
        all: "full.md",
        installation: "getting-started/full.md",
        styles: "styled-system/full.md",
        tokens: "tokens/full.md",
        icons: "icons/full.md",
        "color-schemes": "components/usage/concepts/color-schemes.md",
        "components-list": "components/usage/component-list.md",
        layout: "components/usage/concepts/layout.md",
        "controlled-mode": "components/usage/concepts/controlled-mode.md",
        forms: "components/usage/concepts/forms.md",
        slots: "components/usage/concepts/slots.md",
        internationalization: "components/usage/concepts/internationalization.md"
    };

    if (!Object.keys(guidesPath).includes(section)) {
        return {
            content: [{
                type: "text",
                isError: true,
                text: `Invalid guide section requested: ${section}`
            }]
        };
    }

    const guidePath = join(__dirname, guidesPath[section]);
    console.log("-->", guidePath);

    if (!existsSync(guidePath)) {
        return {
            content: [{
                type: "text",
                isError: true,
                text: `Guide not found for section: ${section}`
            }]
        };
    }

    try {
        const sectionContent = readFileSync(guidePath, "utf-8");

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

export function trackEvent(event: string, data: Record<string, string | number | boolean> = {}, requestInfo?: RequestInfo) {
    let sessionId = requestInfo && requestInfo.headers["mcp-session-id"] ? requestInfo.headers["mcp-session-id"] : "";
    const { sessionId: dataSessionId, ...sessionLessData } = data;

    if (!sessionId && dataSessionId) {
        sessionId = dataSessionId as string;
    }


    const logData = {
        event,
        sessionId,
        sessionLessData,
        timestamp: new Date().toISOString()
    };

    // Log to file using winston
    interactionLogger.info("User interaction tracked", logData);

    // Also log to console for debugging
    console.log(`Tracking event: ${event}`, { ...data, sessionId });
}

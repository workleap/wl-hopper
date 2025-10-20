import { existsSync } from "fs";
import { readFile } from "fs/promises";
import { join } from "path";
import { env } from "../env";
import { content, errorContent, getPaginatedContent } from "./formatter";
import { trackError } from "./logger";
import { paginate, type PaginatedResult } from "./pagination";

async function readMarkdownFile(filePath: string, pageSize?: number, cursor?: string): Promise<PaginatedResult> {
    if (!existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
    }

    const fileContent = await readFile(filePath, "utf-8");

    return paginate(fileContent, pageSize, cursor);
}

export async function getLocalJsonContent(relativePath: string) {
    const filePath = join(env.DOCS_PATH, relativePath);

    if (!existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
    }

    return content(await readFile(filePath, "utf-8"));
}

export async function getLocalMdContent(relativePath: string, pageSize?: number, cursor?: string) {
    const guidePath = join(env.DOCS_PATH, relativePath);

    if (!existsSync(guidePath)) {
        const error = new Error(`File not found: ${guidePath}`);

        return errorContent(error, "File not found.");
    }

    try {
        return getPaginatedContent(
            await readMarkdownFile(guidePath, pageSize, cursor)
        );
    } catch (error) {
        return errorContent(error, `Error reading file: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
}

export async function getRemoteMdContent(url: string, pageSize?: number, cursor?: string) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            const error = new Error(`Failed to fetch: ${response.statusText}, URL: ${url}`);
            trackError(error);
            throw error;
        }

        const result = await response.text();

        return getPaginatedContent(
            paginate(result, pageSize, cursor)
        );
    } catch (error) {
        return errorContent(error, `Error reading remote URL: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
}


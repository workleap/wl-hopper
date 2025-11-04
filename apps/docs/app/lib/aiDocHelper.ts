"use server";

import { findAiDocFilePath, getAiDocRelativeUrl } from "@/ai-pipeline/util";
import { join } from "node:path";

export async function getAiDocFilePath(urlPathParts: string[]): Promise<string | null> {
    const relativePath = urlPathParts.join("/");

    const searchBaseDir = join(import.meta.dirname, "../../", "public");
    return findAiDocFilePath(relativePath, searchBaseDir);
}

export async function getAiDocAbsolutePath(pageUrlPathParts: string[]): Promise<string | null> {
    const pageRelativePath = pageUrlPathParts.join("/");

    if (await getAiDocFilePath(pageUrlPathParts) !== null) {
        const aiDocRelativeUrl = getAiDocRelativeUrl(pageRelativePath);
        return aiDocRelativeUrl.startsWith("/")
            ? aiDocRelativeUrl
            : `/${aiDocRelativeUrl}`;
    }
    return null;
}

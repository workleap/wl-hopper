import { findAiDocFilePath, getAiDocRelativeUrl } from "@/ai-pipeline/util";
import { join } from "node:path";

export function getAiDocFilePath(urlPathParts: string[]): string | null {
    const relativePath = urlPathParts.join("/");

    const searchBaseDir = join(process.cwd(), "public");
    return findAiDocFilePath(relativePath, searchBaseDir);
}

export function getAiDocAbsolutePath(pageUrlPathParts: string[]): string | null {
    const pageRelativePath = pageUrlPathParts.join("/");

    console.error("-->", pageUrlPathParts, process.cwd());
    if (getAiDocFilePath(pageUrlPathParts) !== null) {
        console.error("-->", "found");
        const aiDocRelativeUrl = getAiDocRelativeUrl(pageRelativePath);
        return aiDocRelativeUrl.startsWith("/")
            ? aiDocRelativeUrl
            : `/${aiDocRelativeUrl}`;
    }
    return null;
}

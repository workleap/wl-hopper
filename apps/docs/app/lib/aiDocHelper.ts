import { findAiDocFile, getAiDocRelativeUrl } from "@/ai-pipeline/util";
import { join } from "node:path";

export function getAiDoc(urlPathParts: string[]): string | null {
    const relativePath = urlPathParts.join("/");

    const searchBaseDir = join(process.cwd(), "public");
    return findAiDocFile(relativePath, searchBaseDir);
}

export function getAiDocAbsolutePath(pageUrlPathParts: string[]): string | null {
    const pageRelativePath = pageUrlPathParts.join("/");

    if (getAiDoc(pageUrlPathParts)) {
        const aiDocRelativeUrl = getAiDocRelativeUrl(pageRelativePath);
        return aiDocRelativeUrl.startsWith("/")
            ? aiDocRelativeUrl
            : `/${aiDocRelativeUrl}`;
    }
    return null;
}

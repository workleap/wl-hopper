import { findAiDocFilePath, getAiDocRelativeUrl } from "@/ai-pipeline/util";
import { env } from "@/context/env/env";
import { join } from "node:path";

export async function getAiDocFilePath(urlPathParts: string[]): Promise<string | null> {
    const relativePath = urlPathParts.join("/");

    const searchBaseDir = join(env.isNetlifyFunction ? "/var/task/apps/docs/" : process.cwd(), "public");
    return findAiDocFilePath(relativePath, searchBaseDir);
}

export function getAiDocAbsolutePath(pageUrlPathParts: string[]) {
    const pageRelativePath = pageUrlPathParts.join("/");

    const aiDocRelativeUrl = getAiDocRelativeUrl(pageRelativePath);
    return aiDocRelativeUrl.startsWith("/")
        ? aiDocRelativeUrl
        : `/${aiDocRelativeUrl}`;
}

import { aiDocsConfig } from "@/ai-docs/config";
import { findPossibleFilePaths } from "@/ai-docs/util";
import { env } from "@/context/env/env";
import { existsSync } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs"; // ensures filesystem access works in Next.js

function buildFilePath(pathSegments: string[]): string | null {
    // Build absolute path to public/ai-docs/<...>.md
    const baseDir = path.join(process.cwd(), env.isNetlifyFunction ? "" : "public", aiDocsConfig.filesFolder);

    // Ensure last segment has no extension, then add .md
    const fileName = `${pathSegments[pathSegments.length - 1]!}.md`;
    const urlPath = pathSegments.length === 1 ? "/" : path.join(...pathSegments.slice(0, -1));

    for (const filePath of findPossibleFilePaths(urlPath)) {
        const aiDocPath = path.join(baseDir, filePath, fileName);
        if (existsSync(aiDocPath)) {
            return aiDocPath;
        }
    }

    return null;
}

export async function GET(
    req: Request,
    { params }: { params: { path?: string[] }; query: { ext?: string } }
) {
    const parts = params.path ?? []; // e.g. ["llms"] for /txt/llms?ext=txt
    if (parts.length === 0) {return new Response("Not found", { status: 404 });}

    const fileAbs = buildFilePath(parts);

    if (!fileAbs) {
        const baseDir = path.join(process.cwd(), env.isNetlifyFunction ? "" : "public", aiDocsConfig.filesFolder);
        return new Response(`Invalid path ${baseDir} - ${env.isNetlifyFunction}`, { status: 400 });
    }

    try {
        const data = await fs.readFile(fileAbs, "utf8");

        // Content is always the same regardless of requested ext; we serve the MD text.
        return new Response(data, {
            headers: {
                "Content-Type": "text/markdown; charset=utf-8"
            }
        });
    } catch {
        return new Response("Not found", { status: 404 });
    }
}

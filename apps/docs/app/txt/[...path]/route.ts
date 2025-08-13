import { resolveFilePath } from "@/ai-docs/util";
import { aiDocsMap } from "ai-docs/map.ts";
import { existsSync } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs"; // ensures filesystem access works in Next.js

function buildFilePath(pathSegments: string[]): string | null {
    // Build absolute path to public/ai-docs/<...>.md
    const baseDir = path.join(process.cwd(), "public", aiDocsMap.filesFolder);

    // Ensure last segment has no extension, then add .md
    const fileName = `${pathSegments[pathSegments.length - 1]!}.md`;
    const urlPath = path.join(...pathSegments.slice(0, -1));

    const filePath = resolveFilePath(urlPath, (filePath) => existsSync(path.join(baseDir, filePath, fileName)));

    if (!filePath) {
        return null;
    }

    const aiDocPath = path.join(baseDir, filePath, fileName);


    return aiDocPath;
}

export async function GET(
    req: Request,
    { params, query }: { params: { path?: string[] }; query: { ext?: string } }
) {
    const parts = params.path ?? []; // e.g. ["llms"] for /txt/llms?ext=txt
    if (parts.length === 0) {return new Response("Not found", { status: 404 });}

    const fileAbs = buildFilePath(parts);

    if (!fileAbs) {
        return new Response("Invalid path", { status: 400 });
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

import { getAiDocFilePath } from "@/app/lib/aiDocHelper";
import fs from "node:fs/promises";

export const runtime = "nodejs"; // ensures filesystem access works in Next.js

export async function GET(
    req: Request,
    { params }: { params: Promise<{ path?: string[] }> }
) {
    const { path } = await params;
    const parts = path ?? []; // e.g. ["llms"] for /txt/llms?ext=txt
    if (parts.length === 0) {
        return new Response("Not found", { status: 404 });
    }

    const filePath = await getAiDocFilePath(parts);

    if (!filePath) {
        return new Response("Invalid path", { status: 400 });
    }

    try {
        const data = await fs.readFile(filePath, "utf8");

        return new Response(data, {
            headers: {
                "Content-Type": "text/markdown; charset=utf-8"
            }
        });
    } catch {
        return new Response("Not found", { status: 404 });
    }
}

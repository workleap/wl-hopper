import { getAiDoc } from "@/app/lib/aiDocHelper";
import fs from "node:fs/promises";

export const runtime = "nodejs"; // ensures filesystem access works in Next.js

export async function GET(
    req: Request,
    { params }: { params: { path?: string[] }; query: { ext?: string } }
) {
    const parts = params.path ?? []; // e.g. ["llms"] for /txt/llms?ext=txt
    if (parts.length === 0) {
        return new Response("Not found", { status: 404 });
    }

    const filePath = getAiDoc(parts);

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

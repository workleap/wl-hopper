import { existsSync } from "fs";
import { readFile } from "fs/promises";
import { paginateContent, type PaginatedResult } from "./cursor-pagination.js";

export async function readMarkdownFile(filePath: string, pageSize?: number, cursor?: string): Promise<PaginatedResult> {
    if (!existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
    }

    const content = await readFile(filePath, "utf-8");

    return paginateContent(content, pageSize, cursor);
}

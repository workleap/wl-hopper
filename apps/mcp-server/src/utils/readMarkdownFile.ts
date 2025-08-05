import { existsSync } from "fs";
import { readFile } from "fs/promises";

export async function readMarkdownFile(filePath: string, startLine?: number, endLine?: number): Promise<string> {
    if (!existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
    }

    const content = await readFile(filePath, "utf-8");

    if (startLine === undefined && endLine === undefined) {
        return content;
    }

    const lines = content.split('\n');
    const totalLines = lines.length;

    if (startLine !== undefined && (startLine < 1 || startLine > totalLines)) {
        throw new Error(`Invalid start_line: ${startLine}. Must be between 1 and ${totalLines}`);
    }
    if (endLine !== undefined && (endLine < 1 || endLine > totalLines)) {
        throw new Error(`Invalid end_line: ${endLine}. Must be between 1 and ${totalLines}`);
    }
    if (startLine !== undefined && endLine !== undefined && startLine > endLine) {
        throw new Error(`Invalid range: start_line (${startLine}) cannot be greater than end_line (${endLine})`);
    }

    const start = startLine !== undefined ? startLine - 1 : 0;
    const end = endLine !== undefined ? endLine : totalLines;

    return lines.slice(start, end).join('\n');
}

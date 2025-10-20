import { Buffer } from "buffer";

export interface CursorData {
    pageSize: number;
    position: number;
    contentHash: string; // To ensure we're still paginating the same content
}

export function encodeCursor(data: CursorData): string {
    return Buffer.from(JSON.stringify(data)).toString("base64");
}

export function decodeCursor(cursor: string): CursorData {
    try {
        const json = Buffer.from(cursor, "base64").toString("utf-8");

        return JSON.parse(json) as CursorData;
    } catch (error) {
        throw new Error("Invalid cursor format", { cause: error });
    }
}

import { createHash } from "crypto";

export function createContentHash(content: string): string {
    return createHash("sha256").update(content).digest("hex");
}

function tokenToChars(tokens: number): number {
    // Estimate average number of characters per token for English text in GPT models.
    // 3.5 is a commonly used approximation for OpenAI GPT-3/4; adjust if using other models or languages.
    return Math.floor(tokens * 3.5);
}

export interface PaginatedResult {
    content: string;
    hasMore: boolean;
    nextCursor?: string;
    totalPages?: number;
    currentPage?: number;
}

export function paginate(
    fullContent: string,
    pageSize?: number,
    cursor?: string
): PaginatedResult {
    // If no pagination requested, return full content
    if (!pageSize && !cursor) {
        return {
            content: fullContent,
            hasMore: false
        };
    }

    const contentHash = createContentHash(fullContent);
    let actualPageSize: number;
    let position: number;

    if (cursor) {
        // Continuing pagination with cursor
        const cursorData = decodeCursor(cursor);

        // Verify we're still working with the same content
        if (cursorData.contentHash !== contentHash) {
            throw new Error("Content has changed. Please start pagination from the beginning.");
        }

        actualPageSize = cursorData.pageSize;
        position = cursorData.position;

        // If pageSize is provided with cursor, it should match the original
        if (pageSize && pageSize !== actualPageSize) {
            throw new Error(`Page size cannot be changed during pagination. Original size was ${actualPageSize}, but ${pageSize} was provided. To change page size, start pagination from the beginning without a cursor.`);
        }
    } else if (pageSize) {
        // Starting new pagination
        actualPageSize = pageSize;
        position = 0;
    } else {
        throw new Error("Either page_size (for first page) or cursor (for subsequent pages) must be provided");
    }

    const maxCharacters = tokenToChars(actualPageSize);
    const startIndex = position;
    const endIndex = Math.min(startIndex + maxCharacters, fullContent.length);
    const hasMore = endIndex < fullContent.length;

    const totalPages = Math.ceil(fullContent.length / maxCharacters);
    const currentPage = Math.floor(startIndex / maxCharacters) + 1;

    let nextCursor: string | undefined;
    if (hasMore) {
        const nextCursorData: CursorData = {
            pageSize: actualPageSize,
            position: endIndex,
            contentHash
        };
        nextCursor = encodeCursor(nextCursorData);
    }

    return {
        content: fullContent.substring(startIndex, endIndex),
        hasMore,
        nextCursor,
        totalPages,
        currentPage
    };
}

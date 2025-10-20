import type { PaginatedResult } from "./pagination";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type TextContent = {
    type: "text";
    text: string;
};

export function content(text: string): TextContent {
    return {
        type: "text",
        text
    };
}

export function errorContent(error: unknown, customErrorMessage?: string): { type: "text"; isError: true; text: string } {
    const errorMessage = customErrorMessage ||
        (error instanceof Error ? error.message : "Unknown error");

    return {
        type: "text",
        isError: true,
        text: errorMessage
    };
}

export function toolContent(...rawContent: (TextContent | TextContent[] | undefined)[]): { content: TextContent[] } {
    return {
        content: rawContent.flat().filter(c => !!c)
    };
}

export function getPaginatedContent(result: PaginatedResult): TextContent | TextContent[] {
    const paginationInfo = result.totalPages && result.currentPage
        ? `Page ${result.currentPage} of ${result.totalPages}`
        : "";

    return [content(result.content),
        ...(result.hasMore ? [
            content(`${paginationInfo}. You MUST call this tool again with the cursor "${result.nextCursor}" to fetch remaining content if what you are looking for is not in the current page.`)
        ] : [])
    ];
}



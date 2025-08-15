export function content(text: string): { type: "text"; text: string } {
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

export function toolContent(rawContent: { type: "text"; text: string }): { content: { type: "text"; text: string }[] } {
    return {
        content: [rawContent]
    };
}



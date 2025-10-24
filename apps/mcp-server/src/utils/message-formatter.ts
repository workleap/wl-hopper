/**
 * Formats a message template with placeholders.
 * Supports both indexed placeholders ({0}, {1}) and named placeholders ({name}, {value})
 *
 * @example
 * // Indexed placeholders
 * formatMessage("Hello {0}, you have {1} messages", ["John", 5])
 * // Returns: "Hello John, you have 5 messages"
 *
 * @example
 * // Named placeholders
 * formatMessage("Hello {name}, you have {count} messages", { name: "John", count: 5 })
 * // Returns: "Hello John, you have 5 messages"
 */
export function formatMessage(template: string, params?: Record<string, any> | any[]): string {
    if (!params) {
        return template;
    }

    if (Array.isArray(params)) {
        // Handle indexed placeholders
        return template.replace(/\{(\d+)\}/g, (match, index) => {
            const paramIndex = parseInt(index, 10);

            return paramIndex < params.length ? String(params[paramIndex]) : match;
        });
    } else {
        // Handle named placeholders
        return template.replace(/\{(\w+)\}/g, (match, key) => {
            return key in params ? String(params[key]) : match;
        });
    }
}

/**
 * Creates a message formatter function for a specific template
 * This is useful for creating reusable formatters
 *
 * @example
 * const errorFormatter = createMessageFormatter("Error in {component}: {message}");
 * errorFormatter({ component: "Button", message: "Invalid props" })
 * // Returns: "Error in Button: Invalid props"
 */
export function createMessageFormatter<T extends Record<string, any> | any[]>(
    template: string
): (params: T) => string {
    return (params: T) => formatMessage(template, params);
}
/**
 * Formats validation messages (errors or warnings) into a readable string
 * @param messages - Array of validation messages with optional line numbers
 * @param title - The title for the section (e.g., "Errors" or "Warnings")
 * @returns Formatted string with numbered messages and line numbers
 */
export function formatValidationMessages(
    messages: Array<{ message: string; line?: number }>,
    title: string
): string {
    if (messages.length === 0) return "";

    let formatted = `\n\n${title}:`;
    messages.forEach((msg, index) => {
        formatted += `\n${index + 1}. ${msg.message}`;
        if (msg.line) {
            formatted += ` (line ${msg.line})`;
        }
    });
    return formatted;
}
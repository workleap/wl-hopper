/**
 * Generates a consistent color index from a string using a deterministic hashing algorithm.
 *
 * @param name - The input string to hash (e.g., user name, item identifier)
 * @param maxNumberOfColor - The maximum number of colors available (the result will be between 0 and maxNumberOfColor-1)
 * @returns A consistent numeric index that can be used to select a color from a palette
 *
 * @example
 * // Returns a consistent index between 0-4 for the string "John Doe"
 * const colorIndex = hashStringToColorIndex("John Doe", 5);
 */
export function hashStringToColorIndex(name: string, maxNumberOfColor: number) {
    let hashCode = 0;

    for (let i = name.length - 1; i >= 0; i--) {
        const character = name.charCodeAt(i);
        const shift = i % 8;

        hashCode ^= (character << shift) + (character >> (8 - shift));
    }

    return hashCode % maxNumberOfColor;
}

/**
 * Generates a decorative color name based on an input string.
 * This function creates consistent color assignments for the same input string,
 * which is useful for user avatars, item categorization, or any UI element
 * that needs a consistent but visually distinguishable appearance.
 *
 * @param name - The input string to generate a color for (e.g., username, item ID)
 * @param maxNumberOfColor - The maximum number of colors available (default is 8)
 * @returns A CSS color variable name in the format "decorative-option{1-maxNumberOfColor}"
 *
 * @example
 * // Always returns the same color name for "John Doe"
 * const colorVar = generateDecorativeColorName("John Doe"); // e.g., "decorative-option3"
 * // Can be used in CSS: var(--decorative-option3)
 */
export function generateDecorativeColorByName(name: string, maxNumberOfColor: number = 8) {
    const variantToUse = `option${hashStringToColorIndex(name, maxNumberOfColor) + 1}`;

    return `decorative-${variantToUse}`;
}

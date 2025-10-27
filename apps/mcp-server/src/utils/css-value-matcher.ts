/**
 * Configuration type for CSS value matching
 */
export interface CssMatchConfig {
    /**
     * Maximum RGB distance for color matching (0-765)
     * Uses Euclidean distance in RGB space: sqrt((r1-r2)² + (g1-g2)² + (b1-b2)²)
     *
     * Threshold guidelines:
     * - 0: Exact match only
     * - 10: Very strict - matches only nearly identical colors (e.g., #ffffff matches #fcfcfc)
     * - 15: Strict - matches very similar shades (e.g., #ffffff matches #f5f5f5)
     * - 20: Moderate - allows slight tinting (e.g., #ffffff matches #f0f0f0)
     * - 30: Lenient - matches light tints with color variations (e.g., #ffffff matches #f0f8ff, #fef6ef)
     * - 50+: Very lenient - matches visually distinct colors
     */
    colorThreshold: number;

    /**
     * Unit conversion constants
     */
    conversions: {
        /** 1rem = 16px (standard browser default) */
        remToPx: number;
        /** 1s = 1000ms */
        sToMs: number;
    };

    /**
     * Tolerance values for numeric matching by normalized unit type
     * Units are normalized before comparison (rem→px, s→ms)
     */
    tolerances: {
        /** ±px tolerance (applies to both px and rem values after normalization) */
        px: number;
        /** ±ms tolerance (applies to both ms and s values after normalization) */
        ms: number;
        /** ±% tolerance */
        "%": number;
    };
}

/**
 * Default configuration for CSS value matching
 * These can be adjusted to tune the matching behavior
 */
export const DEFAULT_CSS_MATCH_CONFIG: CssMatchConfig = {
    colorThreshold: 15, // ~5 units difference per channel (~2% variation)
    conversions: {
        remToPx: 16,
        sToMs: 1000
    },
    tolerances: {
        px: 2,
        ms: 10,
        "%": 1
    }
};

/**
 * Check if a string is a valid hex color (3 or 6 digits)
 */
function isHexColor(value: string): boolean {
    return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value);
}

/**
 * Convert hex color to RGB components
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const match = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(hex);
    if (!match) {
        return null;
    }

    let hexValue = match[1];

    // Convert 3-digit hex to 6-digit
    if (hexValue.length === 3) {
        hexValue = hexValue.split("").map(char => char + char).join("");
    }

    const r = parseInt(hexValue.substring(0, 2), 16);
    const g = parseInt(hexValue.substring(2, 4), 16);
    const b = parseInt(hexValue.substring(4, 6), 16);

    return { r, g, b };
}

/**
 * Calculate Euclidean distance between two RGB colors
 * Returns a value between 0 (identical) and ~441 (max distance)
 */
function getColorDistance(hex1: string, hex2: string): number {
    const rgb1 = hexToRgb(hex1);
    const rgb2 = hexToRgb(hex2);

    if (!rgb1 || !rgb2) {
        return Infinity;
    }

    const rDiff = rgb1.r - rgb2.r;
    const gDiff = rgb1.g - rgb2.g;
    const bDiff = rgb1.b - rgb2.b;

    return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);
}

/**
 * Normalize a value with unit to its base unit
 * - Size units (rem, px) → px
 * - Duration units (s, ms) → ms
 * - Percentage (%) → %
 */
function normalizeUnit(value: number, unit: string, config: CssMatchConfig): { value: number; unit?: ToleranceUnit } {
    switch (unit) {
        case "rem":
            return { value: value * config.conversions.remToPx, unit: "px" };
        case "s":
            return { value: value * config.conversions.sToMs, unit: "ms" };
        case "px":
        case "ms":
        case "%":
            return { value, unit };
        default:
            return { value, unit: undefined };
    }
}

type ToleranceUnit = keyof CssMatchConfig["tolerances"];

/**
 * Match numbers with units (e.g., "1rem", "400px", "500ms")
 * Returns true if values match within tolerance, false if they don't match, null if not applicable
 *
 * Units are interchangeable:
 * - rem and px (1rem = 16px)
 * - s and ms (1s = 1000ms)
 */
function matchNumberWithUnit(search: string, value: string, config: CssMatchConfig): boolean | null {
    const unitPattern = /^(-?\d+\.?\d*)(rem|px|ms|s|%)$/;
    const searchMatch = unitPattern.exec(search);
    const valueMatch = unitPattern.exec(value);

    // Not a number with unit
    if (!searchMatch || !valueMatch) {
        return null;
    }

    const searchNum = parseFloat(searchMatch[1]);
    const searchUnit = searchMatch[2];
    const valueNum = parseFloat(valueMatch[1]);
    const valueUnit = valueMatch[2];

    // Normalize both values to their base units
    const normalizedSearch = normalizeUnit(searchNum, searchUnit, config);
    const normalizedValue = normalizeUnit(valueNum, valueUnit, config);

    // After normalization, units must match (px with px, ms with ms, % with %)
    if (normalizedSearch.unit !== normalizedValue.unit) {
        return false;
    }

    // Get tolerance for the normalized unit
    const tolerance = normalizedSearch.unit ? config.tolerances[normalizedSearch.unit] : 0;

    return Math.abs(normalizedSearch.value - normalizedValue.value) <= tolerance;
}

/**
 * Main function to determine if a CSS value matches a search value
 *
 * Matching rules:
 * 1. Exact match (case-insensitive)
 * 2. Hex colors: fuzzy match within RGB distance threshold
 * 3. Numbers with units: match if same unit and within tolerance
 * 4. Pure numbers: exact match only (e.g., font-weight)
 * 5. Strings: partial case-insensitive match
 *
 * @param cssValue - The CSS value to match against
 * @param searchValue - The search value to match
 * @param config - Optional configuration, defaults to DEFAULT_CSS_MATCH_CONFIG
 */
export function matchesCssValue(
    cssValue: string,
    searchValue: string,
    config: CssMatchConfig = DEFAULT_CSS_MATCH_CONFIG
): boolean {
    const normalized = cssValue.toLowerCase().trim();
    const search = searchValue.toLowerCase().trim();

    // Handle empty search - only match empty values
    if (search === "") {
        return normalized === "";
    }

    // 1. Fast path: exact match
    if (normalized === search) {
        return true;
    }

    // 2. Hex color fuzzy matching
    if (isHexColor(search) && isHexColor(normalized)) {
        return getColorDistance(search, normalized) <= config.colorThreshold;
    }

    // 3. Number with unit matching
    const numMatch = matchNumberWithUnit(search, normalized, config);
    if (numMatch !== null) {
        return numMatch;
    }

    // 4. Pure numbers: exact match only (e.g., font-weight: 400)
    if (/^\d+$/.test(search) && /^\d+$/.test(normalized)) {
        return search === normalized;
    }

    // 5. String partial match (font families, easing functions, etc.)
    return normalized.includes(search);
}

import { type CssMatchConfig, DEFAULT_CSS_MATCH_CONFIG, matchesCssValue } from "../cssValueMatcher";

// Test configuration with fixed values
// This ensures tests are stable even if DEFAULT_CSS_MATCH_CONFIG changes
const TEST_CONFIG: CssMatchConfig = {
    conversions: {
        remToPx: 16,
        sToMs: 1000
    },
    tolerances: {
        color: 15,
        px: 2,
        ms: 10,
        "%": 1
    }
};

describe("matchesCssValue", () => {
    describe("Exact matching", () => {
        it("should match exact values (case-insensitive)", () => {
            expect(matchesCssValue("#3c3c3c", "#3c3c3c", TEST_CONFIG)).toBe(true);
            expect(matchesCssValue("#3C3C3C", "#3c3c3c", TEST_CONFIG)).toBe(true);
            expect(matchesCssValue("1rem", "1rem", TEST_CONFIG)).toBe(true);
            expect(matchesCssValue("Arial", "arial", TEST_CONFIG)).toBe(true);
        });
    });

    describe("Hex color matching", () => {
        it("should match identical hex colors", () => {
            expect(matchesCssValue("#ff0000", "#ff0000", TEST_CONFIG)).toBe(true);
            expect(matchesCssValue("#abc", "#aabbcc", TEST_CONFIG)).toBe(true); // 3-digit to 6-digit
        });

        it("should match similar hex colors within threshold", () => {
            // Small RGB differences (within threshold of 15)
            expect(matchesCssValue("#3c3c3c", "#3a3a3a", TEST_CONFIG)).toBe(true); // Distance: ~3.46
            expect(matchesCssValue("#ff0000", "#fe0000", TEST_CONFIG)).toBe(true); // Distance: 1
            expect(matchesCssValue("#ffffff", "#fefefe", TEST_CONFIG)).toBe(true); // Distance: ~1.73
        });

        it("should not match dissimilar hex colors beyond threshold", () => {
            // Large RGB differences (beyond threshold of 15)
            expect(matchesCssValue("#000000", "#ffffff", TEST_CONFIG)).toBe(false); // Distance: ~441
            expect(matchesCssValue("#ff0000", "#00ff00", TEST_CONFIG)).toBe(false); // Distance: ~360
            expect(matchesCssValue("#3c3c3c", "#5c5c5c", TEST_CONFIG)).toBe(false); // Distance: ~56
        });

        it("should handle 3-digit hex colors", () => {
            expect(matchesCssValue("#fff", "#ffffff", TEST_CONFIG)).toBe(true);
            expect(matchesCssValue("#f00", "#ff0000", TEST_CONFIG)).toBe(true);
            expect(matchesCssValue("#abc", "#aabbcc", TEST_CONFIG)).toBe(true);
        });

        it("should be case-insensitive for hex colors", () => {
            expect(matchesCssValue("#ABCDEF", "#abcdef", TEST_CONFIG)).toBe(true);
            expect(matchesCssValue("#FFF", "#fff", TEST_CONFIG)).toBe(true);
        });
    });

    describe("Number with unit matching", () => {
        it("should match identical numbers with same units", () => {
            expect(matchesCssValue("1rem", "1rem", TEST_CONFIG)).toBe(true);
            expect(matchesCssValue("16px", "16px", TEST_CONFIG)).toBe(true);
            expect(matchesCssValue("500ms", "500ms", TEST_CONFIG)).toBe(true);
            expect(matchesCssValue("1.5s", "1.5s", TEST_CONFIG)).toBe(true);
            expect(matchesCssValue("50%", "50%", TEST_CONFIG)).toBe(true);
        });

        it("should match numbers within tolerance for same unit", () => {
            // px: ±2px tolerance (applies to both px and rem after normalization)
            expect(matchesCssValue("16px", "17px", TEST_CONFIG)).toBe(true);
            expect(matchesCssValue("16px", "14px", TEST_CONFIG)).toBe(true);
            expect(matchesCssValue("1rem", "1.125rem", TEST_CONFIG)).toBe(true); // 1rem = 16px, 1.125rem = 18px (within ±2px)

            // ms: ±10ms tolerance (applies to both ms and s after normalization)
            expect(matchesCssValue("500ms", "505ms", TEST_CONFIG)).toBe(true);
            expect(matchesCssValue("500ms", "495ms", TEST_CONFIG)).toBe(true);
            expect(matchesCssValue("1s", "1.009s", TEST_CONFIG)).toBe(true); // 1s = 1000ms, 1.009s = 1009ms (within ±10ms)

            // %: ±1 tolerance
            expect(matchesCssValue("50%", "50.5%", TEST_CONFIG)).toBe(true);
        });

        it("should not match numbers beyond tolerance", () => {
            // rem/px normalized to px with ±2px tolerance
            expect(matchesCssValue("1rem", "1.2rem", TEST_CONFIG)).toBe(false); // 1rem = 16px, 1.2rem = 19.2px (beyond ±2px)
            expect(matchesCssValue("16px", "20px", TEST_CONFIG)).toBe(false); // Beyond ±2px

            // s/ms normalized to ms with ±10ms tolerance
            expect(matchesCssValue("500ms", "520ms", TEST_CONFIG)).toBe(false); // Beyond ±10ms
            expect(matchesCssValue("1s", "1.02s", TEST_CONFIG)).toBe(false); // 1s = 1000ms, 1.02s = 1020ms (beyond ±10ms)

            // % with ±1 tolerance
            expect(matchesCssValue("50%", "52%", TEST_CONFIG)).toBe(false); // Beyond ±1
        });

        it("should match interchangeable size units (rem/px)", () => {
            // 1rem = 16px
            expect(matchesCssValue("1rem", "16px", TEST_CONFIG)).toBe(true);
            expect(matchesCssValue("16px", "1rem", TEST_CONFIG)).toBe(true);

            // 0.5rem = 8px
            expect(matchesCssValue("0.5rem", "8px", TEST_CONFIG)).toBe(true);
            expect(matchesCssValue("8px", "0.5rem", TEST_CONFIG)).toBe(true);

            // 2rem = 32px
            expect(matchesCssValue("2rem", "32px", TEST_CONFIG)).toBe(true);

            // Within tolerance: 1rem = 16px, 17px is within ±2px
            expect(matchesCssValue("1rem", "17px", TEST_CONFIG)).toBe(true);
            expect(matchesCssValue("15px", "1rem", TEST_CONFIG)).toBe(true);
        });

        it("should match interchangeable duration units (s/ms)", () => {
            // 1s = 1000ms
            expect(matchesCssValue("1s", "1000ms", TEST_CONFIG)).toBe(true);
            expect(matchesCssValue("1000ms", "1s", TEST_CONFIG)).toBe(true);

            // 0.5s = 500ms
            expect(matchesCssValue("0.5s", "500ms", TEST_CONFIG)).toBe(true);
            expect(matchesCssValue("500ms", "0.5s", TEST_CONFIG)).toBe(true);

            // Within tolerance: 1s = 1000ms, 1005ms is within ±10ms
            expect(matchesCssValue("1s", "1005ms", TEST_CONFIG)).toBe(true);
            expect(matchesCssValue("995ms", "1s", TEST_CONFIG)).toBe(true);
        });

        it("should not match incompatible unit categories", () => {
            // Size units (rem/px) should not match duration units (s/ms)
            expect(matchesCssValue("16px", "16ms", TEST_CONFIG)).toBe(false);
            expect(matchesCssValue("1rem", "1s", TEST_CONFIG)).toBe(false);

            // Percentage should not match size or duration units
            expect(matchesCssValue("100%", "100px", TEST_CONFIG)).toBe(false);
            expect(matchesCssValue("100%", "100ms", TEST_CONFIG)).toBe(false);
        });

        it("should handle negative numbers", () => {
            expect(matchesCssValue("-1rem", "-1rem", TEST_CONFIG)).toBe(true);
            expect(matchesCssValue("-10px", "-11px", TEST_CONFIG)).toBe(true); // Within tolerance
            expect(matchesCssValue("-1rem", "-16px", TEST_CONFIG)).toBe(true); // Interchangeable
        });

        it("should handle decimal numbers", () => {
            expect(matchesCssValue("0.75rem", "0.75rem", TEST_CONFIG)).toBe(true);
            expect(matchesCssValue("0.75rem", "12px", TEST_CONFIG)).toBe(true); // 0.75rem = 12px
            expect(matchesCssValue("1.5rem", "24px", TEST_CONFIG)).toBe(true); // 1.5rem = 24px
        });
    });

    describe("Pure number matching (exact only)", () => {
        it("should match exact pure numbers", () => {
            expect(matchesCssValue("400", "400", TEST_CONFIG)).toBe(true);
            expect(matchesCssValue("500", "500", TEST_CONFIG)).toBe(true);
            expect(matchesCssValue("690", "690", TEST_CONFIG)).toBe(true);
        });

        it("should not match different pure numbers", () => {
            expect(matchesCssValue("400", "500", TEST_CONFIG)).toBe(false);
            expect(matchesCssValue("400", "401", TEST_CONFIG)).toBe(false);
        });

        it("should not match pure number with number+unit", () => {
            expect(matchesCssValue("400", "400px", TEST_CONFIG)).toBe(false);
            expect(matchesCssValue("500", "500ms", TEST_CONFIG)).toBe(false);
        });
    });

    describe("String partial matching", () => {
        it("should match partial strings (case-insensitive)", () => {
            expect(matchesCssValue("Arial, sans-serif", "Arial", TEST_CONFIG)).toBe(true);
            expect(matchesCssValue("Helvetica Neue", "helvetica", TEST_CONFIG)).toBe(true);
            expect(matchesCssValue("ease-in-out", "ease", TEST_CONFIG)).toBe(true);
        });

        it("should be case-insensitive", () => {
            expect(matchesCssValue("Arial", "arial", TEST_CONFIG)).toBe(true);
            expect(matchesCssValue("ARIAL", "arial", TEST_CONFIG)).toBe(true);
        });

        it("should not match non-matching strings", () => {
            expect(matchesCssValue("Arial", "Helvetica", TEST_CONFIG)).toBe(false);
            expect(matchesCssValue("sans-serif", "monospace", TEST_CONFIG)).toBe(false);
        });
    });

    describe("Edge cases", () => {
        it("should handle whitespace", () => {
            expect(matchesCssValue(" #3c3c3c ", "#3c3c3c", TEST_CONFIG)).toBe(true);
            expect(matchesCssValue("1rem  ", "1rem", TEST_CONFIG)).toBe(true);
            expect(matchesCssValue("  Arial  ", "arial", TEST_CONFIG)).toBe(true);
        });

        it("should handle empty strings", () => {
            expect(matchesCssValue("", "", TEST_CONFIG)).toBe(true);
            expect(matchesCssValue("test", "", TEST_CONFIG)).toBe(false);
        });

        it("should handle invalid hex colors", () => {
            // Falls back to string matching
            expect(matchesCssValue("#gggggg", "#gggggg", TEST_CONFIG)).toBe(true);
            expect(matchesCssValue("#12", "#34", TEST_CONFIG)).toBe(false); // Invalid hex
        });
    });

    describe("Custom configuration", () => {
        it("should use default config when not provided", () => {
            expect(matchesCssValue("1rem", "16px")).toBe(true);
            expect(matchesCssValue("#ffffff", "#fefefe")).toBe(true);
        });

        it("should allow custom color threshold", () => {
            const strictConfig: CssMatchConfig = {
                ...TEST_CONFIG,
                tolerances: {
                    ...TEST_CONFIG.tolerances,
                    color: 5
                }
            };

            // Within strict threshold
            expect(matchesCssValue("#ffffff", "#fefefe", strictConfig)).toBe(true); // Distance: ~1.73

            // Beyond strict threshold but within default
            expect(matchesCssValue("#ffffff", "#f5f5f5", strictConfig)).toBe(false); // Distance: ~17.3
            expect(matchesCssValue("#ffffff", "#f5f5f5", TEST_CONFIG)).toBe(false); // Also beyond 15
        });

        it("should allow custom unit conversions", () => {
            const customConfig: CssMatchConfig = {
                ...TEST_CONFIG,
                conversions: {
                    remToPx: 10, // 1rem = 10px instead of 16px
                    sToMs: 1000
                }
            };

            expect(matchesCssValue("1rem", "10px", customConfig)).toBe(true);
            expect(matchesCssValue("1rem", "16px", customConfig)).toBe(false); // No longer matches
        });

        it("should allow custom tolerances", () => {
            const strictToleranceConfig: CssMatchConfig = {
                ...TEST_CONFIG,
                tolerances: {
                    color: 15,
                    px: 1, // Stricter: only ±1px
                    ms: 5, // Stricter: only ±5ms
                    "%": 0.5 // Stricter: only ±0.5%
                }
            };

            // Within new tolerance
            expect(matchesCssValue("16px", "17px", strictToleranceConfig)).toBe(true);
            // Beyond new tolerance but within default
            expect(matchesCssValue("16px", "18px", strictToleranceConfig)).toBe(false);
            expect(matchesCssValue("16px", "18px", TEST_CONFIG)).toBe(true);
        });
    });

    describe("Configuration constants", () => {
        it("should have expected default configuration values", () => {
            expect(DEFAULT_CSS_MATCH_CONFIG.conversions.remToPx).toBe(16);
            expect(DEFAULT_CSS_MATCH_CONFIG.conversions.sToMs).toBe(1000);
            expect(DEFAULT_CSS_MATCH_CONFIG.tolerances.color).toBe(15);
            expect(DEFAULT_CSS_MATCH_CONFIG.tolerances.px).toBe(2);
            expect(DEFAULT_CSS_MATCH_CONFIG.tolerances.ms).toBe(10);
            expect(DEFAULT_CSS_MATCH_CONFIG.tolerances["%"]).toBe(1);
        });
    });
});

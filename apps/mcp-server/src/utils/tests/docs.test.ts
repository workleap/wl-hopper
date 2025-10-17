import {
    MOCK_TOKENS_BRIEF,
    MOCK_TOKENS_CORE_FONT_WEIGHT_FULL,
    MOCK_TOKENS_FULL,
    MOCK_TOKENS_SEMANTIC_COLOR_FULL,
    MOCK_TOKENS_SEMANTIC_SHADOW_FULL
} from "../../tests/mocks/tokensData.ts";

// Mock the rehype and remark dependencies before importing docs
jest.mock("rehype-parse", () => jest.fn());
jest.mock("rehype-remark", () => jest.fn());
jest.mock("remark-stringify", () => jest.fn());
jest.mock("unified", () => ({
    unified: jest.fn()
}));

/**
 * Mock file system paths mapping
 * Maps file paths to their corresponding mock data
 */
const MOCK_FILE_MAP = {
    "/tokens/maps/all.json": MOCK_TOKENS_FULL,
    "/tokens/maps/semantic-shadow.json": MOCK_TOKENS_SEMANTIC_SHADOW_FULL,
    "/tokens/maps/semantic-color.json": MOCK_TOKENS_SEMANTIC_COLOR_FULL,
    "/tokens/maps/core-fontWeight.json": MOCK_TOKENS_CORE_FONT_WEIGHT_FULL
} as const;

// Mock the fs/promises module to return our mock data
jest.mock("fs/promises", () => ({
    readFile: jest.fn(async (path: string) => {
        // Check each mock file path
        for (const [mockPath, mockData] of Object.entries(MOCK_FILE_MAP)) {
            if (path.includes(mockPath)) {
                return JSON.stringify(mockData);
            }
        }

        // Fallback to actual file system for unmocked files
        const fs = jest.requireActual("fs");

        return fs.readFileSync(path, "utf-8");
    })
}));

// Mock the fs module for existsSync
jest.mock("fs", () => ({
    existsSync: jest.fn((path: string) => {
        // Check if the path matches any of our mocked files
        return Object.keys(MOCK_FILE_MAP).some(mockPath => path.includes(mockPath));
    })
}));

// Import after mocks are set up
import { clearTokenDataCache, getDesignTokens } from "../docs.ts";

describe("getDesignTokens", () => {
    describe("Basic functionality", () => {
        it("should return all tokens when no filter is provided", async () => {
            const result = await getDesignTokens("all", undefined, undefined, undefined, false);

            expect(result).toHaveLength(1);
            expect(result[0]).toHaveProperty("type", "text");

            const content = JSON.parse(result[0].text as string);
            expect(content).toEqual(MOCK_TOKENS_BRIEF);
        });

        it("should return all tokens when filter array is empty", async () => {
            const result = await getDesignTokens("all", [], undefined, undefined, false);

            expect(result).toHaveLength(1);
            expect(result[0]).toHaveProperty("type", "text");

            const content = JSON.parse(result[0].text as string);
            expect(content).toEqual(MOCK_TOKENS_BRIEF);
        });
    });

    describe("Filter normalization", () => {
        it("should normalize filter keys by removing leading dashes", async () => {
            const result = await getDesignTokens("all", ["--coastal"], undefined, undefined, false);

            expect(result).toHaveLength(1);
            const content = JSON.parse(result[0].text as string);

            expect(content.core.color.tokens).toHaveProperty("hop-coastal-25");
            expect(content.core.color.tokens).not.toHaveProperty("hop-primary-surface");
        });

        it("should normalize filter keys by removing multiple leading dashes", async () => {
            const result = await getDesignTokens("all", ["----coastal"], undefined, undefined, false);

            expect(result).toHaveLength(1);
            const content = JSON.parse(result[0].text as string);

            expect(content.core.color.tokens).toHaveProperty("hop-coastal-25");
        });

        it("should normalize filter keys by removing hop- prefix", async () => {
            const result = await getDesignTokens("all", ["hop-coastal"], undefined, undefined, false);

            expect(result).toHaveLength(1);
            const content = JSON.parse(result[0].text as string);

            expect(content.core.color.tokens).toHaveProperty("hop-coastal-25");
        });

        it("should normalize filter keys by removing both leading dashes and hop- prefix", async () => {
            const result = await getDesignTokens("all", ["--hop-coastal"], undefined, undefined, false);

            expect(result).toHaveLength(1);
            const content = JSON.parse(result[0].text as string);

            expect(content.core.color.tokens).toHaveProperty("hop-coastal-25");
        });
    });

    describe("Filtering by contains (leaf level only)", () => {
        it("should filter tokens by partial key match at leaf level", async () => {
            const result = await getDesignTokens("all", ["coastal"], undefined, undefined, false);

            expect(result).toHaveLength(1);
            const content = JSON.parse(result[0].text as string);

            // Should include coastal token
            expect(content.core.color.tokens).toHaveProperty("hop-coastal-25");
            // Should not include primary token
            expect(content.core.color.tokens).not.toHaveProperty("hop-primary-surface");
            // Should not include other categories
            expect(content.core).not.toHaveProperty("fontSize");
        });

        it("should filter tokens by multiple filter keys", async () => {
            const result = await getDesignTokens("all", ["coastal", "primary"], undefined, undefined, false);

            expect(result).toHaveLength(1);
            const content = JSON.parse(result[0].text as string);

            // Should include both coastal and primary tokens
            expect(content.core.color.tokens).toHaveProperty("hop-coastal-25");
            expect(content.core.color.tokens).toHaveProperty("hop-primary-surface");
            // Should not include fontSize
            expect(content.core).not.toHaveProperty("fontSize");
        });

        it("should filter tokens across different categories", async () => {
            const result = await getDesignTokens("all", ["danger"], undefined, undefined, false);

            expect(result).toHaveLength(1);
            const content = JSON.parse(result[0].text as string);

            // Should include danger tokens
            expect(content.semantic.color.tokens).toHaveProperty("hop-danger-border-active");
            expect(content.semantic.color.tokens).toHaveProperty("hop-danger-icon-active");
            // Should not include success tokens
            expect(content.semantic.color.tokens).not.toHaveProperty("hop-success-border");
            // Should not include core tokens
            expect(content).not.toHaveProperty("core");
        });

        it("should filter tokens by common prefix", async () => {
            const result = await getDesignTokens("all", ["space-inset"], undefined, undefined, false);

            expect(result).toHaveLength(1);
            const content = JSON.parse(result[0].text as string);

            // Should include inset token
            expect(content.semantic.size.tokens).toHaveProperty("hop-space-inset-xs");
            // Should not include other categories
            expect(content.semantic).not.toHaveProperty("color");
        });

        it("should NOT filter by category names (only leaf tokens)", async () => {
            const result = await getDesignTokens("all", ["color"], undefined, undefined, false);

            expect(result).toHaveLength(1);
            const content = JSON.parse(result[0].text as string);

            // Should not match category names, only leaf token keys
            expect(content).toEqual({});
        });

        it("should NOT filter by intermediate category names", async () => {
            const result = await getDesignTokens("all", ["core"], undefined, undefined, false);

            expect(result).toHaveLength(1);
            const content = JSON.parse(result[0].text as string);

            // Should not match category names
            expect(content).toEqual({});
        });

        it("should return empty object when no matches found", async () => {
            const result = await getDesignTokens("all", ["nonexistent"], undefined, undefined, false);

            expect(result).toHaveLength(1);
            const content = JSON.parse(result[0].text as string);

            expect(content).toEqual({});
        });
    });

    describe("Nested structure preservation", () => {
        it("should preserve parent objects when child tokens match", async () => {
            const result = await getDesignTokens("all", ["coastal"], undefined, undefined, false);

            expect(result).toHaveLength(1);
            const content = JSON.parse(result[0].text as string);

            // Should have the full nested structure
            expect(content).toHaveProperty("core");
            expect(content.core).toHaveProperty("color");
            expect(content.core.color.tokens).toHaveProperty("hop-coastal-25");
        });

        it("should only include parent objects that have matching children", async () => {
            const result = await getDesignTokens("all", ["danger"], undefined, undefined, false);

            expect(result).toHaveLength(1);
            const content = JSON.parse(result[0].text as string);

            // Should have semantic.color but not core
            expect(content).toHaveProperty("semantic");
            expect(content.semantic).toHaveProperty("color");
            expect(Object.keys(content.semantic.color.tokens)).toHaveLength(2);
            expect(content).not.toHaveProperty("core");
        });
    });

    describe("Full vs Brief modes", () => {
        it("should return tokens with cssValue and propValue in full mode", async () => {
            const result = await getDesignTokens("all", [], undefined, undefined, true);

            expect(result).toHaveLength(1);
            const content = JSON.parse(result[0].text as string);

            expect(Object.keys(content.semantic).length).toBeGreaterThan(0);
            // Check a specific token has both properties
            const firstColorToken = Object.values(content.semantic.color.tokens)[0];
            expect(firstColorToken).toHaveProperty("cssValue");
            expect(firstColorToken).toHaveProperty("propValue");
        });
        it("should apply filters and return full token structure in full mode", async () => {
            const result = await getDesignTokens("all", ["danger"], undefined, undefined, true);

            expect(result).toHaveLength(1);
            const content = JSON.parse(result[0].text as string);

            expect(content.semantic.color.tokens).toBeDefined();
            // Check that filtered tokens have both cssValue and propValue
            expect(content.semantic.color.tokens["hop-danger-border-active"]).toHaveProperty("cssValue");
            expect(content.semantic.color.tokens["hop-danger-border-active"]).toHaveProperty("propValue");
            expect(Object.keys(content.semantic)).toHaveLength(1);
        });
        it("should return tokens with cssValue and propValue for specific category in full mode", async () => {
            const result = await getDesignTokens("semantic-elevation", [], undefined, undefined, true);

            expect(result).toHaveLength(1);
            const content = JSON.parse(result[0].text as string);

            expect(content.semantic.shadow.tokens).toHaveProperty("hop-elevation-none");
            expect(content.semantic.shadow.tokens["hop-elevation-none"]).toHaveProperty("cssValue", "none");
            expect(content.semantic.shadow.tokens["hop-elevation-none"]).toHaveProperty("propValue", "none");
        });
        it("should return tokens for specific category in brief mode", async () => {
            const result = await getDesignTokens("semantic-elevation", [], undefined, undefined, false);

            expect(result).toHaveLength(1);
            const content = JSON.parse(result[0].text as string);

            expect(content.semantic.shadow.tokens).toHaveProperty("hop-elevation-none", "none");
            expect(typeof content.semantic.shadow.tokens["hop-elevation-none"]).toBe("string");
        });
    });

    describe("Edge cases", () => {
        it("should handle case-sensitive matching", async () => {
            const result = await getDesignTokens("all", ["COASTAL"], undefined, undefined, false);

            expect(result).toHaveLength(1);
            const content = JSON.parse(result[0].text as string);

            // Should not match due to case sensitivity
            expect(content).toEqual({});
        });

        it("should handle special characters in filter keys", async () => {
            const result = await getDesignTokens("all", ["space-inset"], undefined, undefined, false);

            expect(result).toHaveLength(1);
            const content = JSON.parse(result[0].text as string);

            // Should match tokens containing "space-inset"
            expect(content.semantic.size.tokens).toHaveProperty("hop-space-inset-xs");
        });

        it("should handle filter key that matches parent category", async () => {
            const result = await getDesignTokens("all", ["color"], undefined, undefined, false);

            expect(result).toHaveLength(1);
            const content = JSON.parse(result[0].text as string);

            // Should not match parent keys, only leaf keys
            expect(content).toEqual({});
        });
    });

    describe("Error handling", () => {
        beforeEach(() => {
            clearTokenDataCache();
        });
        it("should return error content when file does not exist", async () => {
            // Mock existsSync to return false
            const fs = await import("fs");
            jest.spyOn(fs, "existsSync").mockReturnValueOnce(false);

            const result = await getDesignTokens("all", undefined, undefined, undefined, false);

            expect(result).toHaveLength(1);
            expect(result[0]).toHaveProperty("type", "text");
            expect(result[0].text).toContain("Tokens map not found");
        });

        it("should handle JSON parse errors gracefully", async () => {
            // Mock readFile to return invalid JSON
            const fsPromises = await import("fs/promises");
            jest.spyOn(fsPromises, "readFile").mockResolvedValueOnce("invalid json {" as never);

            const result = await getDesignTokens("all", ["coastal"], undefined, undefined, false);

            expect(result).toHaveLength(1);
            expect(result[0]).toHaveProperty("type", "text");
            expect(result[0].text).toContain("Error filtering tokens");
        });
    });

    describe("Multiple filters combination", () => {
        it("should combine multiple filters with OR logic", async () => {
            const result = await getDesignTokens("all", ["coastal", "font-size"], undefined, undefined, false);

            expect(result).toHaveLength(1);
            const content = JSON.parse(result[0].text as string);

            // Should include both matching tokens
            expect(content.core.color.tokens).toHaveProperty("hop-coastal-25");
            expect(content.core.fontSize.tokens).toHaveProperty("hop-font-size-120");
            // Should not include non-matching tokens
            expect(content.core.color.tokens).not.toHaveProperty("hop-primary-surface");
        });

        it("should filter with overlapping matches", async () => {
            const result = await getDesignTokens("all", ["danger-border", "danger-icon"], undefined, undefined, false);

            expect(result).toHaveLength(1);
            const content = JSON.parse(result[0].text as string);

            // Should include both tokens
            expect(content.semantic.color.tokens).toHaveProperty("hop-danger-border-active");
            expect(content.semantic.color.tokens).toHaveProperty("hop-danger-icon-active");
        });
    });

    describe("Supported Props Filtering", () => {
        it("should return empty when no categories have supportedProps", async () => {
            // The default mock data doesn't have supportedProps defined
            const result = await getDesignTokens("all", undefined, undefined, ["unsupportedProp"], false);

            expect(result).toHaveLength(1);
            const content = JSON.parse(result[0].text as string);

            // Should be empty since no categories have supportedProps defined
            expect(content).toEqual({});
        });

        it("should handle supportedProps filter with empty array", async () => {
            const result = await getDesignTokens("all", undefined, undefined, [], false);

            expect(result).toHaveLength(1);
            const content = JSON.parse(result[0].text as string);

            // Should return all tokens when supportedProps filter is empty
            expect(content).toEqual(MOCK_TOKENS_BRIEF);
        });
    });

    describe("CSS Value Filtering", () => {
        it("should filter tokens by exact CSS color value", async () => {
            const result = await getDesignTokens("semantic-color", undefined, ["#ba2d2d"], undefined, false);

            expect(result).toHaveLength(1);
            const content = JSON.parse(result[0].text as string);

            // Should find tokens with this exact color
            expect(content.semantic.color.tokens).toBeDefined();
            // In brief mode, should only have propValue
            const firstToken = Object.values(content.semantic.color.tokens)[0];
            expect(typeof firstToken).toBe("string");
        });

        it("should filter tokens by similar CSS color value (fuzzy match)", async () => {
            const result = await getDesignTokens("semantic-color", undefined, ["#bb2d2d"], undefined, false);

            expect(result).toHaveLength(1);
            const content = JSON.parse(result[0].text as string);

            // Should find tokens with similar color (#ba2d2d is close to #bb2d2d)
            expect(content.semantic.color.tokens).toBeDefined();
            expect(Object.keys(content.semantic.color.tokens).length).toBeGreaterThan(0);
        });

        it("should return full format when include_css_values is true", async () => {
            const result = await getDesignTokens("semantic-color", undefined, ["#ba2d2d"], undefined, true);

            expect(result).toHaveLength(1);
            const content = JSON.parse(result[0].text as string);

            // In full mode, should have both propValue and cssValue
            const firstToken = Object.values(content.semantic.color.tokens)[0];
            expect(firstToken).toHaveProperty("propValue");
            expect(firstToken).toHaveProperty("cssValue");
        });

        it("should filter by pure numbers (font-weight)", async () => {
            const result = await getDesignTokens("core-font-weight", undefined, ["400"], undefined, false);

            expect(result).toHaveLength(1);
            const content = JSON.parse(result[0].text as string);

            // Should find exact match for font-weight 400
            expect(content.core.fontWeight.tokens).toBeDefined();
            expect(content.core.fontWeight.tokens).toHaveProperty("hop-font-weight-400");
        });

        it("should combine name and fuzzy CSS value filters", async () => {
            const result = await getDesignTokens("semantic-color", ["danger"], ["#bb2d2d"], undefined, false);

            expect(result).toHaveLength(1);
            const content = JSON.parse(result[0].text as string);

            // Should only include tokens that match both filters
            expect(content.semantic.color.tokens).toBeDefined();
            const tokenNames = Object.keys(content.semantic.color.tokens);
            tokenNames.forEach(name => {
                expect(name).toContain("danger");
            });
        });

        it("should return empty result when no CSS values match", async () => {
            const result = await getDesignTokens("semantic-color", undefined, ["#zzzzzz"], undefined, false);

            expect(result).toHaveLength(1);
            const content = JSON.parse(result[0].text as string);

            // Should be empty or have no matching tokens
            expect(Object.keys(content).length).toBe(0);
        });

        it("should handle multiple CSS value filters", async () => {
            const result = await getDesignTokens("semantic-color", undefined, ["#ba2d2d", "#ffffff"], undefined, false);

            expect(result).toHaveLength(1);
            const content = JSON.parse(result[0].text as string);

            // Should find tokens matching either color
            expect(content.semantic.color.tokens).toBeDefined();
            expect(Object.keys(content.semantic.color.tokens).length).toBe(3);
        });
    });
});


import { MOCK_TOKENS } from "../../tests/mocks/tokensData.ts";

// Mock the rehype and remark dependencies before importing docs
jest.mock("rehype-parse", () => jest.fn());
jest.mock("rehype-remark", () => jest.fn());
jest.mock("remark-stringify", () => jest.fn());
jest.mock("unified", () => ({
    unified: jest.fn()
}));

// Mock the fs/promises module to return our mock data
jest.mock("fs/promises", () => ({
    readFile: jest.fn(async (path: string) => {
        if (path.includes("/tokens/maps/brief/all.json")) {
            return JSON.stringify(MOCK_TOKENS);
        }

        const fs = jest.requireActual("fs");

        return fs.readFileSync(path, "utf-8");
    })
}));

// Mock the fs module for existsSync
jest.mock("fs", () => ({
    existsSync: jest.fn((path: string) => {
        if (path.includes("/tokens/maps/brief/all.json")) {
            return true;
        }

        return false;
    })
}));

// Import after mocks are set up
import { getDesignTokensMap } from "../docs.ts";

describe("getDesignTokensMap", () => {
    describe("Basic functionality", () => {
        it("should return all tokens when no filter is provided", async () => {
            const result = await getDesignTokensMap("all", undefined, "brief");

            expect(result).toHaveLength(1);
            expect(result[0]).toHaveProperty("type", "text");

            const content = JSON.parse(result[0].text as string);
            expect(content).toEqual(MOCK_TOKENS);
        });

        it("should return all tokens when filter array is empty", async () => {
            const result = await getDesignTokensMap("all", [], "brief");

            expect(result).toHaveLength(1);
            expect(result[0]).toHaveProperty("type", "text");

            const content = JSON.parse(result[0].text as string);
            expect(content).toEqual(MOCK_TOKENS);
        });
    });

    describe("Filter normalization", () => {
        it("should normalize filter keys by removing leading dashes", async () => {
            const result = await getDesignTokensMap("all", ["--coastal"], "brief");

            expect(result).toHaveLength(1);
            const content = JSON.parse(result[0].text as string);

            expect(content.core.color).toHaveProperty("hop-coastal-25");
            expect(content.core.color).not.toHaveProperty("hop-primary-surface");
        });

        it("should normalize filter keys by removing multiple leading dashes", async () => {
            const result = await getDesignTokensMap("all", ["----coastal"], "brief");

            expect(result).toHaveLength(1);
            const content = JSON.parse(result[0].text as string);

            expect(content.core.color).toHaveProperty("hop-coastal-25");
        });

        it("should normalize filter keys by removing hop- prefix", async () => {
            const result = await getDesignTokensMap("all", ["hop-coastal"], "brief");

            expect(result).toHaveLength(1);
            const content = JSON.parse(result[0].text as string);

            expect(content.core.color).toHaveProperty("hop-coastal-25");
        });

        it("should normalize filter keys by removing both leading dashes and hop- prefix", async () => {
            const result = await getDesignTokensMap("all", ["--hop-coastal"], "brief");

            expect(result).toHaveLength(1);
            const content = JSON.parse(result[0].text as string);

            expect(content.core.color).toHaveProperty("hop-coastal-25");
        });
    });

    describe("Filtering by contains (leaf level only)", () => {
        it("should filter tokens by partial key match at leaf level", async () => {
            const result = await getDesignTokensMap("all", ["coastal"], "brief");

            expect(result).toHaveLength(1);
            const content = JSON.parse(result[0].text as string);

            // Should include coastal token
            expect(content.core.color).toHaveProperty("hop-coastal-25");
            // Should not include primary token
            expect(content.core.color).not.toHaveProperty("hop-primary-surface");
            // Should not include other categories
            expect(content.core).not.toHaveProperty("fontSize");
        });

        it("should filter tokens by multiple filter keys", async () => {
            const result = await getDesignTokensMap("all", ["coastal", "primary"], "brief");

            expect(result).toHaveLength(1);
            const content = JSON.parse(result[0].text as string);

            // Should include both coastal and primary tokens
            expect(content.core.color).toHaveProperty("hop-coastal-25");
            expect(content.core.color).toHaveProperty("hop-primary-surface");
            // Should not include fontSize
            expect(content.core).not.toHaveProperty("fontSize");
        });

        it("should filter tokens across different categories", async () => {
            const result = await getDesignTokensMap("all", ["danger"], "brief");

            expect(result).toHaveLength(1);
            const content = JSON.parse(result[0].text as string);

            // Should include danger tokens
            expect(content.semantic.color).toHaveProperty("hop-danger-border-active");
            expect(content.semantic.color).toHaveProperty("hop-danger-icon-active");
            // Should not include success tokens
            expect(content.semantic.color).not.toHaveProperty("hop-success-border");
            // Should not include core tokens
            expect(content).not.toHaveProperty("core");
        });

        it("should filter tokens by common prefix", async () => {
            const result = await getDesignTokensMap("all", ["space-inset"], "brief");

            expect(result).toHaveLength(1);
            const content = JSON.parse(result[0].text as string);

            // Should include inset token
            expect(content.semantic.size).toHaveProperty("hop-space-inset-xs");
            // Should not include other categories
            expect(content.semantic).not.toHaveProperty("color");
        });

        it("should NOT filter by category names (only leaf tokens)", async () => {
            const result = await getDesignTokensMap("all", ["color"], "brief");

            expect(result).toHaveLength(1);
            const content = JSON.parse(result[0].text as string);

            // Should not match category names, only leaf token keys
            expect(content).toEqual({});
        });

        it("should NOT filter by intermediate category names", async () => {
            const result = await getDesignTokensMap("all", ["core"], "brief");

            expect(result).toHaveLength(1);
            const content = JSON.parse(result[0].text as string);

            // Should not match category names
            expect(content).toEqual({});
        });

        it("should return empty object when no matches found", async () => {
            const result = await getDesignTokensMap("all", ["nonexistent"], "brief");

            expect(result).toHaveLength(1);
            const content = JSON.parse(result[0].text as string);

            expect(content).toEqual({});
        });
    });

    describe("Nested structure preservation", () => {
        it("should preserve parent objects when child tokens match", async () => {
            const result = await getDesignTokensMap("all", ["coastal"], "brief");

            expect(result).toHaveLength(1);
            const content = JSON.parse(result[0].text as string);

            // Should have the full nested structure
            expect(content).toHaveProperty("core");
            expect(content.core).toHaveProperty("color");
            expect(content.core.color).toHaveProperty("hop-coastal-25");
        });

        it("should only include parent objects that have matching children", async () => {
            const result = await getDesignTokensMap("all", ["danger"], "brief");

            expect(result).toHaveLength(1);
            const content = JSON.parse(result[0].text as string);

            // Should have semantic.color but not core
            expect(content).toHaveProperty("semantic");
            expect(content.semantic).toHaveProperty("color");
            expect(Object.keys(content.semantic.color)).toHaveLength(2);
            expect(content).not.toHaveProperty("core");
        });
    });

    describe("Edge cases", () => {
        it("should handle case-sensitive matching", async () => {
            const result = await getDesignTokensMap("all", ["COASTAL"], "brief");

            expect(result).toHaveLength(1);
            const content = JSON.parse(result[0].text as string);

            // Should not match due to case sensitivity
            expect(content).toEqual({});
        });

        it("should handle special characters in filter keys", async () => {
            const result = await getDesignTokensMap("all", ["space-inset"], "brief");

            expect(result).toHaveLength(1);
            const content = JSON.parse(result[0].text as string);

            // Should match tokens containing "space-inset"
            expect(content.semantic.size).toHaveProperty("hop-space-inset-xs");
        });

        it("should handle filter key that matches parent category", async () => {
            const result = await getDesignTokensMap("all", ["color"], "brief");

            expect(result).toHaveLength(1);
            const content = JSON.parse(result[0].text as string);

            // Should not match parent keys, only leaf keys
            expect(content).toEqual({});
        });
    });

    describe("Error handling", () => {
        it("should return error content when file does not exist", async () => {
            // Mock existsSync to return false
            const fs = await import("fs");
            jest.spyOn(fs, "existsSync").mockReturnValueOnce(false);

            const result = await getDesignTokensMap("all", undefined, "brief");

            expect(result).toHaveLength(1);
            expect(result[0]).toHaveProperty("type", "text");
            expect(result[0].text).toContain("Tokens map not found");
        });

        it("should handle JSON parse errors gracefully", async () => {
            // Mock readFile to return invalid JSON
            const fsPromises = await import("fs/promises");
            jest.spyOn(fsPromises, "readFile").mockResolvedValueOnce("invalid json {" as never);

            const result = await getDesignTokensMap("all", ["coastal"], "brief");

            expect(result).toHaveLength(1);
            expect(result[0]).toHaveProperty("type", "text");
            expect(result[0].text).toContain("Error filtering tokens");
        });
    });

    describe("Multiple filters combination", () => {
        it("should combine multiple filters with OR logic", async () => {
            const result = await getDesignTokensMap("all", ["coastal", "font-size"], "brief");

            expect(result).toHaveLength(1);
            const content = JSON.parse(result[0].text as string);

            // Should include both matching tokens
            expect(content.core.color).toHaveProperty("hop-coastal-25");
            expect(content.core.fontSize).toHaveProperty("hop-font-size-120");
            // Should not include non-matching tokens
            expect(content.core.color).not.toHaveProperty("hop-primary-surface");
        });

        it("should filter with overlapping matches", async () => {
            const result = await getDesignTokensMap("all", ["danger-border", "danger-icon"], "brief");

            expect(result).toHaveLength(1);
            const content = JSON.parse(result[0].text as string);

            // Should include both tokens
            expect(content.semantic.color).toHaveProperty("hop-danger-border-active");
            expect(content.semantic.color).toHaveProperty("hop-danger-icon-active");
        });
    });
});

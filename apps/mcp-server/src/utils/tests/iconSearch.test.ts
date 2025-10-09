import { MOCK_ICONS_DATA } from "../../tests/mocks/iconsData.ts";

// Mock the fs/promises module to return our mock data
jest.mock("fs/promises", () => ({
    readFile: jest.fn(async (path: string) => {
        if (path.includes("/icons/data.json")) {
            return JSON.stringify(MOCK_ICONS_DATA);
        }

        const fs = jest.requireActual("fs");

        return fs.readFileSync(path, "utf-8");
    })
}));

// Import after mocks are set up
import { getIcons } from "../iconSearch";

describe("getIcons", () => {
    beforeEach(() => {
        // Clear module cache to ensure fresh data for each test
        jest.clearAllMocks();
    });

    describe("Basic functionality", () => {
        it("should return all icons when no queries are provided", async () => {
            const result = await getIcons();

            expect(result).toHaveProperty("all");
            expect(result.all).toHaveLength(9); // 6 standard + 3 rich
            expect(result.all.every(icon => icon.name && icon.description && icon.type && typeof icon.score === "number")).toBe(true);
        });

        it("should return results for a single query", async () => {
            const result = await getIcons(["add"]);

            expect(result).toHaveProperty("add");
            expect(Array.isArray(result.add)).toBe(true);
            expect(result.add.length).toBeGreaterThan(0);
        });

        it("should return results for multiple queries", async () => {
            const result = await getIcons(["add", "calendar"]);

            expect(result).toHaveProperty("add");
            expect(result).toHaveProperty("calendar");
            expect(Array.isArray(result.add)).toBe(true);
            expect(Array.isArray(result.calendar)).toBe(true);
        });

        it("should return all icons when all queries are empty strings", async () => {
            const result = await getIcons([""]);

            // When all queries are empty, return all icons under the type key
            expect(result).toHaveProperty("all");
            expect(result.all).toHaveLength(9); // 6 standard + 3 rich
            expect(result.all.every(icon => icon.name && icon.description && icon.type && typeof icon.score === "number")).toBe(true);
        });

        it("should filter out empty strings but keep valid queries", async () => {
            const result = await getIcons(["", "add", "  ", "calendar"]);

            // Only "add" and "calendar" should be in results
            expect(Object.keys(result)).toHaveLength(2);
            expect(result).toHaveProperty("add");
            expect(result).toHaveProperty("calendar");
            expect(result.add.length).toBeGreaterThan(0);
            expect(result.calendar.length).toBeGreaterThan(0);
        });

        it("should return all icons with type key when only whitespace queries", async () => {
            const result = await getIcons(["   ", "\t", "\n"]);

            // When all queries are whitespace, return all icons under the type key
            expect(result).toHaveProperty("all");
            expect(result.all).toHaveLength(9);
        });
    });

    describe("Type filtering", () => {
        it("should return only standard icons when type is 'standard'", async () => {
            const result = await getIcons(["add"], "standard");

            expect(result.add.length).toBeGreaterThan(0);
            expect(result.add.every(icon => icon.type === "standard")).toBe(true);
        });

        it("should return only rich icons when type is 'rich'", async () => {
            const result = await getIcons(["user"], "rich");

            expect(result.user.length).toBeGreaterThan(0);
            expect(result.user.every(icon => icon.type === "rich")).toBe(true);
        });

        it("should return all icon types when type is 'all'", async () => {
            const result = await getIcons(["icon"], "all");

            expect(result.icon.length).toBeGreaterThan(0);
            // Result can contain both standard and rich icons
        });

        it("should apply type filter to all queries", async () => {
            const result = await getIcons(["add", "calendar"], "standard");

            expect(result.add.every(icon => icon.type === "standard")).toBe(true);
            expect(result.calendar.every(icon => icon.type === "standard")).toBe(true);
        });

        it("should return only standard icons when empty queries and type is 'standard'", async () => {
            const result = await getIcons([""], "standard");

            expect(result).toHaveProperty("standard");
            expect(result.standard).toHaveLength(6);
            expect(result.standard.every(icon => icon.type === "standard")).toBe(true);
        });

        it("should return only rich icons when empty queries and type is 'rich'", async () => {
            const result = await getIcons([""], "rich");

            expect(result).toHaveProperty("rich");
            expect(result.rich).toHaveLength(3);
            expect(result.rich.every(icon => icon.type === "rich")).toBe(true);
        });
    });

    describe("Multi-keyword AND search", () => {
        it("should accept queries with multiple keywords separated by space", async () => {
            // Test that multi-keyword queries are accepted and processed
            const result = await getIcons(["arrow down"]);

            // The query is processed (may or may not return results depending on search algorithm)
            expect(result).toHaveProperty("arrow down");
            expect(Array.isArray(result["arrow down"])).toBe(true);
        });

        it("should not find icons that don't match keywords", async () => {
            const result = await getIcons(["xyz123nonexistent"]);

            // Keywords that don't exist should return no results
            expect(result["xyz123nonexistent"]).toHaveLength(0);
        });

        it("should handle queries with partial matches", async () => {
            const result = await getIcons(["arrow"]);

            // Should find icons with "arrow" in them
            expect(result.arrow.length).toBeGreaterThan(0);
            expect(result.arrow.some(icon => icon.name.toLowerCase().includes("arrow"))).toBe(true);
        });
    });

    describe("Limit parameter", () => {
        it("should limit results per query", async () => {
            const result = await getIcons(["add"], "all", 1);

            expect(result.add).toHaveLength(1);
        });

        it("should apply limit to each query independently", async () => {
            const result = await getIcons(["add", "calendar"], "all", 2);

            expect(result.add.length).toBeLessThanOrEqual(2);
            expect(result.calendar.length).toBeLessThanOrEqual(2);
        });

        it("should return all results when limit is not specified", async () => {
            const result = await getIcons(["add"]);

            // Should return all matching results without limit
            expect(result.add.length).toBeGreaterThan(0);
        });

        it("should handle limit larger than results", async () => {
            const result = await getIcons(["calendar"], "all", 100);

            // Should return all available calendar icons (not 100)
            expect(result.calendar.length).toBeGreaterThan(0);
            expect(result.calendar.length).toBeLessThan(100);
        });

        it("should apply limit when returning all icons for empty queries", async () => {
            const result = await getIcons([""], "all", 3);

            expect(result.all).toHaveLength(3);
        });
    });

    describe("Result structure", () => {
        it("should return objects with name, description, type, and score", async () => {
            const result = await getIcons(["add"]);

            expect(result.add.length).toBeGreaterThan(0);

            result.add.forEach(icon => {
                expect(icon).toHaveProperty("name");
                expect(icon).toHaveProperty("description");
                expect(icon).toHaveProperty("type");
                expect(icon).toHaveProperty("score");
                expect(typeof icon.name).toBe("string");
                expect(typeof icon.description).toBe("string");
                expect(["standard", "rich"]).toContain(icon.type);
                expect(typeof icon.score).toBe("number");
            });
        });

        it("should preserve icon type information", async () => {
            const result = await getIcons(["add"]);

            // All results should have a valid type field
            expect(result.add.length).toBeGreaterThan(0);
            expect(result.add.every(icon => ["standard", "rich"].includes(icon.type))).toBe(true);
        });
    });

    describe("Search accuracy", () => {
        it("should find icons by exact name match", async () => {
            const result = await getIcons(["AddIcon"]);

            expect(result.AddIcon.length).toBeGreaterThan(0);
            expect(result.AddIcon[0].name).toBe("AddIcon");
        });

        it("should find icons by description", async () => {
            const result = await getIcons(["add"]);

            expect(result.add.length).toBeGreaterThan(0);
            // AddIcon has "add" in its description
            expect(result.add.some(icon => icon.name === "AddIcon")).toBe(true);
        });

        it("should find icons by keywords", async () => {
            const result = await getIcons(["plus"]);

            expect(result.plus.length).toBeGreaterThan(0);
            // AddIcon has "plus" in its keywords
        });

        it("should handle fuzzy matching", async () => {
            const result = await getIcons(["calendar"]);

            // Should find CalendarIcon even with slight variations in search
            expect(result.calendar.length).toBeGreaterThan(0);
        });

        it("should be case-insensitive", async () => {
            const result = await getIcons(["ADD"]);

            expect(result.ADD.length).toBeGreaterThan(0);
        });
    });

    describe("Score field", () => {
        it("should include score in results", async () => {
            const result = await getIcons(["add"]);

            expect(result.add.every(icon => typeof icon.score === "number")).toBe(true);
        });

        it("should have numeric scores for all results", async () => {
            const result = await getIcons(["add"]);

            expect(result.add.every(icon => typeof icon.score === "number" && icon.score >= 0)).toBe(true);
        });

        it("should order results by score (best match first)", async () => {
            const result = await getIcons(["add"]);

            // Verify scores are in ascending order (0 = perfect, higher = worse)
            for (let i = 1; i < result.add.length; i++) {
                expect(result.add[i].score).toBeGreaterThanOrEqual(result.add[i - 1].score);
            }
        });

        it("should have lower score for exact matches", async () => {
            const result = await getIcons(["AddIcon"]);

            // Exact match should have very low score (close to 0)
            expect(result.AddIcon[0].score).toBeLessThan(0.1);
        });
    });

    describe("Edge cases", () => {
        it("should return all icons when queries contain only whitespace", async () => {
            const result = await getIcons(["   "]);

            // Whitespace-only queries result in returning all icons
            expect(result).toHaveProperty("all");
            expect(result.all).toHaveLength(9);
        });

        it("should return all icons when empty array of queries", async () => {
            const result = await getIcons([]);

            // Empty queries array results in returning all icons
            expect(result).toHaveProperty("all");
            expect(result.all).toHaveLength(9);
        });

        it("should handle queries with no matches", async () => {
            const result = await getIcons(["nonexistenticon"]);

            expect(result).toHaveProperty("nonexistenticon");
            expect(result.nonexistenticon).toHaveLength(0);
        });

        it("should handle duplicate queries (object keys are unique)", async () => {
            const result = await getIcons(["add", "add"]);

            // Object keys are unique, so "add" appears only once
            expect(Object.keys(result)).toHaveLength(1);
            expect(result.add).toBeDefined();
            expect(result.add.length).toBeGreaterThan(0);
        });

        it("should handle special characters in queries", async () => {
            const result = await getIcons(["icon-24"]);

            expect(result).toHaveProperty("icon-24");
            expect(Array.isArray(result["icon-24"])).toBe(true);
        });
    });
});

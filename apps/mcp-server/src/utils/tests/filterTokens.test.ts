import { filterTokens, type TokenFileRootNode } from "../tokenUtils";

describe("filterTokens", () => {
    const mockTokenData: TokenFileRootNode = {
        core: {
            color: {
                tokens: {
                    "hop-primary-100": {
                        propValue: "primary-100",
                        cssValue: "#e3f2fd"
                    },
                    "hop-primary-200": {
                        propValue: "primary-200",
                        cssValue: "#bbdefb"
                    },
                    "hop-secondary-100": {
                        propValue: "secondary-100",
                        cssValue: "#f3e5f5"
                    }
                },
                supportedProps: ["backgroundColor", "borderColor", "color"]
            },
            fontSize: {
                tokens: {
                    "hop-font-size-sm": {
                        propValue: "sm",
                        cssValue: "0.875rem"
                    },
                    "hop-font-size-md": {
                        propValue: "md",
                        cssValue: "1rem"
                    },
                    "hop-font-size-lg": {
                        propValue: "lg",
                        cssValue: "1.125rem"
                    }
                },
                supportedProps: ["fontSize"]
            },
            spacing: {
                tokens: {
                    "hop-space-sm": {
                        propValue: "sm",
                        cssValue: "0.5rem"
                    },
                    "hop-space-md": {
                        propValue: "md",
                        cssValue: "1rem"
                    }
                },
                supportedProps: ["padding", "margin", "gap"]
            }
        },
        semantic: {
            color: {
                tokens: {
                    "hop-danger-text": {
                        propValue: "danger",
                        cssValue: "#d32f2f"
                    },
                    "hop-success-text": {
                        propValue: "success",
                        cssValue: "#388e3c"
                    }
                },
                supportedProps: ["color", "fill", "stroke"]
            },
            shadow: {
                tokens: {
                    "hop-elevation-low": {
                        propValue: "low",
                        cssValue: "0 1px 3px rgba(0,0,0,0.12)"
                    }
                },
                supportedProps: ["boxShadow"]
            },
            typography: {
                tokens: {
                    "hop-heading-font": {
                        propValue: "heading",
                        cssValue: "Inter, sans-serif"
                    }
                }
                // No supportedProps defined - this category should be filtered out
            }
        }
    };

    describe("filterBySupportedProps", () => {
        it("should return all categories when no supportedProps filter is provided", () => {
            const result = filterTokens(mockTokenData, [], [], []);
            expect(result).toEqual(mockTokenData);
        });

        it("should filter categories by a single supported prop", () => {
            const result = filterTokens(mockTokenData, [], [], ["backgroundColor"]);

            expect(result.core).toBeDefined();
            expect(result.core?.color).toBeDefined();
            expect(result.core?.fontSize).toBeUndefined();
            expect(result.core?.spacing).toBeUndefined();
            expect(result.semantic).toBeUndefined();
        });

        it("should filter categories by multiple supported props", () => {
            const result = filterTokens(mockTokenData, [], [], ["padding", "margin"]);

            expect(result.core).toBeDefined();
            expect(result.core?.spacing).toBeDefined();
            expect(result.core?.color).toBeUndefined();
            expect(result.core?.fontSize).toBeUndefined();
            expect(result.semantic).toBeUndefined();
        });

        it("should include categories that support any of the requested props", () => {
            const result = filterTokens(mockTokenData, [], [], ["color", "boxShadow"]);

            expect(result.core).toBeDefined();
            expect(result.core?.color).toBeDefined();
            expect(result.semantic).toBeDefined();
            expect(result.semantic?.color).toBeDefined();
            expect(result.semantic?.shadow).toBeDefined();
            expect(result.semantic?.typography).toBeUndefined(); // No supportedProps
            expect(result.core?.fontSize).toBeUndefined();
            expect(result.core?.spacing).toBeUndefined();
        });

        it("should exclude categories without supportedProps defined", () => {
            const result = filterTokens(mockTokenData, [], [], ["fontFamily"]);

            // Typography category doesn't have supportedProps, so it shouldn't be included
            expect(result.semantic?.typography).toBeUndefined();
        });

        it("should return empty object when no categories match the supportedProps", () => {
            const result = filterTokens(mockTokenData, [], [], ["nonExistentProp"]);

            expect(result).toEqual({});
        });

        it("should preserve all tokens in matching categories", () => {
            const result = filterTokens(mockTokenData, [], [], ["fontSize"]);

            expect(result.core?.fontSize).toBeDefined();
            expect(Object.keys(result.core!.fontSize!.tokens)).toHaveLength(3);
            expect(result.core!.fontSize!.tokens["hop-font-size-sm"]).toEqual({
                propValue: "sm",
                cssValue: "0.875rem"
            });
        });
    });

    describe("combined filters", () => {
        it("should apply supportedProps filter before tokenNames filter", () => {
            const result = filterTokens(mockTokenData, ["primary"], [], ["backgroundColor"]);

            // Should have core.color category with only primary tokens
            expect(result.core?.color).toBeDefined();
            expect(Object.keys(result.core!.color!.tokens)).toHaveLength(2);
            expect(result.core!.color!.tokens["hop-primary-100"]).toBeDefined();
            expect(result.core!.color!.tokens["hop-primary-200"]).toBeDefined();
            expect(result.core!.color!.tokens["hop-secondary-100"]).toBeUndefined();
        });

        it("should apply supportedProps filter before cssValues filter", () => {
            const result = filterTokens(mockTokenData, [], ["1rem"], ["fontSize", "padding"]);

            // Should have fontSize and spacing categories, tokens with values close to 1rem
            expect(result.core?.fontSize).toBeDefined();
            // With tolerance, all fontSize tokens should match (0.875rem, 1rem, 1.125rem are close)
            expect(Object.keys(result.core!.fontSize!.tokens).length).toBeGreaterThan(0);
            expect(result.core!.fontSize!.tokens["hop-font-size-md"]).toBeDefined();

            expect(result.core?.spacing).toBeDefined();
            expect(Object.keys(result.core!.spacing!.tokens)).toHaveLength(1);
            expect(result.core!.spacing!.tokens["hop-space-md"]).toBeDefined();
        });

        it("should apply all three filters in correct order", () => {
            const result = filterTokens(mockTokenData, ["danger"], ["#d32f2f"], ["color"]);

            // Should only have semantic.color category with danger-text token
            expect(result.semantic?.color).toBeDefined();
            expect(Object.keys(result.semantic!.color!.tokens)).toHaveLength(1);
            expect(result.semantic!.color!.tokens["hop-danger-text"]).toBeDefined();
            expect(result.core).toBeUndefined();
        });

        it("should return empty when filters don't overlap", () => {
            const result = filterTokens(mockTokenData, ["primary"], [], ["boxShadow"]);

            // boxShadow is only in semantic.shadow, but primary tokens are in core.color
            expect(result).toEqual({});
        });
    });

    describe("edge cases", () => {
        it("should handle empty token data", () => {
            const result = filterTokens({}, [], [], ["backgroundColor"]);
            expect(result).toEqual({});
        });

        it("should handle categories with empty tokens", () => {
            const dataWithEmptyTokens: TokenFileRootNode = {
                core: {
                    color: {
                        tokens: {},
                        supportedProps: ["backgroundColor"]
                    }
                }
            };

            const result = filterTokens(dataWithEmptyTokens, [], [], ["backgroundColor"]);
            expect(result.core?.color).toBeDefined();
            expect(result.core!.color!.tokens).toEqual({});
        });

        it("should handle multiple filters returning no results", () => {
            const result = filterTokens(mockTokenData, ["nonexistent"], ["#000000"], ["unknownProp"]);
            expect(result).toEqual({});
        });
    });
});
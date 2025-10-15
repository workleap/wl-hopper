import { convertToBriefFormat } from "../tokenUtils";

describe("convertToBriefFormat", () => {
    describe("Basic conversions", () => {
        it("should convert a simple token object from full to brief format", () => {
            const fullFormat = {
                "hop-color-red": {
                    propValue: "red-500",
                    cssValue: "#ff0000"
                }
            };

            const result = convertToBriefFormat(fullFormat);

            expect(result).toEqual({
                "hop-color-red": "red-500"
            });
        });

        it("should convert multiple tokens at the same level", () => {
            const fullFormat = {
                "hop-color-red": {
                    propValue: "red-500",
                    cssValue: "#ff0000"
                },
                "hop-color-blue": {
                    propValue: "blue-500",
                    cssValue: "#0000ff"
                }
            };

            const result = convertToBriefFormat(fullFormat);

            expect(result).toEqual({
                "hop-color-red": "red-500",
                "hop-color-blue": "blue-500"
            });
        });
    });

    describe("Nested structures", () => {
        it("should convert nested token structures", () => {
            const fullFormat = {
                semantic: {
                    color: {
                        "hop-danger-border": {
                            propValue: "danger-active",
                            cssValue: "#ba2d2d"
                        }
                    }
                }
            };

            const result = convertToBriefFormat(fullFormat);

            expect(result).toEqual({
                semantic: {
                    color: {
                        "hop-danger-border": "danger-active"
                    }
                }
            });
        });

        it("should convert deeply nested structures", () => {
            const fullFormat = {
                core: {
                    color: {
                        "hop-coastal-25": {
                            propValue: "core_coastal-25",
                            cssValue: "#e0f4f8"
                        }
                    },
                    fontSize: {
                        "hop-font-size-120": {
                            propValue: "core_120",
                            cssValue: "1.2rem"
                        }
                    }
                },
                semantic: {
                    color: {
                        "hop-danger-border": {
                            propValue: "danger",
                            cssValue: "#ba2d2d"
                        }
                    }
                }
            };

            const result = convertToBriefFormat(fullFormat);

            expect(result).toEqual({
                core: {
                    color: {
                        "hop-coastal-25": "core_coastal-25"
                    },
                    fontSize: {
                        "hop-font-size-120": "core_120"
                    }
                },
                semantic: {
                    color: {
                        "hop-danger-border": "danger"
                    }
                }
            });
        });
    });

    describe("Edge cases", () => {
        it("should handle null input", () => {
            const result = convertToBriefFormat(null);
            expect(result).toBeNull();
        });

        it("should handle undefined input", () => {
            const result = convertToBriefFormat(undefined);
            expect(result).toBeUndefined();
        });

        it("should handle primitive values", () => {
            expect(convertToBriefFormat("string")).toBe("string");
            expect(convertToBriefFormat(123)).toBe(123);
            expect(convertToBriefFormat(true)).toBe(true);
        });

        it("should handle empty objects", () => {
            const result = convertToBriefFormat({});
            expect(result).toEqual({});
        });

        it("should handle objects with non-token properties", () => {
            const fullFormat = {
                someProperty: "value",
                nested: {
                    anotherProperty: "another-value"
                }
            };

            const result = convertToBriefFormat(fullFormat);

            expect(result).toEqual({
                someProperty: "value",
                nested: {
                    anotherProperty: "another-value"
                }
            });
        });

        it("should handle mixed token and non-token properties", () => {
            const fullFormat = {
                metadata: {
                    version: "1.0.0"
                },
                tokens: {
                    "hop-color-red": {
                        propValue: "red-500",
                        cssValue: "#ff0000"
                    }
                }
            };

            const result = convertToBriefFormat(fullFormat);

            expect(result).toEqual({
                metadata: {
                    version: "1.0.0"
                },
                tokens: {
                    "hop-color-red": "red-500"
                }
            });
        });
    });

    describe("Array handling", () => {
        it("should handle arrays of token objects", () => {
            const fullFormat = [
                {
                    "hop-color-red": {
                        propValue: "red-500",
                        cssValue: "#ff0000"
                    }
                },
                {
                    "hop-color-blue": {
                        propValue: "blue-500",
                        cssValue: "#0000ff"
                    }
                }
            ];

            const result = convertToBriefFormat(fullFormat);

            expect(result).toEqual([
                { "hop-color-red": "red-500" },
                { "hop-color-blue": "blue-500" }
            ]);
        });

        it("should handle nested arrays", () => {
            const fullFormat = {
                colors: [
                    {
                        "hop-red": {
                            propValue: "red",
                            cssValue: "#ff0000"
                        }
                    }
                ]
            };

            const result = convertToBriefFormat(fullFormat);

            expect(result).toEqual({
                colors: [
                    { "hop-red": "red" }
                ]
            });
        });
    });

    describe("Real-world token structures", () => {
        it("should convert semantic color tokens", () => {
            const fullFormat = {
                semantic: {
                    color: {
                        "hop-danger-border-active": {
                            propValue: "danger-active",
                            cssValue: "#ba2d2d"
                        },
                        "hop-success-border": {
                            propValue: "success",
                            cssValue: "#2e7d32"
                        }
                    }
                }
            };

            const result = convertToBriefFormat(fullFormat);

            expect(result).toEqual({
                semantic: {
                    color: {
                        "hop-danger-border-active": "danger-active",
                        "hop-success-border": "success"
                    }
                }
            });
        });

        it("should convert core font weight tokens", () => {
            const fullFormat = {
                core: {
                    fontWeight: {
                        "hop-font-weight-400": {
                            propValue: "400",
                            cssValue: "400"
                        },
                        "hop-font-weight-500": {
                            propValue: "500",
                            cssValue: "500"
                        }
                    }
                }
            };

            const result = convertToBriefFormat(fullFormat);

            expect(result).toEqual({
                core: {
                    fontWeight: {
                        "hop-font-weight-400": "400",
                        "hop-font-weight-500": "500"
                    }
                }
            });
        });

        it("should preserve empty categories after conversion", () => {
            const fullFormat = {
                core: {
                    color: {},
                    fontSize: {
                        "hop-font-size-120": {
                            propValue: "core_120",
                            cssValue: "1.2rem"
                        }
                    }
                }
            };

            const result = convertToBriefFormat(fullFormat);

            expect(result).toEqual({
                core: {
                    color: {},
                    fontSize: {
                        "hop-font-size-120": "core_120"
                    }
                }
            });
        });
    });

    describe("Type safety", () => {
        it("should only extract propValue from objects with both propValue and cssValue", () => {
            const fullFormat = {
                validToken: {
                    propValue: "value1",
                    cssValue: "#abc"
                },
                // Object with only propValue (not a valid token)
                partialToken: {
                    propValue: "value2"
                },
                // Object with only cssValue (not a valid token)
                anotherPartial: {
                    cssValue: "#def"
                },
                // Object with different properties
                metadata: {
                    name: "test",
                    version: "1.0"
                }
            };

            const result = convertToBriefFormat(fullFormat);

            expect(result).toEqual({
                validToken: "value1",
                partialToken: {
                    propValue: "value2"
                },
                anotherPartial: {
                    cssValue: "#def"
                },
                metadata: {
                    name: "test",
                    version: "1.0"
                }
            });
        });
    });
});

import { convertToBriefFormat } from "../tokenUtils";

describe("convertToBriefFormat", () => {
    describe("Basic conversions", () => {
        it("should convert a simple token object from full to brief format", () => {
            const fullFormat = {
                core: {
                    color: {
                        tokens: {
                            "hop-color-red": {
                                propValue: "red-500",
                                cssValue: "#ff0000"
                            }
                        }
                    }
                }
            };

            const result = convertToBriefFormat(fullFormat);

            expect(result).toEqual({
                core: {
                    color: {
                        tokens: {
                            "hop-color-red": "red-500"
                        }
                    }
                }
            });
        });

        it("should convert multiple tokens at the same level", () => {
            const fullFormat = {
                core: {
                    color: {
                        tokens: {
                            "hop-color-red": {
                                propValue: "red-500",
                                cssValue: "#ff0000"
                            },
                            "hop-color-blue": {
                                propValue: "blue-500",
                                cssValue: "#0000ff"
                            }
                        }
                    }
                }
            };

            const result = convertToBriefFormat(fullFormat);

            expect(result).toEqual({
                core: {
                    color: {
                        tokens: {
                            "hop-color-red": "red-500",
                            "hop-color-blue": "blue-500"
                        }
                    }
                }
            });
        });
    });

    describe("Nested structures", () => {
        it("should convert nested token structures", () => {
            const fullFormat = {
                semantic: {
                    color: {
                        tokens: {
                            "hop-danger-border": {
                                propValue: "danger-active",
                                cssValue: "#ba2d2d"
                            }
                        }
                    }
                }
            };

            const result = convertToBriefFormat(fullFormat);

            expect(result).toEqual({
                semantic: {
                    color: {
                        tokens: {
                            "hop-danger-border": "danger-active"
                        }
                    }
                }
            });
        });

        it("should convert deeply nested structures", () => {
            const fullFormat = {
                core: {
                    color: {
                        tokens: {
                            "hop-coastal-25": {
                                propValue: "core_coastal-25",
                                cssValue: "#e0f4f8"
                            }
                        }
                    },
                    fontSize: {
                        tokens: {
                            "hop-font-size-120": {
                                propValue: "core_120",
                                cssValue: "1.2rem"
                            }
                        }
                    }
                },
                semantic: {
                    color: {
                        tokens: {
                            "hop-danger-border": {
                                propValue: "danger",
                                cssValue: "#ba2d2d"
                            }
                        }
                    }
                }
            };

            const result = convertToBriefFormat(fullFormat);

            expect(result).toEqual({
                core: {
                    color: {
                        tokens: {
                            "hop-coastal-25": "core_coastal-25"
                        }
                    },
                    fontSize: {
                        tokens: {
                            "hop-font-size-120": "core_120"
                        }
                    }
                },
                semantic: {
                    color: {
                        tokens: {
                            "hop-danger-border": "danger"
                        }
                    }
                }
            });
        });
    });

    describe("Edge cases", () => {
        it("should handle empty objects", () => {
            const result = convertToBriefFormat({});
            expect(result).toEqual({});
        });

        it("should handle object with only core tokens", () => {
            const fullFormat = {
                core: {
                    color: {
                        tokens: {
                            "hop-color-red": {
                                propValue: "red-500",
                                cssValue: "#ff0000"
                            }
                        }
                    }
                }
            };

            const result = convertToBriefFormat(fullFormat);

            expect(result).toEqual({
                core: {
                    color: {
                        tokens: {
                            "hop-color-red": "red-500"
                        }
                    }
                }
            });
        });

        it("should handle object with only semantic tokens", () => {
            const fullFormat = {
                semantic: {
                    color: {
                        tokens: {
                            "hop-danger-border": {
                                propValue: "danger",
                                cssValue: "#ba2d2d"
                            }
                        }
                    }
                }
            };

            const result = convertToBriefFormat(fullFormat);

            expect(result).toEqual({
                semantic: {
                    color: {
                        tokens: {
                            "hop-danger-border": "danger"
                        }
                    }
                }
            });
        });

        it("should handle categories with supportedProps", () => {
            const fullFormat = {
                core: {
                    color: {
                        tokens: {
                            "hop-color-red": {
                                propValue: "red-500",
                                cssValue: "#ff0000"
                            }
                        },
                        supportedProps: ["backgroundColor", "borderColor"]
                    }
                }
            };

            const result = convertToBriefFormat(fullFormat);

            expect(result).toEqual({
                core: {
                    color: {
                        tokens: {
                            "hop-color-red": "red-500"
                        },
                        supportedProps: ["backgroundColor", "borderColor"]
                    }
                }
            });
        });
    });


    describe("Real-world token structures", () => {
        it("should convert semantic color tokens", () => {
            const fullFormat = {
                semantic: {
                    color: {
                        tokens: {
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
                }
            };

            const result = convertToBriefFormat(fullFormat);

            expect(result).toEqual({
                semantic: {
                    color: {
                        tokens: {
                            "hop-danger-border-active": "danger-active",
                            "hop-success-border": "success"
                        }
                    }
                }
            });
        });

        it("should convert core font weight tokens", () => {
            const fullFormat = {
                core: {
                    fontWeight: {
                        tokens: {
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
                }
            };

            const result = convertToBriefFormat(fullFormat);

            expect(result).toEqual({
                core: {
                    fontWeight: {
                        tokens: {
                            "hop-font-weight-400": "400",
                            "hop-font-weight-500": "500"
                        }
                    }
                }
            });
        });

        it("should preserve empty categories after conversion", () => {
            const fullFormat = {
                core: {
                    color: {
                        tokens: {}
                    },
                    fontSize: {
                        tokens: {
                            "hop-font-size-120": {
                                propValue: "core_120",
                                cssValue: "1.2rem"
                            }
                        }
                    }
                }
            };

            const result = convertToBriefFormat(fullFormat);

            expect(result).toEqual({
                core: {
                    color: {
                        tokens: {}
                    },
                    fontSize: {
                        tokens: {
                            "hop-font-size-120": "core_120"
                        }
                    }
                }
            });
        });
    });
});

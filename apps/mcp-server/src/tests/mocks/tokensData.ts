import { convertToBriefFormat, TokenCategoryNode, TokenFileBriefRootNode, TokenFileRootNode } from "../../utils/tokenFilters.js";

// ============================================================================
// CORE TOKENS
// ============================================================================

const CORE_TOKENS_FULL: Record<string, TokenCategoryNode> = {
    color: {
        tokens: {
            "hop-coastal-25": {
                propValue: "core_coastal-25",
                cssValue: "#e0f4f8"
            },
            "hop-primary-surface": {
                propValue: "primary",
                cssValue: "#1a73e8"
            }
        },
        supportedProps: ["backgroundColor", "color", "borderColor"]
    },
    fontSize: {
        tokens: {
            "hop-font-size-120": {
                propValue: "core_120",
                cssValue: "1.2rem"
            }
        },
        supportedProps: ["fontSize"]
    },
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
        },
        supportedProps: ["fontWeight"]
    },
    size: {
        tokens: {
            "hop-space-160": {
                propValue: "core_160",
                cssValue: "1rem"
            },
            "hop-space-240": {
                propValue: "core_240",
                cssValue: "1.5rem"
            },
            "hop-space-320": {
                propValue: "core_320",
                cssValue: "2rem"
            }
        },
        supportedProps: ["width"]
    }
};

// ============================================================================
// SEMANTIC TOKENS
// ============================================================================

const SEMANTIC_TOKENS_FULL = {
    color: {
        tokens: {
            "hop-danger-border-active": {
                propValue: "danger-active",
                cssValue: "#ba2d2d"
            },
            "hop-danger-icon-active": {
                propValue: "danger-active",
                cssValue: "#ba2d2d"
            },
            "hop-success-border": {
                propValue: "success",
                cssValue: "#2e7d32"
            },
            "hop-neutral-surface": {
                propValue: "neutral",
                cssValue: "#ffffff"
            }
        },
        supportedProps: ["backgroundColor", "color", "borderColor", "fill", "stroke"]
    },
    paddingSize: {
        tokens: {
            "hop-space-inset-xs": {
                propValue: "inset-xs",
                cssValue: "0.5rem"
            }
        },
        supportedProps: ["padding"]
    },
    marginSize: {
        tokens: {
            "hop-space-stack-xs": {
                propValue: "stack-xs",
                cssValue: "0.5rem"
            }
        },
        supportedProps: ["margin", "gap"]
    },
    shadow: {
        tokens: {
            "hop-elevation-none": {
                propValue: "none",
                cssValue: "none"
            }
        },
        supportedProps: ["boxShadow"]
    },
    fontFamily: {
        tokens: {
            "hop-overline-font-family": {
                propValue: "overline",
                cssValue: "Arial, sans-serif"
            }
        },
        supportedProps: ["fontFamily"]
    }
};

// ============================================================================
// EXPORTED MOCKS - ALL TOKENS
// ============================================================================

/**
 * All tokens in full format (with both propValue and cssValue)
 */
export const MOCK_TOKENS_FULL: TokenFileRootNode = {
    core: CORE_TOKENS_FULL,
    semantic: SEMANTIC_TOKENS_FULL
} as const;

/**
 * All tokens in brief format (propValue only)
 * Automatically derived from MOCK_TOKENS_FULL using convertToBriefFormat
 */
export const MOCK_TOKENS_BRIEF = convertToBriefFormat(MOCK_TOKENS_FULL);

// ============================================================================
// EXPORTED MOCKS - SPECIFIC CATEGORIES
// ============================================================================

/**
 * Semantic shadow tokens in full format
 */
export const MOCK_TOKENS_SEMANTIC_SHADOW_FULL: TokenFileRootNode = {
    semantic: {
        shadow: SEMANTIC_TOKENS_FULL.shadow
    }
} as const;

/**
 * Semantic shadow tokens in brief format
 */
export const MOCK_TOKENS_SEMANTIC_SHADOW_BRIEF: TokenFileBriefRootNode = convertToBriefFormat({
    semantic: {
        shadow: SEMANTIC_TOKENS_FULL.shadow
    }
});

/**
 * Semantic color tokens in full format
 */
export const MOCK_TOKENS_SEMANTIC_COLOR_FULL = {
    semantic: {
        color: SEMANTIC_TOKENS_FULL.color
    }
} as const;

export const MOCK_TOKENS_SEMANTIC_SIZE_PADDING_FULL = {
    semantic: {
        paddingSize: SEMANTIC_TOKENS_FULL.paddingSize
    }
} as const;

export const MOCK_TOKENS_SEMANTIC_SIZE_MARGIN_FULL = {
    semantic: {
        marginSize: SEMANTIC_TOKENS_FULL.marginSize
    }
} as const;

/**
 * Semantic color tokens in brief format
 */
export const MOCK_TOKENS_SEMANTIC_COLOR_BRIEF: TokenFileBriefRootNode = convertToBriefFormat({
    semantic: {
        color: SEMANTIC_TOKENS_FULL.color
    }
});

/**
 * Core font weight tokens in full format
 */
export const MOCK_TOKENS_CORE_FONT_WEIGHT_FULL = {
    core: {
        fontWeight: CORE_TOKENS_FULL.fontWeight
    }
} as const;

/**
 * Core font weight tokens in brief format
 */
export const MOCK_TOKENS_CORE_FONT_WEIGHT_BRIEF: TokenFileBriefRootNode = convertToBriefFormat({
    core: {
        fontWeight: CORE_TOKENS_FULL.fontWeight
    }
});

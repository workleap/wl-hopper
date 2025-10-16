/**
 * Mock token data for testing
 *
 * This file provides mock token data in both brief and full formats.
 * The structure mirrors the actual token files used in production.
 *
 * Brief format: { "token-name": "value" }
 * Full format: { "token-name": { propValue: "value", cssValue: "#abc123" } }
 */

import { convertToBriefFormat } from "../../utils/tokenUtils.js";

// Type definitions for better type safety
export type TokenValue = string;
export type TokenValueFull = {
    propValue: string;
    cssValue: string;
};

export type TokenCategory = {
    [key: string]: TokenValue | TokenCategory;
};

export type TokenCategoryFull = {
    [key: string]: TokenValueFull | TokenCategoryFull;
};

// ============================================================================
// CORE TOKENS
// ============================================================================

const CORE_TOKENS_FULL = {
    color: {
        "hop-coastal-25": {
            propValue: "core_coastal-25",
            cssValue: "#e0f4f8"
        },
        "hop-primary-surface": {
            propValue: "primary",
            cssValue: "#1a73e8"
        }
    },
    fontSize: {
        "hop-font-size-120": {
            propValue: "core_120",
            cssValue: "1.2rem"
        }
    },
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
} as const;

// ============================================================================
// SEMANTIC TOKENS
// ============================================================================

const SEMANTIC_TOKENS_FULL = {
    color: {
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
    size: {
        "hop-space-inset-xs": {
            propValue: "inset-xs",
            cssValue: "0.5rem"
        }
    },
    shadow: {
        "hop-elevation-none": {
            propValue: "none",
            cssValue: "none"
        }
    },
    fontFamily: {
        "hop-overline-font-family": {
            propValue: "overline",
            cssValue: "Arial, sans-serif"
        }
    }
} as const;

// ============================================================================
// EXPORTED MOCKS - ALL TOKENS
// ============================================================================

/**
 * All tokens in full format (with both propValue and cssValue)
 */
export const MOCK_TOKENS_FULL = {
    core: CORE_TOKENS_FULL,
    semantic: SEMANTIC_TOKENS_FULL
} as const;

/**
 * All tokens in brief format (propValue only)
 * Automatically derived from MOCK_TOKENS_FULL using convertToBriefFormat
 */
export const MOCK_TOKENS = convertToBriefFormat({
    core: CORE_TOKENS_FULL,
    semantic: SEMANTIC_TOKENS_FULL
}) as TokenCategory;

// ============================================================================
// EXPORTED MOCKS - SPECIFIC CATEGORIES
// ============================================================================

/**
 * Semantic shadow tokens in full format
 */
export const MOCK_TOKENS_SEMANTIC_SHADOW_FULL = {
    semantic: {
        shadow: SEMANTIC_TOKENS_FULL.shadow
    }
} as const;

/**
 * Semantic shadow tokens in brief format
 */
export const MOCK_TOKENS_SEMANTIC_SHADOW_BRIEF = {
    semantic: {
        shadow: (convertToBriefFormat({ shadow: SEMANTIC_TOKENS_FULL.shadow }) as TokenCategory).shadow
    }
};

/**
 * Semantic color tokens in full format
 */
export const MOCK_TOKENS_SEMANTIC_COLOR_FULL = {
    semantic: {
        color: SEMANTIC_TOKENS_FULL.color
    }
} as const;

/**
 * Semantic color tokens in brief format
 */
export const MOCK_TOKENS_SEMANTIC_COLOR_BRIEF = {
    semantic: {
        color: (convertToBriefFormat({ color: SEMANTIC_TOKENS_FULL.color }) as TokenCategory).color
    }
};

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
export const MOCK_TOKENS_CORE_FONT_WEIGHT_BRIEF = {
    core: {
        fontWeight: (convertToBriefFormat({ fontWeight: CORE_TOKENS_FULL.fontWeight }) as TokenCategory).fontWeight
    }
};

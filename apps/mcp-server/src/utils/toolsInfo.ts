/* eslint-disable max-len */

import { GuideFiles, type GuideSection, type TokenCategory, TokenGuideFiles, TokenMapFiles } from "./docs";

const CategoryDescriptions: { [key in TokenCategory]: string } = {
    "semantic-color": "Semantic colors for text, surfaces, borders, and icons with interactive states",
    "semantic-elevation": "Box shadows for creating depth and hierarchy in interfaces",
    "semantic-shape": "Border radius values for rounded corners and circular elements",
    "semantic-space": "Spacing tokens for padding, margin, and layout gaps",
    "semantic-typography": "Font styles, sizes, and weights for headings and body text",
    "core-border-radius": "Fundamental border radius values from 0 to full circles",
    "core-color": "Raw color palette values across all brand color scales",
    "core-dimensions": "Base spacing units from 0 to 8rem for layouts",
    "core-font-family": "Typography font stacks for primary, secondary, and monospace",
    "core-font-size": "Font size scale from 0.75rem to 3rem",
    "core-font-weight": "Font weight values from 400 to 690",
    "core-line-height": "Line height ratios for consistent vertical rhythm",
    "core-motion": "Animation durations and easing functions for transitions",
    "core-shadow": "Box shadow values for elevation effects",
    "all-semantic": "All semantic design tokens",
    "all-core": "All core design tokens",
    all: "All available design tokens. Note: This may result in a large payload; for better performance and readability, it is recommended to use specific categories when possible"
} as const;

const GuideDescriptions: { [key in GuideSection]: string } = {
    installation: "How to install and set up the Hopper Design System",
    "components-list": "Get a list of all components in the Hopper Design System.",
    styles: "How to use CSS properties and design tokens in Hopper Design System. Read this guide to understand how",
    layout: "Building application layouts using Flex or Grid",
    "escape-hatches": "It lists the ONLY available UNSAFE_* props in JSON format.",
    "color-schemes": "Applying light mode, dark mode, or adapt to operating system's dark mode",
    icons: "Using and designing standard, rich, and SVG icons in Hopper for React and other frameworks",
    "controlled-mode": "Using controlled and uncontrolled modes to customize components",
    forms: "Best practices for building forms in Hopper Design System",
    slots: "How Hopper components include predefined layouts that you can insert elements into via slots. Slots are named areas in a component that receive children and provide style and layout for them",
    internationalization: "Adapting components to respect languages and cultures",
    "figma-conventions": "Figma → Hopper Translation Guide",
    tokens: "Get design system tokens, their component props value, and their raw values by category. You must provide the category parameter.",
    "tooling-cli": "Analyze component usage across Hopper and Orbiter codebases, and automate migrations (Orbiter→Hopper, OV→Hopper) using 'pnpx \"@workleap/migrations\"@latest'. Generate usage reports, migration plans, and automated code transformations."
} as const;

export function generateDesignTokensDescription(): string {
    let description = "Available token categories:\n";

    for (const [category, categoryDescription] of Object.entries(CategoryDescriptions)) {
        const fileInfo = TokenGuideFiles[category as keyof typeof TokenGuideFiles];
        const tokenCount = fileInfo?.estimatedTokens || 0;
        description += `        - ${category}: ${categoryDescription} (size: ${tokenCount} LLM tokens)\n`;
    }

    return description.trim();
}

export function generateTokenMapsDescription(): string {
    let description = "Available token categories:\n";

    for (const [category, categoryDescription] of Object.entries(CategoryDescriptions)) {
        const mapFiles = TokenMapFiles[category as keyof typeof TokenMapFiles];
        const totalTokens = mapFiles ? mapFiles["brief"].reduce((sum, file) => sum + (file.estimatedTokens || 0), 0) : 0;
        description += `        - ${category}: ${categoryDescription} (size: ${totalTokens} LLM tokens)\n`;
    }

    return description.trim();
}

export function generateGuidesDescription(): string {
    let description = "Available guides:\n";

    for (const [guide, guideDescription] of Object.entries(GuideDescriptions)) {
        const tokenCount = GuideFiles[guide as GuideSection]?.estimatedTokens || 0;
        description += `        - ${guide}: ${guideDescription} (size: ${tokenCount} LLM tokens)\n`;
    }

    return description.trim();
}

export const paginationParamsInfo = {
    page_size: "Maximum number of tokens to return per page. **DEFAULT: Leave unset for full results.** ONLY specify this on the first call to start pagination. Once set, the page size is fixed for the entire pagination session. Use high values (e.g. 20000+) for better performance. Low limits may lead to suboptimal implementations.",
    cursor: "Pagination cursor from the previous response. **DEFAULT: Leave unset for the first page.** Use the 'next_cursor' value from the previous response to get the next page. Do not modify this value manually - it encodes both position and page size information."
};

export const toolsInfo = {
    get_component_doc: {
        name: "get_component_doc",
        title: "Get component documentation",
        description: "Get component documentation including usage, anatomy, structure, props, and best practices.\n**IT IS VERY IMPORTANT TO READ COMPONENT DOCUMENTATION BEFORE USING IT TO AVOID STRUCTURE MISTAKES.**",
        parameters: {
            doc_type: `Type of documentation to retrieve:
                - 'usage': Component anatomy, structure, examples, dos and don'ts, and best practices
                - 'props': Brief component props/API as JSON (important fields only)
                - 'props-full': Full component props/API as JSON (all fields)`
        }
    },

    get_guide: {
        name: "get_guide",
        title: "Get guide or best practices",
        description: generateGuidesDescription(),
        parameters: {
            category:  generateDesignTokensDescription()
        }
    },
    get_design_tokens_map: {
        name: "get_design_tokens_map",
        title: "Get design system tokens map to component props as JSON",
        description: "Get all design tokens mapped to component props in JSON format.\n- This is very helpful when you are generating code from Figma design.\n- You can use this service to find the right value for each component prop or get all tokens mapped to all component props. E.g hop-information-text-weak -> information-weak",
        parameters: {
            category: generateTokenMapsDescription(),
            token_names: "Filter tokens by their Hopper token names (case-insensitive, partial match). Pass actual token names like 'hop-neutral-text', NOT CSS values like '#3c3c3c'. Examples: ['hop-neutral-text', 'hop-primary-surface', 'hop-space-stack-md']",
            include_css_values: "Whether to include token css values in the response. **DEFAULT: false**"
        }
    },

    validate_hopper_code: {
        name: "validate_hopper_code",
        title: "Validate & lint Hopper Code",
        description: "Validates Hopper component implementation including design tokens, prop values, UNSAFE_ usage, component structure, and layout patterns. Returns errors and warnings. Use after implementing or changing Hopper components."
    },
    migrate_from_orbiter_to_hopper: {
        name: "migrate_from_orbiter_to_hopper",
        title: "Migrate a file or all files in the folder from Orbiter to Hopper",
        description: "It migrates a file or all files in the folder from Orbiter to Hopper."
    },
    get_icons: {
        name: "get_icons",
        title: "Search for Hopper icons",
        description: "Search for Hopper icons with multiple queries. Each query can contain multiple keywords separated by space (treated as AND). Returns a map of query to results. When all queries are missed, returns all icons under the type key.",
        parameters: {
            queries: "Optional. Array of search queries (e.g., ['add', 'new product']). Each query can have multiple keywords separated by space. Empty/whitespace-only queries are ignored.",
            type: "Filter by icon type (default: 'all')",
            limit: "Optional. Max results to return per query. If omitted, returns all matching results. **Recommended:** Use limit=5 when providing queries to get focused results."
        }
    }
} as const;

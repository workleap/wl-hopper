/* eslint-disable max-len */

import { files } from "@docs/ai";

export function generateTokenCategoriesDescription(): string {
    const tokenDescriptions: Record<string, { description: string; tokenFile?: any; parameters?: Record<string, string> }> = {
        "semantic-color": {
            description: "Semantic colors for text, surfaces, borders, and icons with interactive states",
            tokenFile: files.tokens.semantic.color
        },
        "semantic-elevation": {
            description: "Box shadows for creating depth and hierarchy in interfaces",
            tokenFile: files.tokens.semantic.elevation
        },
        "semantic-shape": {
            description: "Border radius values for rounded corners and circular elements",
            tokenFile: files.tokens.semantic.shape
        },
        "semantic-space": {
            description: "Spacing tokens for padding, margin, and layout gaps",
            tokenFile: files.tokens.semantic.space
        },
        "semantic-typography": {
            description: "Font styles, sizes, and weights for headings and body text",
            tokenFile: files.tokens.semantic.typography
        },
        "core-border-radius": {
            description: "Fundamental border radius values from 0 to full circles",
            tokenFile: files.tokens.core.borderRadius
        },
        "core-color": {
            description: "Raw color palette values across all brand color scales",
            tokenFile: files.tokens.core.color
        },
        "core-dimensions": {
            description: "Base spacing units from 0 to 8rem for layouts",
            tokenFile: files.tokens.core.dimensions
        },
        "core-font-family": {
            description: "Typography font stacks for primary, secondary, and monospace",
            tokenFile: files.tokens.core.fontFamily
        },
        "core-font-size": {
            description: "Font size scale from 0.75rem to 3rem",
            tokenFile: files.tokens.core.fontSize
        },
        "core-font-weight": {
            description: "Font weight values from 400 to 690",
            tokenFile: files.tokens.core.fontWeight
        },
        "core-line-height": {
            description: "Line height ratios for consistent vertical rhythm",
            tokenFile: files.tokens.core.lineHeight
        },
        "core-motion": {
            description: "Animation durations and easing functions for transitions",
            tokenFile: files.tokens.core.motion
        },
        "core-shadow": {
            description: "Box shadow values for elevation effects",
            tokenFile: files.tokens.core.shadow
        },
        "all-semantic": {
            description: "All semantic design tokens",
            tokenFile: files.tokens.semantic.index
        },
        "all-core": {
            description: "All core design tokens",
            tokenFile: files.tokens.core.index
        },
        all: {
            description: "All available design tokens. Note: This may result in a large payload; for better performance and readability, it is recommended to use specific categories when possible",
            tokenFile: files.tokens.index
        }
    };

    let description = "Get design system tokens and their component props value by category.\n Available tokens categories:\n";

    for (const [category, info] of Object.entries(tokenDescriptions)) {
        const tokenCount = info.tokenFile?.estimatedTokens || 0;
        description += `        - ${category}: ${info.description} (tokens: ${tokenCount})\n`;
    }

    return description.trim();
}

export function generateGuidesDescription(): string {
    const guideDescriptions: Record<string, { description: string; guideFile?: any }> = {
        installation: {
            description: "How to install and set up the Hopper Design System",
            guideFile: files.gettingStarted.index
        },
        styles: {
            description: "How to use CSS properties and design tokens in Hopper Design System. Read this guide to understand how",
            guideFile: files.styledSystem.index
        },
        "color-schemes": {
            description: "Applying light mode, dark mode, or adapt to operating system's dark mode",
            guideFile: files.components.concepts.colorSchemes
        },
        "react-icons": {
            description: "All available react icons with each icon description and usage examples",
            guideFile: files.icons.reactIcons.index
        },
        "svg-icons": {
            description: "All available SVG icons with each icon description and usage examples",
            guideFile: files.icons.svgIcons.index
        },
        layout: {
            description: "Building application layouts using Flex or Grid",
            guideFile: files.components.concepts.layout
        },
        "controlled-mode": {
            description: "Using controlled and uncontrolled modes to customize components",
            guideFile: files.components.concepts.controlledMode
        },
        forms: {
            description: "Best practices for building forms in Hopper Design System",
            guideFile: files.components.concepts.forms
        },
        slots: {
            description: "How Hopper components include predefined layouts that you can insert elements into via slots. Slots are named areas in a component that receive children and provide style and layout for them",
            guideFile: files.components.concepts.slots
        },
        internationalization: {
            description: "Adapting components to respect languages and cultures",
            guideFile: files.components.concepts.internationalization
        }
    };

    let description = "Available guides:\n";

    for (const [guide, info] of Object.entries(guideDescriptions)) {
        const tokenCount = info.guideFile?.estimatedTokens || 0;
        description += `        - ${guide}: ${info.description} (tokens: ${tokenCount})\n`;
    }

    return description.trim();
}

export const paginationParamsInfo = {
    page_size: "Maximum number of tokens to return per page. **DEFAULT: Leave unset for full results.** ONLY specify this on the first call to start pagination. Once set, the page size is fixed for the entire pagination session. Use high values (e.g. 20000+) for better performance. Low limits may lead to suboptimal implementations.",
    cursor: "Pagination cursor from the previous response. **DEFAULT: Leave unset for the first page.** Use the 'next_cursor' value from the previous response to get the next page. Do not modify this value manually - it encodes both position and page size information."
};

export const toolsInfo = {
    get_started: {
        name: "get_started",
        title: "Get Started",
        description: "Start with this tool. This service help you building app or part of it using Hopper Design System. Always start with calling this tool."
    },
    get_components_list: {
        name: "get_components_list",
        title: "List all available components",
        description: "Get a list of all components in the Hopper Design System."
    },
    get_component_usage: {
        name: "get_component_usage",
        title: "Get component usage documentation",
        description: "Includes component's anatomy, structure, examples, dos and don'ts, and best practices.\n**IT IS VERY IMPORTANT TO READ COMPONENT DOCUMENTATION BEFORE USING IT TO AVOID STRUCTURE MISTAKES.**"
    },
    get_component_props: {
        name: "get_component_props",
        title: "Get component props as JSON",
        description: "Get properties, attributes, methods, events for a specific component.\n- This service returns a JSON API content.\n- Call this service after you have read the component usage",
        parameters: {
            include_full_props: "Whether to include full props data or only important fields. **DEFAULT: false**"
        }

    },
    get_design_tokens: {
        name: "get_design_tokens",
        title: "Get design system tokens",
        description: generateTokenCategoriesDescription()
    },
    get_guide: {
        name: "get_guide",
        title: "Get guide or best practices",
        description: generateGuidesDescription()
    },
    validate_component_structure: {
        name: "validate_component_structure",
        title: "Validate Component Structure",
        description: "Validates if the component implementation follows the structure and best practices."
    },
    migrate_from_orbiter_to_hopper: {
        name: "migrate_from_orbiter_to_hopper",
        title: "Migrate a file or all files in the folder from Orbiter to Hopper",
        description: "It migrates a file or all files in the folder from Orbiter to Hopper."
    }
} as const;

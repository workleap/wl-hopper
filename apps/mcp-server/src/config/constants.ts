export const GuideSections = [
    "installation", "styles", "tokens", "color-schemes", "components-list", "icons", "layout",
    "controlled-mode", "forms", "slots", "utility-hooks",
    "escape-hatches", "figma-conventions", "tooling-cli", "internationalization",
    "changelog"
] as const;

export const TokenCategories = [
    //semantic
    "semantic-color", "semantic-elevation", "semantic-shape", "semantic-space", "semantic-typography",

    //core
    "core-border-radius", "core-color", "core-dimensions",
    "core-font-family", "core-font-size", "core-font-weight", "core-line-height",
    "core-motion", "core-shadow",

    //all
    "all", "all-core", "all-semantic"
] as const;

export type GuideSection = typeof GuideSections[number];
export type TokenCategory = typeof TokenCategories[number];

export const TokenCategoryDescriptions: { [key in TokenCategory]: string } = {
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

export const GuideDescriptions: { [key in GuideSection]: string } = {
    installation: "How to install and set up the Hopper Design System",
    "components-list": "Get a list of all components in the Hopper Design System.",
    styles: "How to use style components by using style props and related design tokens.",
    layout: "Building application layouts using Flex or Grid",
    "escape-hatches": "Best practices regarding the use of UNSAFE_* props in Hopper components. It also lists all available UNSAFE_* props.",
    "color-schemes": "Applying light mode, dark mode, or adapt to operating system's dark mode",
    icons: "Using and designing standard, rich, and SVG icons in Hopper for React and other frameworks",
    "controlled-mode": "Using controlled and uncontrolled modes to customize components",
    forms: "Best practices for building forms in Hopper Design System",
    slots: "How Hopper components include predefined layouts that you can insert elements into via slots. Slots are named areas in a component that receive children and provide style and layout for them",
    internationalization: "Adapting components to respect languages and cultures",
    "figma-conventions": "Figma → Hopper Translation Guide",
    tokens: "Get design system tokens, their component props value, and their raw values by category. You must provide the category parameter.",
    "tooling-cli": "Analyze component usage across Hopper and Orbiter codebases, and automate migrations (Orbiter→Hopper, OV→Hopper) using 'pnpx \"@workleap/migrations\"@latest'. Generate usage reports, migration plans, and automated code transformations.",
    "utility-hooks": "Commonly used React hooks and utility functions for building components.",
    "changelog": "Changelog for all Hopper packages"
} as const;


/**
 * Style props groups. Visual grouping in style page.
 */
export type StyleGroup =
    | "Space"
    | "Color"
    | "Typography"
    | "Layout"
    | "Flex Layout"
    | "Grid Layout"
    | "Background"
    | "Border"
    | "Position"
    | "Shadow"
    | "Miscellaneous";

export const TokenCategories = [
    "semantic-color", "semantic-shadow", "semantic-fontFamily",
    "semantic-fontSize", "semantic-fontWeight", "semantic-lineHeight", "semantic-topOffset", "semantic-bottomOffset",
    "semantic-borderRadius", "semantic-paddingSize", "semantic-marginSize",
    "core-color", "core-shadow", "core-fontFamily", "core-fontSize",
    "core-fontWeight", "core-lineHeight", "core-borderRadius", "core-size", "core-duration", "core-timingFunction"
] as const;

export type TokenCategory = typeof TokenCategories[number];

export const TokenScales = {
    "color-scale": {
        title: "Colors",
        link: "/tokens/semantic/color",
        tokenCategories: ["semantic-color", "core-color"]
    },
    "elevation-scale": {
        title: "Elevation",
        link: "/tokens/semantic/elevation",
        tokenCategories: ["semantic-shadow", "core-shadow"]
    },
    "shape-scale": {
        title: "Shape",
        link: "/tokens/semantic/shape",
        tokenCategories: ["semantic-borderRadius", "core-borderRadius"]
    },
    "dimension-scale": {
        title: "Dimensions",
        link: "/tokens/core/dimensions",
        tokenCategories: ["core-size"]
    },
    "spacing-padding-scale": {
        title: "Spacing > Padding",
        link: "/tokens/semantic/space#tokens-padding",
        tokenCategories: ["semantic-paddingSize", "core-size"]
    },
    "spacing-margin-scale": {
        title: "Spacing > Margin",
        link: "/tokens/semantic/space#tokens-margin",
        tokenCategories: ["semantic-marginSize", "core-size"]
    },
    "typography-fontFamily-scale": {
        title: "Typography",
        link: "/tokens/semantic/typography",
        tokenCategories: ["semantic-fontFamily", "core-fontFamily"]
    },
    "typography-fontSize-scale": {
        title: "Typography",
        link: "/tokens/semantic/typography",
        tokenCategories: ["semantic-fontSize", "core-fontSize"]
    },
    "typography-fontWeight-scale": {
        title: "Typography",
        link: "/tokens/semantic/typography",
        tokenCategories: ["semantic-fontWeight", "core-fontWeight"]
    },
    "typography-lineHeight-scale": {
        title: "Typography",
        link: "/tokens/semantic/typography",
        tokenCategories: ["semantic-lineHeight", "core-lineHeight"]
    },
    "none": {
        title: "none",
        link: "",
        tokenCategories: []
    }
} satisfies Record<string, { title: string; link: string; tokenCategories: TokenCategory[] }>;

export type TokenScale = keyof typeof TokenScales;

export interface StylePropDefinition {
    propName: string;
    cssProperty: string;
    tokenScale: TokenScale;
    supportedFeatures: string;
    group: StyleGroup;
}

export const stylePropDefinitions: StylePropDefinition[] = [
    // Space
    { propName: "margin", cssProperty: "margin", tokenScale: "spacing-margin-scale", supportedFeatures: "breakpoints", group: "Space" },
    { propName: "marginTop", cssProperty: "margin-top", tokenScale: "spacing-margin-scale", supportedFeatures: "breakpoints", group: "Space" },
    { propName: "marginBottom", cssProperty: "margin-bottom", tokenScale: "spacing-margin-scale", supportedFeatures: "breakpoints", group: "Space" },
    { propName: "marginRight", cssProperty: "margin-right", tokenScale: "spacing-margin-scale", supportedFeatures: "breakpoints", group: "Space" },
    { propName: "marginLeft", cssProperty: "margin-left", tokenScale: "spacing-margin-scale", supportedFeatures: "breakpoints", group: "Space" },
    { propName: "marginX", cssProperty: "margin-left & margin-right", tokenScale: "spacing-margin-scale", supportedFeatures: "breakpoints", group: "Space" },
    { propName: "marginY", cssProperty: "margin-top & margin-bottom", tokenScale: "spacing-margin-scale", supportedFeatures: "breakpoints", group: "Space" },
    { propName: "padding", cssProperty: "padding", tokenScale: "spacing-padding-scale", supportedFeatures: "breakpoints", group: "Space" },
    { propName: "paddingTop", cssProperty: "padding-top", tokenScale: "spacing-padding-scale", supportedFeatures: "breakpoints", group: "Space" },
    { propName: "paddingBottom", cssProperty: "padding-bottom", tokenScale: "spacing-padding-scale", supportedFeatures: "breakpoints", group: "Space" },
    { propName: "paddingRight", cssProperty: "padding-right", tokenScale: "spacing-padding-scale", supportedFeatures: "breakpoints", group: "Space" },
    { propName: "paddingLeft", cssProperty: "padding-left", tokenScale: "spacing-padding-scale", supportedFeatures: "breakpoints", group: "Space" },
    { propName: "paddingX", cssProperty: "padding-left & padding-right", tokenScale: "spacing-padding-scale", supportedFeatures: "breakpoints", group: "Space" },
    { propName: "paddingY", cssProperty: "padding-top & padding-bottom", tokenScale: "spacing-padding-scale", supportedFeatures: "breakpoints", group: "Space" },
    { propName: "whiteSpace", cssProperty: "white-space", tokenScale: "none", supportedFeatures: "breakpoints", group: "Space" },

    // Color
    { propName: "color", cssProperty: "color", tokenScale: "color-scale", supportedFeatures: "breakpoints & focus/hover/active", group: "Color" },
    { propName: "backgroundColor", cssProperty: "background-color", tokenScale: "color-scale", supportedFeatures: "breakpoints & focus/hover/active", group: "Color" },
    { propName: "opacity", cssProperty: "opacity", tokenScale: "none", supportedFeatures: "breakpoints & focus/hover/active", group: "Color" },
    { propName: "fill", cssProperty: "fill", tokenScale: "color-scale", supportedFeatures: "breakpoints & focus/hover", group: "Color" },
    { propName: "stroke", cssProperty: "stroke", tokenScale: "color-scale", supportedFeatures: "breakpoints", group: "Color" },
    { propName: "filter", cssProperty: "filter", tokenScale: "none", supportedFeatures: "breakpoints", group: "Color" },

    // Typography
    { propName: "fontFamily", cssProperty: "font-family", tokenScale: "typography-fontFamily-scale", supportedFeatures: "breakpoints", group: "Typography" },
    { propName: "fontSize", cssProperty: "font-size", tokenScale: "typography-fontSize-scale", supportedFeatures: "breakpoints", group: "Typography" },
    { propName: "fontWeight", cssProperty: "font-weight", tokenScale: "typography-fontWeight-scale", supportedFeatures: "breakpoints", group: "Typography" },
    { propName: "lineHeight", cssProperty: "line-height", tokenScale: "typography-lineHeight-scale", supportedFeatures: "breakpoints", group: "Typography" },
    { propName: "letterSpacing", cssProperty: "letter-spacing", tokenScale: "none", supportedFeatures: "breakpoints", group: "Typography" },
    { propName: "textAlign", cssProperty: "text-align", tokenScale: "none", supportedFeatures: "breakpoints", group: "Typography" },
    { propName: "textTransform", cssProperty: "text-transform", tokenScale: "none", supportedFeatures: "breakpoints", group: "Typography" },
    { propName: "textDecoration", cssProperty: "text-decoration", tokenScale: "none", supportedFeatures: "breakpoints", group: "Typography" },
    { propName: "textOverflow", cssProperty: "text-overflow", tokenScale: "none", supportedFeatures: "breakpoints", group: "Typography" },
    { propName: "wordBreak", cssProperty: "word-break", tokenScale: "none", supportedFeatures: "breakpoints", group: "Typography" },
    { propName: "fontStyle", cssProperty: "font-style", tokenScale: "none", supportedFeatures: "breakpoints", group: "Typography" },

    // Layout
    { propName: "width", cssProperty: "width", tokenScale: "dimension-scale", supportedFeatures: "breakpoints", group: "Layout" },
    { propName: "height", cssProperty: "height", tokenScale: "dimension-scale", supportedFeatures: "breakpoints", group: "Layout" },
    { propName: "minWidth", cssProperty: "min-width", tokenScale: "dimension-scale", supportedFeatures: "breakpoints", group: "Layout" },
    { propName: "maxWidth", cssProperty: "max-width", tokenScale: "dimension-scale", supportedFeatures: "breakpoints", group: "Layout" },
    { propName: "minHeight", cssProperty: "min-height", tokenScale: "dimension-scale", supportedFeatures: "breakpoints", group: "Layout" },
    { propName: "maxHeight", cssProperty: "max-height", tokenScale: "dimension-scale", supportedFeatures: "breakpoints", group: "Layout" },
    { propName: "display", cssProperty: "display", tokenScale: "none", supportedFeatures: "breakpoints", group: "Layout" },
    { propName: "verticalAlign", cssProperty: "vertical-align", tokenScale: "none", supportedFeatures: "breakpoints", group: "Layout" },
    { propName: "overflow", cssProperty: "overflow", tokenScale: "none", supportedFeatures: "breakpoints", group: "Layout" },
    { propName: "overflowX", cssProperty: "overflow-x", tokenScale: "none", supportedFeatures: "breakpoints", group: "Layout" },
    { propName: "overflowY", cssProperty: "overflow-y", tokenScale: "none", supportedFeatures: "breakpoints", group: "Layout" },
    { propName: "gap", cssProperty: "gap", tokenScale: "spacing-margin-scale", supportedFeatures: "breakpoints", group: "Layout" },
    { propName: "alignSelf", cssProperty: "align-self", tokenScale: "none", supportedFeatures: "breakpoints", group: "Layout" },
    { propName: "aspectRatio", cssProperty: "aspect-ratio", tokenScale: "none", supportedFeatures: "breakpoints", group: "Layout" },
    { propName: "justifyContent", cssProperty: "justify-content", tokenScale: "none", supportedFeatures: "breakpoints", group: "Layout" },
    { propName: "justifyItems", cssProperty: "justify-items", tokenScale: "none", supportedFeatures: "breakpoints", group: "Layout" },
    { propName: "justifySelf", cssProperty: "justify-self", tokenScale: "none", supportedFeatures: "breakpoints", group: "Layout" },
    { propName: "contentVisibility", cssProperty: "content-visibility", tokenScale: "none", supportedFeatures: "breakpoints", group: "Layout" },
    { propName: "transform", cssProperty: "transform", tokenScale: "none", supportedFeatures: "breakpoints", group: "Layout" },
    { propName: "transformOrigin", cssProperty: "transform-origin", tokenScale: "none", supportedFeatures: "breakpoints", group: "Layout" },
    { propName: "transformStyle", cssProperty: "transform-style", tokenScale: "none", supportedFeatures: "breakpoints", group: "Layout" },

    // Flex Layout
    { propName: "alignItems", cssProperty: "align-items", tokenScale: "none", supportedFeatures: "breakpoints", group: "Flex Layout" },
    { propName: "alignContent", cssProperty: "align-content", tokenScale: "none", supportedFeatures: "breakpoints", group: "Flex Layout" },
    { propName: "flex", cssProperty: "flex (shorthand)", tokenScale: "none", supportedFeatures: "breakpoints", group: "Flex Layout" },
    { propName: "flexBasis", cssProperty: "flex-basis", tokenScale: "none", supportedFeatures: "breakpoints", group: "Flex Layout" },
    { propName: "flexDirection", cssProperty: "flex-direction", tokenScale: "none", supportedFeatures: "breakpoints", group: "Flex Layout" },
    { propName: "flexFlow", cssProperty: "flex-flow", tokenScale: "none", supportedFeatures: "breakpoints", group: "Flex Layout" },
    { propName: "flexGrow", cssProperty: "flex-grow", tokenScale: "none", supportedFeatures: "breakpoints", group: "Flex Layout" },
    { propName: "flexShrink", cssProperty: "flex-shrink", tokenScale: "none", supportedFeatures: "breakpoints", group: "Flex Layout" },
    { propName: "flexWrap", cssProperty: "flex-wrap", tokenScale: "none", supportedFeatures: "breakpoints", group: "Flex Layout" },
    { propName: "order", cssProperty: "order", tokenScale: "none", supportedFeatures: "breakpoints", group: "Flex Layout" },

    // Grid Layout
    { propName: "grid", cssProperty: "grid (shorthand)", tokenScale: "none", supportedFeatures: "breakpoints", group: "Grid Layout" },
    { propName: "gridArea", cssProperty: "grid-area", tokenScale: "none", supportedFeatures: "breakpoints", group: "Grid Layout" },
    { propName: "gridAutoColumns", cssProperty: "grid-auto-columns", tokenScale: "dimension-scale", supportedFeatures: "breakpoints", group: "Grid Layout" },
    { propName: "gridAutoFlow", cssProperty: "grid-auto-flow", tokenScale: "none", supportedFeatures: "breakpoints", group: "Grid Layout" },
    { propName: "gridAutoRows", cssProperty: "grid-auto-rows", tokenScale: "dimension-scale", supportedFeatures: "breakpoints", group: "Grid Layout" },
    { propName: "gridColumn", cssProperty: "grid-column", tokenScale: "none", supportedFeatures: "breakpoints", group: "Grid Layout" },
    { propName: "gridColumnEnd", cssProperty: "grid-column-end", tokenScale: "none", supportedFeatures: "breakpoints", group: "Grid Layout" },
    { propName: "gridColumnSpan", cssProperty: "grid-column-span", tokenScale: "none", supportedFeatures: "breakpoints", group: "Grid Layout" },
    { propName: "gridColumnStart", cssProperty: "grid-column-start", tokenScale: "none", supportedFeatures: "breakpoints", group: "Grid Layout" },
    { propName: "gridRow", cssProperty: "grid-row", tokenScale: "none", supportedFeatures: "breakpoints", group: "Grid Layout" },
    { propName: "gridRowEnd", cssProperty: "grid-row-end", tokenScale: "none", supportedFeatures: "breakpoints", group: "Grid Layout" },
    { propName: "gridRowSpan", cssProperty: "grid-row-span", tokenScale: "none", supportedFeatures: "breakpoints", group: "Grid Layout" },
    { propName: "gridRowStart", cssProperty: "grid-row-start", tokenScale: "none", supportedFeatures: "breakpoints", group: "Grid Layout" },
    { propName: "gridTemplate", cssProperty: "grid-template", tokenScale: "none", supportedFeatures: "breakpoints", group: "Grid Layout" },
    { propName: "gridTemplateAreas", cssProperty: "grid-template-areas", tokenScale: "none", supportedFeatures: "breakpoints", group: "Grid Layout" },
    { propName: "gridTemplateColumns", cssProperty: "grid-template-columns", tokenScale: "dimension-scale", supportedFeatures: "breakpoints", group: "Grid Layout" },
    { propName: "gridTemplateRows", cssProperty: "grid-template-rows", tokenScale: "dimension-scale", supportedFeatures: "breakpoints", group: "Grid Layout" },
    { propName: "columnGap", cssProperty: "column-gap", tokenScale: "spacing-margin-scale", supportedFeatures: "breakpoints", group: "Grid Layout" },
    { propName: "rowGap", cssProperty: "row-gap", tokenScale: "spacing-margin-scale", supportedFeatures: "breakpoints", group: "Grid Layout" },

    // Background
    { propName: "backgroundImage", cssProperty: "background-image", tokenScale: "none", supportedFeatures: "breakpoints", group: "Background" },
    { propName: "backgroundPosition", cssProperty: "background-position", tokenScale: "none", supportedFeatures: "breakpoints", group: "Background" },
    { propName: "backgroundRepeat", cssProperty: "background-repeat", tokenScale: "none", supportedFeatures: "breakpoints", group: "Background" },
    { propName: "backgroundSize", cssProperty: "background-size", tokenScale: "none", supportedFeatures: "breakpoints", group: "Background" },

    // Border
    { propName: "border", cssProperty: "border-color", tokenScale: "color-scale", supportedFeatures: "breakpoints & focus/hover/active", group: "Border" },
    { propName: "borderBottom", cssProperty: "border-bottom-color", tokenScale: "color-scale", supportedFeatures: "breakpoints & focus/hover/active", group: "Border" },
    { propName: "borderTop", cssProperty: "border-top-color", tokenScale: "color-scale", supportedFeatures: "breakpoints & focus/hover/active", group: "Border" },
    { propName: "borderLeft", cssProperty: "border-left-color", tokenScale: "color-scale", supportedFeatures: "breakpoints & focus/hover/active", group: "Border" },
    { propName: "borderRight", cssProperty: "border-right-color", tokenScale: "color-scale", supportedFeatures: "breakpoints & focus/hover/active", group: "Border" },
    { propName: "borderRadius", cssProperty: "border-radius", tokenScale: "shape-scale", supportedFeatures: "breakpoints", group: "Border" },
    { propName: "borderTopLeftRadius", cssProperty: "border-top-left-radius", tokenScale: "shape-scale", supportedFeatures: "breakpoints", group: "Border" },
    { propName: "borderTopRightRadius", cssProperty: "border-top-right-radius", tokenScale: "shape-scale", supportedFeatures: "breakpoints", group: "Border" },
    { propName: "borderBottomLeftRadius", cssProperty: "border-bottom-left-radius", tokenScale: "shape-scale", supportedFeatures: "breakpoints", group: "Border" },
    { propName: "borderBottomRightRadius", cssProperty: "border-bottom-right-radius", tokenScale: "shape-scale", supportedFeatures: "breakpoints", group: "Border" },
    { propName: "outline", cssProperty: "outline", tokenScale: "color-scale", supportedFeatures: "breakpoints & focus", group: "Border" },

    // Position
    { propName: "position", cssProperty: "position", tokenScale: "none", supportedFeatures: "breakpoints", group: "Position" },
    { propName: "top", cssProperty: "top", tokenScale: "none", supportedFeatures: "breakpoints", group: "Position" },
    { propName: "bottom", cssProperty: "bottom", tokenScale: "none", supportedFeatures: "breakpoints", group: "Position" },
    { propName: "right", cssProperty: "right", tokenScale: "none", supportedFeatures: "breakpoints", group: "Position" },
    { propName: "left", cssProperty: "left", tokenScale: "none", supportedFeatures: "breakpoints", group: "Position" },
    { propName: "zIndex", cssProperty: "z-index", tokenScale: "none", supportedFeatures: "breakpoints", group: "Position" },
    { propName: "objectFit", cssProperty: "object-fit", tokenScale: "none", supportedFeatures: "breakpoints", group: "Position" },
    { propName: "objectPosition", cssProperty: "object-position", tokenScale: "none", supportedFeatures: "breakpoints", group: "Position" },

    // Shadow
    { propName: "boxShadow", cssProperty: "box-shadow", tokenScale: "elevation-scale", supportedFeatures: "breakpoints & focus/hover/active", group: "Shadow" },

    // Miscellaneous
    { propName: "content", cssProperty: "content", tokenScale: "none", supportedFeatures: "breakpoint", group: "Miscellaneous" },
    { propName: "cursor", cssProperty: "cursor", tokenScale: "none", supportedFeatures: "breakpoint & hover", group: "Miscellaneous" },
    { propName: "pointerEvents", cssProperty: "pointer-events", tokenScale: "none", supportedFeatures: "breakpoint", group: "Miscellaneous" },
    { propName: "resize", cssProperty: "resize", tokenScale: "none", supportedFeatures: "breakpoint", group: "Miscellaneous" },
    { propName: "willChange", cssProperty: "will-change", tokenScale: "none", supportedFeatures: "breakpoint", group: "Miscellaneous" }
];

/**
 * Type for PropsReferenceTable row data
 */
export type PropsTableRow = [string, string, TokenScale, string];

/**
 * Converts style prop definitions to the format expected by PropsReferenceTable component
 * @param category - Optional category to filter props by
 * @returns Array of tuples formatted for PropsReferenceTable rows prop
 */
export function getPropsTableRows(category?: StyleGroup): PropsTableRow[] {
    const filteredProps = category
        ? stylePropDefinitions.filter(prop => prop.group === category)
        : stylePropDefinitions;

    return filteredProps.map(prop => [
        prop.propName,
        prop.cssProperty,
        prop.tokenScale,
        prop.supportedFeatures
    ]);
}

/**
 * Gets style prop definitions grouped by their categories
 * @returns Object with categories as keys and arrays of prop definitions as values
 */
export function getPropsGroupedByCategory(): Record<StyleGroup, StylePropDefinition[]> {
    return stylePropDefinitions.reduce((grouped, prop) => {
        if (!grouped[prop.group]) {
            grouped[prop.group] = [];
        }
        grouped[prop.group].push(prop);

        return grouped;
    }, {} as Record<StyleGroup, StylePropDefinition[]>);
}

export function getScaleLinkCategory(scale: TokenScale) {
    if (scale === "none") {
        return "";
    }

    return TokenScales[scale].link.startsWith("/tokens/core") ? "Core" : "Semantic";
}

export function hasScaleLink(key: TokenScale): boolean {
    return TokenScales[key].link !== "";
}

/**
 * Gets supported style props for a given token category
 * @param tokenCategory - The token category (e.g., "semantic-color", "core-color")
 * @returns Array of prop names that support this token category
 */
export function getSupportedPropsByTokenCategory(tokenCategory: TokenCategory): string[] {
    // Find all token scales that include this category
    const relevantScales = (Object.entries(TokenScales) as [TokenScale, typeof TokenScales[TokenScale]][])
        .filter(([, scaleInfo]) => (scaleInfo.tokenCategories as readonly TokenCategory[]).includes(tokenCategory))
        .map(([scaleName]) => scaleName);

    // Find all props that use any of these scales
    const supportedProps = stylePropDefinitions
        .filter(prop => relevantScales.includes(prop.tokenScale))
        .map(prop => prop.propName);

    // Return unique prop names
    return [...new Set(supportedProps)];
}

/**
 * Gets a map of all token categories to their supported props
 * @returns Record mapping each token category to an array of supported prop names
 */
export function getAllTokenCategorySupportedProps(): Record<TokenCategory, string[]> {
    const result = {} as Record<TokenCategory, string[]>;

    for (const category of TokenCategories) {
        result[category] = getSupportedPropsByTokenCategory(category);
    }

    return result;
}

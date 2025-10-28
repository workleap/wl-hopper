// Native HTML elements that should not be used directly
export const NATIVE_HTML_ELEMENTS = new Set([
    "div", "span", "button", "input", "p", "h1", "h2", "h3", "h4", "h5", "h6",
    "a", "img", "ul", "ol", "li", "form", "section", "article", "header",
    "footer", "nav", "table", "tr", "td", "th", "tbody", "thead", "tfoot",
    "svg", "path", "iframe"
]);

// Components that are not recommended with warning messages
export const NOT_RECOMMENDED_COMPONENTS = new Map<string, string>([
    ["Box", "Using '<Box>' is STRONGLY discouraged. The '<Box>' component should not be used in place of standard HTML elements. Use '<Div>' or '<Span>' directly for that purpose."]
]);

// Props that are prohibited from use
export const PROHIBITED_PROPS = ["className", "style"];

// Layout components that should typically have multiple children
export const LAYOUT_COMPONENTS = new Set([
    "Stack", "Inline", "Flex", "Grid", "Div", "Box"
]);

// Props that accept percentage values without requiring UNSAFE_ prefix
export const PERCENTAGE_SAFE_PROPS = new Set([
    "width",
    "height",
    "maxWidth",
    "minWidth",
    "maxHeight",
    "minHeight"
]);

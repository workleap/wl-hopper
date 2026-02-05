import { DefaultColorScheme, DefaultTheme, GuideDescriptions, type GuideSection, TokenCategoryDescriptions } from "./constants";
import { getTokenMapFiles, GuideFiles, TokenGuideFiles } from "./fileMappings";

export function generateDesignTokensDescription(): string {
    let description = "Available token categories:\n";

    for (const [category, categoryDescription] of Object.entries(TokenCategoryDescriptions)) {
        const fileInfo = TokenGuideFiles[category as keyof typeof TokenGuideFiles];
        const tokenCount = fileInfo?.estimatedTokens || 0;
        description += `        - ${category}: ${categoryDescription} (size: ${tokenCount} LLM tokens)\n`;
    }

    return description.trim();
}

export function generateTokenMapsDescription(): string {
    let description = "Available token categories:\n";
    const tokenMapFiles = getTokenMapFiles(DefaultTheme, DefaultColorScheme);

    for (const [category, categoryDescription] of Object.entries(TokenCategoryDescriptions)) {
        const mapFiles = tokenMapFiles[category as keyof typeof tokenMapFiles];
        const totalTokens = mapFiles ? mapFiles.reduce((sum, file) => sum + (file.estimatedTokens || 0), 0) : 0;
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
            category: generateDesignTokensDescription()
        }
    },
    get_design_tokens: {
        name: "get_design_tokens",
        title: "Search design system tokens and get their map to component props as JSON",
        description: `
        Get all design tokens mapped to component props in JSON format.
            - This is very helpful when you are generating code from Figma design.
            - You can use this service to find the right value for each component prop or get all tokens mapped to all component props.
            - You should provide the theme and color scheme to get accurate mapping. The default is 'workleap' theme and 'light' color scheme.
        E.g hop-information-text-weak -> information-weak`,
        parameters: {
            category: generateTokenMapsDescription(),
            theme: "The design system theme to use. Available: 'workleap' (default), 'sharegate'",
            color_scheme: "The color scheme to use. Available: 'light' (default), 'dark'",
            search_token_names: {
                name: "search_token_names",
                description: "Filter tokens by their Hopper token names (case-insensitive, partial match). Pass actual token names like 'hop-neutral-text', NOT CSS values like '#3c3c3c'. Examples: ['hop-neutral-text', 'hop-primary-surface', 'hop-space-stack-md']"
            },
            search_css_values: {
                name: "search_css_values",
                description: "Filter tokens by their CSS values (fuzzy match). Pass actual CSS values, NOT Hopper token names. Examples: ['#3c3c3c', '16px', '2rem', '400', 'Arial', '500ms']"
            },
            search_supported_props: {
                name: "search_supported_props",
                description: "Filter token categories that support specific component style props. Only returns token categories that can be used with the specified properties. Examples: ['backgroundColor', 'color', 'borderColor', 'padding', 'margin']"
            },
            include_css_values: {
                name: "include_css_values",
                description: "Whether to include token css values in the response. **DEFAULT: false**"
            }
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

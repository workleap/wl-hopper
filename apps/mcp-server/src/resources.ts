/* eslint-disable max-len */

import { files } from "@docs/ai";
import { ResourceTemplate, type McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { ReadResourceResult } from "@modelcontextprotocol/sdk/types.js";
import { content, errorContent } from "./utils/content";
import {
    getComponentBriefApi,
    getComponentFullApi,
    getComponentUsage,
    getDesignTokenGuide,
    getDesignTokens,
    getGuide,
    getLlmsFull,
    GuideFiles,
    GuideSections,
    TokenCategories,
    TokenGuideFiles,
    type GuideSection,
    type TokenCategory
} from "./utils/docs";
import { getIcons, IconTypes } from "./utils/iconSearch";
import { trackEvent } from "./utils/logging";
import { GuideDescriptions, TokenCategoryDescriptions } from "./utils/descriptions";

// Get all component names dynamically from the files structure
// This ensures the resource list stays in sync with available documentation
// without manual maintenance when new components are added
function getComponentNames(): string[] {
    const componentKeys = Object.keys(files.components.full);
    return componentKeys
        .map(key => {
            // Convert camelCase to PascalCase (e.g., "accordion" -> "Accordion", "avatarGroup" -> "AvatarGroup")
            return key.charAt(0).toUpperCase() + key.slice(1);
        })
        .sort(); // Sort alphabetically for consistent ordering
}

const HOPPER_COMPONENTS = getComponentNames();

export function resources(server: McpServer) {
    // Original full documentation resource
    server.registerResource(
        "hopper-full-documentation",
        new ResourceTemplate("hopper://llms-full", {
            list: async () => ({
                resources: [{
                    uri: "hopper://llms-full",
                    name: "Full Hopper Documentation",
                    description: "Complete documentation containing all components, their APIs, tokens, styles, icons and examples",
                    mimeType: "text/markdown"
                }]
            })
        }),
        {
            title: "Full documentation of Hopper Design System",
            description: "Complete documentation containing all components, their APIs, tokens, styles, icons and examples"
        },
        async (uri, _, { requestInfo }): Promise<ReadResourceResult> => {
            trackEvent("resource:hopper-full-documentation", {}, requestInfo);

            const doc = await getLlmsFull();
            const contents = Array.isArray(doc) ? doc : [doc];

            return {
                contents: contents.map(content => ({
                    uri: uri.href,
                    ...content
                }))
            };
        }
    );

    // Component documentation resources with templates
    // Usage documentation for each component
    server.registerResource(
        "component-usage",
        new ResourceTemplate("hopper://components/{name}/usage", {
            list: async () => ({
                resources: HOPPER_COMPONENTS.map(name => ({
                    uri: `hopper://components/${name}/usage`,
                    name: `${name} Component Usage`,
                    description: `Usage documentation for the ${name} component including anatomy, structure, examples, and best practices`,
                    mimeType: "text/markdown"
                }))
            })
        }),
        {
            title: "Component usage documentation",
            description: "Usage documentation for Hopper components including anatomy, structure, examples, and best practices"
        },
        async (uri, _, { requestInfo }): Promise<ReadResourceResult> => {
            const componentName = uri.pathname.split("/")[2];
            trackEvent("resource:component-usage", { component: componentName }, requestInfo);

            try {
                const doc = await getComponentUsage(componentName);
                const contents = Array.isArray(doc) ? doc : [doc];

                return {
                    contents: contents.map(content => ({
                        uri: uri.href,
                        ...content
                    }))
                };
            } catch (error) {
                return {
                    contents: [{
                        uri: uri.href,
                        ...errorContent(error, `Failed to load usage documentation for ${componentName}`)
                    }]
                };
            }
        }
    );

    // Brief props documentation for each component
    server.registerResource(
        "component-props",
        new ResourceTemplate("hopper://components/{name}/props", {
            list: async () => ({
                resources: HOPPER_COMPONENTS.map(name => ({
                    uri: `hopper://components/${name}/props`,
                    name: `${name} Component Props`,
                    description: `Brief props/API documentation for the ${name} component (important fields only)`,
                    mimeType: "application/json"
                }))
            })
        }),
        {
            title: "Component props (brief)",
            description: "Brief component props/API as JSON (important fields only)"
        },
        async (uri, _, { requestInfo }): Promise<ReadResourceResult> => {
            const componentName = uri.pathname.split("/")[2];
            trackEvent("resource:component-props", { component: componentName }, requestInfo);

            try {
                const doc = await getComponentBriefApi(componentName);
                const contents = Array.isArray(doc) ? doc : [doc];

                return {
                    contents: contents.map(content => ({
                        uri: uri.href,
                        ...content
                    }))
                };
            } catch (error) {
                return {
                    contents: [{
                        uri: uri.href,
                        ...errorContent(error, `Failed to load props documentation for ${componentName}`)
                    }]
                };
            }
        }
    );

    // Full props documentation for each component
    server.registerResource(
        "component-props-full",
        new ResourceTemplate("hopper://components/{name}/props-full", {
            list: async () => ({
                resources: HOPPER_COMPONENTS.map(name => ({
                    uri: `hopper://components/${name}/props-full`,
                    name: `${name} Component Full API`,
                    description: `Full props/API documentation for the ${name} component (all fields)`,
                    mimeType: "application/json"
                }))
            })
        }),
        {
            title: "Component props (full)",
            description: "Full component props/API as JSON (all fields)"
        },
        async (uri, _, { requestInfo }): Promise<ReadResourceResult> => {
            const componentName = uri.pathname.split("/")[2];
            trackEvent("resource:component-props-full", { component: componentName }, requestInfo);

            try {
                const doc = await getComponentFullApi(componentName);
                const contents = Array.isArray(doc) ? doc : [doc];

                return {
                    contents: contents.map(content => ({
                        uri: uri.href,
                        ...content
                    }))
                };
            } catch (error) {
                return {
                    contents: [{
                        uri: uri.href,
                        ...errorContent(error, `Failed to load full API documentation for ${componentName}`)
                    }]
                };
            }
        }
    );

    // Design token resources by category
    server.registerResource(
        "design-tokens",
        new ResourceTemplate("hopper://tokens/{category}", {
            list: async () => ({
                resources: TokenCategories.map(category => {
                    const guideFile = TokenGuideFiles[category as TokenCategory];
                    const estimatedTokens = guideFile?.estimatedTokens || 0;
                    return {
                        uri: `hopper://tokens/${category}`,
                        name: `${category} tokens`,
                        description: `${TokenCategoryDescriptions[category]} (~${estimatedTokens} LLM tokens)`,
                        mimeType: "application/json"
                    };
                })
            })
        }),
        {
            title: "Design tokens by category",
            description: "Design system tokens mapped to component props"
        },
        async (uri, _, { requestInfo }): Promise<ReadResourceResult> => {
            const category = uri.pathname.split("/")[2] as TokenCategory;
            trackEvent("resource:design-tokens", { category }, requestInfo);

            try {
                const doc = await getDesignTokens(category, undefined, undefined, undefined, false);
                const contents = Array.isArray(doc) ? doc : [doc];

                return {
                    contents: contents.map(content => ({
                        uri: uri.href,
                        ...content
                    }))
                };
            } catch (error) {
                return {
                    contents: [{
                        uri: uri.href,
                        ...errorContent(error, `Failed to load design tokens for ${category}`)
                    }]
                };
            }
        }
    );

    // Design token guides by category
    server.registerResource(
        "token-guides",
        new ResourceTemplate("hopper://token-guides/{category}", {
            list: async () => ({
                resources: TokenCategories.map(category => {
                    const guideFile = TokenGuideFiles[category as TokenCategory];
                    const estimatedTokens = guideFile?.estimatedTokens || 0;
                    return {
                        uri: `hopper://token-guides/${category}`,
                        name: `${category} token guide`,
                        description: `${TokenCategoryDescriptions[category]} (~${estimatedTokens} LLM tokens)`,
                        mimeType: "text/markdown"
                    };
                })
            })
        }),
        {
            title: "Design token guides",
            description: "Guides and documentation for design tokens by category"
        },
        async (uri, _, { requestInfo }): Promise<ReadResourceResult> => {
            const category = uri.pathname.split("/")[2] as TokenCategory;
            trackEvent("resource:token-guides", { category }, requestInfo);

            try {
                const doc = await getDesignTokenGuide(category);
                const contents = Array.isArray(doc) ? doc : [doc];

                return {
                    contents: contents.map(content => ({
                        uri: uri.href,
                        ...content
                    }))
                };
            } catch (error) {
                return {
                    contents: [{
                        uri: uri.href,
                        ...errorContent(error, `Failed to load token guide for ${category}`)
                    }]
                };
            }
        }
    );

    // Guide resources
    server.registerResource(
        "guides",
        new ResourceTemplate("hopper://guides/{section}", {
            list: async () => ({
                resources: GuideSections.map(section => {
                    const guideFile = GuideFiles[section as GuideSection];
                    const estimatedTokens = (guideFile && "estimatedTokens" in guideFile) ? guideFile.estimatedTokens : 0;

                    return {
                        uri: `hopper://guides/${section}`,
                        name: section.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
                        description: `${GuideDescriptions[section as GuideSection]} (~${estimatedTokens} LLM tokens)`,
                        mimeType: "text/markdown"
                    };
                })
            })
        }),
        {
            title: "Hopper guides and best practices",
            description: "Various guides for using the Hopper Design System"
        },
        async (uri, _, { requestInfo }): Promise<ReadResourceResult> => {
            const section = uri.pathname.split("/")[2] as GuideSection;
            trackEvent("resource:guides", { section }, requestInfo);

            try {
                const doc = await getGuide(section);
                const contents = Array.isArray(doc) ? doc : [doc];

                return {
                    contents: contents.map(content => ({
                        uri: uri.href,
                        ...content
                    }))
                };
            } catch (error) {
                return {
                    contents: [{
                        uri: uri.href,
                        ...errorContent(error, `Failed to load guide for ${section}`)
                    }]
                };
            }
        }
    );

    // Icon resources
    server.registerResource(
        "icons",
        new ResourceTemplate("hopper://icons/{type}", {
            list: async () => ({
                resources: IconTypes.map(type => ({
                    uri: `hopper://icons/${type}`,
                    name: `${type} icons`,
                    description: `Collection of ${type} icons available in Hopper`,
                    mimeType: "application/json"
                }))
            })
        }),
        {
            title: "Hopper icons",
            description: "Icon collections available in the Hopper Design System"
        },
        async (uri, _, { requestInfo }): Promise<ReadResourceResult> => {
            const type = uri.pathname.split("/")[2] as typeof IconTypes[number];
            trackEvent("resource:icons", { type }, requestInfo);

            try {
                const icons = await getIcons([], type);

                return {
                    contents: [{
                        uri: uri.href,
                        text: JSON.stringify(icons, null, 2),
                        mimeType: "application/json"
                    }]
                };
            } catch (error) {
                return {
                    contents: [{
                        uri: uri.href,
                        ...errorContent(error, `Failed to load ${type} icons`)
                    }]
                };
            }
        }
    );

    // Component list resource
    server.registerResource(
        "component-list",
        new ResourceTemplate("hopper://component-list", {
            list: async () => ({
                resources: [{
                    uri: "hopper://component-list",
                    name: "Hopper Component List",
                    description: "A complete list of all available components in the Hopper Design System",
                    mimeType: "application/json"
                }]
            })
        }),
        {
            title: "List of all Hopper components",
            description: "A complete list of all available components in the Hopper Design System"
        },
        async (uri, _, { requestInfo }): Promise<ReadResourceResult> => {
            trackEvent("resource:component-list", {}, requestInfo);

            return {
                contents: [{
                    uri: uri.href,
                    text: JSON.stringify(HOPPER_COMPONENTS, null, 2),
                    mimeType: "application/json"
                }]
            };
        }
    );
}

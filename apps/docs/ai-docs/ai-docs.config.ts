import { AiDocsConfig } from "./types";

export const aiDocsConfig: AiDocsConfig = {
    buildRootPath: "dist",
    filesFolder: "ai-docs",
    routes: {
        // components
        "components/full": {
            build: {
                source: "content/components",
                excludedPaths: ["concepts"],
                flatten: true,
                markdown: {
                    includeFrontMatterLinks: true
                }
            },
            serve: {
                at: "/components"
            }
        },
        "components/usage": {
            build: {
                source: "content/components",
                excludedPaths: ["concepts"],
                flatten: true,
                markdown: {
                    includeFrontMatterLinks: false,
                    excludedSections: ["## Props"]
                }
            }
        },

        // api (json)
        "components/api": {
            build: {
                type: "json",
                source: "content/components",
            }
        },

        "components/index.md": {
            build: {
                template: "/content/ai-templates/components.mdx",
                merge: [
                    "/components/full/component-list.md",
                    "/components/full/*.md"
                ]
            },
        },

        // components' concepts
        "components/concepts": {
            build: {
                source: "content/components/concepts",
                flatten: true
            },
            serve: {
                at: "/components"
            }
        },

        "components/concepts/index.md": {
            build: {
                template: "/content/ai-templates/components-concepts.mdx",
                merge: [
                    "/components/concepts/*.md",
                ]
            },
        },

        //getting-started
        "getting-started": {
            build: {
                source: "content/getting-started",
                flatten: true,
            },
            serve: {
                at: "/getting-started",
                filesInRoot: true
            }
        },

        "getting-started/index.md": {
            build: {
                template: "/content/ai-templates/getting-started.mdx",
                merge: [
                    "/getting-started/installation.md",
                    "/getting-started/react.md",
                    "/getting-started/javascript.md",
                    "/getting-started/text-crop.md",
                    "/getting-started/components.md"
                ]
            },
        },

        //icons
        "icons": {
            build: {
                source: "content/icons",
                flatten: false,
            },
            serve: {
                 filesInRoot: true
            }
        },

        "icons/index.md": {
            build: {
                template: "/content/ai-templates/icons.mdx",
                merge: [
                    "/icons/overview/introduction.md",
                    "/icons/overview/designing-an-icon.md",
                    "/icons/react-icons/icon-library.md",
                    "/icons/react-icons/rich-icon-library.md",
                    "/icons/SVG-icons/icon-library.md",
                    "/icons/SVG-icons/rich-icon-library.md"
                ]
            },
        },

        "icons/react-icons/index.md": {
            build: {
                template: "/content/ai-templates/icons-react.mdx",
                merge: [
                    "/icons/react-icons/icon-library.md",
                    "/icons/react-icons/rich-icon-library.md"
                ]
            },
        },

        "icons/SVG-icons/index.md": {
            build: {
                template: "/content/ai-templates/icons-svg.mdx",
                merge: [
                    "/icons/SVG-icons/icon-library.md",
                    "/icons/SVG-icons/rich-icon-library.md"
                ]
            },
        },

        //tokens
        "tokens": {
            build: {
                source: "content/tokens",
                flatten: false,
            }
        },

        "tokens/index.md": {
            build: {
                template: "/content/ai-templates/tokens.mdx",
                merge: [
                    "/tokens/overview/introduction.md",
                    "/tokens/semantic/color.md",
                    "/tokens/semantic/elevation.md",
                    "/tokens/semantic/shape.md",
                    "/tokens/semantic/space.md",
                    "/tokens/semantic/typography.md",
                    "/tokens/core/border-radius.md",
                    "/tokens/core/color.md",
                    "/tokens/core/dimensions.md",
                    "/tokens/core/font-family.md",
                    "/tokens/core/font-size.md",
                    "/tokens/core/font-weight.md",
                    "/tokens/core/line-height.md",
                    "/tokens/core/motion.md",
                    "/tokens/core/shadow.md"
                ]
            },
        },

        //styled-system
        "styled-system": {
            build: {
                source: "content/styled-system",
                flatten: false,
            }
        },

        "styled-system/index.md": {
            build: {
                template: "/content/ai-templates/styled-system.mdx",
                merge: [
                    "/styled-system/overview/introduction.md",
                    "/styled-system/concepts/styling.md",
                    "/styled-system/concepts/responsive-styles.md",
                    "/styled-system/concepts/html-elements.md",
                    "/styled-system/concepts/custom-components.md"
                ]
            },
        },

        "llms.md": {
            build: {
                template: "/content/ai-templates/llms.mdx",
            },
        },

        "llms-full.md": {
            build: {
                template: "/content/ai-templates/llms-full.mdx",
                merge: [
                    "getting-started/index.md",
                    "styled-system/index.md",
                    "tokens/index.md",
                    "components/index.md",
                    "components/concepts/index.md",
                    "icons/index.md"
                ]
            },
        }

    }
}



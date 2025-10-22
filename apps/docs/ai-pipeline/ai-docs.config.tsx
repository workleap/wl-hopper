import { AiDocsConfig } from "./types.ts";

export const aiDocsConfig: AiDocsConfig = {
    buildRootPath: "dist",
    filesFolder: "ai-docs",
    routes: {
        // components
        "components/full": {
            build: {
                source: "content/components",
                excludedPaths: ["concepts", "utilities"],
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
                excludedPaths: ["concepts", "utilities"],
                flatten: true,
                markdown: {
                    includeFrontMatterLinks: false,
                    excludedSections: ["## Props"]
                }
            }
        },

        // api full (json)
        "components/api/full": {
            build: {
                type: "props-json",
                source: "content/components",
                options: {
                    includeFullProps: true
                }
            }
        },

        // api brief(json)
        "components/api/brief": {
            build: {
                type: "props-json",
                source: "content/components",
                options: {
                    includeFullProps: false
                }
            }
        },

        "components/index.md": {
            build: {
                template: "/ai-pipeline/templates/components.mdx",
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
                template: "/ai-pipeline/templates/components-concepts.mdx",
                merge: [
                    "/components/concepts/*.md",
                ]
            },
        },

        // components' utilities
        "components/utilities": {
            build: {
                source: "content/components/utilities",
                flatten: true
            },
            serve: {
                at: "/components"
            }
        },

        "components/utilities/index.md": {
            build: {
                template: "/ai-pipeline/templates/components-utilities.mdx",
                merge: [
                    "/components/utilities/*.md",
                ]
            },
        },

        //getting-started
        "getting-started": {
            build: {
                source: "content/getting-started",
                excludedPaths: ["guides/figma-code-generation.mdx"],
                flatten: true,
            },
            serve: {
                at: "/getting-started",
                filesInRoot: true
            }
        },

        "getting-started/index.md": {
            build: {
                template: "/ai-pipeline/templates/getting-started.mdx",
                merge: [
                    "/getting-started/installation.md",
                    "/getting-started/react.md",
                    "/getting-started/javascript.md",
                    "/getting-started/text-crop.md",
                    "/getting-started/components.md"
                ]
            },
        },

        //icons (full)
        "icons/full": {
            build: {
                source: "content/icons",
                flatten: false,
            },
            serve: {
                 at: "/icons",
            }
        },

        "icons/full/index.md": {
            build: {
                template: "/ai-pipeline/templates/icons.mdx",
                merge: [
                    "/icons/full/overview/introduction.md",
                    "/icons/full/react-icons/icon-library.md",
                    "/icons/full/react-icons/rich-icon-library.md",
                    "/icons/full/SVG-icons/icon-library.md",
                    "/icons/full/SVG-icons/rich-icon-library.md",
                    "/icons/full/advanced/designing-an-icon.md"

                ]
            },
        },

        "icons/full/react-icons/index.md": {
            build: {
                template: "/ai-pipeline/templates/icons-react.mdx",
                merge: [
                    "/icons/full/react-icons/icon-library.md",
                    "/icons/full/react-icons/rich-icon-library.md"
                ]
            },
        },

        "icons/full/SVG-icons/index.md": {
            build: {
                template: "/ai-pipeline/templates/icons-svg.mdx",
                merge: [
                    "/icons/full/SVG-icons/icon-library.md",
                    "/icons/full/SVG-icons/rich-icon-library.md"
                ]
            },
        },

        //icons (brief): same as full but without icons lists
        "icons/brief": {
            build: {
                source: "content/icons",
                flatten: false,
                renderer: {
                    customComponents: {
                        Switcher: () => <div/>
                    }
                }
            },
        },

        "icons/brief/index.md": {
            build: {
                template: "/ai-pipeline/templates/icons.mdx",
                merge: [
                    "/icons/brief/overview/introduction.md",
                    "/icons/brief/react-icons/icon-library.md",
                    "/icons/brief/react-icons/rich-icon-library.md",
                    "/icons/brief/SVG-icons/icon-library.md",
                    "/icons/brief/SVG-icons/rich-icon-library.md",
                    "/icons/brief/advanced/designing-an-icon.md"
                ]
            },
        },

        "icons/brief/react-icons/index.md": {
            build: {
                template: "/ai-pipeline/templates/icons-react.mdx",
                merge: [
                    "/icons/brief/react-icons/icon-library.md",
                    "/icons/brief/react-icons/rich-icon-library.md"
                ]
            },
        },

        "icons/brief/SVG-icons/index.md": {
            build: {
                template: "/ai-pipeline/templates/icons-svg.mdx",
                merge: [
                    "/icons/brief/SVG-icons/icon-library.md",
                    "/icons/brief/SVG-icons/rich-icon-library.md"
                ]
            },
        },

        //icons (data)
        "icons/data.json": {
            build: {
                type: "icons-json",
            }
        },

        //tokens
        "tokens": {
            build: {
                source: "content/tokens",
                flatten: false,
            }
        },

        "tokens/core/index.md": {
            build: {
                template: "/ai-pipeline/templates/tokens-core.mdx",
                merge: [
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

        // tokens map (json)
        "tokens/maps": {
            build: {
                type: "tokens-json",
                source: "datas/tokens.json",
            }
        },

        "tokens/semantic/index.md": {
            build: {
                template: "/ai-pipeline/templates/tokens-semantic.mdx",
                merge: [
                    "/tokens/semantic/color.md",
                    "/tokens/semantic/elevation.md",
                    "/tokens/semantic/shape.md",
                    "/tokens/semantic/space.md",
                    "/tokens/semantic/typography.md",
                ]
            },
        },

        "tokens/index.md": {
            build: {
                template: "/ai-pipeline/templates/tokens.mdx",
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
                template: "/ai-pipeline/templates/styled-system.mdx",
                merge: [
                    "/styled-system/overview/introduction.md",
                    "/styled-system/concepts/styling.md",
                    "/styled-system/concepts/responsive-styles.md",
                    "/styled-system/concepts/html-elements.md",
                    "/styled-system/concepts/custom-components.md"
                ]
            },
        },

        "styled-system/unsafe-props-data.json": {
            build: {
                type: "unsafe-props-json",
            },
        },

        "styled-system/escape-hatches.md": {
            build: {
                type: "unsafe-props-markdown",
                template: "/ai-pipeline/templates/escape-hatches.mdx",
            },
        },

        //ai docs
        "ai": {
            build: {
                source: "content/ai",
            }
        },

        // llms.txt
        "llms.md": {
            build: {
                template: "/ai-pipeline/templates/llms.mdx",
            },
        },

        "llms-full.md": {
            build: {
                template: "/ai-pipeline/templates/llms-full.mdx",
                merge: [
                    "getting-started/index.md",
                    "styled-system/index.md",
                    "tokens/index.md",
                    "components/index.md",
                    "components/concepts/index.md",
                    "components/utilities/index.md",
                    "icons/full/index.md"
                ]
            },
        }

    }
}



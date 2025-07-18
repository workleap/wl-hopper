/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineDocumentType, defineNestedType, makeSource } from "contentlayer/source-files";
import { rehypePluginOptions } from "./app/lib/rehypeConfig.ts";

export const Page = defineDocumentType(() => ({
    name: "Page",
    filePathPattern: "pages/**/*.mdx",
    contentType: "mdx",
    fields: {
        title: {
            type: "string",
            required: true
        },
        description: {
            type: "string"
        }
    },
    computedFields: {
        slug: {
            type: "string",
            resolve: doc => `${doc._raw.flattenedPath}`
        }
    }
}));

export const Tokens = defineDocumentType(() => ({
    name: "Tokens",
    filePathPattern: "tokens/**/*.mdx",
    contentType: "mdx",
    fields: {
        title: {
            type: "string",
            required: true
        },
        description: {
            type: "string"
        },
        order: {
            type: "number"
        }
    },
    computedFields: {
        slug: {
            type: "string",
            resolve: post => {
                return post._raw.sourceFileName.replace(/\.mdx$/, "");
            }
        },
        section: {
            type: "string",
            resolve: post => {
                return post._raw.sourceFileDir.replace("tokens/", "");
            }
        }
    }
}));

export const Guides = defineDocumentType(() => ({
    name: "Guides",
    filePathPattern: "guides/**/*.mdx",
    contentType: "mdx",
    fields: {
        title: {
            type: "string",
            required: true
        },
        description: {
            type: "string"
        },
        section: {
            type: "string"
        },
        order: {
            type: "number"
        }
    },
    computedFields: {
        slug: {
            type: "string",
            resolve: post => post._raw.sourceFileName.replace(/\.mdx$/, "")
        },
        section: {
            type: "string",
            resolve: post => {
                return post._raw.sourceFileDir.replace("guides/", "");
            }
        }
    }
}));

export const Icons = defineDocumentType(() => ({
    name: "Icons",
    filePathPattern: "icons/**/*.mdx",
    contentType: "mdx",
    fields: {
        title: {
            type: "string",
            required: true
        },
        description: {
            type: "string"
        },
        section: {
            type: "string"
        },
        order: {
            type: "number"
        }
    },
    computedFields: {
        slug: {
            type: "string",
            resolve: post => post._raw.sourceFileName.replace(/\.mdx$/, "")
        },
        section: {
            type: "string",
            resolve: post => {
                return post._raw.sourceFileDir.replace("icons/", "");
            }
        }
    }
}));


export const StyledSystem = defineDocumentType(() => ({
    name: "StyledSystem",
    filePathPattern: "styled-system/**/*.mdx",
    contentType: "mdx",
    fields: {
        title: {
            type: "string",
            required: true
        },
        description: {
            type: "string"
        },
        section: {
            type: "string"
        },
        order: {
            type: "number"
        }
    },
    computedFields: {
        slug: {
            type: "string",
            resolve: post => post._raw.sourceFileName.replace(/\.mdx$/, "")
        },
        section: {
            type: "string",
            resolve: post => {
                return post._raw.sourceFileDir.replace("styled-system/", "");
            }
        }
    }
}));

export const GettingStarted = defineDocumentType(() => ({
    name: "GettingStarted",
    filePathPattern: "getting-started/**/*.mdx",
    contentType: "mdx",
    fields: {
        title: {
            type: "string",
            required: true
        },
        description: {
            type: "string"
        },
        section: {
            type: "string"
        },
        order: {
            type: "number"
        },
        status: {
            type: "string"
        }
    },
    computedFields: {
        slug: {
            type: "string",
            resolve: post => post._raw.sourceFileName.replace(/\.mdx$/, "")
        },
        section: {
            type: "string",
            resolve: post => {
                return post._raw.sourceFileDir.replace("getting-started/", "");
            }
        }
    }
}));

const Links = defineNestedType(() => ({
    name: "Links",
    fields: {
        source: { type: "string", required: true }
    }
}));

export const Components = defineDocumentType(() => ({
    name: "Components",
    filePathPattern: "components/**/*.mdx",
    contentType: "mdx",
    fields: {
        title: {
            type: "string",
            required: true
        },
        description: {
            type: "string"
        },
        section: {
            type: "string"
        },
        alpha: {
            type: "string"
        },
        status: {
            type: "string"
        },
        category: {
            type: "string"
        },
        order: {
            type: "number"
        },
        links: {
            type: "nested",
            of: Links
        }
    },
    computedFields: {
        slug: {
            type: "string",
            resolve: post => post._raw.sourceFileName.replace(/\.mdx$/, "")
        },
        section: {
            type: "string",
            resolve: post => {
                return post._raw.sourceFileDir.replace("components/", "");
            }
        }
    }
}));

import fs from "fs";
import path from "path";

export default makeSource({
    contentDirPath: "./content",
    documentTypes: [Page, Tokens, Components, Icons, Guides, GettingStarted, StyledSystem],
    mdx: {
        remarkPlugins: [],
        rehypePlugins: rehypePluginOptions
    },
    onSuccess: async importData => {
        const { allDocuments } = await importData();

        for (const doc of allDocuments) {
            const mdxPath = path.join("content", doc._raw.sourceFilePath);
            const outputMdPath = mdxPath.replace(/\.mdx$/, ".md");


            await convertMdxToMd({
                mdxPath,
                outputPath: `./dist/generated-md/${outputMdPath}`
            });
        }
    }
});

import type { Root } from "mdast";
import type { MdxJsxFlowElement } from "mdast-util-mdx";
import { remark } from "remark";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdx from "remark-mdx";
import remarkStringify from "remark-stringify";
import { visit } from "unist-util-visit";
import { getComponentDetails } from "./app/lib/getComponentDetails.ts";
import { mdxToMarkdown } from "./mdxToMarkdown.tsx";

interface ConvertMdxToMdOptions {
    mdxPath: string;
    outputPath: string;
}

function isJsxNode(node: any): node is MdxJsxFlowElement {
    return node.type === "mdxJsxFlowElement" ;
}

// Transformer plugin to handle JSX conversion
function jsxToMarkdown() {
    return (tree: Root) => {
        visit(tree, (node, index, parent) => {
            if (!parent || typeof index !== "number") {return;}
            if (!["yaml", "mdxJsxFlowElement"].includes(node.type)) {
                return;
            }

            //console.log("--->", tree);
            if (node.type === "yaml") {
                parent.children[index] = {
                    type: "heading",
                    depth: 1,
                    children: [{ type: "text", value: "Title" }]
                };
            } else if (isJsxNode(node) && node.name && !["CodeOnlyExample"].includes(node.name)) {
                const tag = node.name;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const content = (node.children?.[0] as any)?.value || "";

                if (tag === "MyNote") {
                    const titleAttr = node.attributes?.find(attr => attr.type === "mdxJsxAttribute" && attr.name === "title");
                    const title = typeof titleAttr?.value === "string" ? titleAttr.value : "Note";
                    const block = `> **${title}:** ${content}`;

                    parent.children[index] = {
                        type: "paragraph",
                        children: [{ type: "text", value: block }]
                    };
                } else if (tag === "Callout") {
                    const typeAttr = node.attributes?.find(attr => attr.type === "mdxJsxAttribute" && attr.name === "type");
                    const type = typeof typeAttr?.value === "string" ? typeAttr.value : "note";
                    const icon = type === "info" ? "💡" : type === "warning" ? "⚠️" : "👉";
                    const block = `> ${icon} *${type.charAt(0).toUpperCase() + type.slice(1)}:* ${content}`;

                    parent.children[index] = {
                        type: "paragraph",
                        children: [{ type: "text", value: block }]
                    };
                } else {
                    // For other JSX elements, we can convert them to a simple text block
                    parent.children[index] = {
                        type: "paragraph",
                        children: [{ type: "text", value: "Not supported yet" }]
                    };
                }
            }
        });
    };
}

export async function convertMdxToMd({ mdxPath, outputPath }: ConvertMdxToMdOptions): Promise<void> {
    const mdxSource = fs.readFileSync(mdxPath, "utf-8");

    const markdown = await remark()
        .use(remarkFrontmatter, ["yaml"])
        .use(remarkMdx)
        .use(jsxToMarkdown)
        // .use(remarkMdxToMarkdown, {
        //     contentDir: "./content",
        //     outputDir: "./dist/generated-md",
        //     props: true,
        //     flattenOutput: true
        // })
        .use(remarkStringify)
        .process(mdxSource);

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, await mdxToMarkdown(String(markdown)), "utf-8");
}

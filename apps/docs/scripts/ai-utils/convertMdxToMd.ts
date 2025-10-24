import type { Heading, List, ListItem, Paragraph, Root } from "mdast";
import type { ComponentType } from "react";
import { remark } from "remark";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdx from "remark-mdx";
import { visit } from "unist-util-visit";
import type { VFile } from "vfile";
import { matter } from "vfile-matter";
import { mdxToMarkdown } from "../../components/mdx/mdxToMarkdown.ai.tsx";

export async function convertMdxToMd(mdxSource: string, options?: FrontMatterConvertOptions, customComponents: Record<string, ComponentType> = {}): Promise<string> {
    const markdown = await remark()
        .use(remarkFrontmatter, ["yaml"])
        .use(yamlMatterReader)
        .use(remarkMdx)
        .use(frontMatterToMarkdown, options ?? { includeLinks: false })
        .process(mdxSource);

    return await mdxToMarkdown(String(markdown), customComponents);
}

export function yamlMatterReader() {
    return function (_tree: Root, file: VFile) {
        matter(file);
    };
}

interface DocumentFrontMatter {
    title: string;
    description: string;
    category: string;
    links?: {
        source: string;
        [key: string]: string; // Allow for additional link types
    };
}

export interface FrontMatterConvertOptions {
    includeLinks: boolean;
}

function frontMatterToMarkdown(options: FrontMatterConvertOptions) {
    return (tree: Root, file: VFile) => {
        visit(tree, (node, index, parent) => {
            if (!parent || typeof index !== "number") {
                return;
            }

            if (node.type === "yaml") {
                const frontMatter = file.data.matter as DocumentFrontMatter;
                const nodesToInsert = convertFrontMatterToMarkdown(frontMatter, options);

                parent.children.splice(index, 1, ...nodesToInsert);
            }
        });
    };
}

// Convert front matter to markdown nodes
function convertFrontMatterToMarkdown(frontMatter: DocumentFrontMatter, options: FrontMatterConvertOptions): (Heading | Paragraph | List)[] {
    // Title as H1
    const titleNode: Heading = {
        type: "heading",
        depth: 1,
        children: [{ type: "text", value: frontMatter.title }]
    };

    // Description as paragraph
    const descriptionNode: Paragraph = {
        type: "paragraph",
        children: [{ type: "text", value: frontMatter.description }]
    };

    const nodesToInsert: (Heading | Paragraph | List)[] = [titleNode, descriptionNode];

    // Add links list if links exist
    if (options.includeLinks && frontMatter.links && Object.keys(frontMatter.links).length > 0) {
        const linksListNode: List = {
            type: "list",
            ordered: false,
            children: Object.entries(frontMatter.links).map(([key, url]): ListItem => ({
                type: "listItem",
                children: [
                    {
                        type: "paragraph",
                        children: [
                            { type: "text", value: `${key.charAt(0).toUpperCase() + key.slice(1)}: ` },
                            {
                                type: "link",
                                url,
                                children: [{ type: "text", value: url }]
                            }
                        ]
                    }
                ]
            }))
        };
        nodesToInsert.push(linksListNode);
    }

    return nodesToInsert;
}

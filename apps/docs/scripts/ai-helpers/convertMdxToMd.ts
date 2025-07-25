import type { Heading, List, ListItem, Paragraph, Root } from "mdast";
import { remark } from "remark";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdx from "remark-mdx";
import { visit } from "unist-util-visit";
import type { VFile } from "vfile";
import { matter } from "vfile-matter";
import { mdxToMarkdown } from "../../components/mdx/mdxToMarkdown.ai";


export async function convertMdxToMd(mdxSource: string): Promise<string> {
    const markdown = await remark()
        .use(remarkFrontmatter, ["yaml"])
        .use(myUnifiedPluginHandlingYamlMatter)
        .use(remarkMdx)
        .use(frontMatterToMarkdown)
        //.use(markNotSupportedComponents) // TODO: Remove this when all components are supported
        .process(mdxSource);

    return await mdxToMarkdown(String(markdown));
}

export function myUnifiedPluginHandlingYamlMatter() {
    /**
   * Transform.
   *
   * @param {Node} tree
   *   Tree.
   * @param {VFile} file
   *   File.
   * @returns {undefined}
   *   Nothing.
   */
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

function frontMatterToMarkdown() {
    return (tree: Root, file: VFile) => {
        visit(tree, (node, index, parent) => {
            if (!parent || typeof index !== "number") {return;}

            if (node.type === "yaml") {
                const frontMatter = file.data.matter as DocumentFrontMatter;
                const nodesToInsert = convertFrontMatterToMarkdown(frontMatter);

                // Replace the current node with the nodes
                parent.children.splice(index, 1, ...nodesToInsert);
            }
        });
    };
}

// Convert front matter to markdown nodes
function convertFrontMatterToMarkdown(frontMatter: DocumentFrontMatter): (Heading | Paragraph | List)[] {
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
    if (frontMatter.links && Object.keys(frontMatter.links).length > 0) {
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

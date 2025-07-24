import { isValidComponentName } from "@/components/mdx/components.ai";
import fs from "fs/promises";
import type { Heading, List, ListItem, Paragraph, Root } from "mdast";
import type { MdxJsxFlowElement } from "mdast-util-mdx";
import path from "path";
import { remark } from "remark";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdx from "remark-mdx";
import { visit } from "unist-util-visit";
import type { VFile } from "vfile";
import { matter } from "vfile-matter";
import { mdxToMarkdown } from "../../components/mdx/mdxToMarkdown.ai";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isJsxNode(node: any): node is MdxJsxFlowElement {
    return node.type === "mdxJsxFlowElement" ;
}

export default function myUnifiedPluginHandlingYamlMatter() {
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

function markNotSupportedComponents() {
    return (tree: Root) => {
        visit(tree, (node, index, parent) => {
            if (!parent || typeof index !== "number") {return;}

            if (isJsxNode(node) && node.name && !isValidComponentName(node.name)) {
                // For other JSX elements, we can convert them to a simple text block
                parent.children[index] = {
                    type: "paragraph",
                    children: [{ type: "text", value: "[[Not supported yet]]" }]
                };
            }
        });
    };
}

async function convertMdxToMd(filePath: string): Promise<string> {
    const mdxSource = await fs.readFile(filePath, "utf-8");

    const markdown = await remark()
        .use(remarkFrontmatter, ["yaml"])
        .use(myUnifiedPluginHandlingYamlMatter)
        .use(remarkMdx)
        .use(frontMatterToMarkdown)
        //.use(markNotSupportedComponents) // TODO: Remove this when all components are supported
        .process(mdxSource);

    return await mdxToMarkdown(String(markdown));
}

interface GenerateMarkdownOptions {
    contentDir: string;
    outputDir: string;
    props: boolean;
    flattenOutput?: boolean;
}

// Find all MDX files in a directory
async function findMdxFiles(dir: string): Promise<string[]> {
    const files: string[] = [];

    try {
        const entries = await fs.readdir(dir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);

            if (entry.isDirectory()) {
                const subdirFiles = await findMdxFiles(fullPath);
                files.push(...subdirFiles);
            } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
                files.push(fullPath);
            }
        }
    } catch (error) {
        console.error(`Error reading directory ${dir}:`, error);
    }

    return files;
}

interface ProcessedFile {
    outputPath: string;
    content: string;
}

// Write processed file to output directory
async function writeProcessedFile(processedFile: ProcessedFile): Promise<void> {
    try {
        // Ensure output directory exists
        await fs.mkdir(path.dirname(processedFile.outputPath), { recursive: true });

        // Write the file
        await fs.writeFile(processedFile.outputPath, processedFile.content);

        console.log(`✅ Generated: ${processedFile.outputPath}`);
    } catch (error) {
        console.error(`Error writing ${processedFile.outputPath}:`, error);
    }
}

export async function generateMarkdownFromMdx(options: GenerateMarkdownOptions): Promise<void> {
    try {
        console.log("🚀 Starting MDX to Markdown conversion...");

        // Ensure output directory exists
        await fs.mkdir(options.outputDir, { recursive: true });

        // Find all MDX files
        const mdxFiles = await findMdxFiles(options.contentDir);
        console.log(`📁 Found ${mdxFiles.length} MDX files`);

        // Process files
        const processedFiles: ProcessedFile[] = [];

        for (const filePath of mdxFiles) {
            const mdContent = await convertMdxToMd(filePath);
            if (mdContent) {
                let targetPath = options.outputDir;
                if (!options.flattenOutput) {
                    const relativePath = path.relative(options.contentDir, filePath);
                    targetPath = path.join(targetPath, path.dirname(relativePath));

                    await fs.mkdir(targetPath, { recursive: true });
                }
                processedFiles.push({
                    outputPath: path.join(targetPath, path.basename(filePath, ".mdx") + ".md"),
                    content: mdContent
                });
            }
        }

        // Write all processed files
        for (const processedFile of processedFiles) {
            await writeProcessedFile(processedFile);
        }

        // Generate package.json for the output
        const packageJson = {
            name: "hopper-docs-markdown",
            version: "1.0.0",
            description: "Generated markdown files from Hopper documentation",
            private: true,
            scripts: {},
            dependencies: {}
        };

        const packageJsonPath = path.join(options.outputDir, "package.json");
        await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));

        console.log(`✅ Successfully converted ${processedFiles.length} MDX files to Markdown`);
        console.log(`📦 Output directory: ${options.outputDir}`);
    } catch (error) {
        console.error("❌ Error during conversion:", error);
        process.exit(1);
    }
}

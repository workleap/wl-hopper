import type { components } from "@/components/mdx/components.ai.tsx";
import fs from "fs/promises";
import type { Heading, Node, Parent, Root } from "mdast";
import path from "path";
import type { ComponentType } from "react";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import { convertMdxToMd, type FrontMatterConvertOptions } from "./convertMdxToMd.ts";

async function convertMdxFileToMd(filePath: string, options?: FrontMatterConvertOptions, customComponents: Record<string, ComponentType> = {}): Promise<string> {
    const mdxSource = await fs.readFile(filePath, "utf-8");

    const mdContent = convertMdxToMd(mdxSource, options, customComponents);

    //replace <!-- --> comments with empty string
    return (await mdContent).replace(/<!--[\s\S]*?-->/g, "");
}

export interface GenerateMarkdownOptions {
    filesPath: string;
    outputPath: string;
    flattenOutput?: boolean;

    /**
     * Whether to search subdirectories for MDX files.
     * @default true
     */
    deep?: boolean;

    /**
     * Whether to exclude certain file or folder names from the search.
     */
    excludedPaths?: string[];

    markdown?: {
        /*
        Excluded sections from the generated MDX content. It is based on the section names in the MDX files.
        */
        excludedSections?: string[];

        /**
         * Whether to exclude front matter links from the generated Markdown.
         */
        includeFrontMatterLinks?: boolean;

        /**
         * A function to replace links in the generated Markdown.
         */
        replaceLinks?: (link: string) => string;
    };

    /**
     * Custom MDX components to support during conversion (e.g., for rendering previews).
     */
    renderer?: {
        customComponents?: Partial<Record<keyof typeof components, ComponentType>>;
    };
}

// Find all MDX files in a directory
async function findFiles(dir: string, deep: boolean, extensions: string[], excludes?: string[]): Promise<string[]> {
    const files: string[] = [];

    try {
        const entries = await fs.readdir(dir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);

            if (deep && entry.isDirectory()) {
                const shouldExclude = excludes?.some(exclude => entry.name.startsWith(exclude));
                if (shouldExclude) {
                    continue;
                }
                const subdirFiles = await findFiles(fullPath, deep, extensions, excludes);
                files.push(...subdirFiles);
            } else if (entry.isFile() && extensions.some(ext => entry.name.endsWith(ext))) {
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

// Build a processed file object for an MDX source file (handles path logic + directory creation)
async function processMarkdownContent(filePath: string, mdContent: string, options: GenerateMarkdownOptions): Promise<ProcessedFile> {
    let targetPath = options.outputPath;
    const relativePath = path.relative(options.filesPath, filePath);
    const fileDir = path.dirname(relativePath);

    if (!options.flattenOutput) {
        targetPath = path.join(targetPath, fileDir);
        await fs.mkdir(targetPath, { recursive: true });
    }

    return {
        // Always replace whatever extension the original file had with .md (handles .mdx, .md, etc.)
        outputPath: path.join(targetPath, path.parse(filePath).name + ".md"),
        content: replaceLinks(
            excludeSections(mdContent, options.markdown?.excludedSections),
            options.markdown?.replaceLinks
        )
    };
}

// Write processed file to output directory
async function writeProcessedFile(processedFile: ProcessedFile): Promise<void> {
    try {
        // Ensure output directory exists
        await fs.mkdir(path.dirname(processedFile.outputPath), { recursive: true });

        await fs.writeFile(processedFile.outputPath, processedFile.content, { flag: "wx" });
    } catch (error) {
        console.error(`Error writing ${processedFile.outputPath}:`, error);
        throw error;
    }
}

export async function generateMarkdownFromMdx(options: GenerateMarkdownOptions): Promise<void> {
    try {
        console.log("🚀 Starting MDX to Markdown conversion...");

        // Ensure output directory exists
        await fs.mkdir(options.outputPath, { recursive: true });

        const mdxFiles = await findFiles(options.filesPath, options.deep ?? true, [".mdx"], options.excludedPaths);
        console.log(`📁 Found ${mdxFiles.length} MDX files`);

        // Process files
        const processedFiles: ProcessedFile[] = [];
        const customComponents = options.renderer?.customComponents ?? {};

        for (const filePath of mdxFiles) {
            const mdContent = await convertMdxFileToMd(filePath, { includeLinks: options.markdown?.includeFrontMatterLinks ?? false }, customComponents);
            if (mdContent) {
                processedFiles.push(await processMarkdownContent(filePath, mdContent, options));
            }
        }

        // Write all processed files
        for (const processedFile of processedFiles) {
            await writeProcessedFile(processedFile);
        }

        console.log(`✅ Successfully converted ${processedFiles.length} MDX files to Markdown`);
        console.log(`📦 Output directory: ${options.outputPath}`);
    } catch (error) {
        console.error("❌ Error during conversion:", error);
        process.exit(1);
    }
}

export async function copyMarkdownFiles(options: GenerateMarkdownOptions): Promise<void> {
    try {
        console.log("🚀 Starting Markdown file copy...");

        // Ensure output directory exists
        await fs.mkdir(options.outputPath, { recursive: true });

        const mdFiles = await findFiles(options.filesPath, options.deep ?? true, [".md"], options.excludedPaths);
        console.log(`📁 Found ${mdFiles.length} MD files`);

        // Process files
        const processedFiles: ProcessedFile[] = [];

        for (const filePath of mdFiles) {
            const mdContent = await fs.readFile(filePath, "utf-8");
            processedFiles.push(await processMarkdownContent(filePath, mdContent, options));
        }

        // Write all processed files
        for (const processedFile of processedFiles) {
            await writeProcessedFile(processedFile);
        }

        console.log(`✅ Successfully converted ${processedFiles.length} MDX files to Markdown`);
        console.log(`📦 Output directory: ${options.outputPath}`);
    } catch (error) {
        console.error("❌ Error during conversion:", error);
        process.exit(1);
    }
}

function replaceLinks(mdContent: string, replaceLinkFn?: (link: string) => string): string {
    if (!replaceLinkFn) {
        return mdContent;
    }

    const processor = unified()
        .use(remarkParse)
        .use(remarkStringify);

    const tree = processor.parse(mdContent);

    visit(tree, "link", node => {
        if (node.url) {
            node.url = replaceLinkFn(node.url);
        }
    });

    return processor.stringify(tree as Root);
}

function excludeSections(mdContent: string, excludedSections?: string[]): string {
    if (!excludedSections || excludedSections.length === 0) {
        return mdContent;
    }

    const processor = unified()
        .use(remarkParse)
        .use(remarkStringify);

    const tree = processor.parse(mdContent);
    const nodesToRemove: { node: Node; index: number; parent: Parent }[] = [];

    // Parse excluded sections to extract level and text
    const parsedExcludedSections = excludedSections.map(section => {
        const match = section.match(/^(#{1,6})\s+(.+)$/);
        if (match) {
            return {
                level: match[1].length as 1 | 2 | 3 | 4 | 5 | 6,
                text: match[2].trim()
            };
        }

        // If no level specified, treat as any level
        return {
            level: null,
            text: section.trim()
        };
    });

    visit(tree, "heading", (node: Heading, index, parent) => {
        if (!node.children || !parent) {return;}

        // Check if heading text matches any excluded section
        const headingText = node.children
            .filter(child => child.type === "text")
            .map(child => child.value)
            .join("")
            .trim();

        const shouldExclude = parsedExcludedSections.some(({ level, text }) => {
            const textMatches = headingText.toLowerCase().includes(text.toLowerCase());
            const levelMatches = level === null || node.depth === level;

            return textMatches && levelMatches;
        });

        if (shouldExclude && index !== undefined) {
            // Mark this heading for removal
            nodesToRemove.push({ node, index, parent });

            // Find all content until the next heading of same or higher level
            const currentLevel = node.depth;
            let nextIndex = index + 1;

            while (nextIndex < parent.children.length) {
                const nextNode = parent.children[nextIndex];

                // If we hit another heading of same or higher level, stop
                if (nextNode.type === "heading" && (nextNode as Heading).depth <= currentLevel) {
                    break;
                }

                // Mark content for removal
                nodesToRemove.push({
                    node: nextNode,
                    index: nextIndex,
                    parent
                });

                nextIndex++;
            }
        }
    });

    // Remove nodes in reverse order to maintain correct indices
    nodesToRemove
        .sort((a, b) => b.index - a.index)
        .forEach(({ index, parent }) => {
            parent.children.splice(index, 1);
        });

    return processor.stringify(tree as Root);
}

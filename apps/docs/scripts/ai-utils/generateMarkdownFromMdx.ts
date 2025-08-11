import fs from "fs/promises";
import type { Heading, Root } from "mdast";
import path from "path";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import { convertMdxToMd, FrontMatterConvertOptions } from "./convertMdxToMd.ts";


async function convertMdxFileToMd(filePath: string, options?: FrontMatterConvertOptions): Promise<string> {
    const mdxSource = await fs.readFile(filePath, "utf-8");

    const mdContent = convertMdxToMd(mdxSource, options);

    //replace <!-- --> comments with empty string
    return (await mdContent).replace(/<!--[\s\S]*?-->/g, "");
}

interface GenerateMarkdownOptions {
    filesPath: string;
    outputPath: string;
    flattenOutput?: boolean;
    flattenOutputExceptions?: string[];

    /**
     * Whether to search subdirectories for MDX files.
     * @default true
     */
    deep?: boolean;

    /**
     * Whether to exclude certain file or folder names from the search.
     */
    excludedPaths?: string[];

    /*
    Excluded sections from the generated MDX content. It is based on the section names in the MDX files.
    */
    excludedSections?: string[];

    /**
     * Whether to exclude front matter links from the generated Markdown.
     */
    includeFrontMatterLinks?: boolean;
}

// Find all MDX files in a directory
async function findMdxFiles(dir: string, deep: boolean, excludes?: string[]): Promise<string[]> {
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
                const subdirFiles = await findMdxFiles(fullPath, deep, excludes);
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

        // Find all MDX files
        const mdxFiles = await findMdxFiles(options.filesPath, options.deep ?? true, options.excludedPaths);
        console.log(`📁 Found ${mdxFiles.length} MDX files`);

        // Process files
        const processedFiles: ProcessedFile[] = [];

        for (const filePath of mdxFiles) {
            const mdContent = await convertMdxFileToMd(filePath, {  includeLinks: options.includeFrontMatterLinks ?? false });
            if (mdContent) {
                let targetPath = options.outputPath;
                const relativePath = path.relative(options.filesPath, filePath);
                const fileDir = path.dirname(relativePath);

                // Check if this file should maintain directory structure
                const shouldFlatten = options.flattenOutput &&
                    !options.flattenOutputExceptions?.some(exception =>
                        fileDir.startsWith(exception) || fileDir === exception
                    );

                if (!shouldFlatten) {
                    targetPath = path.join(targetPath, fileDir);
                    await fs.mkdir(targetPath, { recursive: true });
                }

                processedFiles.push({
                    outputPath: path.join(targetPath, path.basename(filePath, ".mdx") + ".md"),
                    content: options.excludedSections && options.excludedSections.length > 0 ? excludeSections(mdContent, options.excludedSections) : mdContent
                });
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

function excludeSections(mdContent: string, excludedSections: string[]): string {
    if (!excludedSections || excludedSections.length === 0) {
        return mdContent;
    }

    const processor = unified()
        .use(remarkParse)
        .use(remarkStringify);

    const tree = processor.parse(mdContent);
    const nodesToRemove: any[] = [];

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
        if (!node.children || !parent) return;

        // Check if heading text matches any excluded section
        const headingText = node.children
            .filter(child => child.type === "text")
            .map(child => (child as any).value)
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

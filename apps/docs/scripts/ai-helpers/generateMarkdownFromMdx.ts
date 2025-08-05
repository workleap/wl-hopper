import fs from "fs/promises";
import path from "path";
import { convertMdxToMd } from "./convertMdxToMd";


async function convertMdxFileToMd(filePath: string): Promise<string> {
    const mdxSource = await fs.readFile(filePath, "utf-8");

    return convertMdxToMd(mdxSource);
}

interface GenerateMarkdownOptions {
    contentDir: string;
    outputDir: string;
    props: boolean;
    flattenOutput?: boolean;
    flattenOutputExceptions?: string[];
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
            const mdContent = await convertMdxFileToMd(filePath);
            if (mdContent) {
                let targetPath = options.outputDir;
                const relativePath = path.relative(options.contentDir, filePath);
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

import { aiDocsConfig } from "@/ai-pipeline/ai-docs.config.ts";
import { isMdFromMdxBuild, isPropsJsonBuild, isTokensJsonBuild, isUnsafePropsJsonBuild, isUnsafePropsMarkdownBuild } from "@/ai-pipeline/util.ts";
import { readFile, rm } from "fs/promises";
import { glob } from "glob";
import { isAbsolute, join } from "path";
import { generateAiDocsMapping } from "./ai-utils/generateFilesMapping.ts";
import { copyMarkdownFiles, generateMarkdownFromMdx, GenerateMarkdownOptions } from "./ai-utils/generateMarkdownFromMdx.ts";
import { generatePropsJsonFromMdx } from "./ai-utils/generatePropsJsonFromMdx.ts";
import { generateTokensMaps } from "./ai-utils/generateTokensMaps.ts";
import { generateUnsafePropsJson, generateUnsafePropsMarkdown } from "./ai-utils/generateUnsafePropsList.ts";
import { mergeContents } from "./ai-utils/mergeContents.ts";
import { updateMarkdownHeadingLevels } from "./ai-utils/updateMarkdownHeadingLevels.ts";

async function mergeFiles(files: string[], { fileName, path, headingFile, updateLevels }: { fileName: string; path: string; headingFile?: string; updateLevels: boolean }) {
    // Expand all patterns and collect matching files
    const allFiles: string[] = [];

    for (const pattern of files) {
        const globPattern = isAbsolute(pattern) ? pattern : join(path, pattern);
        const matches = await glob(globPattern, {
            nodir: true, // Only match files, not directories
            absolute: false, // Return relative paths
            cwd: path // Set working directory to outputDir
        });

        if (matches.length === 0) {
            throw new Error(`No files matched for pattern: ${pattern}`);
        }

        for (const match of matches.sort()) {
            if (!allFiles.includes(match)) {
                allFiles.push(match);
            }
        }
    }

    const contents: string[] = [];

    // Keep the original order of files as passed
    for (const file of allFiles) {
        const filePath = join(path, file);
        try {
            const fileContent = await readFile(filePath, "utf8");
            const updateLevel = headingFile && updateLevels ? await updateMarkdownHeadingLevels(fileContent, 1) : fileContent;

            contents.push(updateLevel);
        } catch (error) {
            throw new Error(`Error: Could not read file ${filePath}: ${error}`);
        }
    }

    const outputPath = join(path, fileName);
    await mergeContents(contents, outputPath, headingFile);

    console.log(`✅ Merged successfully: ${outputPath}`);
}


function fixRelativeLink(link: string, extension: "txt" | "md"): string {
    // Don't modify full links
    if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/i.test(link)) {
        return link;
    }

    // Don't modify hash-only links (internal document references)
    if (link.startsWith("#")) {
        return link;
    }

    // Parse the link to separate path from hash and query string
    const url = new URL(link, "file://dummy-base/");
    let pathname = url.pathname;
    const hash = url.hash;
    const search = url.search;

    if (!pathname.includes(".") || pathname.endsWith("/")) {
        // Remove trailing slash if present before adding extension
        pathname = `${pathname.replace(/\/$/, "")}.${extension}`;
    }

    return pathname + search + hash;
}

async function main() {
    const outputPath = join(process.cwd(), aiDocsConfig.buildRootPath, aiDocsConfig.filesFolder);
    const projectRoot = process.cwd();

    // clear baseFolder
    await rm(outputPath, { recursive: true, force: true });

    for (const [fileKey, fileConfig] of Object.entries(aiDocsConfig.routes)) {
        const buildInfo = fileConfig.build;

        if (isMdFromMdxBuild(buildInfo)) {
            const options: GenerateMarkdownOptions = {
                filesPath: join(projectRoot, buildInfo.source),
                outputPath: join(outputPath, fileKey),
                flattenOutput: buildInfo.flatten,
                excludedPaths: buildInfo.excludedPaths,
                markdown: {
                    replaceLinks: (link: string) => fixRelativeLink(link, "md"),
                    ...buildInfo.markdown
                }
            };

            await generateMarkdownFromMdx(options);
            await copyMarkdownFiles(options);

        } else if (isPropsJsonBuild(buildInfo)) {
            await generatePropsJsonFromMdx({
                filesPath: join(projectRoot, buildInfo.source),
                outputPath: join(outputPath, fileKey),
                options: buildInfo.options
            });
        } else if (isTokensJsonBuild(buildInfo)) {
            await generateTokensMaps({
                sourceFile: join(projectRoot, buildInfo.source),
                outputPath: join(outputPath, fileKey),
                fullMap: buildInfo.options?.fullMap ?? false
            });
        } else if (isUnsafePropsJsonBuild(buildInfo)) {
            await generateUnsafePropsJson({
                outputPath: join(outputPath, fileKey)
            });
        } else if (isUnsafePropsMarkdownBuild(buildInfo)) {
            await generateUnsafePropsMarkdown({
                outputPath: join(outputPath, fileKey),
                headingFile: join(projectRoot, buildInfo.template)
            });
        } else {
            await mergeFiles(buildInfo.merge?.map(file => join(outputPath, file)) ?? [], {
                fileName: fileKey,
                path: outputPath,
                headingFile: buildInfo.template ? join(projectRoot, buildInfo.template) : undefined,
                updateLevels: !buildInfo.keepOriginalLeveling
            });
        }
    }

    generateAiDocsMapping(outputPath, "index.ts");
}

main();

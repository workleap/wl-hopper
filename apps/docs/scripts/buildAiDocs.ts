import { aiDocsConfig } from "@/ai-pipeline/ai-docs.config.tsx";
import { isIconsJsonBuild, isMdFromMdxBuild, isPropsJsonBuild, isTokensJsonBuild, isUnsafePropsJsonBuild, isUnsafePropsMarkdownBuild } from "@/ai-pipeline/util.ts";
import { readFile, rm } from "fs/promises";
import { glob } from "glob";
import { isAbsolute, join } from "path";
import { generateAiDocsMapping } from "./ai-utils/generateFilesMapping.ts";
import { generateIconsJson } from "./ai-utils/generateIconsData.ts";
import { copyMarkdownFiles, generateMarkdownFromMdx, type GenerateMarkdownOptions } from "./ai-utils/generateMarkdownFromMdx.ts";
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
    try {
        // If the link is absolute (has a valid scheme), just return it
        new URL(link);

        return link;
    } catch {
        // Not a valid absolute URL → likely relative
    }

    // Skip hash-only links
    if (link.startsWith("#")) {
        return link;
    }

    //NOTE: we cannot use URL as it resolves the relative paths start with "../" wrongly.
    // Split query and hash from path
    const [pathWithQuery, hash = ""] = link.split("#");
    const [path, query = ""] = pathWithQuery.split("?");

    // Add extension if there's no file extension or if ends with "/"
    const hasExtension = /\.[^/]+$/.test(path);
    const endsWithSlash = path.endsWith("/");

    const fixedPath = !hasExtension || endsWithSlash
        ? `${path.replace(/\/$/, "")}.${extension}`
        : path;

    return (
        fixedPath +
        (query ? `?${query}` : "") +
        (hash ? `#${hash}` : "")
    );
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
                renderer: buildInfo.renderer,
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
                outputPath: join(outputPath, fileKey)
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
        } else if (isIconsJsonBuild(buildInfo)) {
            await generateIconsJson({
                outputPath: join(outputPath, fileKey)
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

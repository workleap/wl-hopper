import { aiDocsConfig } from "@/ai-docs/config.js";
import { isMdFromMdxBuild, isPropsJsonBuild } from "@/ai-docs/util.js";
import { createWriteStream } from "fs";
import { readFile, rm } from "fs/promises";
import { glob } from "glob";
import { isAbsolute, join } from "path";
import { convertMdxToMd } from "./ai-utils/convertMdxToMd.js";
import { generateMarkdownFromMdx } from "./ai-utils/generateMarkdownFromMdx.js";
import { generatePropsJsonFromMdx } from "./ai-utils/generatePropsJsonFromMdx.js";
import { updateMarkdownHeadingLevels } from "./ai-utils/updateMarkdownHeadingLevels.js";

async function mergeFiles(files: string[], { fileName, path, headingFile }: { fileName: string; path: string; headingFile: string }) {
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


    const outputPath = join(path, fileName);
    const writeStream = createWriteStream(outputPath);

    //read the heading file if provided
    if (headingFile) {
        try {
            let headingContent = await readFile(headingFile, "utf8");
            if (headingFile.trim().endsWith(".mdx")) {
                headingContent = await convertMdxToMd(headingContent);
            }
            writeStream.write(headingContent + "\n");
        } catch (error) {
            throw new Error(`Error reading heading file ${headingFile}: ${error}`);
        }
    }

    // Keep the original order of files as passed
    for (const file of allFiles) {
        const filePath = join(path, file);
        try {
            const fileContent = await readFile(filePath, "utf8");
            const updateLevel = headingFile ? await updateMarkdownHeadingLevels(fileContent, 1) : fileContent;

            writeStream.write(updateLevel + "\n");
        } catch (error) {
            throw new Error(`Error: Could not read file ${filePath}: ${error}`);
        }
    }

    writeStream.end();
}


async function main() {
    const outputPath = join(process.cwd(), aiDocsConfig.buildRootPath, aiDocsConfig.filesFolder);
    const projectRoot = process.cwd();

    // clear baseFolder
    await rm(outputPath, { recursive: true, force: true });

    for (const [fileKey, fileConfig] of Object.entries(aiDocsConfig.routes)) {
        const buildInfo = fileConfig.build;

        if (isMdFromMdxBuild(buildInfo)) {
            await generateMarkdownFromMdx({
                filesPath: join(projectRoot, buildInfo.source),
                outputPath: join(outputPath, fileKey),
                flattenOutput: buildInfo.flatten,
                markdown: buildInfo.markdown
            });
        } else if (isPropsJsonBuild(buildInfo)) {
            await generatePropsJsonFromMdx({
                filesPath: join(projectRoot, buildInfo.source),
                outputPath: join(outputPath, fileKey)
            });
        } else {
            await mergeFiles(buildInfo.merge.map(file => join(outputPath, file)), {
                fileName: fileKey,
                path: outputPath,
                headingFile: join(projectRoot, buildInfo.template)
            });
        }
    }
}

main();

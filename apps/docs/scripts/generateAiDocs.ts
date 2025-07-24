import { createWriteStream } from "fs";
import { readFile, rm } from "fs/promises";
import { glob } from "glob";
import path from "path";
import { generateMarkdownFromMdx } from "./ai-helpers/generateMarkdownFromMdx.js";
import { generatePropsJsonFromMdx } from "./ai-helpers/generatePropsJsonFromMdx.js";

const baseFolder = "dist/ai";

async function generate_components_docs() {
    const contentDir = path.join(process.cwd(), "content/components");
    const outputDir = path.join(process.cwd(), baseFolder, "components/usage");

    // 1. Generate Markdown files from MDX
    await generateMarkdownFromMdx({ contentDir, outputDir, props: true, flattenOutput: true, flattenOutputExceptions: ["concepts"] });

    await mergeFiles(outputDir, [
        "component-list.md",
        "concepts/*.md",
        "*.md",
    ], "full.md");

    // 2. Generate JSON files from Markdown
    const jsonOutputDir = path.join(process.cwd(), baseFolder, "components/api");
    await generatePropsJsonFromMdx({ contentDir, jsonOutputDir });
}

async function generate_getting_started_docs() {
    const contentDir = path.join(process.cwd(), "content/getting-started");
    const outputDir = path.join(process.cwd(), baseFolder, "getting-started");

    await generateMarkdownFromMdx({ contentDir, outputDir, props: true, flattenOutput: true });

    await mergeFiles(outputDir, [
        "installation.md",
        "react.md",
        "javascript.md",
        "text-crop.md",
        "components.md"
    ], "full.md");
}

async function generate_icons_docs() {
    const contentDir = path.join(process.cwd(), "content/icons");
    const outputDir = path.join(process.cwd(), baseFolder, "icons");

    await generateMarkdownFromMdx({ contentDir, outputDir, props: true, flattenOutput: false });

    await mergeFiles(outputDir, [
        "overview/introduction.md",
        "overview/designing-an-icon.md",
        "react-icons/icon-library.md",
        "react-icons/rich-icon-library.md",
        "svg-icons/icon-library.md",
        "svg-icons/rich-icon-library.md"
    ], "full.md");
}

async function generate_tokens_docs() {
    const contentDir = path.join(process.cwd(), "content/tokens");
    const outputDir = path.join(process.cwd(), baseFolder, "tokens");

    await generateMarkdownFromMdx({ contentDir, outputDir, props: true, flattenOutput: false });

    await mergeFiles(outputDir, [
        "overview/introduction.md",
        "semantic/color.md",
        "semantic/elevation.md",
        "semantic/shape.md",
        "semantic/space.md",
        "semantic/typography.md",
        "core/border-radius.md",
        "core/color.md",
        "core/dimensions.md",
        "core/font-family.md",
        "core/font-size.md",
        "core/font-weight.md",
        "core/line-height.md",
        "core/motion.md",
        "core/shadow.md"
    ], "full.md");
}

async function generate_styled_system_docs() {
    const contentDir = path.join(process.cwd(), "content/styled-system");
    const outputDir = path.join(process.cwd(), baseFolder, "styled-system");

    await generateMarkdownFromMdx({ contentDir, outputDir, props: true, flattenOutput: false });

    await mergeFiles(outputDir, [
        "overview/introduction.md",
        "concepts/styling.md",
        "concepts/responsive-styles.md",
        "concepts/html-elements.md",
        "concepts/custom-components.md"
    ], "full.md");
}

async function mergeFiles(outputDir: string, files: string[], outputFile: string) {
    // Expand all patterns and collect matching files
    const allFiles: string[] = [];

    for (const pattern of files) {

            const globPattern = path.join(outputDir, pattern);
            const matches = await glob(globPattern, {
                nodir: true,        // Only match files, not directories
                absolute: false,    // Return relative paths
                cwd: outputDir      // Set working directory to outputDir
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


    const outputPath = path.join(outputDir, outputFile);
    const writeStream = createWriteStream(outputPath);

    // Keep the original order of files as passed
    for (const file of allFiles) {
        const filePath = path.join(outputDir, file);
        try {
            const data = await readFile(filePath, "utf8");
            writeStream.write(data + "\n");
        } catch (error) {
            throw new Error(`Warning: Could not read file ${filePath}: ${error}`);
        }
    }

    writeStream.end();
}


async function main() {

    // clear baseFolder
    await rm(path.join(process.cwd(), baseFolder), { recursive: true, force: true });

    await generate_components_docs();

    await generate_getting_started_docs();

    await generate_icons_docs();

    await generate_tokens_docs();

    await generate_styled_system_docs();

        const outputDir = path.join(process.cwd(), baseFolder);

        await mergeFiles(outputDir, [
            "getting-started/full.md",
            "styled-system/full.md",
            "tokens/full.md",
            "components/usage/full.md",
            "icons/full.md",
        ], "full.md");
}

main();

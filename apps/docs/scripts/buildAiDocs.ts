import { createWriteStream } from "fs";
import { readFile, rm } from "fs/promises";
import { glob } from "glob";
import { join } from "path";
import { convertMdxToMd } from "./ai-utils/convertMdxToMd.js";
import { generateMarkdownFromMdx } from "./ai-utils/generateMarkdownFromMdx.js";
import { generatePropsJsonFromMdx } from "./ai-utils/generatePropsJsonFromMdx.js";
import { updateMarkdownHeadingLevels } from "./ai-utils/updateMarkdownHeadingLevels.js";

const baseFolder = "dist/ai";
const aiTemplatesFolder = "content/ai-templates";

function getTemplateFile(templateName: string): string {
    return join(process.cwd(), aiTemplatesFolder, templateName);
}

async function generate_components_docs() {
    const componentsDir = join(process.cwd(), "content/components");
    const conceptsDir = join(process.cwd(), "content/components/concepts");

    const componentsOutputDir = join(process.cwd(), baseFolder, "components/usage");
    const conceptsOutputDir = join(process.cwd(), baseFolder, "components/usage/concepts");

    // 1. Generate Markdown files from MDX
    await generateMarkdownFromMdx({ contentDir: componentsDir, outputDir: componentsOutputDir, flattenOutput: true, excludedPaths: ["concepts"], excludedSections: ["## Props"] });

    // 2. Generate Markdown files from MDX
    await generateMarkdownFromMdx({ contentDir: conceptsDir, outputDir: conceptsOutputDir, flattenOutput: true });

    await mergeFiles([
        "component-list.md",
        "concepts/*.md",
        "*.md"
    ], {
        outputFile: "llms-components.md",
        outputDir: componentsOutputDir,
        headingFile: getTemplateFile("components.mdx")
    });

    // 2. Generate JSON files from Markdown
    const jsonOutputDir = join(process.cwd(), baseFolder, "components/api");
    await generatePropsJsonFromMdx({ contentDir: componentsDir, jsonOutputDir });
}

async function generate_getting_started_docs() {
    const contentDir = join(process.cwd(), "content/getting-started");
    const outputDir = join(process.cwd(), baseFolder, "getting-started");

    await generateMarkdownFromMdx({ contentDir, outputDir, flattenOutput: true });

    await mergeFiles([
        "installation.md",
        "react.md",
        "javascript.md",
        "text-crop.md",
        "components.md"
    ], { outputFile: "llms-getting-started.md",
        outputDir,
        headingFile: getTemplateFile("getting-started.mdx")
    });
}

async function generate_icons_docs() {
    const contentDir = join(process.cwd(), "content/icons");
    const outputDir = join(process.cwd(), baseFolder, "icons");

    await generateMarkdownFromMdx({ contentDir, outputDir, flattenOutput: false });

    await mergeFiles([
        "overview/introduction.md",
        "overview/designing-an-icon.md",
        "react-icons/icon-library.md",
        "react-icons/rich-icon-library.md",
        "SVG-icons/icon-library.md",
        "SVG-icons/rich-icon-library.md"
    ], {
        outputFile: "llms-icons.md",
        outputDir,
        headingFile: getTemplateFile("icons.mdx")
    });

    await mergeFiles([
        "react-icons/icon-library.md",
        "react-icons/rich-icon-library.md",
    ], {
        outputFile: "llms-react-icons.md",
        outputDir,
        headingFile: getTemplateFile("icons-react.mdx")
    });

    await mergeFiles([
        "SVG-icons/icon-library.md",
        "SVG-icons/rich-icon-library.md"
    ], {
        outputFile: "llms-svg-icons.md",
        outputDir,
        headingFile: getTemplateFile("icons-svg.mdx")
    });
}

async function generate_tokens_docs() {
    const contentDir = join(process.cwd(), "content/tokens");
    const outputDir = join(process.cwd(), baseFolder, "tokens");

    await generateMarkdownFromMdx({ contentDir, outputDir, flattenOutput: false });

    await mergeFiles([
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
    ], {
        outputFile: "llms-tokens.md",
        outputDir,
        headingFile: getTemplateFile("tokens.mdx")
    });
}

async function generate_styled_system_docs() {
    const contentDir = join(process.cwd(), "content/styled-system");
    const outputDir = join(process.cwd(), baseFolder, "styled-system");

    await generateMarkdownFromMdx({ contentDir, outputDir,  flattenOutput: false });

    await mergeFiles([
        "overview/introduction.md",
        "concepts/styling.md",
        "concepts/responsive-styles.md",
        "concepts/html-elements.md",
        "concepts/custom-components.md"
    ], {
        outputFile: "llms-styled-system.md",
        outputDir,
        headingFile: getTemplateFile("styled-system.mdx")
    });
}

async function mergeFiles(files: string[], { outputFile, outputDir, headingFile }: { outputFile: string; outputDir: string; headingFile: string }) {
    // Expand all patterns and collect matching files
    const allFiles: string[] = [];

    for (const pattern of files) {
        const globPattern = join(outputDir, pattern);
        const matches = await glob(globPattern, {
            nodir: true, // Only match files, not directories
            absolute: false, // Return relative paths
            cwd: outputDir // Set working directory to outputDir
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


    const outputPath = join(outputDir, outputFile);
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
        const filePath = join(outputDir, file);
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
    // clear baseFolder
    await rm(join(process.cwd(), baseFolder), { recursive: true, force: true });

    await generate_components_docs();
    await generate_getting_started_docs();
    await generate_icons_docs();
    await generate_tokens_docs();
    await generate_styled_system_docs();

    const outputDir = join(process.cwd(), baseFolder);

    await mergeFiles([
        "getting-started/llms-getting-started.md",
        "styled-system/llms-styled-system.md",
        "tokens/llms-tokens.md",
        "components/usage/llms-components.md",
        "icons/llms-icons.md"
    ], {
        outputFile: "llms-full.md",
        outputDir,
        headingFile: getTemplateFile("all.mdx")
    });
}

main();

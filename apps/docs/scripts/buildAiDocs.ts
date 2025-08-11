import { createWriteStream } from "fs";
import { readFile, rm } from "fs/promises";
import { glob } from "glob";
import { isAbsolute, join } from "path";
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
    const componentsPath = join(process.cwd(), "content/components");
    const conceptsPath = join(process.cwd(), "content/components/concepts");

    const componentOutputPath = join(process.cwd(), baseFolder, "components");
    const componentsUsageOutputPath = join(componentOutputPath, "usage");
    const componentsFullDocOutputPath = join(componentOutputPath, "full");
    const conceptsOutputPath = join(componentOutputPath, "concepts");

    // 1. components usage
    await generateMarkdownFromMdx({ filesPath: componentsPath, outputPath: componentsUsageOutputPath, flattenOutput: true, excludedPaths: ["concepts"], excludedSections: ["## Props"] });

    // 2. components full documentation
    await generateMarkdownFromMdx({ filesPath: componentsPath, outputPath: componentsFullDocOutputPath, flattenOutput: true, excludedPaths: ["concepts"], includeFrontMatterLinks: true });

    // 3. concepts
    await generateMarkdownFromMdx({ filesPath: conceptsPath, outputPath: conceptsOutputPath, flattenOutput: true });

    await mergeFiles([
        join(componentsFullDocOutputPath, "component-list.md"),
        join(conceptsOutputPath, "*.md"),
        join(componentsFullDocOutputPath,"*.md"),
    ], {
        fileName: "llms-components.md",
        path: componentOutputPath,
        headingFile: getTemplateFile("components.mdx")
    });

    // 4. Generate JSON files from Markdown
    const jsonOutputPath = join(process.cwd(), baseFolder, "components/api");
    await generatePropsJsonFromMdx({ files: componentsPath, outputPath: jsonOutputPath });
}

async function generate_getting_started_docs() {
    const filesPath = join(process.cwd(), "content/getting-started");
    const outputPath = join(process.cwd(), baseFolder, "getting-started");

    await generateMarkdownFromMdx({ filesPath, outputPath, flattenOutput: true });

    await mergeFiles([
        "installation.md",
        "react.md",
        "javascript.md",
        "text-crop.md",
        "components.md"
    ], { fileName: "llms-getting-started.md",
        path: outputPath,
        headingFile: getTemplateFile("getting-started.mdx")
    });
}

async function generate_icons_docs() {
    const filesPath = join(process.cwd(), "content/icons");
    const outputPath = join(process.cwd(), baseFolder, "icons");

    await generateMarkdownFromMdx({ filesPath, outputPath, flattenOutput: false });

    await mergeFiles([
        "overview/introduction.md",
        "overview/designing-an-icon.md",
        "react-icons/icon-library.md",
        "react-icons/rich-icon-library.md",
        "SVG-icons/icon-library.md",
        "SVG-icons/rich-icon-library.md"
    ], {
        fileName: "llms-icons.md",
        path: outputPath,
        headingFile: getTemplateFile("icons.mdx")
    });

    await mergeFiles([
        "react-icons/icon-library.md",
        "react-icons/rich-icon-library.md",
    ], {
        fileName: "llms-react-icons.md",
        path: outputPath,
        headingFile: getTemplateFile("icons-react.mdx")
    });

    await mergeFiles([
        "SVG-icons/icon-library.md",
        "SVG-icons/rich-icon-library.md"
    ], {
        fileName: "llms-svg-icons.md",
        path: outputPath,
        headingFile: getTemplateFile("icons-svg.mdx")
    });
}

async function generate_tokens_docs() {
    const filesPath = join(process.cwd(), "content/tokens");
    const outputPath = join(process.cwd(), baseFolder, "tokens");

    await generateMarkdownFromMdx({ filesPath, outputPath, flattenOutput: false });

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
        fileName: "llms-tokens.md",
        path: outputPath,
        headingFile: getTemplateFile("tokens.mdx")
    });
}

async function generate_styled_system_docs() {
    const filesPath = join(process.cwd(), "content/styled-system");
    const outputPath = join(process.cwd(), baseFolder, "styled-system");

    await generateMarkdownFromMdx({ filesPath, outputPath,  flattenOutput: false });

    await mergeFiles([
        "overview/introduction.md",
        "concepts/styling.md",
        "concepts/responsive-styles.md",
        "concepts/html-elements.md",
        "concepts/custom-components.md"
    ], {
        fileName: "llms-styled-system.md",
        path: outputPath,
        headingFile: getTemplateFile("styled-system.mdx")
    });
}

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
    // clear baseFolder
    await rm(join(process.cwd(), baseFolder), { recursive: true, force: true });

    await generate_components_docs();
    await generate_getting_started_docs();
    await generate_icons_docs();
    await generate_tokens_docs();
    await generate_styled_system_docs();

    const outputPath = join(process.cwd(), baseFolder);

    await mergeFiles([
        "getting-started/llms-getting-started.md",
        "styled-system/llms-styled-system.md",
        "tokens/llms-tokens.md",
        "components/llms-components.md",
        "icons/llms-icons.md"
    ], {
        fileName: "llms-full.md",
        path: outputPath,
        headingFile: getTemplateFile("all.mdx")
    });
}

main();

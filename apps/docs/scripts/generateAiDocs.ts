import { createWriteStream } from "fs";
import { readFile } from "fs/promises";
import path from "path";
import { generateMarkdownFromMdx } from "./ai-helpers/generateMarkdownFromMdx.js";
import { generatePropsJsonFromMdx } from "./ai-helpers/generatePropsJsonFromMdx.js";

async function generate_components_docs() {
    const contentDir = path.join(process.cwd(), "content/components");
    const outputDir = path.join(process.cwd(), "dist/ai/components/usage");

    // 1. Generate Markdown files from MDX
    await generateMarkdownFromMdx({ contentDir, outputDir, props: true, flattenOutput: true });

    // 2. Generate JSON files from Markdown
    const jsonOutputDir = path.join(process.cwd(), "dist/ai/components/api");
    await generatePropsJsonFromMdx({ contentDir, jsonOutputDir });
}

async function generate_getting_started_docs() {
    const contentDir = path.join(process.cwd(), "content/getting-started");
    const outputDir = path.join(process.cwd(), "dist/ai/getting-started");

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
    const outputDir = path.join(process.cwd(), "dist/ai/icons");

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
    const outputDir = path.join(process.cwd(), "dist/ai/tokens");

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
    const outputDir = path.join(process.cwd(), "dist/ai/styled-system");

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
    const outputPath = path.join(outputDir, outputFile);
    const writeStream = createWriteStream(outputPath);

    for (const file of files) {
        const filePath = path.join(outputDir, file);
        const data = await readFile(filePath, "utf8");
        writeStream.write(data + "\n");
    }

    writeStream.end();
}


async function main() {
    await generate_components_docs();

    await generate_getting_started_docs();

    await generate_icons_docs();

    await generate_tokens_docs();

    await generate_styled_system_docs();
}

main();

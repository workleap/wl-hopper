import path from "path";
import { generateMarkdownFromMdx } from "./utils/generateMarkdownFromMdx.js";
import { generatePropsJsonFromMdx } from "./utils/generatePropsJsonFromMdx.js";

async function main() {
    const contentDir = path.join(process.cwd(), "content/components");
    const outputDir = path.join(process.cwd(), "dist/ai/components/usage");

    // 1. Generate Markdown files from MDX
    await generateMarkdownFromMdx({ contentDir, outputDir, props: true, flattenOutput: true });

    // 2. Generate JSON files from Markdown
    const jsonOutputDir = path.join(process.cwd(), "dist/ai/components/api");
    await generatePropsJsonFromMdx({ contentDir, jsonOutputDir });
}

// Run the script
main();

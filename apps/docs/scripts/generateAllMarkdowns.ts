import path from "path";
import { generateMarkdownFromMdx } from "./utils/generateMarkdownFromMdx.js";

async function main() {
    const contentDir = path.join(process.cwd(), "content");
    const outputDir = path.join(process.cwd(), "dist/markdown");

    await generateMarkdownFromMdx({ contentDir, outputDir, props: true });
}

// Run the script
main();

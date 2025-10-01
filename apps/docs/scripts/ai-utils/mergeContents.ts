import { createWriteStream } from "fs";
import { readFile } from "fs/promises";
import { convertMdxToMd } from "./../ai-utils/convertMdxToMd.js";

export async function mergeContents(contents: string[], outputPath: string, headingFilePath?: string) {
    const writeStream = createWriteStream(outputPath);

    //read the heading file if provided
    if (headingFilePath) {
        try {
            let headingContent = await readFile(headingFilePath, "utf8");
            if (headingFilePath.trim().endsWith(".mdx")) {
                headingContent = await convertMdxToMd(headingContent);
            }
            writeStream.write(headingContent + "\n");
        } catch (error) {
            throw new Error(`Error reading heading file ${headingFilePath}: ${error}`);
        }
    }

    // Keep the original order of files as passed
    for (const content of contents) {
        writeStream.write(content + "\n");
    }

    writeStream.end();
}

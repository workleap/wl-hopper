import { mkdir, readFile } from "fs/promises";
import { glob } from "glob";
import { dirname, isAbsolute, join } from "path";
import { mergeContents } from "./mergeContents.ts";
import { updateMarkdownHeadingLevels } from "./updateMarkdownHeadingLevels.ts";

export interface MergeFilesOptions {
    /** Name of the merged file, relative to `path`. Ignored when `outputFile` is set. */
    fileName: string;
    /** Directory the patterns are resolved against, and the default output directory. */
    path: string;
    /** Absolute output path. Use it when the merged file belongs outside `path`. */
    outputFile?: string;
    /** Optional template prepended to the merged content. */
    headingFile?: string;
    /** Whether to push every merged file's headings down one level. */
    updateLevels: boolean;
}

/**
 * Expands the given glob patterns, concatenates the matching files in order and writes
 * the result to `path/fileName`, optionally prefixed by a heading template.
 */
export async function mergeFiles(
    files: string[],
    { fileName, path, outputFile, headingFile, updateLevels }: MergeFilesOptions
) {
    // Expand all patterns and collect matching files
    const allFiles: string[] = [];

    for (const pattern of files) {
        // `glob` treats backslashes as escape characters rather than path separators, so patterns
        // built with `join` have to be normalised to posix separators to work on Windows.
        const globPattern = (isAbsolute(pattern) ? pattern : join(path, pattern)).replaceAll("\\", "/");
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
            const updateLevel =
                headingFile && updateLevels ? await updateMarkdownHeadingLevels(fileContent, 1) : fileContent;

            contents.push(updateLevel);
        } catch (error) {
            throw new Error(`Error: Could not read file ${filePath}: ${error}`, { cause: error });
        }
    }

    const outputPath = outputFile ?? join(path, fileName);
    await mkdir(dirname(outputPath), { recursive: true });
    await mergeContents(contents, outputPath, headingFile);

    console.log(`✅ Merged successfully: ${outputPath}`);
}

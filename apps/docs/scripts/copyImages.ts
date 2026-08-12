import fs from "fs";
import path from "path";
import { glob } from "glob";

const INPUT = path.join(
    process.cwd(),
    "..",
    "..",
    "packages",
    "components",
    "src",
    "**",
    "docs",
    "**",
    "*.{jpg,png,gif,svg}"
);
const OUTPUT = path.join(process.cwd(), "public");

glob(INPUT, async (err, files) => {
    if (err) {
        console.error("Error finding image files:", err);

        return;
    }

    const copyPromises = files.map(async file => {
        const relativePath = path.basename(file);
        const destination = path.join(OUTPUT, relativePath);
        try {
            await fs.promises.copyFile(file, destination);
            console.log(`Copied ${file} to ${destination}`);
        } catch (error) {
            console.error(`Error copying ${file} to ${destination}:`, error);
        }
    });

    try {
        await Promise.all(copyPromises);
        console.log("All files copied successfully.");
    } catch (error) {
        console.error("Error during file copy:", error);
    }
});

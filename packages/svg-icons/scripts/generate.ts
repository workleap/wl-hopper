import path from "path";

import {
    IconSizes,
    IconsOptimizedDirectory,
    IconsSourceDirectory,
    RichIconSizes,
    RichIconsOptimizedDirectory,
    RichIconsSourceDirectory
} from "./constants.ts";
import { optimizeIcon } from "./optimize.ts";

/**
 * Converts a file path to a file name.
 * @example fileNameConverter("C:\\Dev\\wl-hopper\\packages\\svgs\\src\\icons\\16px\\Add.svg") // add-16.svg
 */
function fileNameConverter(filePath: string, allowedIconSizes: readonly number[]) {
    const dirName = path.dirname(filePath);
    const size = path.basename(dirName).replace("px", "");

    if (allowedIconSizes.includes(Number(size)) === false) {
        throw new Error(`Invalid icon size: ${size}`);
    }

    const fileName = path.basename(filePath, ".svg");

    const kebabCaseName = fileName
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace(/[\s_]+/g, "-")
        .toLowerCase();

    return `${kebabCaseName}-${size}.svg`;
}

console.log("⚙️  Optimizing icons...\n");

optimizeIcon(IconsSourceDirectory, IconsOptimizedDirectory, filePath => fileNameConverter(filePath, IconSizes));

console.log("⚙️  Optimizing rich icons...\n");

optimizeIcon(RichIconsSourceDirectory, RichIconsOptimizedDirectory, filePath =>
    fileNameConverter(filePath, RichIconSizes)
);

console.log("✨ The icons have been optimized!\n");

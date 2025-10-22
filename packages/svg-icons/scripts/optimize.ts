import fs from "fs";
import path from "path";
import { optimize } from "svgo";

import config from "./svgoConfig.ts";

export function optimizeIcon(srcDir: string, outputDir: string, fileNameConverter?: (filePath: string) => string) {
    // Clear directory (It also removes the directory itself)
    fs.rmSync(outputDir, { recursive: true, force: true });
    fs.mkdirSync(outputDir, { recursive: true });

    // This line requires Node.js 20.5.2 or higher to execute properly
    // https://github.com/nodejs/node/issues/48858
    const files = fs.readdirSync(srcDir, { recursive: true, withFileTypes: true });

    const svgFiles = files.filter(file => file.isFile() && file.name.endsWith(".svg"));

    const iconFiles = svgFiles.map(file => {
        const srcPath = path.resolve(file.parentPath, file.name);
        const dstPath = path.resolve(outputDir, fileNameConverter ? fileNameConverter(srcPath) : file.name);

        return {
            srcPath: srcPath,
            dstPath
        };
    });

    // If it's possible to rename a file with the same name, then we need to validate that there are no duplicates
    if (fileNameConverter) {
        validateNoNameDuplicate(iconFiles.map(x => x.dstPath));
    }

    iconFiles.forEach(iconFile => {
        const contents = fs.readFileSync(iconFile.srcPath, "utf8");
        const { data } = optimize(contents, {
            path: iconFile.srcPath,
            ...config
        });

        fs.writeFileSync(iconFile.dstPath, Buffer.from(data));
    });
}

function validateNoNameDuplicate(names: string[]) {
    const duplicateNames: string[] = [];
    const nameSet = new Set<string>();

    for (const name of names) {
        if (nameSet.has(name)) {
            duplicateNames.push(name);
        } else {
            nameSet.add(name);
        }
    }

    if (duplicateNames.length > 0) {
        throw new Error(`Duplicate icon names detected: ${duplicateNames.join(", ")}`);
    }
}

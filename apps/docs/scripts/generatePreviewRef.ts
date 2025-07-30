import fs from "fs";
import { glob } from "glob";
import path from "path";

const CONTENT_FILES = path.join(process.cwd(), "content", "components", "**", "*.mdx");
const OUTPUT_FILE = "Preview.ts";
const OUTPUT_DIR = "examples";

function getExamplePath(filePath: string[]) {
    const srcValues: string[] = [];

    filePath.forEach(file => {
        const content = fs.readFileSync(file, "utf-8");
        const regex = /<Example\s+(?:[^>]*?\s+)?src="([^"]*)"/g;
        let match;
        while ((match = regex.exec(content)) !== null) {
            srcValues.push(match[1]);
        }
    });

    return srcValues;
}

function getMdxFiles() {
    return glob.sync(CONTENT_FILES);
}

function generateDemoFile(content?: string) {
    const dirPath = path.join(process.cwd(), OUTPUT_DIR);
    const filePath = path.join(dirPath, OUTPUT_FILE);

    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }

    fs.writeFileSync(filePath, content || "");
}

function generatePreviewRef() {
    console.log("Start generation Preview references...");
    const files = getMdxFiles();
    const examplePaths = getExamplePath(files);

    let previewEntries = "";
    for (const examplePath of examplePaths) {
        let importPath;

        if (examplePath.startsWith("icons")) {
            const modifiedExamplePath = examplePath.replace(/^icons\//, "");
            importPath = `@/../../packages/icons/${modifiedExamplePath}.tsx`;
        } else {
            importPath = `@/../../packages/components/src/${examplePath}.tsx`;
        }

        previewEntries += `
    "${examplePath}": {
        component: lazy(() => import("${importPath}"))
    },`;
    }

    const previewContent = `/* eslint-disable */
// @ts-nocheck
/* -------------------------------------------------------------------------- */
/*                    GENERATED FILE, DO NOT EDIT MANUALLY!                   */
/* -------------------------------------------------------------------------- */

import { lazy, type LazyExoticComponent, type ReactElement } from "react";

interface Preview {
    component: LazyExoticComponent<() => ReactElement>;
}

export const Previews: Record<string, Preview> = {${previewEntries}
};
    `;

    generateDemoFile(previewContent);
    console.log("🎉 Success");
}

generatePreviewRef();

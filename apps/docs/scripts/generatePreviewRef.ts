import fs from "fs";
import { glob } from "glob";
import path from "path";
import { resolveExampleSource } from "../configs/examplePackages.ts";

// Every docs section whose MDX may carry an `<Example src="…" />`. Which package a given `src`
// resolves to is decided by `resolveExampleSource`, shared with the two runtime call sites.
const CONTENT_FILES = ["components", "shadcn-extension"].map(section =>
    path.join(process.cwd(), "content", section, "**", "*.mdx").replace(/\\/g, "/")
);
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
    return CONTENT_FILES.flatMap(pattern => glob.sync(pattern));
}

function getImportPath(examplePath: string) {
    const { packagePath, rest } = resolveExampleSource(examplePath);

    return `@/../../packages/${packagePath}/${rest}.tsx`;
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
        previewEntries += `
    "${examplePath}": {
        component: lazy(() => import("${getImportPath(examplePath)}"))
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

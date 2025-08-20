import { aiDocsConfig } from "@/ai-docs/ai-docs.config.js";
import { readdir, stat, writeFile } from "fs/promises";
import { join, relative } from "path";

interface FileInfo {
    path: string;
    size: number;
    estimatedTokens: number;
}

interface FileMapping {
    [key: string]: FileMapping | FileInfo;
}

// camelCase helper from kebab/slug/upper words
function toCamelCase(input: string): string {
    const base = input.replace(/\.[^.]+$/, "");
    if (/[-_\s]/.test(base)) {
        const parts = base.split(/[-_\s]+/);
        const norm = parts.map(p => (p.toUpperCase() === p ? p.toLowerCase() : p));
        const first = norm[0].toLowerCase();
        const rest = norm.slice(1).map(s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase());

        return [first, ...rest].join("");
    }

    // PascalCase or already lower/upper: just lower first char
    return base.charAt(0).toLowerCase() + base.slice(1);
}

// Build a nested object from a path like "components/concepts/client-router-file.md"
async function setDeep(obj: Record<string, FileMapping | FileInfo>, filePathFromRoot: string, fileSize: number) {
    const parts = filePathFromRoot.split("/");
    let cursor = obj;
    for (let i = 0; i < parts.length; i++) {
        const raw = parts[i];
        const isLast = i === parts.length - 1;
        const key = toCamelCase(raw);

        if (isLast) {
            const relPath = `/${filePathFromRoot}`; // leading slash, include folder and file with extension
            cursor[key] = {
                path: relPath.replaceAll("\\", "/"),
                size: fileSize,
                estimatedTokens: Math.ceil(fileSize / 3.5) // rough estimate
            };
        } else {
            if (!cursor[key] || typeof cursor[key] !== "object" || "path" in cursor[key]) {
                cursor[key] = {};
            }
            cursor = cursor[key] as Record<string, FileMapping | FileInfo>;
        }
    }
}

async function collectFiles(rootDir: string): Promise<string[]> {
    const results: string[] = [];

    async function walk(dir: string) {
        const entries = await readdir(dir, { withFileTypes: true });
        for (const entry of entries) {
            const full = join(dir, entry.name);
            if (entry.isDirectory()) {
                await walk(full);
            } else if (entry.isFile()) {
                results.push(full);
            }
        }
    }

    await walk(rootDir);

    return results;
}

/**
 * Generates a plain JS object map of files under dist/ai-docs and writes it to public/ai-docs/ai-docs-mapping.ts
 * Example shape:
 * const aiDocFiles = { components: { button: { path: '/ai-docs/components/button.md', size: 1234 } } }
 */
export async function generateAiDocsMapping(outputRoot: string, fileName: string) {
    const distAiDocs = join(process.cwd(), aiDocsConfig.buildRootPath, aiDocsConfig.filesFolder);
    const publicAiDocs = outputRoot; // this should point to dist/ai-docs

    const files = await collectFiles(distAiDocs);
    const mapping: FileMapping = {};

    for (const abs of files) {
        const relFromAiDocs = relative(distAiDocs, abs).replaceAll("\\", "/");
        const fileStats = await stat(abs);
        await setDeep(mapping, relFromAiDocs, fileStats.size);
    }

    const content = `// Auto-generated file - do not edit manually\nconst files = ${JSON.stringify(mapping, null, 2)};\n\nexport { files };\n`;
    const mappingFilePath = join(publicAiDocs, fileName);
    await writeFile(mappingFilePath, content, "utf8");
    console.log(`✅ Generated AI docs mapping at: ${mappingFilePath}`);
}

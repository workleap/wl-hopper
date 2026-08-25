import { type SkillFileEntry, isCopyEntry, isMergeEntry, isTemplateEntry } from "@/ai-pipeline/skillsTypes.ts";
import { copyFile, mkdir, stat } from "fs/promises";
import { glob } from "glob";
import { basename, dirname, join, relative } from "path";
import { mergeFiles } from "./mergeFiles.ts";

export interface SkillFile {
    /** Path relative to the skill root, using forward slashes. */
    path: string;
    size: number;
    /** Description supplied by the config, if any. Otherwise derived from the file content. */
    description?: string;
}

export interface CopySkillFilesOptions {
    entries: SkillFileEntry[];
    /** Absolute path of the generated AI docs root. */
    aiDocsRoot: string;
    /** Absolute path of the docs app root, which hand-authored template paths resolve against. */
    projectRoot: string;
    /** Absolute path of the skill root. */
    skillRoot: string;
}

const MAGIC = /[*?[\]{}!+@(]/;

/**
 * `glob` treats backslashes as escape characters rather than path separators, so patterns built
 * with `join` have to be normalised to posix separators to work on Windows. Same reason as in
 * mergeFiles.ts.
 */
function toPosix(value: string) {
    return value.replaceAll("\\", "/");
}

/**
 * The literal part of a glob, i.e. everything up to the first segment containing a magic
 * character. "/tokens/maps/&#42;/&#42;/all.json" yields "/tokens/maps".
 */
function staticPrefix(pattern: string) {
    const segments = pattern.split("/");
    const firstMagic = segments.findIndex(segment => MAGIC.test(segment));

    return (firstMagic === -1 ? segments.slice(0, -1) : segments.slice(0, firstMagic)).join("/");
}

/**
 * A destination ending in "/" keeps the source path relative to the pattern's literal prefix,
 * so nested matches such as `maps/workleap/light/all.json` do not collapse onto each other.
 */
function toSkillPath(destination: string, sourceFile: string, aiDocsRoot: string, pattern: string) {
    if (!destination.endsWith("/")) {
        return destination;
    }

    const base = join(aiDocsRoot, staticPrefix(pattern));
    const relativePath = relative(base, sourceFile).replaceAll("\\", "/");

    return `${destination}${relativePath}`;
}

async function copyInto(absoluteSource: string, skillPath: string, skillRoot: string): Promise<number> {
    const target = join(skillRoot, skillPath);
    await mkdir(dirname(target), { recursive: true });
    await copyFile(absoluteSource, target);

    return (await stat(target)).size;
}

/**
 * Materialises every configured entry into the skill directory and returns the files written,
 * in configuration order. Throws when a pattern matches nothing, so a renamed AI docs route
 * fails the build instead of silently shrinking the skill.
 */
export async function copySkillFiles({
    entries,
    aiDocsRoot,
    projectRoot,
    skillRoot
}: CopySkillFilesOptions): Promise<SkillFile[]> {
    const written: SkillFile[] = [];
    const seen = new Set<string>();

    function record(file: SkillFile) {
        if (seen.has(file.path)) {
            throw new Error(`Two skill entries write to the same path: ${file.path}`);
        }
        seen.add(file.path);
        written.push(file);
    }

    for (const entry of entries) {
        if (isTemplateEntry(entry)) {
            const source = join(projectRoot, entry.copyTemplate);
            const size = await copyInto(source, entry.to, skillRoot);
            record({ path: entry.to, size, description: entry.description });
        } else if (isMergeEntry(entry)) {
            const outputFile = join(skillRoot, entry.to);
            // mergeFiles treats a leading "/" as an absolute path, so resolve against the AI
            // docs root first — the same thing buildAiDocs.ts does with its merge patterns.
            await mergeFiles(
                entry.merge.map(pattern => join(aiDocsRoot, pattern)),
                {
                    fileName: basename(entry.to),
                    path: aiDocsRoot,
                    outputFile,
                    headingFile: join(projectRoot, entry.template),
                    updateLevels: !entry.keepOriginalLeveling
                }
            );
            record({ path: entry.to, size: (await stat(outputFile)).size, description: entry.description });
        } else if (isCopyEntry(entry)) {
            const matches = (
                await glob(toPosix(join(aiDocsRoot, entry.from)), {
                    nodir: true,
                    absolute: true,
                    ignore: entry.exclude?.map(pattern => toPosix(join(aiDocsRoot, pattern)))
                })
            ).sort();

            if (matches.length === 0) {
                throw new Error(
                    `No AI docs file matched "${entry.from}". Did an ai-docs.config.tsx route get renamed?`
                );
            }

            if (entry.expectedCount !== undefined && matches.length !== entry.expectedCount) {
                throw new Error(
                    `Expected "${entry.from}" to match ${entry.expectedCount} files but it matched ${matches.length}.`
                );
            }

            if (matches.length > 1 && !entry.to.endsWith("/")) {
                throw new Error(
                    `"${entry.from}" matched ${matches.length} files, so its "to" must end with "/". Got "${entry.to}".`
                );
            }

            for (const match of matches) {
                const skillPath = toSkillPath(entry.to, match, aiDocsRoot, entry.from);
                const size = await copyInto(match, skillPath, skillRoot);
                record({ path: skillPath, size, description: entry.description });
            }
        } else {
            throw new Error(`Unrecognized skill entry: ${JSON.stringify(entry)}`);
        }
    }

    return written;
}

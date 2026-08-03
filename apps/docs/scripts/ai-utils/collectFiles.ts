import { readdir } from "fs/promises";
import { join } from "path";

/**
 * Recursively collects the absolute path of every file under `rootDir`.
 * Directories are walked but never returned.
 */
export async function collectFiles(rootDir: string): Promise<string[]> {
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

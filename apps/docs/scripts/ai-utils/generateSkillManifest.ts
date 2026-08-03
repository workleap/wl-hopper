import type { SkillFrontmatter } from "@/ai-pipeline/skillsTypes.ts";
import { access, stat, writeFile } from "fs/promises";
import { join, relative } from "path";
import { collectFiles } from "./collectFiles.ts";

const MAX_DESCRIPTION_LENGTH = 1024;
const NAME_PATTERN = /^[a-z0-9][a-z0-9-]*$/;

export interface ManifestSkill {
    name: string;
    description: string;
    files: string[];
}

export interface GenerateSkillManifestOptions {
    /** Absolute path of the folder holding every skill directory. */
    skillsRoot: string;
    skills: { frontmatter: SkillFrontmatter; skillRoot: string }[];
    maxTotalBytes: number;
}

/**
 * Writes the `.well-known/skills/index.json` manifest by listing what is actually on disk,
 * then verifies every advertised file is readable. The `skills` CLI fetches each entry by
 * path, so a stale or wrong list is a broken install rather than a degraded one.
 */
export async function generateSkillManifest({ skillsRoot, skills, maxTotalBytes }: GenerateSkillManifestOptions) {
    const manifest: { skills: ManifestSkill[] } = { skills: [] };

    for (const { frontmatter, skillRoot } of skills) {
        if (!NAME_PATTERN.test(frontmatter.name)) {
            throw new Error(`Skill name "${frontmatter.name}" must match ${NAME_PATTERN}.`);
        }

        const description = frontmatter.description.trim();

        if (description.length === 0) {
            throw new Error(`Skill "${frontmatter.name}" has no description. Agents use it to decide whether to load the skill.`);
        }

        if (description.length > MAX_DESCRIPTION_LENGTH) {
            throw new Error(`Skill "${frontmatter.name}" description is ${description.length} characters, over the ${MAX_DESCRIPTION_LENGTH} limit.`);
        }

        const absolute = await collectFiles(skillRoot);
        const files = absolute
            .map(file => relative(skillRoot, file).replaceAll("\\", "/"))
            // SKILL.md must be first: it is the entry point clients read to name the skill.
            .sort((a, b) => (a === "SKILL.md" ? -1 : b === "SKILL.md" ? 1 : a.localeCompare(b)));

        if (files[0] !== "SKILL.md") {
            throw new Error(`Skill "${frontmatter.name}" has no SKILL.md.`);
        }

        for (const file of files) {
            await access(join(skillRoot, file));
        }

        manifest.skills.push({ name: frontmatter.name, description, files });
    }

    const total = (await collectFiles(skillsRoot)).length;
    const bytes = await totalBytes(skillsRoot);

    if (bytes > maxTotalBytes) {
        throw new Error(
            `Skills payload is ${formatBytes(bytes)}, over the ${formatBytes(maxTotalBytes)} budget. ` +
            "Drop or trim an entry in skills.config.ts rather than raising the budget without discussion."
        );
    }

    const manifestPath = join(skillsRoot, "index.json");
    await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

    console.log(`✅ Generated skills manifest at: ${manifestPath} (${total} files, ${formatBytes(bytes)})`);

    return manifest;
}

async function totalBytes(root: string) {
    const files = await collectFiles(root);
    let bytes = 0;

    for (const file of files) {
        bytes += (await stat(file)).size;
    }

    return bytes;
}

export function formatBytes(bytes: number) {
    return `${(bytes / 1_000_000).toFixed(2)} MB`;
}

import type { SkillFrontmatter } from "@/ai-pipeline/skillsTypes.ts";
import { access, stat, writeFile } from "fs/promises";
import { join, relative } from "path";
import { collectFiles } from "./collectFiles.ts";
import { createSkillArchive } from "./createSkillArchive.ts";

const MAX_DESCRIPTION_LENGTH = 1024;
const NAME_PATTERN = /^[a-z0-9][a-z0-9-]*$/;

/**
 * The archive form of the discovery index. The CLI fetches one artifact and verifies its digest,
 * instead of racing one request per file — see createSkillArchive.ts for why that matters.
 */
const DISCOVERY_SCHEMA = "https://schemas.agentskills.io/discovery/0.2.0/schema.json";

export interface ManifestSkill {
    name: string;
    description: string;
    type: "archive";
    url: string;
    digest: string;
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
    const manifest: { $schema: string; skills: ManifestSkill[] } = { $schema: DISCOVERY_SCHEMA, skills: [] };

    for (const { frontmatter, skillRoot } of skills) {
        if (!NAME_PATTERN.test(frontmatter.name)) {
            throw new Error(`Skill name "${frontmatter.name}" must match ${NAME_PATTERN}.`);
        }

        const description = frontmatter.description.trim();

        if (description.length === 0) {
            throw new Error(
                `Skill "${frontmatter.name}" has no description. Agents use it to decide whether to load the skill.`
            );
        }

        if (description.length > MAX_DESCRIPTION_LENGTH) {
            throw new Error(
                `Skill "${frontmatter.name}" description is ${description.length} characters, over the ${MAX_DESCRIPTION_LENGTH} limit.`
            );
        }

        const files = (await collectFiles(skillRoot)).map(file => relative(skillRoot, file).replaceAll("\\", "/"));

        if (!files.includes("SKILL.md")) {
            throw new Error(`Skill "${frontmatter.name}" has no SKILL.md.`);
        }

        for (const file of files) {
            await access(join(skillRoot, file));
        }

        const archive = await createSkillArchive(skillRoot, skillsRoot, frontmatter.name);

        console.log(
            `✅ Packed skill archive: ${archive.fileName} (${files.length} files, ${formatBytes(archive.bytes)} compressed)`
        );

        manifest.skills.push({
            name: frontmatter.name,
            description,
            type: "archive",
            // Resolved by the client against the index.json URL.
            url: `./${archive.fileName}`,
            digest: archive.digest
        });
    }

    // Measure the skills themselves. The archives sit alongside them and are a packed copy of the
    // same bytes, so counting them would charge the payload twice.
    let total = 0;
    let bytes = 0;

    for (const { skillRoot } of skills) {
        total += (await collectFiles(skillRoot)).length;
        bytes += await totalBytes(skillRoot);
    }

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

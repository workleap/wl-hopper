import { skillsConfig } from "@/ai-pipeline/skills.config.ts";
import type { SkillConfig, SkillFrontmatter } from "@/ai-pipeline/skillsTypes.ts";
import { access, mkdir, readFile, rm, writeFile } from "fs/promises";
import { join } from "path";
import { bundleSkillScripts } from "./ai-utils/bundleSkillScripts.ts";
import { type SkillFile, copySkillFiles } from "./ai-utils/copySkillFiles.ts";
import { generateSkillIndex } from "./ai-utils/generateSkillIndex.ts";
import { formatBytes, generateSkillManifest } from "./ai-utils/generateSkillManifest.ts";

/**
 * Builds the agent Skills published at /.well-known/skills.
 *
 * This stage composes what buildAiDocs.ts already produced under dist/ai-docs — it never renders
 * MDX a second time — so it MUST run after `build:ai-docs`. Every failure here is fatal on
 * purpose: a half-built skill installs cleanly and then quietly misleads agents.
 */

function renderFrontmatter(frontmatter: SkillFrontmatter) {
    const lines = ["---", `name: ${frontmatter.name}`, "description: >-"];

    // Folded block scalar: the description is long and must survive as a single line.
    for (const chunk of wrap(frontmatter.description, 96)) {
        lines.push(`  ${chunk}`);
    }

    if (frontmatter.license) {
        lines.push(`license: ${frontmatter.license}`);
    }

    if (frontmatter.compatibility) {
        lines.push(`compatibility: "${frontmatter.compatibility}"`);
    }

    if (frontmatter.metadata) {
        lines.push("metadata:");
        for (const [key, value] of Object.entries(frontmatter.metadata)) {
            lines.push(`  ${key}: ${value}`);
        }
    }

    lines.push("---", "");

    return lines.join("\n");
}

function wrap(text: string, width: number) {
    const lines: string[] = [];
    let current = "";

    for (const word of text.split(/\s+/)) {
        if (current.length > 0 && `${current} ${word}`.length > width) {
            lines.push(current);
            current = word;
        } else {
            current = current.length > 0 ? `${current} ${word}` : word;
        }
    }

    if (current.length > 0) {
        lines.push(current);
    }

    return lines;
}

/** The version of the library the skill describes, so consumers can tell what they installed. */
async function componentsVersion(projectRoot: string) {
    const packageJsonPath = join(projectRoot, "../../packages/components/package.json");
    const { version } = JSON.parse(await readFile(packageJsonPath, "utf8")) as { version: string };

    return version;
}

async function buildSkill(
    name: string,
    config: SkillConfig,
    {
        projectRoot,
        aiDocsRoot,
        skillsRoot
    }: {
        projectRoot: string;
        aiDocsRoot: string;
        skillsRoot: string;
    }
) {
    const skillRoot = join(skillsRoot, name);
    await mkdir(skillRoot, { recursive: true });

    const files: SkillFile[] = await copySkillFiles({ entries: config.files, aiDocsRoot, projectRoot, skillRoot });

    if (config.scripts?.length) {
        files.push(...(await bundleSkillScripts({ scripts: config.scripts, projectRoot, skillRoot })));
    }

    const version = await componentsVersion(projectRoot);
    const frontmatter: SkillFrontmatter = {
        ...config.frontmatter,
        compatibility: config.frontmatter.compatibility ?? `>=${version.split(".")[0]}.0.0`,
        metadata: { ...config.frontmatter.metadata, version }
    };

    const header = await readFile(join(projectRoot, config.template), "utf8");
    const index = await generateSkillIndex(config, files, skillRoot);

    await writeFile(
        join(skillRoot, "SKILL.md"),
        `${renderFrontmatter(frontmatter)}\n${header.trimEnd()}\n\n${index}`,
        "utf8"
    );

    console.log(`✅ Built skill "${name}": ${files.length + 1} files`);

    return { frontmatter, skillRoot };
}

async function main() {
    const projectRoot = process.cwd();
    const aiDocsRoot = join(projectRoot, skillsConfig.sourceRootPath);
    const skillsRoot = join(projectRoot, skillsConfig.buildRootPath, skillsConfig.filesFolder);

    try {
        await access(aiDocsRoot);
    } catch {
        throw new Error(`No AI docs found at ${aiDocsRoot}. Run "pnpm --filter=docs build:ai-docs" first.`);
    }

    await rm(skillsRoot, { recursive: true, force: true });
    await mkdir(skillsRoot, { recursive: true });

    const built = [];

    for (const [name, config] of Object.entries(skillsConfig.skills)) {
        built.push(await buildSkill(name, config, { projectRoot, aiDocsRoot, skillsRoot }));
    }

    if (built.length > 1) {
        throw new Error(
            "Only one skill can be published: the `skills` CLI requires an explicit @selector when a " +
                "host advertises several, which breaks `npx skills add https://hopper.workleap.design`."
        );
    }

    const manifest = await generateSkillManifest({
        skillsRoot,
        skills: built,
        maxTotalBytes: skillsConfig.maxTotalBytes
    });

    for (const skill of manifest.skills) {
        console.log(`   ${skill.name}: ${skill.url}, description ${skill.description.length}/1024 chars`);
    }

    console.log(`   budget: ${formatBytes(skillsConfig.maxTotalBytes)}`);
}

main();

import { aiDocsConfig } from "@/ai-pipeline/ai-docs.config.tsx";
import { skillsConfig } from "@/ai-pipeline/skills.config.ts";
import { isCopyEntry, isMergeEntry, isTemplateEntry } from "@/ai-pipeline/skillsTypes.ts";
import { access } from "fs/promises";
import { join } from "path";

/**
 * Cheap guard against the realistic way this breaks: someone renames a route in
 * ai-docs.config.tsx and the skill silently loses a chunk of its references.
 *
 * The real build (buildSkills.ts) also fails on an unmatched pattern, but that only runs on
 * Netlify. This runs in PR CI as part of `pnpm test`, needs no build output, and takes no time.
 */

const MAGIC = /[*?[\]{}!+@(]/;

/** Everything up to the first glob segment. "tokens/maps/&#42;/&#42;/all.json" yields "tokens/maps". */
function staticPrefix(pattern: string) {
    const segments = pattern.replace(/^\//, "").split("/");
    const firstMagic = segments.findIndex(segment => MAGIC.test(segment));

    return (firstMagic === -1 ? segments : segments.slice(0, firstMagic)).join("/");
}

/** True when `path` is `other`, or lives under it. Compares whole segments, so "a/bc" is not under "a/b". */
function isUnder(path: string, other: string) {
    return path === other || path.startsWith(`${other}/`);
}

function isCoveredByARoute(pattern: string, routeKeys: string[]) {
    const prefix = staticPrefix(pattern);

    // Either direction counts: a route can emit a whole directory the pattern reaches into
    // ("components/usage" for "/components/usage/*.md"), or the pattern's literal prefix can
    // sit above several routes ("tokens/maps" for "tokens/maps/workleap/light").
    return routeKeys.some(key => isUnder(prefix, key) || isUnder(key, prefix));
}

async function main() {
    const projectRoot = process.cwd();
    const routeKeys = Object.keys(aiDocsConfig.routes);
    const problems: string[] = [];

    const expectedSourceRoot = `${aiDocsConfig.buildRootPath}/${aiDocsConfig.filesFolder}`;
    if (skillsConfig.sourceRootPath !== expectedSourceRoot) {
        problems.push(
            `skills.config.ts reads from "${skillsConfig.sourceRootPath}" but the AI docs are written to "${expectedSourceRoot}".`
        );
    }

    const skillNames = Object.keys(skillsConfig.skills);
    if (skillNames.length !== 1) {
        problems.push(
            `Expected exactly one skill, found ${skillNames.length}. The \`skills\` CLI requires an explicit ` +
                "@selector when a host advertises several, which breaks `npx skills add https://hopper.workleap.design`."
        );
    }

    for (const [name, skill] of Object.entries(skillsConfig.skills)) {
        if (skill.frontmatter.description.length > 1024) {
            problems.push(
                `Skill "${name}" description is ${skill.frontmatter.description.length} characters, over the 1024 limit.`
            );
        }

        const templates = [skill.template];
        const patterns: string[] = [];

        for (const entry of skill.files) {
            if (isTemplateEntry(entry)) {
                templates.push(entry.copyTemplate);
            } else if (isMergeEntry(entry)) {
                templates.push(entry.template);
                patterns.push(...entry.merge);
            } else if (isCopyEntry(entry)) {
                patterns.push(entry.from, ...(entry.exclude ?? []));
            }
        }

        for (const template of templates) {
            try {
                await access(join(projectRoot, template));
            } catch {
                problems.push(`Skill "${name}" references a template that does not exist: ${template}`);
            }
        }

        for (const script of skill.scripts ?? []) {
            try {
                await access(join(projectRoot, script.entry));
            } catch {
                problems.push(`Skill "${name}" references a script entry point that does not exist: ${script.entry}`);
            }
        }

        for (const pattern of patterns) {
            if (!isCoveredByARoute(pattern, routeKeys)) {
                problems.push(
                    `Skill "${name}" reads "${pattern}", which no ai-docs.config.tsx route produces. Was a route renamed?`
                );
            }
        }

        for (const section of skill.index.sections) {
            const covered =
                skill.files.some(entry => entry.to.startsWith(`${section.path}/`) || entry.to === section.path) ||
                skill.scripts?.some(script => script.to.startsWith(`${section.path}/`));

            if (!covered) {
                problems.push(
                    `Skill "${name}" has an index section for "${section.path}", but nothing is written there.`
                );
            }
        }
    }

    if (problems.length > 0) {
        console.error(
            `❌ skills.config.ts is out of sync with ai-docs.config.tsx:\n${problems.map(problem => `  - ${problem}`).join("\n")}`
        );
        process.exit(1);
    }

    console.log(`✅ skills.config.ts is consistent with ai-docs.config.tsx (${routeKeys.length} routes checked).`);
}

main();

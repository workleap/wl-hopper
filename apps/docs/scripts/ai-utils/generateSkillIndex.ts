import type { SkillConfig, SkillIndexSection } from "@/ai-pipeline/skillsTypes.ts";
import { readFile } from "fs/promises";
import { basename, dirname, extname, join } from "path";
import type { SkillFile } from "./copySkillFiles.ts";

/** Same heuristic the AI docs mapping uses, so size hints stay consistent across surfaces. */
function estimateTokens(bytes: number) {
    return Math.ceil(bytes / 3.5);
}

/**
 * The first prose paragraph after the H1, which is how every generated component and guide
 * file opens. Returns undefined for files that do not follow that shape.
 */
function firstParagraph(markdown: string) {
    const lines = markdown.split("\n");
    let index = lines.findIndex(line => line.startsWith("# "));

    if (index === -1) {
        return undefined;
    }

    index += 1;

    const paragraph: string[] = [];
    while (index < lines.length) {
        const line = lines[index].trim();

        if (paragraph.length === 0 && line === "") {
            index += 1;
            continue;
        }

        // Stop at the next heading, a list, or a blank line closing the paragraph.
        if (
            line === "" ||
            line.startsWith("#") ||
            line.startsWith("-") ||
            line.startsWith("|") ||
            line.startsWith("```")
        ) {
            break;
        }

        paragraph.push(line);
        index += 1;
    }

    const text = paragraph.join(" ").trim();

    return text.length > 0 ? text : undefined;
}

async function describe(file: SkillFile, skillRoot: string) {
    if (file.description) {
        return file.description;
    }

    if (extname(file.path) !== ".md") {
        return undefined;
    }

    return firstParagraph(await readFile(join(skillRoot, file.path), "utf8"));
}

function inSection(file: SkillFile, section: SkillIndexSection) {
    const prefix = `${section.path}/`;

    if (!file.path.startsWith(prefix)) {
        return false;
    }

    if (!section.recursive && dirname(file.path) !== section.path) {
        return false;
    }

    if (section.excludePrefixes?.some(excluded => file.path.startsWith(excluded))) {
        return false;
    }

    return !section.exclude?.includes(basename(file.path));
}

async function renderSection(section: SkillIndexSection, files: SkillFile[], skillRoot: string) {
    const matching = files.filter(file => inSection(file, section)).sort((a, b) => a.path.localeCompare(b.path));

    if (matching.length === 0) {
        return "";
    }

    const lines = [`### ${section.title}`, ""];

    if (section.intro) {
        lines.push(section.intro, "");
    }

    if (section.style === "names") {
        if (section.pattern) {
            lines.push(`\`${section.pattern}\``, "");
        }

        const names = matching.map(file => basename(file.path, extname(file.path)));
        lines.push(`Available: ${names.join(", ")}.`, "");

        return lines.join("\n");
    }

    for (const file of matching) {
        const description = await describe(file, skillRoot);
        const hint =
            section.tokenHintOverBytes !== undefined && file.size > section.tokenHintOverBytes
                ? ` _(~${estimateTokens(file.size).toLocaleString("en-US")} tokens)_`
                : "";

        lines.push(`- [${file.path}](${file.path})${description ? ` — ${description}` : ""}${hint}`);
    }

    lines.push("");

    return lines.join("\n");
}

/**
 * Renders the "Documentation structure" part of SKILL.md from what actually landed on disk,
 * so the index can never advertise a file the build did not produce.
 */
export async function generateSkillIndex(config: SkillConfig, files: SkillFile[], skillRoot: string) {
    const sections: string[] = [`## ${config.index.title}`, ""];

    if (config.index.intro) {
        sections.push(config.index.intro, "");
    }

    for (const section of config.index.sections) {
        const rendered = await renderSection(section, files, skillRoot);
        if (rendered) {
            sections.push(rendered);
        }
    }

    return sections.join("\n").trimEnd() + "\n";
}

export interface SkillFrontmatter {
    /** Skill identifier. Must be kebab-case; it becomes the install directory name. */
    name: string;
    /**
     * The only text an agent sees before deciding to load the skill, so it carries every
     * trigger term. Kept under 1024 characters.
     */
    description: string;
    license?: string;
    compatibility?: string;
    metadata?: Record<string, string>;
}

/**
 * Copies files produced by the AI docs pipeline into the skill.
 * Paths in `from` and `exclude` are globs relative to the AI docs root.
 */
export interface CopyEntry {
    from: string;
    /** Destination inside the skill. A trailing "/" keeps the source file name. */
    to: string;
    exclude?: string[];
    /** Overrides the description derived from the file content in the SKILL.md index. */
    description?: string;
    /** Fails the build unless the glob matches exactly this many files. */
    expectedCount?: number;
}

/** Copies a hand-authored template into the skill verbatim. */
export interface TemplateEntry {
    /** Path relative to the docs app root, e.g. "/ai-pipeline/templates/skills/hopper/…". */
    copyTemplate: string;
    to: string;
    description?: string;
}

/** Prepends a hand-authored template to one or more generated files. */
export interface MergeEntry {
    /** Path relative to the docs app root. */
    template: string;
    /** Globs relative to the AI docs root. */
    merge: string[];
    to: string;
    description?: string;
    /** Whether to keep the merged files' original heading levels instead of pushing them down. */
    keepOriginalLeveling?: boolean;
}

export type SkillFileEntry = CopyEntry | TemplateEntry | MergeEntry;

/**
 * Redirects an import while bundling. `filter` is a regular expression matched against the
 * import specifier as written, so it works for bare and relative specifiers alike.
 */
export interface SkillScriptAlias {
    filter: string;
    /**
     * Replacement module. A value starting with "/" is a file relative to the docs app root;
     * anything else is a package specifier resolved to its CommonJS entry point, which is how
     * you force a single copy of a package that ships both ESM and CJS.
     */
    path: string;
}

/** A script bundled into the skill with esbuild so agents can run it offline. */
export interface SkillScriptEntry {
    /** Bundle entry point, relative to the docs app root. */
    entry: string;
    to: string;
    description?: string;
    /** Modules left unbundled and resolved at runtime from the consuming project. */
    external?: string[];
    aliases?: SkillScriptAlias[];
}

/**
 * One "Documentation Structure" section of SKILL.md.
 *
 * `list` renders one bullet per file with its description — use it for a handful of files.
 * `names` renders a path pattern plus a bare comma-separated name list — use it for the
 * long tails (components, APIs) that would otherwise dominate SKILL.md.
 */
export interface SkillIndexSection {
    title: string;
    /** Directory inside the skill whose files are listed, e.g. "references/guides". */
    path: string;
    style?: "list" | "names";
    intro?: string;
    /** Shown above the name list for `names` sections, e.g. "references/components/<Name>.md". */
    pattern?: string;
    /** File names (not paths) to omit from the listing. */
    exclude?: string[];
    /** Skill-root-relative path prefixes to omit, for data directories nobody reads file by file. */
    excludePrefixes?: string[];
    /** Annotate files larger than this with an estimated LLM token count. */
    tokenHintOverBytes?: number;
    recursive?: boolean;
}

export interface SkillConfig {
    frontmatter: SkillFrontmatter;
    /** Hand-authored SKILL.md body, relative to the docs app root. */
    template: string;
    files: SkillFileEntry[];
    scripts?: SkillScriptEntry[];
    index: {
        title: string;
        intro?: string;
        sections: SkillIndexSection[];
    };
}

export interface SkillsConfig {
    /** Where the AI docs pipeline wrote its output, relative to the docs app root. */
    sourceRootPath: string;
    buildRootPath: string;
    filesFolder: string;
    /** Hard build failure above this total payload size. */
    maxTotalBytes: number;
    skills: Record<string, SkillConfig>;
}

export function isTemplateEntry(entry: SkillFileEntry): entry is TemplateEntry {
    return "copyTemplate" in entry;
}

export function isMergeEntry(entry: SkillFileEntry): entry is MergeEntry {
    return "merge" in entry;
}

export function isCopyEntry(entry: SkillFileEntry): entry is CopyEntry {
    return "from" in entry;
}

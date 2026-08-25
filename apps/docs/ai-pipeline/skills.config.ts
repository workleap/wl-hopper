import type { SkillsConfig } from "./skillsTypes.ts";

const templates = "/ai-pipeline/templates/skills/hopper";
const skillScripts = "/ai-pipeline/skill-scripts";

/**
 * Every bundled service reads its data through the generated AI docs index and an env module.
 * Both are redirected so the bundle reads the skill's own `references/` copies instead of a
 * deployed docs folder — which is why the skill mirrors the ai-docs layout under `references/`
 * for `tokens/maps`, `icons` and `styled-system`.
 */
const dataAliases = [
    { filter: "^@docs/ai$", path: "/dist/ai-docs/index.ts" },
    { filter: "(^|/)env$", path: `${skillScripts}/validatorEnv.ts` }
];

/**
 * Defines the agent Skills published at https://hopper.workleap.design/.well-known/skills.
 *
 * Everything here composes the output of the AI docs pipeline (see ai-docs.config.tsx);
 * nothing is rendered from MDX a second time. Read ./CONTRIBUTING.md before adding entries.
 *
 * Only ONE skill may be declared: the `skills` CLI requires an explicit `@selector` when a
 * host advertises more than one, which would break `npx skills add https://hopper.workleap.design`.
 */
export const skillsConfig: SkillsConfig = {
    sourceRootPath: "dist/ai-docs",
    buildRootPath: "dist",
    filesFolder: "skills",
    // Raised from 4MB when the skill took on the full token map tree, which the bundled
    // tokensService needs to answer per-category lookups the way the MCP does.
    maxTotalBytes: 5_500_000,
    skills: {
        hopper: {
            frontmatter: {
                name: "hopper",
                description: [
                    "Build, review, and migrate UI with Workleap's Hopper design system (@hopper-ui/components,",
                    "@hopper-ui/icons, @hopper-ui/styled-system, @hopper-ui/tokens). Use whenever writing or",
                    "reviewing React/JSX that imports from @hopper-ui/*, renders HopperProvider, uses Hopper style",
                    "props or UNSAFE_* escape hatches, references hop- design tokens or --hop-* CSS variables, or",
                    "targets the Workleap or ShareGate theme in light or dark mode. Also use when picking Hopper",
                    "components (Button, TextField, Select, Modal, Tag, Callout, Tabs, ...) or Hopper icons,",
                    "converting a Figma frame into Workleap design system code, or choosing between semantic and",
                    'core tokens. Trigger on "Hopper", "hopper-ui", "Workleap design system",',
                    '"ShareGate design system", "hop- token", "HopperProvider".'
                ].join(" "),
                license: "Apache-2.0",
                metadata: {
                    author: "Workleap",
                    website: "https://hopper.workleap.design",
                    source: "https://github.com/workleap/wl-hopper"
                }
            },

            template: `${templates}/SKILL.header.md`,

            files: [
                // components — one usage doc per component, plus the catalog
                {
                    from: "/components/usage/component-list.md",
                    to: "references/components/index.md",
                    description: "Catalog of every Hopper component, grouped by category."
                },
                {
                    from: "/components/usage/*.md",
                    // component-list is the catalog above. orbiter-to-hopper is an Orbiter migration
                    // mapping table the pipeline flattens in here; it is not a component, and Orbiter
                    // is deprecated with its migration deadline passed, so the skill omits it.
                    exclude: ["/components/usage/component-list.md", "/components/usage/orbiter-to-hopper.md"],
                    to: "references/components/"
                },

                // component APIs — brief props only; the full variant is 7MB and stays online.
                // _summary.json is generation metadata, not an API.
                {
                    from: "/components/api/brief/*.json",
                    exclude: ["/components/api/brief/_summary.json"],
                    to: "references/api/"
                },

                // guides
                {
                    from: "/getting-started/*.md",
                    // index.md is a merge artifact. The ai-for-agents pages document this skill,
                    // the MCP server and llms.txt — installation instructions for the thing the
                    // agent has already installed, and SKILL.md already covers the MCP server.
                    exclude: [
                        "/getting-started/index.md",
                        "/getting-started/skills.md",
                        "/getting-started/mcp-server.md",
                        "/getting-started/llms.md"
                    ],
                    // Pinned so a new getting-started page fails the build instead of silently
                    // padding the payload.
                    expectedCount: 6,
                    to: "references/guides/getting-started/"
                },
                {
                    from: "/components/concepts/*.md",
                    exclude: ["/components/concepts/index.md"],
                    to: "references/guides/concepts/"
                },
                { from: "/styled-system/concepts/*.md", to: "references/guides/styled-system/" },
                {
                    from: "/styled-system/overview/introduction.md",
                    to: "references/guides/styled-system/introduction.md"
                },
                { from: "/components/utilities/useDebounce.md", to: "references/guides/utilities/useDebounce.md" },
                { from: "/ai/figma-conventions.md", to: "references/guides/figma-conventions.md" },

                // hand-authored guides and workflows
                {
                    copyTemplate: `${templates}/workflows/build-app.md`,
                    to: "references/workflows/build-app.md",
                    description: "End-to-end workflow for building a screen or feature with Hopper."
                },
                {
                    copyTemplate: `${templates}/workflows/figma-to-code.md`,
                    to: "references/workflows/figma-to-code.md",
                    description: "Turning a Figma frame into Hopper JSX, with the mapping and QA checklists."
                },

                // validation rules — hand-authored prose plus the generated UNSAFE_ whitelist
                {
                    template: `${templates}/guides/validation-rules.md`,
                    merge: ["/styled-system/escape-hatches.md"],
                    to: "references/guides/validation-rules.md",
                    description: "Every rule the validator enforces, plus the complete UNSAFE_* whitelist."
                },

                // tokens — markdown guidance mirrors the ai-docs layout
                { from: "/tokens/overview/introduction.md", to: "references/tokens/introduction.md" },
                { from: "/tokens/core/*.md", exclude: ["/tokens/core/index.md"], to: "references/tokens/core/" },
                {
                    from: "/tokens/semantic/*.md",
                    exclude: ["/tokens/semantic/index.md"],
                    to: "references/tokens/semantic/"
                },
                {
                    copyTemplate: `${templates}/tokens/README.md`,
                    to: "references/tokens/README.md",
                    description: "How to turn a Hopper token name or a raw CSS value into a component prop value."
                },

                // Token maps, mirroring the ai-docs layout exactly. The whole tree ships because
                // the bundled tokensService resolves a file per category through getTokenMapFiles;
                // shipping only the `all` roll-up would make every narrower --category throw.
                {
                    from: "/tokens/maps/**/*.json",
                    to: "references/tokens/maps/",
                    description: "Token name to component prop value map, with CSS values."
                },

                // the UNSAFE_ allow-list, kept at its ai-docs path so the bundled validator finds it
                {
                    from: "/styled-system/unsafe-props-data.json",
                    to: "references/styled-system/unsafe-props-data.json"
                },

                // icons
                {
                    from: "/icons/data.json",
                    to: "references/icons/data.json",
                    description: "Every Hopper icon: name, description and keywords."
                },
                { from: "/icons/brief/index.md", to: "references/icons/index.md" },
                { from: "/icons/brief/advanced/designing-an-icon.md", to: "references/icons/designing-an-icon.md" },
                {
                    copyTemplate: `${templates}/icons/README.md`,
                    to: "references/icons/README.md",
                    description: "How to search data.json for the right icon instead of guessing a name."
                }
            ],

            // Every script bundles a service straight out of apps/mcp-server, so the skill and the
            // MCP tool it mirrors run the same code and a logic change reaches both at build time.
            // Nothing here is a reimplementation; only the data paths and the JSX parser are
            // swapped, via the aliases below.
            scripts: [
                {
                    // Mirrors the MCP's validate_hopper_code tool.
                    entry: `${skillScripts}/validateHopperCode.ts`,
                    to: "scripts/validate-hopper-code.mjs",
                    description: "Lints Hopper JSX: tokens, prop values, UNSAFE_ usage, structure and layout.",
                    aliases: [
                        ...dataAliases,
                        // Swap the TypeScript-ESLint parser for a resolver that prefers the consuming
                        // project's parser and falls back to a bundled acorn. Bundling the real one
                        // would drag in typescript (~8MB), several times the whole skill budget.
                        { filter: "^@typescript-eslint/parser$", path: `${skillScripts}/validatorParser.ts` },
                        // acorn-jsx `require`s acorn while validatorParser.ts imports it, which
                        // would bundle both the CJS and ESM builds. Pin everything to the CJS one.
                        { filter: "^acorn$", path: "acorn" }
                    ]
                },
                {
                    // Mirrors the MCP's get_design_tokens tool.
                    entry: `${skillScripts}/searchTokens.ts`,
                    to: "scripts/search-tokens.mjs",
                    description: "Look a Hopper token name or a raw CSS value up and get the component prop value.",
                    aliases: dataAliases
                },
                {
                    // Mirrors the MCP's get_icons tool, Fuse.js fuzzy search included.
                    entry: `${skillScripts}/searchIcons.ts`,
                    to: "scripts/search-icons.mjs",
                    description: "Fuzzy-search every Hopper icon by name, description or keyword.",
                    aliases: dataAliases
                }
            ],

            index: {
                title: "Documentation structure",
                intro: "Everything below is on disk next to this file. Read the specific file you need — do not guess a component's API.",
                sections: [
                    {
                        title: "Workflows",
                        path: "references/workflows",
                        style: "list",
                        intro: "Start here when the task is bigger than a single component."
                    },
                    {
                        title: "Components",
                        path: "references/components",
                        style: "names",
                        pattern: "references/components/<ComponentName>.md",
                        exclude: ["index.md"],
                        intro: "One file per component: anatomy, examples, dos and don'ts. Read it before using the component. `references/components/index.md` is the catalog with one-line descriptions."
                    },
                    {
                        title: "Component APIs",
                        path: "references/api",
                        style: "names",
                        pattern: "references/api/<ComponentName>.json",
                        intro: "Props, types and defaults as JSON. Read only when you need an exact type or default — the component file above already lists the common props."
                    },
                    {
                        title: "Guides",
                        path: "references/guides",
                        style: "list",
                        recursive: true,
                        tokenHintOverBytes: 20_000
                    },
                    {
                        title: "Design tokens",
                        path: "references/tokens",
                        style: "list",
                        recursive: true,
                        // The 100 map files are data for scripts/search-tokens.mjs, not reading
                        // material — listing them individually would double SKILL.md.
                        excludePrefixes: ["references/tokens/maps/"],
                        intro: "Look values up with `node scripts/search-tokens.mjs` rather than reading `references/tokens/maps/{theme}/{scheme}/*.json` by hand; start from the README below.",
                        tokenHintOverBytes: 20_000
                    },
                    {
                        title: "Icons",
                        path: "references/icons",
                        style: "list",
                        tokenHintOverBytes: 20_000
                    },
                    {
                        title: "Scripts",
                        path: "scripts",
                        style: "list"
                    }
                ]
            }
        }
    }
};

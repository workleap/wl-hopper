# Contributing to AI Documentation Configuration

This guide explains how to configure the AI documentation system by adding new routes in the `ai-docs.config.tsx` file.

## Overview

The AI documentation system uses a bidirectional mapping configuration that serves two purposes:

1. **Build Process**: Defines how content is generated from source materials
2. **Serve Process**: Maps incoming URL paths to the correct markdown content

## Configuration Structure

The main configuration is in `ai-docs.config.tsx` and follows this structure:

```typescript
export const aiDocsConfig: AiDocsConfig = {
    buildRootPath: "dist",
    filesFolder: "ai-docs",
    routes: {
        "route-key": {
            build: { /* build configuration */ },
            serve?: { /* optional serve configuration */ }
        }
    }
}
```

## Adding a New Route

When adding a new route, you need to define:

### 1. Route Key

The route key can be either:

- **File path**: `"components/new-guide.md"` - generates a specific markdown file
- **Directory identifier**: `"new-section"` - generates a folder with content

### 2. Build Configuration

There are several types of build configurations:

#### A. MDX & Markdown Build

For processing MDX content into markdown and copying existing markdown files:

```typescript
"route-key": {
    build: {
        source: "content/your-source-folder",
        excludedPaths?: ["subfolder-to-exclude"],
        flatten?: true, // flattens directory structure
        markdown?: {
            includeFrontMatterLinks?: true,
            excludedSections?: ["## Props", "## API"],
            replaceLinks?: (link: string) => string // Custom link transformation
        },
        renderer?: {
            customComponents?: {
                ComponentName: () => <div /> // Replace component with custom implementation
            }
        }
    }
}
```

**Behavior:**

- **`.mdx` files**: Converted to `.md` format with optional transformations
- **`.md` files**: Copied post processed markdown files to the output directory

**Renderer Options:**

- **`customComponents`**: Override specific MDX components during conversion. This is useful when you want to render different versions of components for different contexts (e.g., hiding interactive elements in AI documentation).

#### B. Template-Based Build

For merging multiple **already generated files** using a template:

```typescript
"route-key": {
    build: {
        template: "/content/ai/templates/your-template.mdx",
        merge: [
            "/path/to/file1.md",
            "/path/to/file2.md",
            "/folder/*.md" // glob patterns supported
        ],
        keepOriginalLeveling?: true // Keep original heading levels instead of adjusting them
    }
}
```

**Template Options:**

- **`template`**: Path to the template file (optional)
- **`merge`**: Array of file paths or glob patterns to merge (relative to `buildRootPath`)
- **`keepOriginalLeveling`**: When `true`, preserves the original heading levels in merged files instead of adjusting them to fit the document structure

**Note 1**: The files or paths inside the `merge` are relative to the `buildRootPath` as we use this tool to merge them.

**Note 2**: The items in `merge` should be listed based on the order in the final file.

#### C. Component Props JSON Build

For generating JSON documentation of component properties:

```typescript
"route-key": {
    build: {
        type: "props-json",
        source: "content/components",
        options: {
            includeFullProps?: boolean // Include full property details
        }
    }
}
```

**Note**: This is a temporary type specific to component properties. A more generic solution is planned for the future.

#### D. Tokens JSON Build

For generating JSON from design token data:

```typescript
"route-key": {
    build: {
        type: "tokens-json",
        source: "datas/workleap/tokens.json",
        fallbackSource?: "datas/workleap/tokens-light.json" // Optional fallback for missing tokens
    }
}
```

**Options:**

- **`source`**: Path to the primary token data file
- **`fallbackSource`**: Optional path to a fallback token file. Missing sections/subsections in the primary source will be merged from this file. This is useful for dark theme tokens that only contain color overrides - non-color tokens (typography, spacing, etc.) can be merged from the light theme fallback.

#### E. Unsafe Props JSON Build

For generating JSON documentation of unsafe/escape hatch props:

```typescript
"route-key": {
    build: {
        type: "unsafe-props-json"
    }
}
```

#### F. Unsafe Props Markdown Build

For generating markdown documentation of unsafe/escape hatch props using a template:

```typescript
"route-key": {
    build: {
        type: "unsafe-props-markdown",
        template: "/ai-pipeline/templates/escape-hatches.mdx"
    }
}
```

#### G. Icons JSON Build

For generating JSON documentation of icon libraries (standard and rich icons):

```typescript
"route-key": {
    build: {
        type: "icons-json"
    }
}
```

**Note**: This build type generates a comprehensive JSON file containing metadata for all available icons, including their names, descriptions, keywords, and type information. The generated JSON includes both standard icons and rich icons, making it useful for search functionality and icon discovery tools.

### 3. Serve Configuration (Optional)

All generated markdown files can be served from the same route. However, if your route needs custom URL path mapping, use this feature. For example, `/components/full/Button.md` file can be served from `/components/Button.md` URL. Without this configuration, requests to this URL would be resolved from the `/components` folder instead of `components/full`, which would be incorrect.

```typescript
"route-key": {
    serve: {
        at?: "/custom-path",
        filesInRoot?: boolean
    }
}
```

#### Serve Options

- **`at`**: Custom URL path mapping for the route
- **`filesInRoot`**: When `true`, only checks the root directory when resolving paths. This is useful if the URL has paths but files are located in the root folder, typically because `flatten: true` was used during build time.

**Serve Logic**: The serve logic is set for `.txt|.md` paths and is served from the [txt](/apps/docs/app/txt/) route handler.

## Complete Examples

### Example 1: Simple Content Section

```typescript
"tutorials": {
    build: {
        source: "content/tutorials",
        flatten: true
    }
}
```

### Example 2: Merged Documentation File

```typescript
"api/complete-guide.md": {
    build: {
        template: "/content/ai/templates/api-guide.mdx",
        merge: [
            "/api/introduction.md",
            "/api/authentication.md",
            "/api/endpoints/*.md"
        ],
        keepOriginalLeveling: true
    }
}
```

### Example 3: Component Props JSON

```typescript
"components/api/full": {
    build: {
        type: "props-json",
        source: "content/components",
        options: {
            includeFullProps: true
        }
    }
}
```

### Example 4: Tokens JSON

```typescript
// Light theme - primary source
"tokens/maps/workleap/light": {
    build: {
        type: "tokens-json",
        source: "datas/workleap/tokens.json"
    }
}

// Dark theme - with fallback for non-color tokens
"tokens/maps/workleap/dark": {
    build: {
        type: "tokens-json",
        source: "datas/workleap/tokens-dark.json",
        fallbackSource: "datas/workleap/tokens.json" // Merges missing tokens from light theme
    }
}
```

### Example 5: Icons Data JSON

```typescript
"icons/data.json": {
    build: {
        type: "icons-json"
    }
}
```

### Example 6: MDX Build with Custom Renderer

```typescript
"icons/brief": {
    build: {
        source: "content/icons",
        flatten: false,
        renderer: {
            customComponents: {
                Switcher: () => <div /> // Replace interactive switcher with empty div
            }
        }
    }
}
```

### Example 7: Complex Component Documentation

```typescript
"components/advanced": {
    build: {
        source: "content/components/advanced",
        excludedPaths: ["internal"],
        flatten: true,
        markdown: {
            includeFrontMatterLinks: true,
            excludedSections: ["## Implementation Details"]
        }
    },
    serve: {
        at: "/components/advanced",
        filesInRoot: true
    }
}
```

## Link Transformation

The system automatically transforms relative links in markdown content to ensure they work correctly in the AI documentation context. This happens by default for all MDX-to-markdown builds.

### Default Link Processing

By default, the system applies these transformations to relative links:

1. **Preserves full URLs**: Links with valid URI schemes (http:, https:, ftp:, mailto:, etc.) remain unchanged
2. **Preserves hash-only links**: Internal document references like `#section` remain unchanged
3. **Transforms relative links**: Adds `.txt` extension to relative links while preserving:
   - Query parameters (`?param=value`)
   - Hash fragments (`#section`)
   - Relative path structures (including `../` patterns)

### Examples of Default Transformations

```markdown
<!-- Original links -->

[Full URL](https://example.com/page) → No change
[Hash link](#introduction) → No change
[Relative link](../components/button) → ../components/button.txt
[With hash](../guide#installation) → ../guide.txt#installation
[With query](./api?version=2) → ./api.txt?version=2
[Complex relative](../../tokens/core) → ../../tokens/core.txt
[Trailing slash](./components/) → ./components.txt
```

**Important**: The link transformation now uses improved URL parsing that correctly handles complex relative paths starting with `../` without incorrectly resolving them, ensuring that the original path structure is preserved.

### Custom Link Transformation

You can override the default behavior by providing a custom `replaceLinks` function:

```typescript
"route-key": {
    build: {
        source: "content/your-source-folder",
        markdown: {
            replaceLinks: (link: string) => {
                // Custom logic here
                if (link.startsWith('http')) return link;
                if (link.startsWith('#')) return link;
                return link + '.html'; // Use .html instead of .txt
            }
        }
    }
}
```

### Why Link Transformation?

The transformation ensures that:

- **AI systems** can properly reference documentation files with consistent extensions
- **Cross-references** work correctly between generated documentation files
- **Internal navigation** (hash links) continues to function within documents
- **External links** remain functional and unchanged

## Best Practices

### Route Key Naming

- Use kebab-case for consistency
- For files: include the `.md` extension
- For directories: use descriptive identifiers

### Build Configuration

- **Source paths**: Always relative to the content root
- **Flatten**: Use `true` when you want all files in a single directory
- **Excluded paths**: Use to skip internal or draft content, or when you want to serve them in different route.
- **Templates**: Store in `/content/ai/templates/` for organization

## How the System Works

### Build Process

1. System reads the configuration
2. For each route, processes the build configuration
3. Generates content in the specified `buildRootPath`
4. Files are organized according to the route keys

### Serve Process

1. Incoming URL request arrives
2. System reverse-lookups the configuration
3. Finds matching route with `serve.at` or route key (through the [txt](/apps/docs/app/txt/) router)
4. Serves the corresponding generated content

## Skills

On top of the AI docs, this pipeline publishes an [agent Skill](https://www.npmjs.com/package/skills)
at `https://hopper.workleap.design/.well-known/skills`, installed with
`npx skills add https://hopper.workleap.design`.

Skill generation is a **second stage that composes `dist/ai-docs`** — it never renders MDX again.
`docs#build:skills` therefore declares `docs#build:ai-docs` as a Turbo dependency, so one command
is enough:

```bash
pnpm build:skills   # ~1s once the AI docs are cached; re-run freely
```

`docs#build` also depends on `docs#build:skills`, which is what makes the single
`turbo run build --filter=./apps/docs` command in `netlify.toml` publish the skill.

Output lands in `dist/skills` and is copied to `public/agent-skills` (gitignored, like
`public/ai-docs`).

### Files

| File                                                                                                  | Role                                                                                                    |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `skills.config.ts`                                                                                    | What the skill contains. The only file most changes touch.                                              |
| `skillsTypes.ts`                                                                                      | Entry types and their guards.                                                                           |
| `templates/skills/hopper/**`                                                                          | Hand-authored markdown: `SKILL.header.md`, workflows, and the guides that have no generated equivalent. |
| `skill-scripts/**`                                                                                    | Sources for the scripts bundled into the skill.                                                         |
| `../scripts/buildSkills.ts`                                                                           | Orchestrator.                                                                                           |
| `../scripts/ai-utils/{copySkillFiles,generateSkillIndex,generateSkillManifest,bundleSkillScripts}.ts` | The stages it runs.                                                                                     |
| `../scripts/checkSkillsConfig.ts`                                                                     | Runs as `pnpm --filter=docs test`; see below.                                                           |

### Entry types

`skills.config.ts` `files` accepts three shapes, distinguished by which key is present:

```ts
// copy — `from` is a glob under dist/ai-docs. A `to` ending in "/" keeps the source path
// relative to the glob's literal prefix, so nested matches do not collapse together.
{ from: "/components/usage/*.md", exclude: ["/components/usage/component-list.md"], to: "references/components/" }

// copyTemplate — a hand-authored file, copied verbatim
{ copyTemplate: "/ai-pipeline/templates/skills/hopper/workflows/build-app.md", to: "references/workflows/build-app.md" }

// merge — a hand-authored template followed by generated content
{ template: "/ai-pipeline/templates/skills/hopper/guides/validation-rules.md",
  merge: ["/styled-system/escape-hatches.md"], to: "references/guides/validation-rules.md" }
```

`SKILL.md` is `templates/skills/hopper/SKILL.header.md` plus a generated "Documentation structure"
index built from what actually landed on disk. Section descriptions come from each file's first
paragraph, or from `description` in the config. Use `style: "names"` for long tails such as
components — a bullet per file would triple the size of `SKILL.md`.

### Scripts share code with the MCP server

The skill's three scripts are **not** reimplementations. Each bundles a service straight out of
`apps/mcp-server` with esbuild, so a logic change there reaches both surfaces at the next build:

| Script                             | MCP tool               | Bundled from                    |
| ---------------------------------- | ---------------------- | ------------------------------- |
| `scripts/validate-hopper-code.mjs` | `validate_hopper_code` | `src/services/validatorService` |
| `scripts/search-tokens.mjs`        | `get_design_tokens`    | `src/services/tokensService`    |
| `scripts/search-icons.mjs`         | `get_icons`            | `src/services/iconsService`     |

The entry points in `skill-scripts/` are thin CLI wrappers — argument parsing and output
formatting only. Keep them that way; anything resembling business logic belongs in the service, so
both surfaces get it.

Two things are swapped at bundle time, via `aliases` in `skills.config.ts`:

- `@docs/ai` and the `env` module (`dataAliases`) → the services read the skill's own `references/`
  instead of a deployed docs folder. This is why the skill mirrors the AI docs layout there.
- `@typescript-eslint/parser` → `validatorParser.ts`, only for the validator. Bundling the real
  parser would pull in `typescript`, several times the whole skill budget.

To verify parity after touching a service, run the script and the matching MCP tool on the same
input and diff them.

### The skill ships as one archive

`buildSkills.ts` writes both the loose files under `dist/skills/hopper/**` _and_ a single
`dist/skills/hopper.tar.gz`, and `index.json` advertises only the archive, using the 0.2.0
discovery schema with a sha256 digest.

That is deliberate. The `skills` CLI's per-file path (`fetchLegacySkillByEntry`) fires one `fetch`
per advertised file with **no concurrency limit** and swallows every failure — `catch {}` returns
`null` and the file is silently skipped, with no error and no retry. At this skill's size that
reliably loses files: measured 263-317 of 326 across runs, with `scripts/` missing every time
because it sorts last and holds the largest files. Nothing in the output tells you.

With the archive the client does one request and verifies a digest, so an install is either
complete or a visible failure. It is also ~10x less to transfer (0.52 MB compressed vs 4.8 MB).

The loose files stay published because they are handy to `curl` and cost nothing extra. If you
change what the skill contains, the archive and digest regenerate automatically — never hand-edit
`index.json`.

### Constraints to respect

- **Exactly one skill.** The `skills` CLI demands an explicit `@selector` when a host advertises
  more than one, which would break the bare `npx skills add https://hopper.workleap.design`.
- **A 5.5 MB budget** (`maxTotalBytes`). The build fails above it. Trim an entry rather than raising
  the ceiling. The heavy things deliberately left out are `components/api/full` (7 MB),
  `llms-full.md`, every `*/index.md` merge artifact, and `changelogs.md`.
- **`references/tokens/maps/**`, `references/icons/data.json` and
  `references/styled-system/unsafe-props-data.json` must keep their AI docs paths.** The bundled
  scripts reach them through the generated `files` index, so renaming them breaks the scripts
  silently. The whole `tokens/maps` tree ships for the same reason: `getTokenMapFiles` resolves a
  file per category, so dropping the per-category files would make every narrower `--category`
  throw.
- **`/.well-known/skills/**` is aliased onto `public/agent-skills` in two places, and both are
  needed.** `netlify.toml` `[[redirects]]` (with `force = true`) handles production on the CDN;
  the `beforeFiles` rewrite in `next.config.js` handles `next dev`, which is what makes
  `npx skills add http://localhost:3000` work. `@netlify/plugin-nextjs` does not honour
  `beforeFiles` for these paths — without the Netlify rules, `/.well-known/skills/**/*.md` is
  claimed by the `/:path*.:ext(txt|md)` rule in `afterFiles` and the `/txt` handler answers 400.
  CORS headers are likewise declared in both files, since Next's `headers()` does not apply to a
  CDN-resolved rewrite.

### Testing a change

`pnpm --filter=docs test` runs `checkSkillsConfig.ts`, which asserts every `from` pattern still
corresponds to a route in `ai-docs.config.tsx`, that templates and script entry points exist, and
that each index section has content. It needs no build output and runs in PR CI.

Then, from a scratch directory outside the repo:

```bash
pnpm doc:start
cd $(mktemp -d) && npx skills add http://localhost:3000
```

Install from a scratch directory — running it inside `wl-hopper` would write into `.claude/skills`,
which is where this repo's own authoring skills live.

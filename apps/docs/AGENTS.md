# AGENTS.md - docs

A content edit under `content/` propagates to three surfaces: the documentation site, the MCP server,
and the published Hopper agent Skill. Read `ai-pipeline/CONTRIBUTING.md` before adding a route to
`ai-pipeline/ai-docs.config.tsx`.

## Hard Rules

| Rule                                                                                | Violation                                                                                                                                                    |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Run `pnpm doc:generate` before `pnpm doc:start`                                     | A module-resolution failure on `examples/Preview.ts`, which is generated and gitignored                                                                      |
| Verify a content edit with `pnpm build:doc` — it chains generate → ai-docs → skills | Checking the website only and calling the change done                                                                                                        |
| Treat `components/mdx/*.ai.tsx` as pipeline code, not site code                     | Restyling it as if only the website rendered it                                                                                                              |
| Leave `.mdx` formatting alone — `oxfmt` skips it because reflow breaks JSX nesting  | Hand-reflowing an `.mdx` paragraph to satisfy a line-width habit                                                                                             |
| Build a table with `<SimpleTable>`, never GFM pipe syntax                           | A pipe-and-dashes table, which renders as literal pipes — `remarkPlugins` is empty in `contentlayer.config.ts`, so `remark-gfm` runs only in the AI pipeline |
| Resolve an `<Example src>` through `configs/examplePackages.ts`                     | Hardcoding `packages/components/src` in a fourth place; three call sites read that table and all three must agree                                            |

## Layout

| Path           | Holds                                                                          |
| -------------- | ------------------------------------------------------------------------------ |
| `content/`     | 134 MDX docs plus one plain `.md`, one folder per section                      |
| `app/`         | The site itself                                                                |
| `scripts/`     | The AI-docs and Skill generators (`buildAiDocs.ts`, `buildSkills.ts`)          |
| `ai-pipeline/` | Config, templates, and the scripts bundled _into_ the Skill                    |
| `components/`  | Site React — and `components/mdx/*.ai.tsx`, which the AI pipeline renders with |
| `examples/`    | Overview SVG assets and the generated `Preview.ts` registry                    |

Preview sources are not here — they resolve to `packages/components/src/**`, `packages/icons/**` and
`packages/shadcn-extension/src/**`, per `configs/examplePackages.ts`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

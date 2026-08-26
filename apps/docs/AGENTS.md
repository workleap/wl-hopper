# AGENTS.md - docs

A content edit under `content/` propagates to three surfaces: the documentation site, the MCP server,
and the published Hopper agent Skill. Read `ai-pipeline/CONTRIBUTING.md` before adding a route to
`ai-pipeline/ai-docs.config.tsx`.

## Hard Rules

| Rule                                                                                | Violation                                                                               |
| ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Run `pnpm doc:generate` before `pnpm doc:start`                                     | A module-resolution failure on `examples/Preview.ts`, which is generated and gitignored |
| Verify a content edit with `pnpm build:doc` — it chains generate → ai-docs → skills | Checking the website only and calling the change done                                   |
| Treat `components/mdx/*.ai.tsx` as pipeline code, not site code                     | Restyling it as if only the website rendered it                                         |
| Leave `.mdx` formatting alone — `oxfmt` skips it because reflow breaks JSX nesting  | Hand-reflowing an `.mdx` paragraph to satisfy a line-width habit                        |

## Layout

| Path           | Holds                                                                          |
| -------------- | ------------------------------------------------------------------------------ |
| `content/`     | 134 MDX docs plus one plain `.md`, one folder per section                      |
| `app/`         | The site itself                                                                |
| `scripts/`     | The AI-docs and Skill generators (`buildAiDocs.ts`, `buildSkills.ts`)          |
| `ai-pipeline/` | Config, templates, and the scripts bundled _into_ the Skill                    |
| `components/`  | Site React — and `components/mdx/*.ai.tsx`, which the AI pipeline renders with |
| `examples/`    | Overview SVG assets and the generated `Preview.ts` registry                    |

Preview sources are not here — they resolve to `packages/components/src/**` and `packages/icons/**`.

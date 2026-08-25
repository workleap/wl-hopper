# AGENTS.md - docs

A component or token content edit propagates to three surfaces: the documentation site, the MCP
server, and the published Hopper agent Skill. Read `ai-pipeline/CONTRIBUTING.md` before changing
anything under `ai-pipeline/`.

## Hard Rules

| Rule                                                                               | Violation                                                        |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Run `pnpm doc:generate` before `pnpm doc:start` — previews do not exist until then | Starting the site and reporting missing component previews       |
| Leave `.mdx` formatting alone — `oxfmt` skips it because reflow breaks JSX nesting | Hand-reflowing an `.mdx` paragraph to satisfy a line-width habit |

## Layout

| Path                       | Holds                                                  |
| -------------------------- | ------------------------------------------------------ |
| `content/`                 | MDX documentation, one folder per section              |
| `ai-pipeline/`             | The generators for the AI docs and the published Skill |
| `examples/`, `components/` | Site-only React used by the docs pages                 |

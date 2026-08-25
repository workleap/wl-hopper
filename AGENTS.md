# AGENTS.md

> Repo-wide guardrails + routing. Start here, then follow **Instruction routing** to the nearest scoped `AGENTS.md` and any additional instruction file that matches.

## Instruction routing (read when relevant)

### Path-based routing (MUST follow)

| Path                                         | Read                                  |
| -------------------------------------------- | ------------------------------------- |
| `packages/<pkg>/**`                          | `packages/<pkg>/AGENTS.md` if present |
| `apps/<app>/**`                              | `apps/<app>/AGENTS.md` if present     |
| `packages/components/**`                     | `packages/components/AGENTS.md`       |
| `packages/tokens/**`                         | `packages/tokens/AGENTS.md`           |
| `packages/icons/**`, `packages/svg-icons/**` | `packages/icons/AGENTS.md`            |
| `apps/docs/**`                               | `apps/docs/AGENTS.md`                 |

Claude Code attaches the rules below itself when it reads a matching file. Every other agent — and any subagent, which does not inherit the attachment — MUST read the one whose path matches.

| Path                                      | Read                             |
| ----------------------------------------- | -------------------------------- |
| `packages/components/src/**/*.module.css` | `.claude/rules/component-css.md` |
| `packages/components/src/**/src/*.tsx`    | `.claude/rules/component-tsx.md` |
| `packages/**/package.json`                | `.claude/rules/package-json.md`  |

### Trigger-based routing (MUST follow)

| Trigger                                                                           | Read                                    |
| --------------------------------------------------------------------------------- | --------------------------------------- |
| A component's public API, props, slots, composition, defaults, or event callbacks | `docs/agents/component-architecture.md` |
| Any exported name, CSS class name, or `--hop-*` custom property                   | `docs/agents/versioning.md`             |
| Naming a new `.ts`/`.tsx` file or a new component directory                       | `docs/agents/typescript.md`             |

### Architecture decisions (MUST follow)

Accepted decision records. They own the rationale and the mechanism; the instruction files above own the imperative.

| Trigger                                                                       | Read                                                                              |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| A new interactive component, or hand-rolling ARIA, focus or keyboard behavior | [ADR 0003](docs/adr/0003-react-aria-is-the-primitive-foundation.md)               |
| A hardcoded colour or length, or adding a token                               | [ADR 0004](docs/adr/0004-design-tokens-are-the-only-source-of-visual-values.md)   |
| Style props, `UNSAFE_*`, or reaching for a CSS module                         | [ADR 0005](docs/adr/0005-styling-uses-style-props-and-native-css.md)              |
| A stateful prop, a `default*` prop, or a controlled/uncontrolled pair         | [ADR 0006](docs/adr/0006-components-support-controlled-and-uncontrolled-modes.md) |
| Naming a prop, an event handler, or a ref                                     | [ADR 0007](docs/adr/0007-component-api-naming-conventions.md)                     |
| A class name, a token declaration, or a breaking change                       | [ADR 0008](docs/adr/0008-versioning-for-parallel-releases.md)                     |
| Keyboard behavior, focus rings, or an accessible name                         | [ADR 0009](docs/adr/0009-accessibility-baseline.md)                               |

## Hard Rules (Non-Negotiable)

| Rule                                                                                                                                                                  | Violation                                                   |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| ALWAYS run commands from the repo root                                                                                                                                | `cd packages/components && npx vitest`                      |
| ALWAYS prefix Turbo with `pnpm exec` — `turbo` is not on `PATH`                                                                                                       | `turbo run test --filter=…` → command not found             |
| ALWAYS pass `--filter` the package `name`, not its directory                                                                                                          | `--filter=components`, which matches no package             |
| MUST run `pnpm build:pkg` after `pnpm i` — Storybook, the docs site and `apps/samples/basic` import CSS from `dist/`                                                  | Debugging a missing-stylesheet error in a fresh clone       |
| Rely on the `hopper-source` condition for TypeScript changes — typecheck, tests, Storybook and the docs site read package source directly                             | Rebuilding all five packages after renaming an export       |
| NEVER run `tsc`, `oxlint`, `stylelint` or `vitest` directly inside a package; use `pnpm exec turbo run <task> --filter=<name>`                                        | `cd packages/tokens && npx tsc`                             |
| NEVER treat root `pnpm typecheck` as a package check — the root `tsconfig.json` excludes `packages` and `apps`, so it covers only `.storybook/`, `tooling/`, `types/` | Reporting types clean after `pnpm typecheck`                |
| ALWAYS add a changeset for a change to a published package                                                                                                            | Editing `packages/components` with no `.changeset/` entry   |
| NEVER add a decorative comment divider                                                                                                                                | A row of dashes or box characters used to separate sections |
| ALWAYS flag an invented placeholder (URL, threshold, magic number, copy) with a `// TODO` naming what to confirm                                                      | A guessed `href="https://…"` presented as final             |
| ALWAYS prefer editing an existing file over creating a new one                                                                                                        | A new utility file beside an existing one that fits         |

## Build / Test / Lint

- Build: `pnpm build:pkg`
- Test: `pnpm test`

Turbo filters on the `name` field, not the directory: `@hopper-ui/components`, `@hopper-ui/icons`, `@hopper-ui/styled-system`, `@hopper-ui/svg-icons`, `@hopper-ui/tokens`, `@hopper-ui/mcp-server`, `docs`, `basic`.

After making changes, you MUST ALWAYS validate.

| What you changed         | Run this                                        | It must pass                                            |
| ------------------------ | ----------------------------------------------- | ------------------------------------------------------- |
| Anything, after `pnpm i` | `pnpm build:pkg`                                | Build succeeds                                          |
| Logic or behavior        | `pnpm exec turbo run test --filter=<name>`      | All unit tests pass                                     |
| Code or types            | `pnpm exec turbo run typecheck --filter=<name>` | No type errors                                          |
| CSS                      | `pnpm exec turbo run stylelint --filter=<name>` | No lint errors                                          |
| `package.json`           | `pnpm syncpack`                                 | No dependency policy violations                         |
| Formatting               | `pnpm format`                                   | Auto-fixes; `pnpm format:check` verifies                |
| Design tokens            | `pnpm build:tokens && pnpm build:pkg`           | Regenerates, then rebuilds the CSS apps consume         |
| A published package      | `pnpm changeset`                                | A `.changeset/` entry exists                            |
| Docs content             | `pnpm build:doc`                                | Chains generate → ai-docs → skills                      |
| MCP server               | `pnpm build:mcp`                                | Build succeeds                                          |
| Multiple categories      | `pnpm lint`                                     | oxlint, format:check, stylelint, typecheck and syncpack |

Two of these pass silently where the script is absent, so a green run can mean nothing ran: `apps/docs` has no `typecheck`, and only `@hopper-ui/components`, `@hopper-ui/icons` and `@hopper-ui/styled-system` have `stylelint`. Verify `apps/docs` with `pnpm build:doc` instead. `pnpm lint` and `pnpm test` are intentionally unfiltered.

## Workflow

### Plan Mode

- Make the plan extremely concise. Sacrifice grammar for the sake of concision.
- End each plan with the unresolved questions, if any.

### Implementation Order

Feature first → user confirms "Looks good" → then tests and stories. Never test before confirmation.

## Git/GitHub instructions

- Branch name format: `<TICKET>-<kebab-description>`, e.g. `SGPD-9268-remove-tanstack-table`. Tickets are `SGPD-` or `SGPLTD-`.
- Pull request title format: `<TICKET>: <Title>`. `[<TICKET>] <Title>` is also accepted. Use a conventional-commit prefix (`fix:`, `feat(docs):`) for a change with no ticket.

## Skills

These three encode the workflows of this repository. The installed third-party skills (`accessibility`, `performance`, `pnpm`, `react-aria`, `turborepo`, `vitest`, `workleap-web-configs`) trigger on their own descriptions and need no row here.

| Skill                 | When to use                                                                |
| --------------------- | -------------------------------------------------------------------------- |
| `_update-tokens`      | Add, update, delete, or deprecate design tokens                            |
| `_port-component`     | Port a new component into Hopper from its React Spectrum S2 implementation |
| `learn-from-feedback` | Capture a developer correction into a skill or an instruction file         |

## Detailed Documentation

- **[CONTRIBUTING.md](CONTRIBUTING.md)** — monorepo setup, installation, and the full command list. Packages must be built before anything runs.
- **[contributing/](contributing/)** — human-facing guides for [tokens](contributing/tokens.md), [icons](contributing/icons.md) and [components](contributing/components.md).
- **[docs/adr/](docs/adr/)** — nine architectural decision records; 0003 through 0009 are indexed above. ADR 0002 is the only one still `Proposed`.
- **[apps/docs/ai-pipeline/CONTRIBUTING.md](apps/docs/ai-pipeline/CONTRIBUTING.md)** — how a content edit reaches the documentation site, the MCP server, and the published Hopper agent Skill. See also [ADR 0002](docs/adr/0002-hopper-agent-skill.md).

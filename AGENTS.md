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

Claude Code attaches the rules below by glob on its own. Every other agent MUST read the one whose path matches.

| Path                                      | Read                             |
| ----------------------------------------- | -------------------------------- |
| `packages/components/src/**/*.module.css` | `.claude/rules/component-css.md` |
| `packages/components/src/**/src/*.tsx`    | `.claude/rules/component-tsx.md` |
| `packages/**/package.json`                | `.claude/rules/package-json.md`  |

### Trigger-based routing (MUST follow)

| Trigger                                                                                    | Read                                    |
| ------------------------------------------------------------------------------------------ | --------------------------------------- |
| A component's public API, props, slots, composition, defaults, or event callbacks          | `docs/agents/component-architecture.md` |
| An exported name, a CSS class name, or a token custom property consumers already depend on | `docs/agents/versioning.md`             |
| Naming a new `.ts`/`.tsx` file or a new component directory                                | `docs/agents/typescript.md`             |

## Hard Rules (Non-Negotiable)

| Rule                                                                                                             | Violation                                                        |
| ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| ALWAYS run commands from the repo root                                                                           | `cd packages/components && npx vitest`                           |
| NEVER run `tsc`, `oxlint`, `stylelint` or `vitest` directly inside a package                                     | `cd packages/tokens && npx tsc`                                  |
| NEVER treat root `pnpm typecheck` as a package check — the root `tsconfig.json` excludes `packages` and `apps`   | Reporting types clean after `pnpm typecheck`                     |
| MUST run `pnpm build:pkg` after installing and after changing a package's public API                             | Debugging an import error in an unbuilt workspace                |
| MUST scope Turbo checks with `--filter`                                                                          | `turbo run typecheck` across every package for a one-file change |
| NEVER add a decorative comment divider                                                                           | A row of dashes or box characters used to separate sections      |
| ALWAYS flag an invented placeholder (URL, threshold, magic number, copy) with a `// TODO` naming what to confirm | A guessed `href="https://…"` presented as final                  |
| ALWAYS prefer editing an existing file over creating a new one                                                   | A new utility file beside an existing one that fits              |

## Build / Test / Lint

- Build: `pnpm build:pkg`
- Test: `pnpm test`

After making changes, you MUST ALWAYS validate.

| What you changed      | Run this                                                    | It must pass                                            |
| --------------------- | ----------------------------------------------------------- | ------------------------------------------------------- |
| A package source file | `pnpm build:pkg`                                            | Build succeeds                                          |
| Logic or behavior     | `turbo run test --filter=<package>`                         | All unit tests pass                                     |
| Code or types         | `turbo run typecheck --filter=<package>`                    | No type errors                                          |
| CSS                   | `turbo run stylelint --filter=<package>`                    | No lint errors                                          |
| `package.json`        | `pnpm syncpack`                                             | No dependency policy violations                         |
| Formatting            | `pnpm format`                                               | Auto-fixes; `pnpm format:check` verifies                |
| Design tokens         | `pnpm build:tokens`                                         | Generated CSS regenerates                               |
| Docs content          | `pnpm doc:generate && pnpm build:doc && pnpm build:ai-docs` | The site and the AI surfaces both build                 |
| Multiple categories   | `pnpm lint`                                                 | oxlint, format:check, stylelint, typecheck and syncpack |

## Workflow

### Plan Mode

- Make the plan extremely concise. Sacrifice grammar for the sake of concision.
- End each plan with the unresolved questions, if any.

### Implementation Order

Feature first → user confirms "Looks good" → then tests and stories. Never test before confirmation.

## Git/GitHub instructions

- Branch name format: `<TICKET>-<kebab-description>`, e.g. `SGPD-9268-remove-tanstack-table`. Tickets are `SGPD-` or `SGPLTD-`.
- Pull request title format: `[<TICKET>] <Title>`. Use a conventional-commit prefix (`fix:`, `feat(docs):`) only for a change with no ticket.

## Skills

These three encode the workflows of this repository. The installed third-party skills (`accessibility`, `performance`, `pnpm`, `react-aria`, `turborepo`, `vitest`, `workleap-web-configs`) trigger on their own descriptions and need no row here.

| Skill                 | When to use                                                                |
| --------------------- | -------------------------------------------------------------------------- |
| `update-tokens`       | Add, update, delete, or deprecate design tokens                            |
| `port-component`      | Port a new component into Hopper from its React Spectrum S2 implementation |
| `learn-from-feedback` | Capture a developer correction into a skill or an instruction file         |

## Detailed Documentation

- **[CONTRIBUTING.md](CONTRIBUTING.md)** — monorepo setup, installation, and the full command list. Packages must be built before anything runs.
- **[contributing/](contributing/)** — human-facing guides for [tokens](contributing/tokens.md), [icons](contributing/icons.md) and [components](contributing/components.md).
- **[docs/adr/](docs/adr/)** — architectural decisions. Consult existing ADRs before proposing a change that contradicts one.
- **[apps/docs/ai-pipeline/CONTRIBUTING.md](apps/docs/ai-pipeline/CONTRIBUTING.md)** — how a content edit reaches the documentation site, the MCP server, and the published Hopper agent Skill. See also [ADR 0002](docs/adr/0002-hopper-agent-skill.md).

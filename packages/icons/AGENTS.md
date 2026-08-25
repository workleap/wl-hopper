# AGENTS.md - icons

## Hard Rules

| Rule                                                                                             | Violation                                                     |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------- |
| Author an icon as PascalCase SVG under `packages/svg-icons/src/icons/<size>px/`, then regenerate | Hand-editing a file under `src/generated-icon-components/`    |
| Add the SVG at every size its family defines                                                     | Adding `Add.svg` to `16px/` only                              |
| Regenerate with `pnpm generate-icons` from the repo root                                         | Running one package's `generate-icons` script on its own      |
| Build icon components through `createIcon` / `createRichIcon`                                    | Hand-writing the per-size wrapper boilerplate in an icon file |

`src/generated-icon-components/` and `src/generated-rich-icon-components/` are build output. `oxfmt`
ignores both, and a hand edit is lost on the next generation.

## Sizes per family

The generator throws on a size directory outside its family's set.

| Family     | Authored in                          | Sizes      |
| ---------- | ------------------------------------ | ---------- |
| Icons      | `packages/svg-icons/src/icons/`      | 16, 24, 32 |
| Rich icons | `packages/svg-icons/src/rich-icons/` | 24, 32, 40 |

## Pipeline

`pnpm generate-icons` optimizes the authored SVGs, renaming `AddCalendar.svg` to
`add-calendar-16.svg`, then generates the React components.

| Path                                            | Holds                      |
| ----------------------------------------------- | -------------------------- |
| `packages/svg-icons/src/icons/<size>px/`        | Authored SVGs, PascalCase  |
| `packages/svg-icons/src/optimized-icons/`       | Optimizer output           |
| `packages/icons/src/generated-icon-components/` | Generated React components |

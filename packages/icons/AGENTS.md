# AGENTS.md - icons

## Hard Rules

| Rule                                                                                     | Violation                                                  |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| Author an icon as a PascalCase SVG under `packages/svg-icons/src/<family>/<size>px/`     | Hand-editing a file under `src/generated-icon-components/` |
| Add the SVG at every size its family defines                                             | Adding `Add.svg` to `16px/` only                           |
| Add a matching `packages/svg-icons/src/<family>/metadata/<Name>.json`                    | 219 SVGs and 218 metadata entries                          |
| Regenerate with `pnpm generate-icons` from the repo root, then commit the generated diff | Leaving regenerated components uncommitted                 |
| Build components through `createIcon` / `createRichIcon`                                 | Hand-writing the per-size wrapper boilerplate              |

Generated output is **committed**, not disposable: 221 files under `src/generated-icon-components/` and
49 under `src/generated-rich-icon-components/` are tracked. `oxfmt` ignores both, so a hand edit
survives formatting but is lost on the next generation.

## Families

| Family     | Authored in                          | Sizes      |
| ---------- | ------------------------------------ | ---------- |
| Icons      | `packages/svg-icons/src/icons/`      | 16, 24, 32 |
| Rich icons | `packages/svg-icons/src/rich-icons/` | 24, 32, 40 |

The optimizer throws when it finds an SVG in a size directory outside its family's set. A _missing_
size is not caught — `createIcon` takes its three sources positionally, so the generator emits a
reference to an undefined identifier and the broken TSX only surfaces at typecheck:

```tsx
export const AiIcon = createIcon(AiIcon16, AiIcon24, AiIcon32, "AiIcon");
```

## Naming through the pipeline

`pnpm generate-icons` optimizes the authored SVGs to kebab-case with a size suffix, then generates the
components. The kebab step splits only on a lowercase-to-uppercase boundary, so an all-caps name stays
one word and comes back title-cased:

| Authored          | Optimized             | Exported          |
| ----------------- | --------------------- | ----------------- |
| `AddCalendar.svg` | `add-calendar-16.svg` | `AddCalendarIcon` |
| `AI.svg`          | `ai-16.svg`           | `AiIcon`          |
| `CSV.svg`         | `csv-16.svg`          | `CsvIcon`         |

Reach for the exported name — `AiIcon`, not `AIIcon`.

# Design tokens

## The one rule that trips everybody up

**A token name is not a prop value.** Hopper's CSS variables and its component style props use
different strings for the same thing:

| Token name                  | CSS variable                  | Prop value         |
| --------------------------- | ----------------------------- | ------------------ |
| `hop-neutral-text`          | `--hop-neutral-text`          | `neutral`          |
| `hop-information-text-weak` | `--hop-information-text-weak` | `information-weak` |
| `hop-space-stack-md`        | `--hop-space-stack-md`        | `stack-md`         |
| `hop-shape-rounded-md`      | `--hop-shape-rounded-md`      | `rounded-md`       |

Do not do that conversion in your head. Look it up.

## Looking a value up

```bash
# have a token name, need the prop value
node scripts/search-tokens.mjs --name hop-neutral-text

# have a raw CSS value from a design, need the token that already covers it
node scripts/search-tokens.mjs --css 16px --css "#3C3C3C" --with-css-values

# which tokens are legal on this prop?
node scripts/search-tokens.mjs --prop backgroundColor --category semantic-color

# other themes and colour schemes
node scripts/search-tokens.mjs --theme sharegate --scheme dark --name hop-primary-surface
```

This is the same lookup the Hopper MCP's `get_design_tokens` tool runs — the script bundles that
service, so the results are identical. It also prints the Golden Rule: the exact list of affixes to
strip from a token name to get its prop value.

`--name` takes **token names**, `--css` takes **CSS values**; they are not interchangeable, and
passing one where the other belongs is the most common way to get an empty result. Both are
repeatable. `--category` defaults to `all`; run with `--help` for the full list. Without a filter
the output is the entire category, which is large — pass at least one filter unless you mean it.

The underlying data is `references/tokens/maps/{theme}/{scheme}/*.json`, one file per category plus
`all.json`, if you need to read it directly.

## Semantic over core

Semantic tokens (`primary`, `danger`, `neutral-surface`, `stack-md`) carry meaning and adapt to
theme and colour scheme. Core tokens (`core_160`, `core_amanita-500`) are raw values that do not.

Use semantic tokens. Reach for a core token only when no semantic token covers the case — and never
for colour, where core tokens break dark mode.

`gap="core_80"` is wrong. So is `backgroundColor="core_amanita-500"`.

## Guidance by category

The markdown files next to this one explain _when_ to use each family, which the JSON maps cannot:

- `references/tokens/semantic/` — colour, elevation, shape, space, typography.
- `references/tokens/core/` — the raw scales underneath them.
- `references/tokens/introduction.md` — how the two layers relate.

# Design tokens

## The one rule that trips everybody up

**A token name is not a prop value.** Hopper's CSS variables and its component style props use
different strings for the same thing:

| Token name | CSS variable | Prop value |
| --- | --- | --- |
| `hop-neutral-text` | `--hop-neutral-text` | `neutral` |
| `hop-information-text-weak` | `--hop-information-text-weak` | `information-weak` |
| `hop-space-stack-md` | `--hop-space-stack-md` | `stack-md` |
| `hop-shape-rounded-md` | `--hop-shape-rounded-md` | `rounded-md` |

The prop value is the token name with the category affixes removed:
`hop-`, `-border`, `-surface`, `-text`, `-icon`, `elevation-`, `shape-`, `space-`, `border-`,
`radius-`, `dataviz-`, `shadow-`, `-font-family`, `-font-size`, `-font-weight`, `-line-height`,
`-letter-spacing`, `font-family-`, `font-size-`, `font-weight-`, `line-height-`, `letter-spacing-`.

Do not do that transformation in your head. Look it up.

## Looking a value up

`references/tokens/maps/<theme>/<scheme>/all.json` maps every token to its prop value and its CSS
value, for `workleap` and `sharegate` in `light` and `dark`. Each entry looks like:

```json
{ "hop-neutral-text": { "propValue": "neutral", "cssValue": "#3C3C3C" } }
```

Each category also lists the `supportedProps` that accept it, which is how you tell whether a token
is legal on the prop you are about to use it on.

- **Have a token name, need a prop value?** Search the file for the token name and read `propValue`.
- **Have a raw CSS value from a design, need a token?** Search for the value — `16px`, `2rem`, `400`,
  `#3C3C3C` — and take the token whose `cssValue` matches. If one matches, use it. Never hardcode a
  value that has a token.
- **Need to know which props accept a category?** Read that category's `supportedProps`.

`workleap` / `light` is the default. Only reach for `sharegate` or `dark` when the task is
specifically about that theme or colour scheme.

## Semantic over core

Semantic tokens (`primary`, `danger`, `neutral-surface`, `stack-md`) carry meaning and adapt to
theme and colour scheme. Core tokens (`core_160`, `core_amanita-500`) are raw values that do not.

Use semantic tokens. Reach for a core token only when no semantic token covers the case — and never
for colour, where core tokens break dark mode.

`gap="core_80"` is wrong. So is `backgroundColor="core_amanita-500"`.

## Guidance by category

The markdown files next to this one explain *when* to use each family, which the JSON maps cannot:

- `references/tokens/semantic/` — colour, elevation, shape, space, typography.
- `references/tokens/core/` — the raw scales underneath them.
- `references/tokens/introduction.md` — how the two layers relate.

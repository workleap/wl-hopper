# AGENTS.md - tokens

## Hard Rules

| Rule                                                                      | Violation                                                                       |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Apply a component or semantic token change to every brand that defines it | Editing `components/sharegate/button.tokens.json` and not `workleap/`           |
| Give each token a `$type` and a `$value`, per DTCG                        | A bare `"border-radius": "4px"`                                                 |
| Point a component token at a core or semantic token by reference          | A raw `blur(10px)`, as three sharegate elevation tokens still do                |
| Run `pnpm build:tokens && pnpm build:pkg` after any token edit            | Renaming a token and leaving `styledSystemToTokenMappings.ts` stale in the tree |

The two brands are currently symmetrical — an identical 21 component files and 11 semantic files each,
with matching leaf counts. Keep them that way; asymmetry is how a brand silently loses a token.

`src/tokens/asset/fonts.tokens.json` is the one non-DTCG file. It uses bare `value` + `formats`
because the `font-face` format consumes it directly. Leave it alone.

## Layout

| Path                                 | Holds                                                                |
| ------------------------------------ | -------------------------------------------------------------------- |
| `src/tokens/core/`                   | Raw brand-independent values — 6 flat files                          |
| `src/tokens/semantic/<brand>/light/` | Intent-named tokens (`neutral.text`, `space.inline`) — 8 files       |
| `src/tokens/semantic/<brand>/dark/`  | Colour overrides only — 3 files; everything else inherits from light |
| `src/tokens/components/<brand>/`     | One file per token _family_, root-keyed `comp-<family>`              |
| `src/tokens/asset/`                  | `@font-face` CDN sources, built into `dist/fonts.css`                |
| `src/style-dictionary/`              | The build                                                            |

A component file is keyed `comp-<family>`, and its filename is `<parent>[.<child>].tokens.json`, which
does **not** always match the key — `mark.checkbox.tokens.json` keys `comp-checkbox`. Grep the key.

```json
{
  "comp-button": {
    "border-radius": { "$type": "borderRadius", "$value": "{shape.rounded-md}" }
  }
}
```

## What the build emits

Five destinations, only one of them committed:

| Output                                                                       | Committed                                            |
| ---------------------------------------------------------------------------- | ---------------------------------------------------- |
| `dist/<brand>/tokens.css`, `dist/<brand>/dark/tokens.css`, `dist/fonts.css`  | No — gitignored                                      |
| `packages/styled-system/src/tokens/generated/styledSystemToTokenMappings.ts` | **Yes** — a rename without a rebuild leaves it stale |
| Docs and Storybook JSON                                                      | No                                                   |

`styledSystemConstants.ts` sits in the same folder but is not produced by this build. Do not conflate them.

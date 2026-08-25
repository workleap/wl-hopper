# AGENTS.md - tokens

## Hard Rules

| Rule                                                                                          | Violation                                                  |
| --------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| Apply a component or semantic token change to every brand that defines it                     | Editing `sharegate/button.tokens.json` and not `workleap/` |
| Give each token a `$type` and a `$value`, per DTCG                                            | A bare `"border-radius": "4px"`                            |
| Point a component token at a core or semantic token by reference                              | `"$value": "4px"` where `{shape.rounded-md}` exists        |
| Run `pnpm build:tokens` after any token edit — consumers read the generated CSS, not the JSON | Editing a `*.tokens.json` and running only `pnpm test`     |

## Layout

| Path                             | Holds                                                                  |
| -------------------------------- | ---------------------------------------------------------------------- |
| `src/tokens/core/`               | Raw brand-independent values                                           |
| `src/tokens/semantic/<brand>/`   | Intent-named tokens (`neutral-text`, `space-inline-xs`)                |
| `src/tokens/components/<brand>/` | Per-component tokens, keyed `comp-<component>`, one file per component |
| `src/tokens/asset/`              | Asset references                                                       |
| `src/style-dictionary/`          | The build that turns the JSON into CSS custom properties               |

A component token file is keyed by `comp-<component>` and its leaves reference semantic tokens:

```json
{
  "comp-button": {
    "border-radius": { "$type": "borderRadius", "$value": "{shape.rounded-md}" }
  }
}
```

# Versioning

Hopper's consuming applications run Module Federation — this repo does not — so two Hopper versions
must be able to coexist in one page while an update rolls out. That constraint is why class names and
token declarations are version-stamped.

## Hard Rules

| Rule                                                                                                                              | Violation                                          |
| --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| Carry every style declaration on the hashed CSS-module class, via `cssModule(styles, "hop-Name", ...)`                            | A rule targeting the unhashed `.hop-Name` selector |
| Keep the `Global<Name>CssSelector` export an addressable hook that carries no styles                                              | Adding a `:global(.hop-Button)` rule               |
| Emit token declarations under the version-stamped root class                                                                      | A new `:root` block of `--hop-*` values            |
| Absorb a breaking change into a major, with a changeset naming the migration and an `UNSAFE_*` escape hatch where one is possible | Shipping it as a minor                             |

Nothing currently styles an unhashed class — `:global(` appears zero times in component CSS. No lint
rule enforces that, so this is convention only.

## How isolation actually works

Two independent mechanisms, both keyed on the package version:

| What                    | Mechanism                                                                                                                                                                                                                                                                  |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CSS-module class names  | `localIdentName: [local]___<version>___[hash:base64:5]` in `tooling/rslib-config/defineHopperRslibConfig.ts` — so `hop-Button` ships as `hop-Button___3-3-0___a1b2c`. Version-stamped _and_ content-hashed; the version segment is what guarantees cross-release isolation |
| Token custom properties | Declared under a root class, not hashed. `StyledSystemRootCssClass` is `hop-<version>`, and the theme sheet is emitted at `.hop-5-3-11-workleap`. The property _names_ stay global `--hop-*` by design                                                                     |

Token isolation therefore depends on cascade proximity: sibling providers that share a descendant
still collide. Two outputs are also genuinely unscoped — the dark-mode block emitted at
`[data-mode="dark"]`, and the tokens package's own `dist/<brand>/tokens.css`, which lands at `:root`.

## The two class names

| Class                           | Hashed | Emitted by                                        |
| ------------------------------- | ------ | ------------------------------------------------- |
| `Global<Name>CssSelector`       | No     | Every component                                   |
| `cssModule(styles, "hop-Name")` | Yes    | Components that have their own styles — 88 of 102 |

The 14 that emit only the unhashed selector are the style-free shared placeholders (`Header`,
`Content`, `Footer`, `Box`, the avatar fallbacks). That is by design, not a gap.

No compatibility package exists today. The worked precedent is `@hopper-ui/components@3.0.0`, which
restricted the `letterSpacing` styled-system prop to the new token scale and pointed consumers at
`UNSAFE_letterSpacing`.

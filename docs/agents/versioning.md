# Versioning

Hopper's consuming applications run Module Federation — this repo does not — so two Hopper versions
must coexist in one page while an update rolls out. That is why class names and token declarations are
version-stamped. [ADR 0008](../adr/0008-versioning-for-parallel-releases.md) records the mechanism and
the reasoning; the rules below are what to do about it.

## Hard Rules

| Rule                                                                                                                              | Violation                                                                                            |
| --------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Carry every style declaration on the hashed CSS-module class, via `cssModule(styles, "hop-Name", ...)`                            | A rule targeting the unhashed `.hop-Name` selector                                                   |
| Keep the `Global<Name>CssSelector` export an addressable hook that carries no styles                                              | Adding a `:global(.hop-Button)` rule                                                                 |
| Assert against the exported `Global<Name>CssSelector` in tests — `expect(el).toHaveClass("hop-Button")`                           | Asserting the hashed ident `hop-Button___3-3-0___vWScb`, or a descendant class                       |
| Emit token declarations under the version-stamped root class                                                                      | A new `:root` block of `--hop-*` values                                                              |
| Read a `--hop-*` variable only where a Hopper provider is an ancestor; portaled content needs the root class on its container     | Reading a token in content rendered outside the provider subtree, where it silently will not resolve |
| Leave `BodyStyleProvider` to bridge `<body>`, which sits outside the provider subtree                                             | "Simplifying" it by hardcoding token references onto `body`                                          |
| Preserve the version interpolation in `tooling/rslib-config/defineHopperRslibConfig.ts`                                           | "Correcting" it to a plain content hash                                                              |
| Absorb a breaking change into a major, with a changeset naming the migration and an `UNSAFE_*` escape hatch where one is possible | Shipping it as a minor                                                                               |

Nothing currently styles an unhashed class — `:global(` appears zero times in component CSS — and
`tooling/vitest-config` sets `classNameStrategy: "non-scoped"` so the assertions above work. No lint
rule enforces any of this; it is convention only.

## The two class names

| Class                           | Hashed | Emitted by                 |
| ------------------------------- | ------ | -------------------------- |
| `Global<Name>CssSelector`       | No     | 102 of 116 component files |
| `cssModule(styles, "hop-Name")` | Yes    | 89 of those 102            |

The 13 with a selector but no styles are the shared placeholders and triggers — `Header`, `Content`,
`Footer`, `Box`, the avatar fallbacks, `MenuTrigger`, `TooltipTrigger`. The 14 with no selector at all
are listed in `packages/components/AGENTS.md`. Both sets are deliberate.

Token isolation depends on cascade proximity, so sibling providers sharing a descendant still collide.
Two outputs are genuinely unscoped: the dark-mode block emitted at `[data-mode="dark"]`, and the tokens
package's own `dist/<brand>/tokens.css`, which lands at `:root`.

No compatibility package exists. Breaking changes have shipped both ways — `@hopper-ui/components`
3.0.0 restricted the `letterSpacing` style prop and offered `UNSAFE_letterSpacing`, while 3.3.0 removed
an `ActionBar` prop in a _minor_. Follow the rule above rather than the 3.3.0 precedent.

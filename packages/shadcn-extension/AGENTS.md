# AGENTS.md - shadcn-extension

This package deliberately inverts several repo-wide conventions. [ADR 0010](../../docs/adr/0010-shadcn-flavoured-extension-package.md)
owns the reasoning. Do not "fix" the rules below back to the `@hopper-ui/components` way.

## Hard Rules

| Rule                                                                                                  | Violation                                                               |
| ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Mirror the shadcn React Aria registry component exactly — same props, same defaults, same structure   | Renaming `isDisabled` to `disabled`, or adding a `variant` prop         |
| Keep `className` as the only styling API                                                              | Adding `useStyledSystem`, `StyledComponentProps` or `UNSAFE_*`          |
| Wrap every module's rules in `@layer hopper-shadcn-extension`                                         | An unlayered rule, which then beats the consumer's `className`          |
| Resolve colours, radii and motion to Hopper **semantic** tokens                                       | Porting shadcn's `bg-white` as a literal `#fff`                         |
| Declare geometry shadcn has no token for as a local `--hop-<Component>-*` on the module root          | Adding a `--hop-comp-*` entry to `packages/tokens`                      |
| Ship a name that does not already exist in `@hopper-ui/components`                                    | A second `Slider`, in two packages, with two APIs                       |
| Add a docs example under `src/<component>/docs/<component>/` and reference it with the package prefix | `<Example src="slider/docs/slider/preview" />` — the prefix is required |

## What still applies

ADR 0003 (React Aria is the primitive foundation) and ADR 0009 (accessibility baseline) apply
unchanged. ADR 0004 (tokens), ADR 0005 (style props) and ADR 0007 (API naming) are scoped to
`@hopper-ui/components` and do not govern this package.

Where shadcn's visual treatment conflicts with Hopper's, shadcn wins — that is the point of the
package. Where its _behaviour_ would be less accessible than React Aria's, React Aria wins.

## Layout

```
src/<component>/
  index.ts                     # export * from "./src/index.ts";
  src/{index.ts,X.tsx,X.module.css}
  docs/<component>/*.tsx       # one file per docs example, default-exporting `Example`
```

Each element carries two classes: the hashed CSS-module class, which holds the rules, and the
unhashed `hop-<Name>__element`, which is a documented public hook. shadcn's `data-slot` attributes
are kept as a third targeting surface. All three are public API — changing one is a breaking change
under [ADR 0008](../../docs/adr/0008-versioning-for-parallel-releases.md).

## Prerequisite

Tokens resolve only inside a `HopperProvider` (or `StyledSystemProvider`) subtree — the `--hop-*`
properties are declared on a version-stamped root class, not on `:root`. A component rendered outside
that subtree gets unresolved `var()`s.

## Porting a new component

Use the `_port-shadcn-component` skill. Source of truth is
`https://ui.shadcn.com/r/styles/aria-nova/<name>.json`; **nova** is the house style.

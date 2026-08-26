---
paths:
  - "packages/components/src/**/*.module.css"
---

# Component CSS

[ADR 0004](../../docs/adr/0004-design-tokens-are-the-only-source-of-visual-values.md) and
[ADR 0005](../../docs/adr/0005-styling-uses-style-props-and-native-css.md) own the reasoning.

## Hard Rules

| Rule | Violation |
| ---- | --------- |
| Resolve every colour to a **semantic** token | A hex, `rgb()`, `hsl()`, or named colour |
| Resolve a local declaration to a token, not a raw length | `--hop-MenuItem-sm-padding-block: 0.625rem` instead of a `--hop-space-*` token |
| Prefer a semantic token over a core one — component CSS references no core colour today | Reaching past `--hop-neutral-text` to a core palette entry like `--hop-coastal-25` |
| Read `--hop-comp-<family>-*` only from a module in that family | `list-box/src/ListBoxItem.module.css` reading `--hop-comp-select-*` |
| Redefine a token-package property only inside `packages/tokens` | Overriding `--hop-comp-button-*` from another component's module |
| Locate a token file by grepping its `comp-` key, not by component name | Expecting `checkbox.tokens.json`; the file is `mark.checkbox.tokens.json` |
| Declare a local on the module root when the component has no token file | Adding a 22nd token file for a one-off value |

Stylelint owns the mechanical layer — `px` is outside `unit-allowed-list`, `selector-class-pattern`
enforces `hop-ComponentName__element-name--modifier-name`, and `custom-property-pattern` enforces
`hop-ComponentName-*`. Because `px` already fails at lint, the live failure mode is a `rem` literal
that lint permits; converting `8px` to `0.5rem` is not tokenizing it.

## Sanctioned raw values

| Case | Why |
| ---- | --- |
| Hairlines as `0.0625rem` — 21 in component CSS | There is no border-width token family |
| `--hop-easing-*` referenced directly | Motion has core tokens but no semantic tier |
| Focus rings | There is no global `--hop-focus-ring` token. Set `outline: none` in the base rule and restore it under `[data-focus-visible]`, through a local `--hop-<Component>-focus-ring-color` pointing at `--hop-primary-border-focus` or the family's `--hop-comp-*-border-color-focus` |
| Breakpoint values | Deliberately not tokens — custom properties cannot be used in media query conditions. The scale lives in `packages/styled-system/src/responsive/Breakpoints.ts` |

## Token families are shared

Only 21 token files exist per brand against 90 CSS modules, and five families have no single owning
component — `field` (read by 12 modules), `mark`, `control`, `select`, `tabs`. So the read boundary is
the *family*, not the file. Reading across families is the violation. The three modules in `calendar/`
and `date-picker/` that override `--hop-comp-button-*` are known debt, not a pattern to copy.

## The three layers

```css
.hop-Button {
    --hop-Button-text-font: var(--hop-comp-button-text-font);
    --hop-Button-column-gap: var(--hop-space-inline-xs);
}
```

| Layer | Defined in | Read from |
| ----- | ---------- | --------- |
| `--hop-comp-<family>-*` | `packages/tokens/src/tokens/components/<brand>/*.tokens.json` | Modules in that family |
| `--hop-<category>-*` | `packages/tokens/src/tokens/core/`, `.../semantic/<brand>/<light\|dark>/` | Any module, semantic tier first |
| `--hop-<PascalName>-*` | The module's own root selector | That module — unless deliberately published as a theming hook, as `--hop-RichIcon-*` is for `packages/icons` |

Sibling modules inherit wholesale with `composes: hop-Input from "../../inputs/src/Input.module.css"`,
which pulls in the other module's class *and* its locals. Check what a `composes:` target declares
before adding a local that may already exist there.

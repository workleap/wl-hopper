---
paths:
  - "packages/components/src/**/*.module.css"
---

# Component CSS

## Hard Rules

| Rule | Violation |
| ---- | --------- |
| Resolve a local declaration to a token, not a raw length | `--hop-MenuItem-sm-padding-block: 0.625rem` instead of a `--hop-space-*` token |
| Read `--hop-comp-<family>-*` only from a module in that family | `list-box/src/ListBoxItem.module.css` reading `--hop-comp-select-*` |
| Locate a token file by grepping its `comp-` key, not by component name | Expecting `checkbox.tokens.json`; the file is `mark.checkbox.tokens.json` |
| Declare a local on the module root when the component has no token file | Adding a 22nd token file for a one-off value |

Stylelint already owns the mechanical layer: `px` is outside `unit-allowed-list`, and
`selector-class-pattern` enforces `hop-<PascalName>__descendent--modifier`. Both fail at lint, so the
live decisions are the ones above.

## Token families are shared, not per-component

Only 21 token files exist per brand against 90 CSS modules, and five families have no single owning
component — `field` (read by 12 modules), `mark`, `control`, `select`, `tabs`. `comp-button` is read
by 5 modules. Cross-family reads are the design, so the boundary is the *family*, not the file.

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
| `--hop-<category>-*` | `packages/tokens/src/tokens/core/`, `.../semantic/<brand>/<light\|dark>/` | Any module |
| `--hop-<PascalName>-*` | The module's own root selector | That module — unless deliberately published as a theming hook, as `--hop-RichIcon-*` is for `packages/icons` |

Sibling modules inherit wholesale with `composes: hop-Input from "../../inputs/src/Input.module.css"`,
which pulls in the other module's class *and* its locals. Check what a `composes:` target declares
before adding a local that may already exist there.

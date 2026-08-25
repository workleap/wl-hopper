---
paths:
  - "packages/components/src/**/*.module.css"
---

# Component CSS

## Hard Rules

| Rule                                                                                | Violation                                                       |
| ----------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Resolve every color, space, radius, typography and shadow value to a token variable | `padding: 8px`, `color: #666`                                   |
| Read a `--hop-comp-*` token only in the component that owns it                      | `var(--hop-comp-tooltip-color)` inside `AvatarGroup.module.css` |
| Add a missing value to the owning component's own `*.tokens.json`    | Aliasing another component's `--hop-comp-*` token               |
| Name selectors `hop-<PascalName>`, `__descendent`, `--modifier`                      | `.btn`, `.button-label`, `.hop-button`                          |

## The three token layers

A module declares local variables on its root selector and aliases design tokens into them:

```css
.hop-Button {
    --hop-Button-text-font: var(--hop-comp-button-text-font);
    --hop-Button-column-gap: var(--hop-space-inline-xs);
}
```

| Layer                       | Defined in                                                    | Usable from                             |
| --------------------------- | ------------------------------------------------------------- | --------------------------------------- |
| `--hop-comp-<component>-*`  | `packages/tokens/src/tokens/components/<brand>/*.tokens.json`  | The owning component only               |
| `--hop-<category>-*`        | `packages/tokens/src/tokens/core/`, `.../semantic/<brand>/`    | Any component                           |
| `--hop-<PascalName>-*`      | The component's own `.module.css`                              | That module only — an internal detail   |

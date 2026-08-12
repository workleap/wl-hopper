# CSS module and token conventions

## Selector naming (`contributing/components.md`)

BEM-like, with a fixed namespace and the React component name:

```
.hop-X                          base
.hop-X--modifier-name           modifier (variant, size, state class)
.hop-X__descendant-name         a descendant element
.hop-X__descendant-name--modifier-name
```

`cssModule(styles, "hop-X", size, variant, isStandalone && "standalone")` (from `../../utils/index.ts`) composes these for you from the base + a list of modifier name fragments — falsy entries are dropped. The modifier names passed in must exactly match the `--modifier` suffixes defined in the CSS file (e.g. passing `"sm"` requires a `.hop-X--sm` rule to exist).

## Two-tier CSS variables

Every component's `.module.css` declares its own **local** `--hop-X-*` variables at the top, inside the base `.hop-X` rule, each pointing at either a component token (`--hop-comp-x-*`) or a semantic token (`--hop-neutral-*`, `--hop-status-*`, etc.). Group them with comments by concern:

```css
.hop-Tag {
    /* Default */
    --hop-Tag-border-size: 0.0625rem;
    --hop-Tag-border-radius: var(--hop-comp-tag-border-radius);

    /* Typography */
    --hop-Tag-font-family: var(--hop-comp-tag-text-font);

    /* Small */
    --hop-Tag-sm-block-size: 1.25rem;
    --hop-Tag-sm-padding-inline: var(--hop-space-inset-sm);

    /* Neutral */
    --hop-Tag-neutral-border-color: var(--hop-comp-tag-border-color);
    --hop-Tag-neutral-background-color: var(--hop-comp-tag-background-color);

    /* Focus */
    --hop-Tag-focus-ring-color: var(--hop-comp-tag-border-color-focus);
}
```

Rules further down the file consume only the **local** `--hop-X-*` aliases, never the raw token directly — this indirection is what makes it possible to see every value a component depends on in one place at the top of the file, and is why the two rules below matter.

**Two hard rules (repo `CLAUDE.md`), both actively enforced in review:**

1. **No hardcoded values.** Every color, spacing, radius, or typography value must be `var(--hop-*)` — no literal hex codes, no bare `px`/`rem` for anything that has a token equivalent (raw geometry like `0.0625rem` for a hairline border, or component-specific one-off pixel values with no token equivalent, are the accepted exception — see `--hop-Tag-sm-block-size` above).
2. **Never reference another component's token.** `--hop-comp-<other-component>-*` must only appear inside that other component's own `.module.css`. If a similar visual treatment is needed here, add a **new** token to this component's own `<name>.tokens.json` — don't borrow. Example: don't put `var(--hop-comp-tooltip-color)` inside `X.module.css`; add `--hop-comp-x-description-color` to `x.tokens.json` instead.

## State selectors — always RAC data attributes, never pseudo-classes

RAC components expose interaction state as `data-*` attributes on the rendered element (`[data-hovered]`, `[data-pressed]`, `[data-focus-visible]`, `[data-disabled]`, `[data-selected]`, `[data-invalid]`) rather than relying on native `:hover`/`:focus`. Style against these, combined with the BEM modifier class for the variant/size they apply to:

```css
.hop-Tag--neutral[data-focus-visible] { /* ... */ }
.hop-Tag--neutral:not(.hop-Tag--standalone)[data-hovered] { /* ... */ }
.hop-Tag--neutral[data-pressed] { /* ... */ }
.hop-Tag--neutral[data-disabled] { /* ... */ }
```

Using native `:hover`/`:focus` instead misses RAC's pointer-vs-keyboard distinction (`data-focus-visible` only fires for keyboard focus) and won't reflect `isDisabled`/`isPressed` state managed by React state rather than the DOM.

Check the RAC reference for the primitive (`.claude/skills/react-aria/references/components/<Primitive>.md`) for the exact list of `data-*` attributes and render-prop values it exposes — don't guess which ones exist.

## Component tokens — delegate, don't hand-roll

Component token files live at `packages/tokens/src/tokens/components/{workleap,sharegate}/<kebab-name>.tokens.json`, DTCG-shaped (`$type`/`$value`, Style Dictionary v5), namespaced under a top-level `comp-<component-name>` key, referencing semantic tokens by preference (`{neutral.surface}`) so they adapt between light and dark automatically.

**Don't write these files directly.** Invoke the **`_update-tokens`** skill for this step — it already owns:

- the DTCG format and the exact `$type` vocabulary this repo uses
- reference syntax (`{path.to.token}`, dot vs. dash rules)
- brand symmetry (Workleap + ShareGate, both get the token by default)
- the token changeset format and version-bump rules

Feed it the visual spec collected in Phase 2 of the main skill (sizes, variants, colors, states) and let it produce the token JSON and its own changeset entry. After it runs, `pnpm build:tokens` regenerates `packages/styled-system/src/tokens/generated/` so the new `--hop-comp-x-*` variables are available to consume in `X.module.css`.

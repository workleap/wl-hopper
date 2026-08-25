# ADR-0004: Design tokens are the only source of visual values

## Status

Accepted (2026-08-25, documented retroactively)

Decision date: 2023-06 (tech vision), component token layer added 2026-01

## Context

Hopper integrates with brand design tokens so designers can change the rules of the system with minimal engineering effort, and so brand updates propagate without touching product code.

The token set is layered:

- **Core** tokens: raw values. Shared across every Workleap product.
- **Semantic** tokens: intent-based aliases — `--hop-primary-surface` resolves to a core palette entry, `--hop-neutral-text` to another. Most of this layer aliases core; the data-visualization family is the exception and holds raw values directly.
- **Component** tokens: `--hop-comp-*`, added with the theming system in 2026-01 to support per-theme component values.

What ships is CSS: `packages/tokens` emits CSS custom properties across three Style Dictionary platforms (a font-face sheet, the theme sheets, and a TypeScript map consumed by the styled system). The properties are consumable from any web stack, which is what makes the token layer outlive any single component implementation — but there is no SCSS, JSON or native-platform output today.

Because the design system must tolerate multiple versions running in parallel, token declarations are scoped to a version-stamped root class. The property _names_ are stable. See ADR-0008.

## Decision

Visual values come from Hopper tokens. Colors, spacing, typography, radii, shadows and elevation, motion, data-visualization colors, and — at the component layer — gradients, borders and backdrop filters are referenced through tokens rather than written as literals.

This holds whether the component is a Hopper component, a locally built one, or a one-off layout.

Two categories have no token family, and literals there are expected rather than a defect:

- **Breakpoints.** Deliberately not tokens — CSS custom properties cannot be used in media query conditions. The scale lives in `packages/styled-system/src/responsive/Breakpoints.ts`.
- **Border and outline widths.** There is no border-width token family, which is why hairline rules are written as `0.0625rem` across component CSS.

Motion has core tokens but no semantic tier, so `--hop-easing-*` is referenced directly from component CSS. That is the one place where the "prefer semantic" rule below cannot be followed.

## Consequences

### For this repository

- A hex code, `rgb()`, `hsl()`, or named color in a component's CSS is a defect. Use a semantic token. This does not apply to `packages/tokens/src/tokens/**/*.tokens.json`, where raw values are the point, nor to the `UNSAFE_*` escape-hatch examples in the docs, which exist to demonstrate the escape hatch.
- Hardcoded spacing is a defect. Use spacing tokens or the corresponding style props. Note that `px` is already blocked by stylelint's `unit-allowed-list`, so the live failure mode is a `rem` literal, which lint permits — converting `0.25rem` to `rem` is not the same as tokenizing it.
- Prefer semantic tokens over core tokens. Semantic tokens carry intent and survive rebrands; core tokens do not. Component CSS currently references no core color directly, and that is worth keeping.
- Define `--hop-ComponentName-*` custom properties in the component's own CSS module, pointing at semantic or component tokens — `--hop-Button-background: var(--hop-neutral-surface)`. This is the pattern `AGENTS.md` mandates and stylelint enforces the naming for.
- Do not redefine a token-package property (core, semantic, or `--hop-comp-*`) outside `packages/tokens`, and do not read another component's `--hop-comp-*`. A handful of places currently override `--hop-comp-button-*` from calendar and date-picker CSS; those are known debt, not a pattern to follow.
- The claim above is a target, not a description of every file. `apps/docs` sits outside the `packages/**` stylelint override and carries roughly ninety hex literals; component CSS is clean on color but holds around 230 `rem` literals, most of them hairlines, focus rings, and the avatar sizing scale.

### For consuming applications

- Never redefine or override a `--hop-*` custom property in product CSS. Set values through style props, or through the theming system.
- A bespoke component styled with tokens picks up brand changes automatically. One styled with literals does not, and becomes maintenance debt on day one.
- Reach for a semantic token over a core one for the same reason as above: `--hop-primary-surface` survives a rebrand, `--hop-sapphire-50` does not.
- ADR-0005's `UNSAFE_*` props are the sanctioned exception when a value genuinely falls outside the token scale.

### Verification note

Exact token names change over time. Check `@hopper-ui/tokens` or the Hopper docs site rather than inventing a plausible-looking token name. `packages/tokens/README.md` currently advertises an opacity category that does not exist — the generated CSS is the authority, not the README.

## Sources

- [Tech Design: Hopper Tokens (@hopper-ui/tokens)](https://workleap.atlassian.net/wiki/spaces/TL/pages/3637542948) (TL, 3637542948)
- [Tech Vision for Hopper](https://workleap.atlassian.net/wiki/spaces/TL/pages/3631808725) (TL, 3631808725)
- [Hopper Design Token](https://workleap.atlassian.net/wiki/spaces/Design/pages/4542857217) (Design, 4542857217)
- `contributing/tokens.md` — how to add or change a token

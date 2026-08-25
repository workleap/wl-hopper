# ADR-0004: Design tokens are the only source of visual values

## Status

Accepted (2026-08-25, documented retroactively)

Decision date: 2023-06 (tech vision), token layers extended 2025-11

## Context

Hopper integrates with brand design tokens so designers can change the rules of the system with minimal engineering effort, and so brand updates propagate without touching product code. Tokens are technology agnostic by design, unlike components, which are React only.

The token set is layered:

- **Core** tokens: raw values. Shared across every Workleap product.
- **Semantic** tokens: intent-based aliases (`hop-primary-surface`, `hop-neutral-text`).
- **Component** tokens: a layer added later to support per-theme component values.

Because the design system must tolerate multiple versions running in parallel, token CSS custom properties are scopable per remote module or hashed per release. See ADR-0008.

## Decision

Every visual value in this repository comes from a Hopper token. Colors, spacing, typography, radii, shadows, and motion are referenced through tokens, never written as literals.

This holds regardless of whether the component is a Hopper component, a locally built component, or a one-off layout.

## Consequences

### For agents working in this repo

- A hex code, `rgb()`, `hsl()`, or named color in a diff is a defect. Use a semantic token.
- Hardcoded pixel spacing is a defect. Use spacing tokens or the corresponding style props.
- Prefer semantic tokens over core tokens. Semantic tokens carry intent and survive rebrands; core tokens do not.
- Never redefine or override a `--hop-*` custom property in product CSS.
- This applies to components built from scratch too. A bespoke component styled with tokens still picks up brand changes automatically. A bespoke component styled with literals does not, and becomes maintenance debt on day one.

### Verification note

Exact token names change over time. Check `@hopper-ui/tokens` or the Hopper docs site rather than inventing a plausible-looking token name.

## Sources

- [Tech Design: Hopper Tokens (@hopper-ui/tokens)](https://workleap.atlassian.net/wiki/spaces/TL/pages/3637542948) (TL, 3637542948)
- [Tech Vision for Hopper](https://workleap.atlassian.net/wiki/spaces/TL/pages/3631808725) (TL, 3631808725)
- [Hopper Design Token](https://workleap.atlassian.net/wiki/spaces/Design/pages/4542857217) (Design, 4542857217)

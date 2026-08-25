# ADR-0005: Styling uses style props and native CSS, not CSS-in-JS

## Status

Accepted (2026-08-25, documented retroactively)

Decision date: 2023-05

## Context

Hopper ships a styled system (`@hopper-ui/styled-system`) that maps a curated set of CSS properties onto component props. Style props accept token values, which keeps ADR-0004 enforceable at the type level rather than by review.

Runtime CSS-in-JS was rejected. It carries a runtime cost, complicates server-side rendering (which Hopper explicitly supports), and works poorly with the per-release class hashing required for module federation. Hopper's own component guidelines state that components should not use CSS-in-JS properties and that all styling should be native CSS over foundation CSS variables.

## Decision

Styling escalates through these options, cheapest first:

1. **Styled system props** on a Hopper component: `backgroundColor`, `padding`, `width`, and the rest of the curated set. Values are tokens.
2. **`className`** appended to a Hopper component when a repeated or complex rule is needed.
3. **`UNSAFE_*` props** for values that fall outside the token scale and genuinely cannot be expressed otherwise.
4. **Local CSS files** referencing `--hop-*` custom properties, for bespoke components.

No runtime CSS-in-JS library. No inline `style` objects for anything a token can express.

## Consequences

### For agents working in this repo

- Do not add `styled-components`, `emotion`, `stitches`, or similar.
- Do not add Tailwind. It is not the styling model here, and its utility scale competes with the token scale.
- Reach for `UNSAFE_*` only after the token scale has genuinely been exhausted. The prefix is a warning, not a convenience.
- When building a bespoke component that should itself accept style props, expose them with the `useStyledSystem` hook rather than reimplementing prop-to-CSS mapping.

## Sources

- [Tech Design: CSS Utilities (@hopper-ui/styled-system)](https://workleap.atlassian.net/wiki/spaces/TL/pages/3612442812) (TL, 3612442812)
- [Tech Vision for Hopper](https://workleap.atlassian.net/wiki/spaces/TL/pages/3631808725) (TL, 3631808725)
- [Customization options for Hopper & Orbiter Components](https://workleap.atlassian.net/wiki/spaces/~848321167/pages/4772757533) (4772757533)

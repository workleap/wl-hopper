# ADR-0005: Styling uses style props and native CSS, not CSS-in-JS

## Status

Accepted (2026-08-25, documented retroactively)

Decision date: 2023-05

## Context

Hopper ships a styled system (`@hopper-ui/styled-system`) that maps a curated set of CSS properties onto component props — around 145 of them, exposed as the `StyledSystemProps` interface.

Roughly half of those props map their input through a token table, so `backgroundColor="neutral-surface"` resolves to `var(--hop-neutral-surface)`. That keeps ADR-0004 close to the type system, but it is not a hard type-level guarantee: the token-mapped props also accept CSS keywords, percentages and `0`, and the remaining sixty-odd props pass their value straight through to `csstype` types that admit any string. There is no runtime enforcement either — `UNSAFE_backgroundColor` and `backgroundColor` reach the same handler. The real backstop against raw values is the shipped validator (`validate_hopper_code`), not the types alone.

Runtime CSS-in-JS was rejected. It carries a runtime cost, complicates server-side rendering, and works poorly with the per-release class hashing described in ADR-0008. Hopper is SSR-safe by construction rather than by documented contract: `@react-aria/ssr` is a runtime dependency, `useIsSSR` guards media-query and measurement code, and the package exports `useIsomorphicInsertionEffect` and `useIsomorphicLayoutEffect` for the purpose. There is no SSR documentation page and no SSR test.

## Decision

No runtime CSS-in-JS library, and no hand-authored inline `style` objects for anything a token can express. (The styled system's own output _is_ an inline style object — that is the mechanism, not a violation.)

Styling escalates through these options, cheapest first:

1. **Styled system props**, with token values: `backgroundColor`, `padding`, `width`, and the rest of the curated set.
2. **`UNSAFE_*` props**, for values that genuinely fall outside the token scale.
3. **CSS**, for what props cannot express — a repeated or complex rule, or a pseudo-class the props do not cover.

The `UNSAFE_*` escape hatch is narrower than it looks, and this is the most common mistake made against it:

- It is a whitelist of 77 props, not a prefix that works on all of them. A prop with no `UNSAFE_` twin — `position`, `overflow`, `top`, `flex`, `opacity` — takes a custom value directly, with no prefix.
- Percentages and standard CSS keywords never need the prefix; the token-mapped props already accept them.
- `UNSAFE_className` and `UNSAFE_style` do not exist.

Rung 3 means different things on either side of the package boundary, and the two should not be conflated — see the split below.

## Consequences

### For this repository

- Components are authored with CSS Modules: a `*.module.css` file per component, composed onto the element with `cssModule()` and `clsx`. The selector convention is `hop-ComponentName__element--modifier`, documented in `contributing/components.md`.
- Component CSS declares its own `--hop-ComponentName-*` custom properties at the top of the file and references them below, so the component's surface is adjustable in one place. Those properties point at semantic or `--hop-comp-*` tokens.
- Do not add `styled-components`, `emotion`, `stitches`, or similar. (`@stitches/core` appears in the lockfile transitively, via the docs site's Sandpack playground. Nothing in this repo authors against it.)
- Do not add Tailwind. It is not the styling model here, and its utility scale competes with the token scale. Note that `SizingMapping` deliberately borrows Tailwind's fraction scale for sizing values — that is a value table, not an adoption.
- When building something that should itself accept style props, the cheapest path is wrapping a Hopper HTML element (`Div`, `Span`, or `htmlElement()`) and forwarding props. When that is not enough, use the `useStyledSystem` hook with the `StyledSystemProps` / `StyledComponentProps` types rather than reimplementing prop-to-CSS mapping. `useStyledSystem` does not merge `className` and `style` for you — merge them yourself.
- Do not set style properties in context objects. Define them in the CSS module and pass only `className` through the context.

### For consuming applications

- Style with props first. `className` and `style` are rejected outright by the Hopper validator and by the published `hopper` skill's rules — they are not an escalation step in product code.
- Reach for `UNSAFE_*` only after the token scale has genuinely been exhausted, and check the whitelist first. The prefix is a warning, not a convenience.
- Where a pseudo-class or a genuinely complex rule falls outside the props, the docs recommend a CSS class. That is a real exception to the rule above, and worth confirming against the styled-system styling guide rather than assuming either way.
- Local CSS files for bespoke components may reference `--hop-*` custom properties, subject to ADR-0008: the properties resolve only inside a Hopper provider, and ADR-0004 forbids redefining them.

## Sources

- [Tech Design: CSS Utilities (@hopper-ui/styled-system)](https://workleap.atlassian.net/wiki/spaces/TL/pages/3612442812) (TL, 3612442812)
- [Tech Vision for Hopper](https://workleap.atlassian.net/wiki/spaces/TL/pages/3631808725) (TL, 3631808725)
- [Customization options for Hopper & Orbiter Components](https://workleap.atlassian.net/wiki/spaces/~848321167/pages/4772757533) (4772757533)
- `apps/docs/content/styled-system/concepts/styling.mdx` — the consumer-facing styling guide
- `contributing/components.md` — how components are authored in this repo

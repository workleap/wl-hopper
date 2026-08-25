# ADR-0009: Accessibility baseline

- **Status:** Accepted (documented retroactively)
- **Decision date:** 2023-06, reaffirmed in the 2026 contribution model
- **Recorded:** 2026-08-25

## Context

A product can only be as accessible as the design system underneath it. Accessibility is also increasingly a purchasing criterion for enterprise customers, which makes it a commercial requirement rather than a nice-to-have.

Hopper's baseline was set deliberately, and the choice of React Aria (ADR-0003) exists largely to make that baseline achievable without reimplementing widget behavior per component.

## Decision

The baseline for UI in this repository:

- **WCAG AA** compliance.
- **WAI-ARIA authoring practices** for component behavior. WCAG does not specify keyboard interaction in detail; the APG does, and that is the reference.
- **Keyboard as a first-class citizen.** Every interactive element is reachable and operable by keyboard, with the interaction pattern the APG specifies for its role.
- **Responsive breakpoints.** Components support the standard breakpoint scale.
- **Multiple color schemes**, driven by tokens.
- **Localization.** Static strings belong to the component. Dynamic strings are passed in by the consumer.

## Consequences

### For agents working in this repo

- Use the semantic element or the React Aria component. A `div` with `onClick` and `role="button"` is not equivalent, and reimplementing the keyboard contract by hand usually gets it wrong.
- Do not remove focus outlines. Do not set `outline: none` without an equivalent visible focus indicator.
- Icon-only controls need an accessible name. Decorative icons need to be hidden from assistive technology.
- Do not set `tabIndex` values above 0.
- When building a component from scratch, look up its pattern in the WAI-ARIA APG first and implement the specified keyboard contract, rather than inferring it.

### Important limitation

**Chromatic catches visual regressions, not accessibility.** A green Chromatic build says nothing about whether a component is operable by keyboard or announced correctly by a screen reader. Do not cite passing visual tests as accessibility evidence.

## Sources

- [Tech Vision for Hopper](https://workleap.atlassian.net/wiki/spaces/TL/pages/3631808725) (TL, 3631808725), accessibility section
- [Hopper Contribution Model](https://workleap.atlassian.net/wiki/spaces/Design/pages/7135461431) (Design, 7135461431)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/)

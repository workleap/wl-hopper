# ADR-0003: React Aria Components is the primitive foundation

## Status

Accepted (2026-08-25, documented retroactively)

Decision date: 2023-05 (analysis), carried into the Hopper tech vision

## Context

Hopper needed a headless primitive layer providing behavior, focus management, keyboard handling, and ARIA wiring, so that the design system team could focus on brand expression rather than reimplementing accessible widgets.

Radix UI and React Aria were compared. React Aria was chosen, and the Technology team subsequently recommended it as the preferred foundation for building components across Workleap. The choice also shaped Hopper's API style: React Aria's declarative slot and collection patterns became Hopper's patterns.

## Decision

React Aria Components is the primitive layer for interactive UI in this repository.

This applies at two levels:

1. Hopper components are built on React Aria, so its behavior and API conventions leak through into Hopper's surface.
2. Components we build locally, when Hopper does not cover the need, are also built on React Aria rather than from scratch.

## Consequences

### For agents working in this repo

- A new interactive component (menu, listbox, dialog, popover, combobox, grid) starts from React Aria Components or its hooks. It does not start from a `div` with an `onClick`.
- Do not hand-roll focus traps, roving tabindex, type-ahead, or ARIA attribute wiring. React Aria already does it, and does it better.
- Do not introduce a competing headless library (Radix, Headless UI, Ark) alongside React Aria.
- Prefer React Aria Components (the component API) over React Aria hooks. Reach for hooks only when the component-level API is genuinely too rigid.

### Caveat worth knowing

React Aria's own prop naming uses the `isX` convention (`isOpen`, `isDisabled`). Hopper deliberately diverges from this on its public API. See ADR-0007. Do not assume React Aria naming carries through to Hopper components.

## Sources

- [Analysis: Radix UI vs React Aria for Hopper Documentation](https://workleap.atlassian.net/wiki/spaces/TL/pages/3622895624) (TL, 3622895624, in French)
- [Tech Vision for Hopper](https://workleap.atlassian.net/wiki/spaces/TL/pages/3631808725) (TL, 3631808725)
- [Customization options for Hopper & Orbiter Components](https://workleap.atlassian.net/wiki/spaces/~848321167/pages/4772757533) (4772757533)

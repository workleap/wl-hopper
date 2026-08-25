# ADR-0003: React Aria Components is the primitive foundation

## Status

Accepted (2026-08-25, documented retroactively)

Decision date: 2023-05 (analysis), carried into the Hopper tech vision

## Context

Hopper needed a headless primitive layer providing behavior, focus management, keyboard handling, and ARIA wiring, so that the design system team could focus on brand expression rather than reimplementing accessible widgets.

Radix UI and React Aria were compared. React Aria was chosen, and the Technology team subsequently recommended it as the preferred foundation for building components across Workleap. The choice also shaped Hopper's API style: React Aria's declarative slot and collection patterns became Hopper's patterns.

The decision has an in-repo record beyond the analysis document: Radix was actually adopted in `apps/docs` in May 2023 and removed a month later in commit `79f0a3d6` ("Feature/radix to react aria"), which rewrote the docs site's Header, Sidebar, CopyButton and ThemeSwitch onto React Aria.

## Decision

React Aria Components is the primitive layer for interactive UI in this repository.

Hopper components are built on React Aria, and its behavior and API conventions carry through into Hopper's surface deliberately — Hopper's prop types extend React Aria's rather than wrapping or renaming them.

React Aria is a **peer** dependency of `@hopper-ui/components`, not a bundled one, so consuming applications install it themselves. The lower-level `@react-aria/*` and `@react-stately/*` utilities are direct runtime dependencies.

## Consequences

### For this repository

- A new interactive component (menu, listbox, dialog, popover, combobox) starts from React Aria Components or its hooks. It does not start from a `div` with an `onClick`. In practice new components are ported from React Spectrum S2 — see the `_port-component` skill.
- Do not hand-roll focus traps, roving tabindex, type-ahead, or ARIA attribute wiring. React Aria already does it, and does it better.
- Do not introduce a competing headless library (Radix, Headless UI, Ark) alongside React Aria.
- Prefer React Aria Components (the component API) over React Aria hooks. Reach for hooks only when the component-level API is genuinely too rigid. The ratio holds: roughly 200 files import `react-aria-components`, and six use behavior hooks. `TooltipTrigger` is the model for a justified exception — it documents in a code comment why the component-level API did not fit.
- Keep React Aria's version alignment intact. `syncpack` enforces a single version across the workspace, and `pnpm update-react-aria-deps` is how it moves.

### For consuming applications

- When Hopper does not cover a need, build the local component on React Aria rather than from scratch. Then consider whether it belongs in Hopper.
- Install `react-aria` and `react-aria-components` alongside `@hopper-ui/components` — they are peer dependencies.

### Caveat worth knowing

React Aria's `isX` prop naming (`isOpen`, `isDisabled`, `isSelected`) **carries through** to Hopper's public API by design, and Hopper's own additions follow it (`isFluid`, `isLoading`, `isHidden`). Hopper differs from React Aria by addition — style props, `size`, `variant` — never by renaming. See ADR-0007.

## Sources

- [Analysis: Radix UI vs React Aria for Hopper Documentation](https://workleap.atlassian.net/wiki/spaces/TL/pages/3622895624) (TL, 3622895624, in French)
- [Tech Vision for Hopper](https://workleap.atlassian.net/wiki/spaces/TL/pages/3631808725) (TL, 3631808725)
- [Customization options for Hopper & Orbiter Components](https://workleap.atlassian.net/wiki/spaces/~848321167/pages/4772757533) (4772757533)

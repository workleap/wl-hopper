# ADR-0007: Component API naming conventions

- **Status:** Accepted (documented retroactively)
- **Decision date:** 2023-06
- **Recorded:** 2026-08-25

## Context

Hopper's tech vision calls for a component API that is consistent and predictable, on the grounds that a predictable API is the difference between reading docs for every component and guessing correctly most of the time.

The conventions were set explicitly, and in one case deliberately diverge from the underlying React Aria layer.

## Decision

| Convention | Form | Not |
|---|---|---|
| Boolean props | `open`, `disabled`, `required` | `isOpen`, `isDisabled` |
| Event handlers | `onChange`, `onOpenChange` | `onChanged`, `onOpened` |
| Uncontrolled initial values | `defaultOpen`, `defaultValue` | `initialOpen` |
| Underlying element swap | `as` | `component`, `renderAs` |
| Outer element ref | `ref` | `rootRef`, `containerRef` |
| Nested element access | `wrapperProps`, `overlayProps` | ad hoc prop names |

Components pass the original native or React Aria event arguments through to consumer callbacks, and never stop event propagation.

Components ship sensible defaults. A `Button` inside a `Card` should not need its variant specified, because the parent decides. This is what makes brand updates possible without touching product code.

## Consequences

### For agents working in this repo

- This is the single highest-frequency mistake. React Aria, which Hopper is built on, uses `isOpen` and `isDisabled`. Hopper's public API does not. Do not carry React Aria naming into Hopper usage from memory.
- Verify prop names against the types in `@hopper-ui/components` rather than guessing. The convention above tells you what shape to expect, not what exists.
- Do not add wrapper props to a Hopper component to "normalize" its API. The API is already the convention.
- When adding props to a local component, follow the table. A local component that uses `isOpen` becomes a papercut for everyone who touches it later.
- Resist configuring props that have correct defaults. Every prop a consumer sets is a prop the design system can no longer change on their behalf.

## Sources

- [Tech Vision for Hopper](https://workleap.atlassian.net/wiki/spaces/TL/pages/3631808725) (TL, 3631808725)

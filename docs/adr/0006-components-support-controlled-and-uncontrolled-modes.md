# ADR-0006: Components support controlled and uncontrolled modes

## Status

Accepted (2026-08-25, documented retroactively)

Decision date: 2023-06

## Context

A fully controlled component gives the consumer maximum flexibility but forces them to write state management for every use, including the many cases where the default behavior was already correct. Hopper's tech vision calls for components that are flexible and painless, so components offer an auto-controlled (uncontrolled) mode alongside the controlled one.

The convention that carries this: uncontrolled initial values are passed through a `default`-prefixed prop.

## Decision

Stateful components expose both modes.

- **Controlled:** `value` plus `onChange`, or `open` plus `onOpenChange`. The consumer owns the state.
- **Uncontrolled:** `defaultValue`, `defaultOpen`, `defaultSelectedKey`. The component owns the state and still fires the change callback.

Components we build locally follow the same convention.

## Consequences

### For agents working in this repo

- Do not add a `useState` and a controlled binding when the uncontrolled mode already does the job. It is noise, and it introduces a source of truth that can drift.
- Do not mix modes on one prop. Passing both `open` and `defaultOpen` is a bug, and React will warn about the controlled/uncontrolled switch.
- When passing `open`, always pass the corresponding change handler. A controlled prop without a handler produces a component that cannot be interacted with, which is a common and confusing failure.
- When writing a new local component with internal state, expose `default*` rather than forcing consumers to be controlled.

## Sources

- [Tech Vision for Hopper](https://workleap.atlassian.net/wiki/spaces/TL/pages/3631808725) (TL, 3631808725)
- [Customization options for Hopper & Orbiter Components](https://workleap.atlassian.net/wiki/spaces/~848321167/pages/4772757533) (4772757533)

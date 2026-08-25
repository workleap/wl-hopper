# ADR-0006: Components support controlled and uncontrolled modes

## Status

Accepted (2026-08-25, documented retroactively)

Decision date: 2023-06

## Context

A fully controlled component gives the consumer maximum flexibility but forces them to write state management for every use, including the many cases where the default behavior was already correct. Hopper's tech vision calls for components that are flexible and painless, so components offer an auto-controlled (uncontrolled) mode alongside the controlled one.

The convention that carries this: uncontrolled initial values are passed through a `default`-prefixed prop.

## Decision

Stateful components expose both modes. The controlled prop is owned by the consumer; the `default`-prefixed one seeds state the component then owns. Either way the change callback fires.

Each piece of state has its own trio, inherited from React Aria:

| State            | Controlled                   | Uncontrolled                             | Callback            |
| ---------------- | ---------------------------- | ---------------------------------------- | ------------------- |
| Value            | `value`                      | `defaultValue`                           | `onChange`          |
| Toggle           | `isSelected`                 | `defaultSelected`                        | `onChange`          |
| Single selection | `selectedKey`                | `defaultSelectedKey`                     | `onSelectionChange` |
| Multi selection  | `selectedKeys`               | `defaultSelectedKeys`                    | `onSelectionChange` |
| Overlay open     | `isOpen`                     | `defaultOpen`                            | `onOpenChange`      |
| Disclosure       | `isExpanded`, `expandedKeys` | `defaultExpanded`, `defaultExpandedKeys` | `onExpandedChange`  |
| ComboBox text    | `inputValue`                 | `defaultInputValue`                      | `onInputChange`     |

`defaultSelectedKeys` (plural) is the more common of the two selection forms; the singular exists on `Tabs` and `SegmentedControl`, and as a React Aria-deprecated alias on `Select` and `ComboBox`.

The mechanism is React Stately's `useControlledState` from `@react-stately/utils`, a direct dependency. It is used explicitly in `ContextualHelp`, `TextField`, `TextArea`, `NumberField` and `Tabs`, and inherited everywhere else through React Aria's own state hooks. There is deliberately no Hopper-owned wrapper around it — do not add one.

### Known exceptions

- **`Tooltip`** exposes neither mode. It omits `isOpen`, `defaultOpen` and `onOpenChange`; the state lives on `TooltipTrigger`.
- **`ComboBox`** is notify-only for open state: `onOpenChange` exists, `isOpen` and `defaultOpen` do not.
- **`ActionBar`** is controlled-only, via `selectedItemCount` and `onClearSelection`.

## Consequences

### For this repository

- A new stateful component exposes `default*` alongside its controlled prop rather than forcing consumers to be controlled. `ActionBar` is the standing exception, not the precedent.
- Route state through React Stately's `useControlledState`, or through the React Aria state hook that already wraps it. Do not reimplement the controlled/uncontrolled branch by hand.
- The `docs/*/controlled.tsx` examples are meant to hold a `useState` and a controlled binding — that is what they demonstrate. The advice below about avoiding needless controlled state is about product code, not about these.

### For consuming applications

- Do not add a `useState` and a controlled binding when the uncontrolled mode already does the job. It is noise, and it introduces a source of truth that can drift.
- Do not mix modes on one prop. Passing both `isOpen` and `defaultOpen` is a bug, and a quiet one: the controlled prop wins, `defaultOpen` is silently ignored, and nothing warns. React Stately warns only when a component _switches_ between modes mid-life — when `isOpen` goes from defined to `undefined` or back — and that warning is its own `console.warn`, not React's. React never sees these props, so React's controlled-input warnings do not apply.
- When passing `isOpen`, always pass `onOpenChange`. A controlled prop without a handler produces a component that cannot be interacted with, which is a common and confusing failure.
- Put the handler on the component that owns the state. A `Modal` nested inside a `ModalTrigger` does not own its open state — `onOpenChange` passed there is dropped with a `console.warn`, and belongs on the trigger instead.

## Sources

- [Tech Vision for Hopper](https://workleap.atlassian.net/wiki/spaces/TL/pages/3631808725) (TL, 3631808725)
- [Customization options for Hopper & Orbiter Components](https://workleap.atlassian.net/wiki/spaces/~848321167/pages/4772757533) (4772757533)
- `apps/docs/content/components/concepts/controlled-mode.mdx` — the consumer-facing statement of this convention

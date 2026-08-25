# ADR-0007: Component API naming conventions

## Status

Accepted (2026-08-25, documented retroactively)

Decision date: 2023-06

## Context

Hopper's tech vision calls for a component API that is consistent and predictable, on the grounds that a predictable API is the difference between reading docs for every component and guessing correctly most of the time.

The conventions follow from ADR-0003. Hopper's prop types extend React Aria Components' types directly — `ButtonProps extends StyledComponentProps<Omit<RACButtonProps, "isPending">>` — so React Aria's vocabulary _is_ Hopper's vocabulary. Hopper extends that surface by addition (style props, `size`, `variant`) rather than by renaming what it inherits. There is no prop-rename layer, and Hopper's own additions follow the same conventions.

## Decision

| Convention                  | Form                                       | Not                            |
| --------------------------- | ------------------------------------------ | ------------------------------ |
| Boolean props               | `isOpen`, `isDisabled`, `isRequired`       | `open`, `disabled`, `required` |
| Event handlers              | `onPress`, `onChange`, `onSelectionChange` | `onClick`                      |
| Uncontrolled initial values | `defaultOpen`, `defaultValue`              | `initialOpen`                  |
| Underlying element swap     | `elementType`                              | `as`, `component`, `renderAs`  |
| Outer element ref           | `ref`                                      | `rootRef`, `containerRef`      |
| Nested element access       | `<childName>Props`                         | ad hoc prop names              |

Notes on the rows that have exceptions or nuance:

- **Booleans.** `isOpen`, `isDisabled`, `isRequired`, `isInvalid`, `isSelected`, `isReadOnly` — inherited from React Aria, and re-exported deliberately where a component narrows its parent's props (`Modal`, `Alert`, `CustomModal` and `ContextualHelp` all `Pick<..., "isOpen" | "defaultOpen">`). Hopper-authored booleans follow the same shape: `isFluid`, `isLoading`, `isHidden`.
- **Element swap.** `elementType` is the convention (`Text`, `Paragraph`, `OverlineText`). `as` exists on `Box` alone and is not a pattern to copy.
- **Refs.** `ref` reaches the outer element. Named inner-element refs are a deliberate part of the API where a component has more than one focusable target: `inputRef` on `ComboBox` and `DatePicker`, `inputStartRef` / `inputEndRef` on `DateRangePicker`.
- **Nested element access.** The shape is `<childElementName>Props` — `inputGroupProps`, `popoverProps`, `inputProps`, `overlayProps`, `wrapperProps`. The more common way to reach into children is the slot and context system rather than a prop: components read `*Context` via `useContextProps`, and parents supply defaults through `SlotProvider` and `DEFAULT_SLOT`.

Components pass the original native or React Aria event arguments through to consumer callbacks. Note that `onPress` receives a React Aria `PressEvent`, not a native event.

Components do not stop event propagation. Two things complicate this in practice: React Aria's `useKeyboard` stops propagation _by default_, so a component using it must call `continuePropagation()` to opt back in (`ActionBar` is the only place that does); and `InputGroup` calls `preventDefault` deliberately, to forward focus to its inner input when a non-interactive child is clicked.

Components ship sensible defaults, and a parent can set them for its children through context. A `Button` inside a `Callout` does not need `variant="secondary"` — `Callout` provides it through `ButtonContext`. `ButtonGroup` supplies `size`, `isDisabled` and `isFluid` the same way, and `Form` supplies `isDisabled`, `size` and `necessityIndicator` to every nested field. This is what makes brand updates possible without touching product code.

## Consequences

### For this repository

- Follow the table when adding props to a component in `packages/components`. A new component that invents `open` where its siblings expose `isOpen` is a papercut for everyone who touches it later.
- Read prop names from the source — `packages/components/src/<component>/src/<Component>.tsx`. TypeScript is authoritative. The generated API JSON under `apps/docs/dist/ai-docs/` is a gitignored build artifact and is wrong for `Select`, `MultiSelect` and `ComboBox`.
- Wrappers are a normal composition unit here, not an antipattern — `CheckboxField`, `PopoverTrigger` and `Paragraph` all exist to narrow or specialize a lower-level component. What to avoid is a wrapper whose only purpose is renaming props.
- Provide good defaults and propagate them through context providers rather than expecting consumers to pass them. Every prop a consumer has to set is a prop the design system can no longer change on their behalf.

### For consuming applications

- React Aria naming carries through to Hopper. `isDisabled`, not `disabled`; `isOpen`, not `open`. The habit worth unlearning is reaching for the plain HTML attribute name, or for Orbiter's — Orbiter used `open` and `disabled`, and Hopper's per-component migration notes record the rename in that direction.
- Use `onPress`, not `onClick`, on anything pressable.
- Verify prop names against the types in `@hopper-ui/components` rather than guessing. The table tells you what shape to expect, not what exists.
- Do not wrap a Hopper component to "normalize" its API. The API is already the convention, and a local rename layer means the next person has to learn two vocabularies.
- Resist configuring props that already have correct defaults, especially inside a parent that sets them for you.

## Sources

- [Tech Vision for Hopper](https://workleap.atlassian.net/wiki/spaces/TL/pages/3631808725) (TL, 3631808725)
- `packages/components/src/utils/src/types.ts` — the shared `isX` prop interfaces
- `packages/components/src/*/docs/migration-notes*.md` — the Orbiter → Hopper prop renames

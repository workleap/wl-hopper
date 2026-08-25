# Component Architecture

[ADR 0003](../adr/0003-react-aria-is-the-primitive-foundation.md),
[ADR 0006](../adr/0006-components-support-controlled-and-uncontrolled-modes.md) and
[ADR 0007](../adr/0007-component-api-naming-conventions.md) own the reasoning behind this file.

## Hard Rules

| Rule                                                                                                                          | Violation                                             |
| ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| Start a new interactive component from React Aria Components or its hooks                                                     | A `div` with an `onClick` and a `role`                |
| Let React Aria own focus traps, roving tabindex, type-ahead and ARIA wiring                                                   | Hand-rolling any of them                              |
| Expose styling props, an appendable `className` and a `ref` on the root element                                               | Skipping `useStyledSystem` in a new component         |
| Name a prop bag after the child it lands on — `<child>Props`                                                                  | A bespoke `extraProps` for the inner input            |
| Reuse the shared placeholders for slot content                                                                                | A component-specific `CardHeader` instead of `Header` |
| Ship brand defaults so a consumer sets as few props as possible                                                               | A required `variant` prop                             |
| Set a child's appearance from the parent through `SlotProvider` and the child's context                                       | Leaving the consumer to style a composed child        |
| Expose `default*` alongside the controlled prop on a stateful component                                                       | A controlled-only prop pair on something new          |
| Route state through `useControlledState`, or the React Aria state hook that wraps it                                          | Hand-writing the controlled/uncontrolled branch       |
| Leave `stopPropagation` alone; with react-aria's `useKeyboard`, call `event.continuePropagation()` for keys you do not handle | Swallowing `Escape` without meaning to                |

`InputGroup` calls `preventDefault` deliberately, to forward focus to its inner input — the one
sanctioned exception. `ActionBar` is the only `useKeyboard` site, and the only controlled-only
component. Mixing modes on one prop is a silent bug: the controlled prop wins and `default*` is
ignored, with no React warning, because React never sees these props.

## Naming

| Kind                       | Convention                                 | Never                         |
| -------------------------- | ------------------------------------------ | ----------------------------- |
| Boolean                    | `isOpen`, `isDisabled`, `isFluid`          | `open`, `disabled`            |
| Event handler              | `onPress`, `onChange`, `onSelectionChange` | `onClick`                     |
| Uncontrolled initial value | `defaultOpen`, `defaultValue`              | `initialOpen`                 |
| Element swap               | `elementType`                              | `as`, `component`, `renderAs` |
| Outer element ref          | `ref`                                      | `rootRef`, `containerRef`     |

`as` exists on `Box` alone; named inner refs (`inputRef`, `inputStartRef`) are deliberate where there
are several focusable targets. `onPress` receives a React Aria `PressEvent`, not a native event.

Read prop names from `packages/components/src/<group>/src/<Component>.tsx` — TypeScript is
authoritative. The generated API JSON under `apps/docs/dist/ai-docs/` is a build artifact and is wrong
for `Select`, `MultiSelect` and `ComboBox`.

## Styling escalation

Style props first, then an `UNSAFE_*` prop, then a CSS module. `UNSAFE_*` is a whitelist of specific
props, not a universal prefix — see [ADR 0005](../adr/0005-styling-uses-style-props-and-native-css.md)
before reaching for it. `UNSAFE_className` and `UNSAFE_style` do not exist.

## Composition

The shared placeholders are `Header` (`header/`), `Content` and `Footer` (`layout/`), and `Text`
(`typography/text/`). `DisclosureHeader` and `CalendarHeader` are the sanctioned exceptions — a header
carrying its own interactive behavior. A wrapper is a normal composition unit (`CheckboxField`,
`PopoverTrigger`); what to avoid is a wrapper whose only purpose is renaming props.

`Callout` is the worked example for parent-driven appearance: it wraps children in a `SlotProvider`
setting `ButtonContext` and `LinkButtonContext` to `variant: "secondary"`. `Popover`, `Accordion`,
`Modal`, `ComboBox` and `Select` do the same. `Card` does **not** — it wires no context at all, so
treat it as a gap rather than a pattern to copy.

## Goals for new API surface

These hold for anything new. Existing components diverge; do not "fix" the named cases, as several are
locked in by public types and would be breaking changes.

| Goal                                                           | Where the codebase diverges                                                                |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Give a wrapper or nested element a prop bag and a `ref`        | 8 components render an internal wrapper exposing nothing, incl. `Popover`, `Radio`, `Tile` |
| Give every native and react-aria event a callback prop         | `MenuTrigger` wires an internal `onPressStart` a consumer cannot observe                   |
| Forward the original event arguments to the consumer's handler | `Alert`'s three `on*ButtonClick` props and `TextField.onClear` are typed `() => void`      |
| Take rendered content as children in a slot, not as a prop     | 18 shipped `ReactNode` props, incl. `prefix`, `footer`, `icon`                             |

## Mobile

Where the native mobile experience diverges sharply from the web one, add a sibling built on the
native element to `packages/styled-system/src/html-wrappers/html.ts`. A name colliding with a Hopper
component takes an `Html` prefix — so a native select would be `HtmlSelect`. None exists yet.

`packages/components/src/html-elements/` is documentation previews only; nothing there is exported.

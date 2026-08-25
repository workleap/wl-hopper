# Component Architecture

## Hard Rules

| Rule                                                                                                                          | Violation                                             |
| ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| Expose styling props, an appendable `className` and a `ref` on the root element                                               | Skipping `useStyledSystem` in a new component         |
| Name a prop bag after the child it lands on — `<child>Props`                                                                  | A bespoke `extraProps` for the inner input            |
| Reuse the shared placeholders for slot content                                                                                | A component-specific `CardHeader` instead of `Header` |
| Ship brand defaults so a consumer sets as few props as possible                                                               | A required `variant` prop                             |
| Set a child's appearance from the parent through `SlotProvider` and the child's context                                       | Leaving the consumer to style a composed child        |
| Leave `stopPropagation` alone; with react-aria's `useKeyboard`, call `event.continuePropagation()` for keys you do not handle | Swallowing `Escape` without meaning to                |

The shared placeholders are `Header` (`header/`), `Content` and `Footer` (`layout/`), and `Text`
(`typography/text/`), reused through their contexts in 27, 8, 8 and 3 files. `DisclosureHeader` and
`CalendarHeader` are the sanctioned exceptions — a header carrying its own interactive behavior.

`Callout` is the worked example for parent-driven appearance: it wraps children in a `SlotProvider`
that sets `ButtonContext` and `LinkButtonContext` to `variant: "secondary"`. `Popover`, `Accordion`,
`Modal`, `ComboBox` and `Select` do the same. `Card` does **not** — it wires no context at all, so
treat it as a gap rather than a pattern to copy.

## Goals for new API surface

These hold for anything new. Existing components diverge, so do not "fix" the named cases — several
are locked in by public types and would be breaking changes.

| Goal                                                           | Where the codebase diverges                                                                                           |
| -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Give a wrapper or nested element a prop bag and a `ref`        | 8 components render an internal wrapper exposing nothing, incl. `Popover`, `Radio`, `Checkbox`, `Tile`, `ListBoxItem` |
| Give every native and react-aria event a callback prop         | `MenuTrigger` wires an internal `onPressStart` a consumer cannot observe                                              |
| Forward the original event arguments to the consumer's handler | `Alert`'s three `on*ButtonClick` props and `TextField.onClear` are typed `() => void`                                 |
| Take rendered content as children in a slot, not as a prop     | 18 shipped `ReactNode` props, incl. `prefix`, `footer`, `icon`, `description`                                         |

## Mobile

Where the native mobile experience diverges sharply from the web one, add a sibling built on the
native element to `packages/styled-system/src/html-wrappers/html.ts`, rather than emulating native
behavior inside the richer component. A name that collides with a Hopper component takes an `Html`
prefix — `HtmlButton`, `HtmlHeader` — so a native select would be `HtmlSelect`. None exists yet.

`packages/components/src/html-elements/` is documentation previews only; nothing there is exported.

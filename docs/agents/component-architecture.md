# Component Architecture

## Hard Rules

| Rule                                                                                                                               | Violation                                                     |
| ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Expose styling props, an appendable `className` and a `ref` on the root, the wrapper, and any nested element a consumer must reach | A wrapper element with no prop bag and no `ref`               |
| Give every native and react-aria event a callback prop                                                                             | An internal `onKeyDown` a consumer cannot observe             |
| Forward the original event arguments to the consumer's handler                                                                     | `onPress={() => props.onPress?.()}` — drops the event         |
| Let events keep propagating                                                                                                        | `e.stopPropagation()` inside a component's own handler        |
| Accept rendered content as children in a slot                                                                                      | `<Button icon={<BellIcon />} label="Notify" />`               |
| Reuse the shared placeholder components for slot content                                                                           | A component-specific `CardHeader` instead of `Header`         |
| Ship brand defaults so a consumer sets as few props as possible                                                                    | Requiring `variant` on every `Button`                         |
| Let the parent decide a child's appearance inside a composition                                                                    | A `Card` whose consumer must set the inner `Button`'s variant |

## Overridability

Ref and prop access to inner elements goes through the established prop-bag pattern —
`wrapperProps`, `overlayProps`, `popoverProps` — rather than a new bespoke prop per component.

## Composition over configuration

Keep structure decoupled from contents so contents can be swapped without touching the component.

```tsx
<Button>
  <BellIcon />
  <Text>Notify</Text>
</Button>
```

The shared placeholders are `Header` (`header/`), `Content` and `Footer` (`layout/`), and `Text`
(`typography/text/`). Collection content reuses the owning component's `*Item` / `*Section` exports.

## Brand defaults

Hopper is a design system, not an opinionless library. Defaults encode brand decisions, so a brand
update becomes a change of defaults here rather than a change in every consumer's code.

## Mobile

Where the native mobile experience diverges sharply from the web one, add a sibling component built
on the native element next to the existing native wrappers in `packages/components/src/html-elements/`,
rather than emulating native mobile behavior inside the richer component.

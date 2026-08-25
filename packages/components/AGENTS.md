# AGENTS.md - components

## Hard Rules

| Rule                                                                                            | Violation                                               |
| ----------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| Export a `Global<Name>CssSelector` constant for every component                                 | A component consumers have no stable selector to target |
| Merge props and ref with the component's context through `useContextProps` first                | Reading `props` directly and skipping the context merge |
| Strip styling props with `useStyledSystem` before destructuring the component's own props       | Spreading style props onto the DOM element              |
| Spread the consumer's `style` after `stylingProps.style` so the consumer wins                   | `{ ...style, ...stylingProps.style }`                   |
| Add copy to `src/i18n/intl/en-US.json` and `fr-CA.json`, then read it with `useLocalizedString` | A hardcoded English string inside a component           |

## Construction order

```tsx
[props, ref] = useContextProps(props, ref, ButtonContext);
const { stylingProps, ...ownProps } = useStyledSystem(props);
const { children, style, className, slot, ...otherProps } = ownProps;

const classNames = clsx(className, GlobalButtonCssSelector, cssModule(styles, "hop-Button"), stylingProps.className);
const mergedStyles: CSSProperties = { ...stylingProps.style, ...style };
```

A component with a default slot passes it in: `useContextProps({ ...props, slot: props.slot || DefaultIconListSlot }, ref, IconListContext)`.

## Folder layout

Each component group is a kebab-case directory under `src/`.

| Path                       | Holds                                                                        |
| -------------------------- | ---------------------------------------------------------------------------- |
| `<group>/src/`             | `Component.tsx`, `Component.module.css`, `ComponentContext.ts` in PascalCase |
| `<group>/tests/vitest/`    | `*.test.tsx` and `*.ssr.test.tsx`                                            |
| `<group>/tests/chromatic/` | `*.stories.tsx`                                                              |
| `<group>/docs/`            | Per-component doc folders and `migration-notes*.md`                          |
| `<group>/index.ts`         | Barrel re-export                                                             |

## Accessibility checks

The axe runner is local-only. Run `pnpm storybook-nolazy` in one terminal and `pnpm test-storybook`
in another — the lazy-loading variant is incompatible with the runner.

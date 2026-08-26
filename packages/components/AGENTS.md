# AGENTS.md - components

## Hard Rules

| Rule                                                                                                                                        | Violation                                                              |
| ------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Merge props and ref with the component's context through `useContextProps` first                                                            | Reading `props` directly and skipping the context merge                |
| Strip styling props with `useStyledSystem` before destructuring the component's own props                                                   | Spreading style props onto the DOM element                             |
| Export a `Global<Name>CssSelector` for every component that renders its own DOM element                                                     | A new styled component with no stable selector to target               |
| Compose the class name from all four parts: the consumer's `className`, the global selector, the module class, and `stylingProps.className` | Dropping `stylingProps.className`, which silently disables style props |
| Register a default slot with the `slot()` HOC at export                                                                                     | Trying to pass a default slot into `useContextProps`                   |
| Add copy to `src/i18n/intl/en-US.json` and `fr-CA.json`, then read it with `useLocalizedString`                                             | A hardcoded English string inside a component                          |

Trigger and provider components (`*Trigger`, `ClearSlots`) and the layout wrappers over `Box`
(`Flex`, `Grid`, `Inline`, `Stack`) ship no selector of their own — 14 of 116 files, by design.

## Construction order

```tsx
import { slot as slotFn, useStyledSystem } from "@hopper-ui/styled-system";
import clsx from "clsx";
import { type CSSProperties, type ForwardedRef, forwardRef } from "react";
import { useContextProps } from "react-aria-components";

function IconList(props: IconListProps, ref: ForwardedRef<HTMLSpanElement>) {
  [props, ref] = useContextProps(props, ref, IconListContext);

  const { stylingProps, ...ownProps } = useStyledSystem(props);
  const { children, style, className, slot, size, ...otherProps } = ownProps;

  const classNames = clsx(className, GlobalIconListCssSelector, styles["hop-IconList"], stylingProps.className);
  const mergedStyles: CSSProperties = { ...stylingProps.style, ...style };
}

const _IconList = slotFn("icon", forwardRef(IconList));
```

Components built on a React Aria render-prop `className` use `composeClassnameRenderProps` instead of
`clsx` — 44 files do, including `Button`. Argument order varies between the two helpers and carries no
meaning; what matters is that all four parts appear.

`cssModule(styles, "hop-Name", ...modifiers)` resolves modifier classes. Some files pass the
`Global<Name>CssSelector` constant in place of the literal, and a few index `styles[...]` directly.

The spread order of `style` is **not** settled — 26 files put `stylingProps.style` first and 27 put it
last. Match the file you are editing rather than changing it.

## Folder layout

Component groups are kebab-case directories under `src/`. `typography/` and `overlays/` nest one level
deeper, as `<group>/<subgroup>/src/`.

| Path                       | Holds                                                                                                            |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `<group>/src/`             | PascalCase `Component.tsx`, `Component.module.css`, `ComponentContext.ts`, plus `index.ts` and camelCase helpers |
| `<group>/tests/vitest/`    | `*.test.tsx` and `*.ssr.test.tsx` — every group has this                                                         |
| `<group>/tests/chromatic/` | `*.stories.tsx` — 40 of 43 groups                                                                                |
| `<group>/docs/`            | Documentation, plus `migration-notes*.md` where the component replaces an Orbiter one                            |
| `<group>/index.ts`         | Barrel re-export                                                                                                 |

Some groups also carry `utils/`, `hooks/` or `assets/` siblings.

## Accessibility checks

The axe runner is local-only. Run `pnpm storybook-nolazy` in one terminal and `pnpm test-storybook`
in another — the lazy-loading variant is incompatible with the runner. See `contributing/components.md`.

Chromatic is not an accessibility signal — a green build says nothing about keyboard operability or
screen reader output, so never cite it as evidence. The axe pass also excludes contrast, and
`test-storybook` is not in CI, so nothing about accessibility gates a PR. The baseline is WCAG 2.2 AA
with the WAI-ARIA Authoring Practices as the behavior reference; see
[ADR 0009](../../docs/adr/0009-accessibility-baseline.md).

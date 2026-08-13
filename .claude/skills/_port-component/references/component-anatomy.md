# Component `.tsx` anatomy

Distilled from `packages/components/src/tag/src/Tag.tsx` and `packages/components/src/segmented-control/src/SegmentedControl.tsx` — read both end-to-end before writing a new component if anything below is unclear.

## Import grouping and ordering

Top to bottom, with a blank line between groups:

1. `@hopper-ui/*` (styled-system, icons)
2. `@react-aria/*`, `@react-stately/*`, `@react-types/*`, `react-aria`, `react-aria-components`
3. Third-party (`clsx`, etc.)
4. `react` itself
5. Other Hopper components, via relative `../../<component>/index.ts` (never deep-import into another component's `src/`)
6. Sibling files in the same component (`./XContext.ts`, `./X.utils.ts`)
7. `styles from "./X.module.css"` — always last

```tsx
import { IconContext } from "@hopper-ui/icons";
import { type StyledComponentProps, useStyledSystem } from "@hopper-ui/styled-system";
import { filterDOMProps, mergeProps } from "@react-aria/utils";
import clsx from "clsx";
import { forwardRef, type ForwardedRef } from "react";
import { composeRenderProps, useContextProps } from "react-aria-components";

import { AvatarContext } from "../../avatar/index.ts";
import { cssModule } from "../../utils/index.ts";

import { XContext } from "./XContext.ts";

import styles from "./X.module.css";
```

## Aliasing the RAC primitive when names diverge

Hopper's component name frequently differs from the RAC primitive it wraps (`Divider` wraps `Separator`, `Accordion` wraps `DisclosureGroup`, `SegmentedControl` wraps `ToggleButtonGroup`). The convention is to alias the primitive with a `RAC` prefix on import, so the file reads in Hopper's vocabulary while making the underlying primitive explicit:

```tsx
import { Separator as RACSeparator, type SeparatorProps as RACSeparatorProps, useContextProps } from "react-aria-components";

export interface DividerProps extends StyledComponentProps<RACSeparatorProps> {}
// ...
return <RACSeparator ref={ref} className={classNames} {...otherProps} />;
```

Alias **both** the component and its props type, always as `RAC<PrimitiveName>` — keep the primitive's own name in the alias (`RACSeparator`, not `RACDivider`), so a reader can trace it back to RAC's docs. Everything else in the file — the interface name, `GlobalXCssSelector`, CSS classes, the exported name — uses the Hopper name.

When the primitive's name happens to match Hopper's, the alias is still used for the wrapped element to keep the local name free for the exported component (`Tag as RACTag`, `Tooltip as RACTooltip`).

## `GlobalXCssSelector`

Every component exports a top-level unique selector constant, per `contributing/components.md`:

```tsx
export const GlobalTagCssSelector = "hop-Tag";
```

Used both as a stable global-CSS hook and as the first argument passed into the className composition helper.

## Props interface

```tsx
export interface XProps extends StyledComponentProps<RACXProps> {
    /**
     * <what this does>
     * @default "<value>"   // only when there's a default
     */
    someProp?: SomeType;
}
```

- Extend `StyledComponentProps<RACXProps>` when wrapping a RAC component (gets you the style-prop system layered onto the real RAC props).
- Extend `StyledComponentProps<BaseComponentDOMProps>` when the component renders its own DOM element with no RAC counterpart (see `SegmentedControlProps`).
- JSDoc every prop. Document the default with `@default` when one exists in the implementation — this is what feeds the generated props table (`react-docgen-typescript`), so the comment is the only source of truth a consumer sees.
- Size props are typically `ResponsiveProp<XSize>` from `@hopper-ui/styled-system`, not a bare union — this is what makes `size={{ base: "sm", md: "lg" }}` work.

## The function body chain

In this order, every time:

```tsx
function X(props: XProps, ref: ForwardedRef<HTMLDivElement>) {
    [props, ref] = useContextProps(props, ref, XContext);
    // useFormProps(props) here too, only if the component can live inside a Form
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        className,
        children: childrenProp,
        style: styleProp,
        size: sizeProp,
        variant = "neutral",   // defaults destructured here, not as a props default
        ...otherProps
    } = ownProps;

    const size = useResponsiveValue(sizeProp) ?? "md";
    // ...
}
```

1. **`useContextProps(props, ref, XContext)`** — always first. Merges slot-provided props/ref from an ancestor `<XContext.Provider>` or `SlotProvider`. Use the two-arg form `useContextProps(props, ref, XContext)` unless the component has a default slot name, in which case pass `{ ...props, slot: props.slot || DefaultXSlot }`.
2. **`useFormProps`** — only for form-field-like components; merges ambient `<Form>` styling props (see `Tag`'s `useFormProps(props as FormStyleProps)`).
3. **`useStyledSystem(props)`** — strips the style-system props (`marginTop`, `padding`, etc.) into `stylingProps`, leaving `ownProps` with the component's actual props plus DOM passthrough props.
4. **Destructure `ownProps`** to pull out what the component needs; leave the rest in `...otherProps` for DOM passthrough.
5. **`useResponsiveValue(sizeProp) ?? "<default>"`** resolves a `ResponsiveProp<T>` down to the size for the current breakpoint.

## className composition

```tsx
const classNames = composeClassnameRenderProps(
    className,
    GlobalXCssSelector,
    cssModule(styles, "hop-X", size, variant),
    stylingProps.className
);
```

- `composeClassnameRenderProps` (from `../../utils/index.ts`) when the component's `children`/`className` can be a RAC render-prop function; plain `clsx(...)` when they can't (see `contributing/components.md`'s example, which predates the render-props helper but shows the same ordering).
- **Order matters**: user-supplied `className` first, then the global selector, then the composed modifier classes, then `stylingProps.className` last so style-system utility classes always win.
- `cssModule(styles, "hop-X", size, variant, isSomething && "modifier-name")` — falsy values are dropped, so conditional modifiers are just `condition && "name"`.

## style composition

```tsx
const style = composeRenderProps(styleProp, prev => ({
    ...stylingProps.style,
    ...prev
}));
```

`stylingProps.style` (computed from style-system props) goes first, the caller's own inline `style` (render-prop result `prev`) wins — so an explicit `style={{ marginBottom: "13px" }}` prop always overrides a style-system-derived value.

## Composing handlers the component also needs internally

When the component listens for its own DOM event (e.g. `Escape` via `useKeyboard`) *and* spreads `...otherProps` (which may carry a consumer-supplied handler for that same event), compose both instead of letting one clobber the other — and destructure the consumer's handler out by name first so it isn't silently dropped into `otherProps`:

```tsx
const {
    onKeyDown,
    ...otherProps
} = ownProps;

const { keyboardProps } = useKeyboard({
    onKeyDown: event => {
        if (event.key === "Escape") {
            onClearSelection?.();
        } else {
            event.continuePropagation();
        }
    }
});

const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    keyboardProps.onKeyDown?.(event);
};

return <div {...otherProps} onKeyDown={handleKeyDown} />;
```

Whichever handler prop is spread or assigned **last wins** — this applies to `style`/`className` too (see above), not just event handlers. Before shipping, check every prop the component destructures out of `ownProps` for a matching one spread back in via `...otherProps`/`...stylingProps`, and verify the later one in JSX source order is the one you actually intend to win.

## Context file

One per component (and per sub-component), in its own file:

```tsx
// XContext.ts
import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { XProps } from "./X.tsx";

export const XContext = createContext<ContextValue<XProps, HTMLDivElement>>({});

XContext.displayName = "XContext";
```

## Slot styling — never inline style properties in context objects

Per repo `CLAUDE.md`: when a component passes styling down to a child via `SlotProvider`, only pass `className` (pointing at a CSS module class), never `fontWeight`, `color`, or other visual properties directly:

```tsx
// ✅ correct
[TextContext, { className: styles["hop-Tag__text"], size: TagToTextSizeAdapter[size] }]

// ❌ wrong — visual property set in a context object
[HeadingContext, { fontWeight: "heading-xs-medium" }]
```

Define the font weight (or any other visual property) in the CSS module and reference it through `className` instead.

Reuse existing utilities from `packages/components/src/utils/index.ts` rather than reimplementing them: `cssModule`, `composeClassnameRenderProps`, `SlotProvider`, `ClearContainerSlots`, `ensureTextWrapper`, `useRenderProps`, `SizeAdapter`. A `SizeAdapter<XSize, YSize>` is the established pattern for mapping one component's size scale onto a nested component's scale (e.g. `TagToAvatarSizeAdapter`).

## Export tail and display name

```tsx
/**
 * <One-sentence description of what the component is/does.>
 *
 * [View Documentation](https://hopper.workleap.design/components/X)
 */
const _X = forwardRef<HTMLDivElement, XProps>(X);
_X.displayName = "X";

export { _X as X };
```

- Internal name is prefixed with `_` (`_X`), re-exported under the real name (`X`) — this is what lets `react-docgen-typescript`'s `componentNameResolver` in `apps/docs/scripts/generateComponentData.ts` strip the underscore for the public docs.
- Wrap in `slot("<slot-name>", forwardRef(...))` from `@hopper-ui/styled-system` instead of bare `forwardRef` when the component is meant to be used as a named slot inside another component (see `Tag`'s `slotFn("tag", ...)`).
- The JSDoc block above the export is what shows up as the component description in generated docs — write it as the one-sentence summary you'd want on the docs page, and always include the `[View Documentation](https://hopper.workleap.design/components/<PascalName>)` link.

## The export gotcha (`contributing/components.md`)

**Never export more than one component in a single export statement.** `react-docgen-typescript` misattributes props when it sees `export { _A as A, B as C }` in one statement — props from `B` can get attached to `A` in the generated docs table.

```tsx
// ❌ incorrect — props get cross-wired in docs
export { _ComboBox as ComboBox, ListBoxItem as ComboBoxItem };

// ✅ correct — separate statements
export const ComboBoxItem = ListBoxItem;
export const ComboBoxSection = ListBoxSection;
export { _ComboBox as ComboBox };
```

## i18n

If the component needs any user-facing string that isn't caller-supplied (an `aria-label`, a console warning, etc.):

```tsx
const stringFormatter = useLocalizedString();
stringFormatter.format("X.someKey");
stringFormatter.format("X.someKey", { value });
```

Add the key to **both** `packages/components/src/i18n/intl/en-US.json` and `packages/components/src/i18n/intl/fr-CA.json` — all strings currently live in these two flat files (not split per component), so add your key alongside the existing ones rather than creating a new file.

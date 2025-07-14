---
title: Button
description: A button allows a user to initiate an action.
category: "buttons"
links:
    source: https://github.com/workleap/wl-hopper/blob/main/packages/components/src/buttons/src/Button.tsx
    aria: https://www.w3.org/WAI/ARIA/apg/patterns/button/
---

\*\*Example:\*\* buttons/docs/button/preview

```tsx
import { Button } from "@hopper-ui/components";

export default function Example() {
    return (
        <Button>Save</Button>
    );
}

```

## Anatomy

### Composed Components

A `Button` uses the following components:

| Component | Title | Description |
|-----------|-------|-------------|
| Icon | Icon | An icon component is used to render a custom icon. |
| IconList | IconList | An IconList encapsulates a collection of icons. |
| Text | Text | A text component is a primitive component matching Hopper's typography type scale. |

## Usage

### Variants

A button can use different variants.

\*\*Example:\*\* buttons/docs/button/variant

```tsx
import { Button, Inline } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline>
            <Button variant="primary">Save</Button>
            <Button variant="secondary">Save</Button>
            <Button variant="upsell">Save</Button>
            <Button variant="danger">Save</Button>
            <Button variant="ghost-primary">Save</Button>
            <Button variant="ghost-secondary">Save</Button>
            <Button variant="ghost-danger">Save</Button>
        </Inline>
    );
}

```

**Primary** - For the principal call to action on the page. Primary buttons should only appear once per screen — not including the application header, modal or side panel.

**Secondary** - For secondary actions on each page. Secondary buttons can be used in conjunction with a primary button or on its own. Paired with a Primary button, the secondary button usually performs the negative action of the set, such as “Cancel.”

**Upsell** - For upsell actions that relate to upgrading an account or a plan. Use the upsell button to distinguish it from an existing primary button. In some cases, a primary button can be used instead when the general context of the page is about upselling.

**Danger** - For actions that could have destructive effects on the user’s data.

**Ghost-\[primary|secondary|danger]** - For less prominent, and sometimes independent, actions. Ghost buttons can be used in isolation or paired with a primary button when there are multiple calls to action. Ghost buttons can also be used for subtasks on a
page where a primary button for the main and final action is present.

### Sizes

A button can vary in size.

\*\*Example:\*\* buttons/docs/button/size

```tsx
import { Button, Inline } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline>
            <Button variant="primary">Save</Button>
            <Button size="sm" variant="primary">Save</Button>
            <Button size="xs" variant="primary">Save</Button>
        </Inline>
    );
}

```

### Disabled

A button can be disabled.

\*\*Example:\*\* buttons/docs/button/state

```tsx
import { Button, Inline } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline>
            <Button isDisabled variant="primary">Save</Button>
            <Button isDisabled variant="ghost-primary">Save</Button>
        </Inline>
    );
}

```

### Loading

A button can show a loading indicator. The button text is hidden but the button maintains the width that it would have if the text were visible.

\*\*Example:\*\* buttons/docs/button/loading

```tsx
import { Button, Inline } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline>
            <Button isLoading variant="primary">Save</Button>
            <Button isLoading variant="secondary">Save</Button>
            <Button isLoading variant="upsell">Save</Button>
            <Button isLoading variant="danger">Save</Button>
            <Button isLoading variant="ghost-primary">Save</Button>
            <Button isLoading variant="ghost-secondary">Save</Button>
            <Button isLoading variant="ghost-danger">Save</Button>
        </Inline>
    );
}

```

### Pending

Buttons can indicate that a quick progress task is taking place (e.g., saving settings on a server). After a 1 second delay, an indeterminate spinner will be displayed in place of the button label and icon.

\*\*Example:\*\* buttons/docs/button/pending

```tsx
import { Button } from "@hopper-ui/components";
import { useCallback, useState } from "react";

export default function Example() {
    const [isLoading, setIsLoading] = useState(false);

    const handlePress = useCallback(() => {
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, [setIsLoading]);

    return (
        <Button isLoading={isLoading} onPress={handlePress}>
            Click me!
        </Button>
    );
}

```

### Fluid

A button can be expanded to full width to fill its parent container.

\*\*Example:\*\* buttons/docs/button/layout

```tsx
import { Button, Inline, Text } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <Inline>
            <Button isFluid variant="primary">
                Save
            </Button>
            <Button isFluid variant="primary">
                <SparklesIcon />
                <Text>Save</Text>
            </Button>
            <Button isFluid>
                <Text>Save</Text>
                <SparklesIcon slot="end-icon" />
            </Button>
        </Inline>
    );
}

```

### Icon Only

A button can contain only an icon. An accessible name must be provided through [aria-label](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label) prop. See also [WCAG practices](https://www.w3.org/TR/WCAG20-TECHS/ARIA6.html).

\*\*Example:\*\* buttons/docs/button/icon

```tsx
import { Button, Inline } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <Inline>
            <Button aria-label="Clean" variant="secondary">
                <SparklesIcon />
            </Button>
            <Button size="sm" aria-label="Clean" variant="secondary">
                <SparklesIcon />
            </Button>
            <Button size="xs" aria-label="Clean" variant="secondary">
                <SparklesIcon />
            </Button>
        </Inline>
    );
}

```

### Icon

A button can contain icons.

\*\*Example:\*\* buttons/docs/button/icons

```tsx
import { Button, Inline, Text } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <Inline>
            <Button aria-label="Save" variant="secondary">
                <SparklesIcon />
                <Text>Save</Text>
            </Button>
            <Button size="sm" aria-label="Save" variant="secondary">
                <SparklesIcon />
                <Text>Save</Text>
            </Button>
            <Button size="xs" aria-label="Save" variant="secondary">
                <SparklesIcon />
                <Text>Save</Text>
            </Button>
        </Inline>
    );
}

```

### End Icon

Nonstandard end icons can be provided to handle special cases. However, think twice before adding end icons, start icons should be your go-to.

\*\*Example:\*\* buttons/docs/button/endIcon

```tsx
import { Button, Inline, Text } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <Inline>
            <Button aria-label="Save" variant="secondary">
                <SparklesIcon slot="end-icon" />
                <Text>Save</Text>
            </Button>
            <Button size="sm" aria-label="Save" variant="secondary">
                <SparklesIcon slot="end-icon" />
                <Text>Save</Text>
            </Button>
            <Button size="xs" aria-label="Save" variant="secondary">
                <SparklesIcon slot="end-icon" />
                <Text>Save</Text>
            </Button>
        </Inline>
    );
}

```

## Props

**Props for Button:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant? | ButtonVariant | "primary" | The visual style of the button. |
| size? | ResponsiveProp<ButtonSize> | "md" | A button can vary in size. |
| isFluid? | ResponsiveProp<boolean> | - | Whether or not the button takes up the width of its container. |
| isLoading? | boolean | - | A button can show a loading indicator. |
| spinnerProps? | SpinnerProps | - | The props for the Spinner. |
| form? | string | - | The `<form>` element to associate the button with. The value of this attribute must be the id of a `<form>` in the same document. |
| style? | CSSProperties \| ((values: ButtonRenderProps & { defaultStyle: CSSProperties; }) => CSSProperties) | - | The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state. |
| children? | ReactNode \| ((values: ButtonRenderProps & { defaultChildren: ReactNode; }) => ReactNode) | - | The children of the component. A function may be provided to alter the children based on component state. |
| isDisabled? | boolean | - | Whether the button is disabled. |
| autoFocus? | boolean | - | Whether the element should receive focus on render. |
| type? | "button" \| "submit" \| "reset" | 'button' | The behavior of the button when used in an HTML form. |
| formAction? | string | - | The URL that processes the information submitted by the button. Overrides the action attribute of the button's form owner. |
| formEncType? | string | - | Indicates how to encode the form data that is submitted. |
| formMethod? | string | - | Indicates the HTTP method used to submit the form. |
| formNoValidate? | boolean | - | Indicates that the form is not to be validated when it is submitted. |
| formTarget? | string | - | Overrides the target attribute of the button's form owner. |
| name? | string | - | Submitted as a pair with the button's value as part of the form data. |
| value? | string | - | The value associated with the button's name when it's submitted with the form data. |
| className? | string \| ((values: ButtonRenderProps & { defaultClassName: string; }) => string) | - | The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state. |

### Events

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| onPress? | ((e: PressEvent) => void) | - | Handler that is called when the press is released over the target. |
| onPressStart? | ((e: PressEvent) => void) | - | Handler that is called when a press interaction starts. |
| onPressEnd? | ((e: PressEvent) => void) | - | Handler that is called when a press interaction ends, either over the target or when the pointer leaves the target. |
| onPressChange? | ((isPressed: boolean) => void) | - | Handler that is called when the press state changes. |
| onPressUp? | ((e: PressEvent) => void) | - | Handler that is called when a press is released over the target, regardless of whether it started on the target or not. |
| onClick? | ((e: MouseEvent<FocusableElement, MouseEvent>) => void) | - | **Not recommended – use `onPress` instead.** `onClick` is an alias for `onPress` provided for compatibility with other libraries. `onPress` provides  additional event details for non-mouse interactions. |
| onFocus? | ((e: FocusEvent<Element, Element>) => void) | - | Handler that is called when the element receives focus. |
| onBlur? | ((e: FocusEvent<Element, Element>) => void) | - | Handler that is called when the element loses focus. |
| onFocusChange? | ((isFocused: boolean) => void) | - | Handler that is called when the element's focus status changes. |
| onKeyDown? | ((e: KeyboardEvent) => void) | - | Handler that is called when a key is pressed. |
| onKeyUp? | ((e: KeyboardEvent) => void) | - | Handler that is called when a key is released. |
| onHoverStart? | ((e: HoverEvent) => void) | - | Handler that is called when a hover interaction starts. |
| onHoverEnd? | ((e: HoverEvent) => void) | - | Handler that is called when a hover interaction ends. |
| onHoverChange? | ((isHovering: boolean) => void) | - | Handler that is called when the hover state changes. |

### Layout

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| slot? | string \| null | - | A slot name for the component. Slots allow the component to receive props from a parent component. An explicit `null` value indicates that the local props completely override all props received from a parent. |

### Accessibility

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| aria-expanded? | boolean \| "true" \| "false" | - | Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed. |
| aria-haspopup? | boolean \| "dialog" \| "menu" \| "grid" \| "true" \| "false" \| "listbox" \| "tree" | - | Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element. |
| aria-controls? | string | - | Identifies the element (or elements) whose contents or presence are controlled by the current element. |
| aria-pressed? | boolean \| "true" \| "false" \| "mixed" | - | Indicates the current "pressed" state of toggle buttons. |
| aria-current? | boolean \| "time" \| "true" \| "false" \| "page" \| "step" \| "location" \| "date" | - | Indicates whether this element represents the current item within a container or set of related elements. |
| preventFocusOnPress? | boolean | - | Whether to prevent focus from moving to the button when pressing it.  Caution, this can make the button inaccessible and should only be used when alternative keyboard interaction is provided, such as ComboBox's MenuTrigger or a NumberField's increment/decrement control. |
| excludeFromTabOrder? | boolean | - | Whether to exclude the element from the sequential tab order. If true, the element will not be focusable via the keyboard by tabbing. This should be avoided except in rare scenarios where an alternative means of accessing the element or its functionality via the keyboard is available. |
| id? | string | - | The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). |
| aria-label? | string | - | Defines a string value that labels the current element. |
| aria-labelledby? | string | - | Identifies the element (or elements) that labels the current element. |
| aria-describedby? | string | - | Identifies the element (or elements) that describes the object. |
| aria-details? | string | - | Identifies the element (or elements) that provide a detailed, extended description for the object. |

## Migration Notes

\*\*Migration Guide:\*\* buttons/docs/migration-notes

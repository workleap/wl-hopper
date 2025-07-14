---
title: Badge
description: A badge is used to bring attention to an element.
category: "status"
links:
    source: https://github.com/workleap/wl-hopper/blob/main/packages/components/src/badge/src/Badge.tsx
---

\*\*Example:\*\* badge/docs/badge/preview

```tsx
import { Badge } from "@hopper-ui/components";

export default function Example() {
    return (
        <Badge>12</Badge>
    );
}

```





## Usage

### Disabled

A disabled badge is usually used inside other components that may be disabled, like a tag or a list box.

\*\*Example:\*\* badge/docs/badge/disabled

```tsx
import { Badge } from "@hopper-ui/components";

export default function Example() {
    return (
        <Badge isDisabled>12</Badge>
    );
}

```

### Indeterminate

An indeterminate badge is used when the value is unknown or not applicable.

\*\*Example:\*\* badge/docs/badge/indeterminate

```tsx
import { Badge } from "@hopper-ui/components";

export default function Example() {
    return (
        <Badge />
    );
}

```

### Variants

The different variants of a badge.

\*\*Example:\*\* badge/docs/badge/variants

```tsx
import { Badge, Inline } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline>
            <Badge variant="primary">BETA</Badge>
            <Badge variant="secondary">NEW</Badge>
            <Badge variant="subdued">50</Badge>
        </Inline>
    );
}

```

### High Count

If a value above 99 is needed, use `99+` instead of the number.

\*\*Example:\*\* badge/docs/badge/highCount

```tsx
import { Badge } from "@hopper-ui/components";

export default function Example() {
    return (
        <Badge>99+</Badge>
    );
}

```

### Text

A badge can have any text content.

\*\*Example:\*\* badge/docs/badge/text

```tsx
import { Badge } from "@hopper-ui/components";

export default function Example() {
    return (
        <Badge>New</Badge>
    );
}

```



## Props

**Props for Badge:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant? | BadgeVariant | "primary" | The visual style of the badge. |
| isDisabled? | boolean | - | Whether or not the badge is disabled. |
| isIndeterminate? | boolean | - | Whether or not the badge is indeterminate and should just be a dot. This will ignore any children. |
| children? | ReactNode \| ((values: BadgeRenderProps & { defaultChildren: ReactNode; }) => ReactNode) | - | The children of the component. A function may be provided to alter the children based on component state. |
| className? | string \| ((values: BadgeRenderProps & { defaultClassName: string; }) => string) | - | The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state. |
| style? | CSSProperties \| ((values: BadgeRenderProps & { defaultStyle: CSSProperties; }) => CSSProperties) | - | The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state. |

### Layout

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| slot? | string \| null | - | A slot name for the component. Slots allow the component to receive props from a parent component. An explicit `null` value indicates that the local props completely override all props received from a parent. |

### Accessibility

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| aria-label? | string | - | Defines a string value that labels the current element. |
| aria-labelledby? | string | - | Identifies the element (or elements) that labels the current element. |
| aria-describedby? | string | - | Identifies the element (or elements) that describes the object. |
| aria-details? | string | - | Identifies the element (or elements) that provide a detailed, extended description for the object. |



## Migration Notes

\*\*Migration Guide:\*\* badge/docs/migration-notes

---
title: Flex
description: A flex component is used to create a flex container.
category: "layout"
links:
    source: https://github.com/workleap/wl-hopper/blob/main/packages/components/src/layout/src/Flex.tsx
---

\*\*Example:\*\* layout/docs/flex/preview

```tsx
import { Flex, Div, type DivProps } from "@hopper-ui/components";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" height="core_640" width="core_640" {...props} />;
}

export default function Example() {
    return (
        <Div width="100%">
            <Flex>
                <Square backgroundColor="decorative-option1" />
                <Square backgroundColor="decorative-option3" />
                <Square backgroundColor="decorative-option4" />
            </Flex>
        </Div>
    );
}

```

## Usage

### Vertical Alignment

A flex layout can have vertically aligned items.

\*\*Example:\*\* layout/docs/flex/verticalAlignment

```tsx
import { Flex, Div, type DivProps } from "@hopper-ui/components";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" height="core_640" width="core_640" {...props} />;
}

export default function Example() {
    return (
        <Div width="100%">
            <Flex direction="column">
                <Square backgroundColor="decorative-option1" />
                <Square backgroundColor="decorative-option3" />
                <Square backgroundColor="decorative-option4" />
            </Flex>
        </Div>
    );
}

```

### Gap

A flex layout can have a gap between his items. `columnGap` and `rowGap` are also available to specify a gap for a single axis.

\*\*Example:\*\* layout/docs/flex/gap

```tsx
import { Flex, Div, type DivProps } from "@hopper-ui/components";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" height="core_640" width="core_640" {...props} />;
}

export default function Example() {
    return (
        <Div width="100%">
            <Flex gap="stack-sm">
                <Square backgroundColor="decorative-option1" />
                <Square backgroundColor="decorative-option3" />
                <Square backgroundColor="decorative-option4" />
            </Flex>
        </Div>
    );
}

```

### Align Items

A flex layout can align its items along the cross-axis. When the direction is "column", this refers to horizontal alignment, and when the direction is "row", it refers to vertical alignment.

\*\*Example:\*\* layout/docs/flex/alignItems

```tsx
import { Flex, Div, type DivProps } from "@hopper-ui/components";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" height="core_640" width="core_640" {...props} />;
}

export default function Example() {
    return (
        <Div width="100%">
            <Flex direction="column" alignItems="center">
                <Square backgroundColor="decorative-option1" />
                <Square backgroundColor="decorative-option3" />
                <Square backgroundColor="decorative-option4" />
            </Flex>
        </Div>
    );
}

```

### Justify Content

A flex layout can justify its items along the main axis. When the direction is "column", this refers to vertical alignment, and when the direction is "row", it refers to horizontal alignment.

\*\*Example:\*\* layout/docs/flex/justifyContent

```tsx
import { Flex, Div, type DivProps } from "@hopper-ui/components";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" height="core_640" width="core_640" {...props} />;
}

export default function Example() {
    return (
        <Div width="100%">
            <Flex justifyContent="space-between">
                <Square backgroundColor="decorative-option1" />
                <Square backgroundColor="decorative-option3" />
                <Square backgroundColor="decorative-option4" />
            </Flex>
        </Div>
    );
}

```

### Reverse

A flex layout can show its items in reverse order.

\*\*Example:\*\* layout/docs/flex/reverse

```tsx
import { Flex, Div, type DivProps } from "@hopper-ui/components";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" height="core_640" width="core_640" {...props} />;
}

export default function Example() {
    return (
        <Div width="100%">
            <Flex direction="row-reverse">
                <Square backgroundColor="decorative-option1" />
                <Square backgroundColor="decorative-option3" />
                <Square backgroundColor="decorative-option4" />
            </Flex>
        </Div>
    );
}

```

### Wrap

Flex layout items can wrap multiple rows.

\*\*Example:\*\* layout/docs/flex/wrap

```tsx
import { Flex, Div, type DivProps } from "@hopper-ui/components";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" height="core_640" width="core_640" {...props} />;
}

export default function Example() {
    return (
        <Div width="100%" paddingY="core_400">
            <Flex wrap>
                <Square backgroundColor="decorative-option1-weak" />
                <Square backgroundColor="decorative-option2-weak" />
                <Square backgroundColor="decorative-option3-weak" />
                <Square backgroundColor="decorative-option4-weak" />
                <Square backgroundColor="decorative-option5-weak" />
                <Square backgroundColor="decorative-option6-weak" />
                <Square backgroundColor="decorative-option7-weak" />
                <Square backgroundColor="decorative-option8-weak" />
                <Square backgroundColor="decorative-option9-weak" />
                <Square backgroundColor="decorative-option1" />
                <Square backgroundColor="decorative-option2" />
                <Square backgroundColor="decorative-option3" />
                <Square backgroundColor="decorative-option4" />
                <Square backgroundColor="decorative-option5" />
                <Square backgroundColor="decorative-option6" />
                <Square backgroundColor="decorative-option7" />
                <Square backgroundColor="decorative-option8" />
                <Square backgroundColor="decorative-option9" />
                <Square backgroundColor="decorative-option1-strong" />
                <Square backgroundColor="decorative-option2-strong" />
                <Square backgroundColor="decorative-option3-strong" />
                <Square backgroundColor="decorative-option4-strong" />
                <Square backgroundColor="decorative-option5-strong" />
                <Square backgroundColor="decorative-option6-strong" />
                <Square backgroundColor="decorative-option7-strong" />
                <Square backgroundColor="decorative-option8-strong" />
                <Square backgroundColor="decorative-option9-strong" />
            </Flex>
        </Div>
    );
}

```

### Nesting

Flex layouts can be nested.

\*\*Example:\*\* layout/docs/flex/nesting

```tsx
import { Flex, Div, type DivProps } from "@hopper-ui/components";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" height="core_640" width="core_640" {...props} />;
}

export default function Example() {
    return (
        <Div width="100%">
            <Flex gap="stack-md">
                <Flex>
                    <Square backgroundColor="decorative-option1-weak" />
                    <Square backgroundColor="decorative-option3-weak" />
                </Flex>
                <Flex direction="column">
                    <Square backgroundColor="decorative-option1" />
                    <Square backgroundColor="decorative-option3" />
                </Flex>
                <Flex>
                    <Square backgroundColor="decorative-option1-strong" />
                    <Square backgroundColor="decorative-option3-strong" />
                </Flex>
            </Flex>
        </Div>
    );
}

```

## Props

**Props for Flex:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| direction? | ResponsiveProp<FlexDirection> | - | The flex direction of the container. Can be row, column, row-reverse or column-reverse. |
| wrap? | ResponsiveProp<FlexWrap> \| ResponsiveProp<boolean> | - | Whether to wrap the flex items. The value can also be a boolean. |
| basis? | ResponsiveProp<FlexBasis<0 \| (string & {})>> | - | An alias for the css flex-basis property. |
| grow? | ResponsiveProp<FlexGrow> | - | An alias for the css flex-grow property. |
| shrink? | ResponsiveProp<FlexShrink> | - | An alias for the css flex-shrink property. |
| inline? | boolean | - | Whether to display the flex container as an inline element. |
| style? | CSSProperties | - |  |
| className? | string | - |  |

### Accessibility

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| id? | string | - |  |

## Migration Notes

\*\*Migration Guide:\*\* layout/docs/flex/migration-notes

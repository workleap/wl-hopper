---
title: Stack
description: A stack component is a layout primitive used to arrange elements vertically.
category: "layout"
links:
    source: https://github.com/workleap/wl-hopper/blob/main/packages/components/src/layout/src/Stack.tsx
---

\*\*Example:\*\* layout/docs/stack/preview

```tsx
import { Stack, Div, type DivProps } from "@hopper-ui/components";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" height="core_640" width="core_640" {...props} />;
}

export default function Example() {
    return (
        <Div width="100%">
            <Stack>
                <Square backgroundColor="decorative-option1" />
                <Square width="core_800" backgroundColor="decorative-option3" />
                <Square backgroundColor="decorative-option4" />
            </Stack>
        </Div>
    );
}

```

## Usage

### Reverse

The order and direction of stack items can be reversed.

\*\*Example:\*\* layout/docs/stack/reverse

```tsx
import { Stack, Div, type DivProps } from "@hopper-ui/components";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" height="core_640" width="core_640" {...props} />;
}

export default function Example() {
    return (
        <Div width="100%" paddingY="core_320">
            <Stack reverse UNSAFE_height="20rem">
                <Square backgroundColor="decorative-option1" />
                <Square width="core_800" backgroundColor="decorative-option3" />
                <Square backgroundColor="decorative-option4" />
            </Stack>
        </Div>
    );
}

```

### Align X

Stack items can be aligned on the horizontal axis.

\*\*Example:\*\* layout/docs/stack/alignX

```tsx
import { Stack, Div, type DivProps } from "@hopper-ui/components";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" height="core_640" width="core_640" {...props} />;
}

export default function Example() {
    return (
        <Div width="100%">
            <Stack alignX="center">
                <Square backgroundColor="decorative-option1" />
                <Square width="core_800" backgroundColor="decorative-option3" />
                <Square backgroundColor="decorative-option4" />
            </Stack>
        </Div>
    );
}

```

### Align Y

Stack items can be aligned on the vertical axis.

\*\*Example:\*\* layout/docs/stack/alignY

```tsx
import { Stack, Div, type DivProps } from "@hopper-ui/components";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" height="core_640" width="core_640" {...props} />;
}

export default function Example() {
    return (
        <Div width="100%">
            <Stack alignY="flex-end" UNSAFE_height="20rem">
                <Square backgroundColor="decorative-option1" />
                <Square width="core_800" backgroundColor="decorative-option3" />
                <Square backgroundColor="decorative-option4" />
            </Stack>
        </Div>
    );
}

```

## Props

**Props for Stack:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| reverse? | boolean | - | Whether or not to reverse the order of the elements. |
| alignX? | ResponsiveProp<AlignItems> | - | An alias for the css align-items property. |
| alignY? | ResponsiveProp<JustifyContent> | - | An alias for the css justify-content property. |
| style? | CSSProperties | - |  |
| className? | string | - |  |
| wrap? | ResponsiveProp<FlexWrap> \| ResponsiveProp<boolean> | - | Whether to wrap the flex items. The value can also be a boolean. |
| basis? | ResponsiveProp<FlexBasis<0 \| (string & {})>> | - | An alias for the css flex-basis property. |
| grow? | ResponsiveProp<FlexGrow> | - | An alias for the css flex-grow property. |
| shrink? | ResponsiveProp<FlexShrink> | - | An alias for the css flex-shrink property. |
| inline? | boolean | - | Whether to display the flex container as an inline element. |

### Accessibility

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| id? | string | - |  |

## Migration Notes

\*\*Migration Guide:\*\* layout/docs/stack/migration-notes

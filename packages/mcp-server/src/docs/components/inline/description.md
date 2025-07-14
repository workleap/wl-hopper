---
title: Inline
description: An inline component is a layout primitive used to arrange elements horizontally.
category: "layout"
links:
    source: https://github.com/workleap/wl-hopper/blob/main/packages/components/src/layout/src/Inline.tsx
---

\*\*Example:\*\* layout/docs/inline/preview

```tsx
import { Inline, Div, type DivProps } from "@hopper-ui/components";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" height="core_640" width="core_640" {...props} />;
}

export default function Example() {
    return (
        <Div width="100%" paddingY="core_320">
            <Inline>
                <Square backgroundColor="decorative-option1" />
                <Square height="core_800" backgroundColor="decorative-option3" />
                <Square backgroundColor="decorative-option4" />
            </Inline>
        </Div>
    );
}

```

## Usage

### Reverse

The order and direction of inline items can be reversed.

\*\*Example:\*\* layout/docs/inline/reverse

```tsx
import { Inline, Div, type DivProps } from "@hopper-ui/components";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" height="core_640" width="core_640" {...props} />;
}

export default function Example() {
    return (
        <Div width="100%" paddingY="core_320">
            <Inline reverse>
                <Square backgroundColor="decorative-option1" />
                <Square height="core_800" backgroundColor="decorative-option3" />
                <Square backgroundColor="decorative-option4" />
            </Inline>
        </Div>
    );
}

```

### Align X

Inline items can be aligned on the horizontal axis.

\*\*Example:\*\* layout/docs/inline/alignX

```tsx
import { Inline, Div, type DivProps } from "@hopper-ui/components";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" height="core_640" width="core_640" {...props} />;
}

export default function Example() {
    return (
        <Div width="100%" paddingY="core_320">
            <Inline alignX="center">
                <Square backgroundColor="decorative-option1" />
                <Square height="core_800" backgroundColor="decorative-option3" />
                <Square backgroundColor="decorative-option4" />
            </Inline>
        </Div>
    );
}

```

### Align Y

Inline items can be aligned on the vertical axis.

\*\*Example:\*\* layout/docs/inline/alignY

```tsx
import { Inline, Div, type DivProps } from "@hopper-ui/components";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" height="core_640" width="core_640" {...props} />;
}

export default function Example() {
    return (
        <Div width="100%">
            <Inline alignY="flex-end" UNSAFE_height="10rem">
                <Square backgroundColor="decorative-option1" />
                <Square height="core_800" backgroundColor="decorative-option3" />
                <Square backgroundColor="decorative-option4" />
            </Inline>
        </Div>
    );
}

```

## Props

**Props for Inline:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| reverse? | boolean | - | Whether or not to reverse the order of the elements. |
| alignX? | ResponsiveProp<JustifyContent> | - | An alias for the css justify-content property. |
| alignY? | ResponsiveProp<AlignItems> | - | An alias for the css align-items property. |
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

\*\*Migration Guide:\*\* layout/docs/inline/migration-notes

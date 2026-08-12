# useSeparator

Provides the accessibility implementation for a separator.
A separator is a visual divider between two groups of content,
e.g. groups of menu items or sections of a page.

```tsx
import {Separator} from 'hooks-starter/Separator';

<div style={{color: 'var(--text-color)'}}>
  <div style={{display: 'flex', flexDirection: 'column', textAlign: 'center', gap: 8}}>
    Content above
    <Separator />
    Content below
  </div>
  <div style={{display: 'flex', flexDirection: 'row', marginTop: 16, height: 40, alignItems: 'center', gap: 8}}>
    Content left
    <Separator orientation="vertical" />
    Content right
  </div>
</div>
```

## API

<FunctionAPI
  function={docs.exports.useSeparator}
  links={docs.links}
/>

### SeparatorProps

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `aria-describedby` | `string | undefined` | — | Identifies the element (or elements) that describes the object. |
| `aria-details` | `string | undefined` | — | Identifies the element (or elements) that provide a detailed, extended description for the object. |
| `aria-label` | `string | undefined` | — | Defines a string value that labels the current element. |
| `aria-labelledby` | `string | undefined` | — | Identifies the element (or elements) that labels the current element. |
| `className` | `string | undefined` | 'react-aria-Separator' | The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. |
| `dir` | `string | undefined` | — | — |
| `elementType` | `string | undefined` | — | The HTML element type that will be used to render the separator. |
| `hidden` | `boolean | undefined` | — | — |
| `id` | `string | undefined` | — | The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). |
| `inert` | `boolean | undefined` | — | — |
| `lang` | `string | undefined` | — | — |
| `onAnimationEnd` | `React.AnimationEventHandler<HTMLElement> | undefined` | — | — |
| `onAnimationEndCapture` | `React.AnimationEventHandler<HTMLElement> | undefined` | — | — |
| `onAnimationIteration` | `React.AnimationEventHandler<HTMLElement> | undefined` | — | — |
| `onAnimationIterationCapture` | `React.AnimationEventHandler<HTMLElement> | undefined` | — | — |
| `onAnimationStart` | `React.AnimationEventHandler<HTMLElement> | undefined` | — | — |
| `onAnimationStartCapture` | `React.AnimationEventHandler<HTMLElement> | undefined` | — | — |
| `onAuxClick` | `React.MouseEventHandler<HTMLElement> | undefined` | — | — |
| `onAuxClickCapture` | `React.MouseEventHandler<HTMLElement> | undefined` | — | — |
| `onClick` | `React.MouseEventHandler<HTMLElement> | undefined` | — | — |
| `onClickCapture` | `React.MouseEventHandler<HTMLElement> | undefined` | — | — |
| `onContextMenu` | `React.MouseEventHandler<HTMLElement> | undefined` | — | — |
| `onContextMenuCapture` | `React.MouseEventHandler<HTMLElement> | undefined` | — | — |
| `onDoubleClick` | `React.MouseEventHandler<HTMLElement> | undefined` | — | — |
| `onDoubleClickCapture` | `React.MouseEventHandler<HTMLElement> | undefined` | — | — |
| `onGotPointerCapture` | `React.PointerEventHandler<HTMLElement> | undefined` | — | — |
| `onGotPointerCaptureCapture` | `React.PointerEventHandler<HTMLElement> | undefined` | — | — |
| `onLostPointerCapture` | `React.PointerEventHandler<HTMLElement> | undefined` | — | — |
| `onLostPointerCaptureCapture` | `React.PointerEventHandler<HTMLElement> | undefined` | — | — |
| `onMouseDown` | `React.MouseEventHandler<HTMLElement> | undefined` | — | — |
| `onMouseDownCapture` | `React.MouseEventHandler<HTMLElement> | undefined` | — | — |
| `onMouseEnter` | `React.MouseEventHandler<HTMLElement> | undefined` | — | — |
| `onMouseLeave` | `React.MouseEventHandler<HTMLElement> | undefined` | — | — |
| `onMouseMove` | `React.MouseEventHandler<HTMLElement> | undefined` | — | — |
| `onMouseMoveCapture` | `React.MouseEventHandler<HTMLElement> | undefined` | — | — |
| `onMouseOut` | `React.MouseEventHandler<HTMLElement> | undefined` | — | — |
| `onMouseOutCapture` | `React.MouseEventHandler<HTMLElement> | undefined` | — | — |
| `onMouseOver` | `React.MouseEventHandler<HTMLElement> | undefined` | — | — |
| `onMouseOverCapture` | `React.MouseEventHandler<HTMLElement> | undefined` | — | — |
| `onMouseUp` | `React.MouseEventHandler<HTMLElement> | undefined` | — | — |
| `onMouseUpCapture` | `React.MouseEventHandler<HTMLElement> | undefined` | — | — |
| `onPointerCancel` | `React.PointerEventHandler<HTMLElement> | undefined` | — | — |
| `onPointerCancelCapture` | `React.PointerEventHandler<HTMLElement> | undefined` | — | — |
| `onPointerDown` | `React.PointerEventHandler<HTMLElement> | undefined` | — | — |
| `onPointerDownCapture` | `React.PointerEventHandler<HTMLElement> | undefined` | — | — |
| `onPointerEnter` | `React.PointerEventHandler<HTMLElement> | undefined` | — | — |
| `onPointerLeave` | `React.PointerEventHandler<HTMLElement> | undefined` | — | — |
| `onPointerMove` | `React.PointerEventHandler<HTMLElement> | undefined` | — | — |
| `onPointerMoveCapture` | `React.PointerEventHandler<HTMLElement> | undefined` | — | — |
| `onPointerOut` | `React.PointerEventHandler<HTMLElement> | undefined` | — | — |
| `onPointerOutCapture` | `React.PointerEventHandler<HTMLElement> | undefined` | — | — |
| `onPointerOver` | `React.PointerEventHandler<HTMLElement> | undefined` | — | — |
| `onPointerOverCapture` | `React.PointerEventHandler<HTMLElement> | undefined` | — | — |
| `onPointerUp` | `React.PointerEventHandler<HTMLElement> | undefined` | — | — |
| `onPointerUpCapture` | `React.PointerEventHandler<HTMLElement> | undefined` | — | — |
| `onScroll` | `React.UIEventHandler<HTMLElement> | undefined` | — | — |
| `onScrollCapture` | `React.UIEventHandler<HTMLElement> | undefined` | — | — |
| `onTouchCancel` | `React.TouchEventHandler<HTMLElement> | undefined` | — | — |
| `onTouchCancelCapture` | `React.TouchEventHandler<HTMLElement> | undefined` | — | — |
| `onTouchEnd` | `React.TouchEventHandler<HTMLElement> | undefined` | — | — |
| `onTouchEndCapture` | `React.TouchEventHandler<HTMLElement> | undefined` | — | — |
| `onTouchMove` | `React.TouchEventHandler<HTMLElement> | undefined` | — | — |
| `onTouchMoveCapture` | `React.TouchEventHandler<HTMLElement> | undefined` | — | — |
| `onTouchStart` | `React.TouchEventHandler<HTMLElement> | undefined` | — | — |
| `onTouchStartCapture` | `React.TouchEventHandler<HTMLElement> | undefined` | — | — |
| `onTransitionCancel` | `React.TransitionEventHandler<HTMLElement> | undefined` | — | — |
| `onTransitionCancelCapture` | `React.TransitionEventHandler<HTMLElement> | undefined` | — | — |
| `onTransitionEnd` | `React.TransitionEventHandler<HTMLElement> | undefined` | — | — |
| `onTransitionEndCapture` | `React.TransitionEventHandler<HTMLElement> | undefined` | — | — |
| `onTransitionRun` | `React.TransitionEventHandler<HTMLElement> | undefined` | — | — |
| `onTransitionRunCapture` | `React.TransitionEventHandler<HTMLElement> | undefined` | — | — |
| `onTransitionStart` | `React.TransitionEventHandler<HTMLElement> | undefined` | — | — |
| `onTransitionStartCapture` | `React.TransitionEventHandler<HTMLElement> | undefined` | — | — |
| `onWheel` | `React.WheelEventHandler<HTMLElement> | undefined` | — | — |
| `onWheelCapture` | `React.WheelEventHandler<HTMLElement> | undefined` | — | — |
| `orientation` | `Orientation | undefined` | 'horizontal' | The orientation of the separator. |
| `render` | `DOMRenderFunction<"div" | "hr", undefined> | undefined` | — | Overrides the default DOM element with a custom render function. This allows rendering existing components with built-in styles and behaviors such as router links, animation libraries, and pre-styled components. Requirements: - You must render the expected element type (e.g. if `<button>` is expected, you cannot render an   `<a>`). - Only a single root DOM element can be rendered (no fragments). - You must pass through props and ref to the underlying DOM element, merging with your own prop   as appropriate. |
| `slot` | `string | null | undefined` | — | A slot name for the component. Slots allow the component to receive props from a parent component. An explicit `null` value indicates that the local props completely override all props received from a parent. |
| `style` | `React.CSSProperties | undefined` | — | The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. |
| `translate` | `"no" | "yes" | undefined` | — | — |

### SeparatorAria

| Name | Type | Description |
|------|------|-------------|
| `separatorProps` \* | `DOMAttributes<FocusableElement>` | Props for the separator element. |

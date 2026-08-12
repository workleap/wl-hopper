# useColorArea

Provides the behavior and accessibility implementation for a color area component. Color area
allows users to adjust two channels of an RGB, HSL or HSB color value against a two-dimensional
gradient background.

```tsx
import {ColorArea} from 'hooks-starter/ColorArea';

<ColorArea defaultValue="hsl(30, 100%, 50%)" xChannel="saturation" yChannel="lightness" />
```

## API

```tsx
<ColorArea>
  <ColorThumb />
</ColorArea>
```

<FunctionAPIGroup functions={[
    {function: statelyDocs.exports.useColorAreaState, links: statelyDocs.links},
    {function: docs.exports.useColorArea, links: docs.links},
  ]}/>

### ColorAreaState

### AriaColorAreaOptions

| Name | Type | Description |
|------|------|-------------|
| `containerRef` \* | `RefObject<Element | null>` | A ref to the color area containing element. |
| `inputXRef` \* | `RefObject<HTMLInputElement | null>` | A ref to the input that represents the x axis of the color area. |
| `inputYRef` \* | `RefObject<HTMLInputElement | null>` | A ref to the input that represents the y axis of the color area. |
| `aria-describedby` | `string | undefined` | Identifies the element (or elements) that describes the object. |
| `aria-details` | `string | undefined` | Identifies the element (or elements) that provide a detailed, extended description for the object. |
| `aria-label` | `string | undefined` | Defines a string value that labels the current element. |
| `aria-labelledby` | `string | undefined` | Identifies the element (or elements) that labels the current element. |
| `colorSpace` | `ColorSpace | undefined` | The color space that the color area operates in. The `xChannel` and `yChannel` must be in this color space. If not provided, this defaults to the color space of the `color` or `defaultColor` value. |
| `defaultValue` | `string | Color | undefined` | The default value (uncontrolled). |
| `form` | `string | undefined` | The `<form>` element to associate the ColorArea with. The value of this attribute must be the id of a `<form>` in the same document. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#form). |
| `id` | `string | undefined` | The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). |
| `isDisabled` | `boolean | undefined` | Whether the ColorArea is disabled. |
| `onChange` | `((value: Color) => void) | undefined` | Handler that is called when the value changes, as the user drags. |
| `onChangeEnd` | `((value: Color) => void) | undefined` | Handler that is called when the user stops dragging. |
| `value` | `string | Color | undefined` | The current value (controlled). |
| `xChannel` | `ColorChannel | undefined` | Color channel for the horizontal axis. |
| `xName` | `string | undefined` | The name of the x channel input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname). |
| `yChannel` | `ColorChannel | undefined` | Color channel for the vertical axis. |
| `yName` | `string | undefined` | The name of the y channel input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname). |

### ColorAreaAria

| Name | Type | Description |
|------|------|-------------|
| `colorAreaProps` \* | `DOMAttributes<FocusableElement>` | Props for the color area container element. |
| `thumbProps` \* | `DOMAttributes<FocusableElement>` | Props for the thumb element. |
| `xInputProps` \* | `React.InputHTMLAttributes<HTMLInputElement>` | Props for the visually hidden horizontal range input element. |
| `yInputProps` \* | `React.InputHTMLAttributes<HTMLInputElement>` | Props for the visually hidden vertical range input element. |

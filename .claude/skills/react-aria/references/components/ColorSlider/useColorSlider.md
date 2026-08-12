# useColorSlider

Provides the behavior and accessibility implementation for a color slider component.
Color sliders allow users to adjust an individual channel of a color value.

```tsx
import {ColorSlider} from 'hooks-starter/ColorSlider';

<ColorSlider channel="hue" defaultValue="hsl(0, 100%, 50%)" />
```

## API

```tsx
<ColorSlider>
  <Label />
  <SliderOutput />
  <SliderTrack>
    <ColorThumb />
  </SliderTrack>
</ColorSlider>
```

<FunctionAPIGroup functions={[
    {function: statelyDocs.exports.useColorSliderState, links: statelyDocs.links},
    {function: docs.exports.useColorSlider, links: docs.links},
  ]}/>

### ColorSliderState

### AriaColorSliderOptions

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `channel` \* | `ColorChannel` | — | The color channel that the slider manipulates. |
| `inputRef` \* | `RefObject<HTMLInputElement | null>` | — | A ref for the input element. |
| `trackRef` \* | `RefObject<Element | null>` | — | A ref for the track element. |
| `aria-describedby` | `string | undefined` | — | Identifies the element (or elements) that describes the object. |
| `aria-details` | `string | undefined` | — | Identifies the element (or elements) that provide a detailed, extended description for the object. |
| `aria-label` | `string | undefined` | — | Defines a string value that labels the current element. |
| `aria-labelledby` | `string | undefined` | — | Identifies the element (or elements) that labels the current element. |
| `colorSpace` | `ColorSpace | undefined` | — | The color space that the slider operates in. The `channel` must be in this color space. If not provided, this defaults to the color space of the `color` or `defaultColor` value. |
| `defaultValue` | `string | Color | undefined` | — | The default value (uncontrolled). |
| `form` | `string | undefined` | — | The `<form>` element to associate the input with. The value of this attribute must be the id of a `<form>` in the same document. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#form). |
| `id` | `string | undefined` | — | The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). |
| `isDisabled` | `boolean | undefined` | — | Whether the whole Slider is disabled. |
| `label` | `ReactNode` | — | The content to display as the label. |
| `name` | `string | undefined` | — | The name of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname). |
| `onChange` | `((value: Color) => void) | undefined` | — | Handler that is called when the value changes, as the user drags. |
| `onChangeEnd` | `((value: Color) => void) | undefined` | — | Handler that is called when the user stops dragging. |
| `orientation` | `Orientation | undefined` | 'horizontal' | The orientation of the Slider. |
| `value` | `string | Color | undefined` | — | The current value (controlled). |

### ColorSliderAria

| Name | Type | Description |
|------|------|-------------|
| `inputProps` \* | `InputHTMLAttributes<HTMLInputElement>` | Props for the visually hidden range input element. |
| `labelProps` \* | `DOMAttributes<FocusableElement>` | Props for the label element. |
| `outputProps` \* | `DOMAttributes<FocusableElement>` | Props for the output element, displaying the value of the color slider. |
| `thumbProps` \* | `DOMAttributes<FocusableElement>` | Props for the thumb element. |
| `trackProps` \* | `DOMAttributes<FocusableElement>` | Props for the track element. |

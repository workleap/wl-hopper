# useSlider

Provides the behavior and accessibility implementation for a slider component representing one or
more values.

```tsx
import {Slider} from 'hooks-starter/Slider';

<Slider label="Opacity" defaultValue={60} />
```

## API

```tsx
<Slider>
  <Label />
  <SliderOutput />
  <SliderTrack>
    <SliderFill />
    <SliderThumb />
    <SliderThumb>
      <Label />
    </SliderThumb>
  </SliderTrack>
</Slider>
```

<FunctionAPIGroup functions={[
    {function: statelyDocs.exports.useSliderState, links: statelyDocs.links},
    {function: docs.exports.useSlider, links: docs.links},
    {function: docs.exports.useSliderThumb, links: docs.links},
  ]}/>

### SliderState

### AriaSliderProps

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `aria-describedby` | `string | undefined` | — | Identifies the element (or elements) that describes the object. |
| `aria-details` | `string | undefined` | — | Identifies the element (or elements) that provide a detailed, extended description for the object. |
| `aria-label` | `string | undefined` | — | Defines a string value that labels the current element. |
| `aria-labelledby` | `string | undefined` | — | Identifies the element (or elements) that labels the current element. |
| `defaultValue` | `T | undefined` | — | The default value (uncontrolled). |
| `id` | `string | undefined` | — | The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). |
| `isDisabled` | `boolean | undefined` | — | Whether the whole Slider is disabled. |
| `label` | `React.ReactNode` | — | The content to display as the label. |
| `maxValue` | `number | undefined` | 100 | The slider's maximum value. |
| `minValue` | `number | undefined` | 0 | The slider's minimum value. |
| `onChange` | `((value: T) => void) | undefined` | — | Handler that is called when the value changes. |
| `onChangeEnd` | `((value: T) => void) | undefined` | — | Fired when the slider stops moving, due to being let go. |
| `orientation` | `Orientation | undefined` | 'horizontal' | The orientation of the Slider. |
| `step` | `number | undefined` | 1 | The slider's step value. |
| `value` | `T | undefined` | — | The current value (controlled). |

### SliderAria

| Name | Type | Description |
|------|------|-------------|
| `groupProps` \* | `DOMAttributes<FocusableElement>` | Props for the root element of the slider component; groups slider inputs. |
| `labelProps` \* | `React.LabelHTMLAttributes<HTMLLabelElement>` | Props for the label element. |
| `outputProps` \* | `React.OutputHTMLAttributes<HTMLOutputElement>` | Props for the output element, displaying the value of the slider thumbs. |
| `trackProps` \* | `DOMAttributes<FocusableElement>` | Props for the track element. |

### AriaSliderThumbOptions

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `inputRef` \* | `RefObject<HTMLInputElement | null>` | — | A ref to the thumb input element. |
| `trackRef` \* | `RefObject<Element | null>` | — | A ref to the track element. |
| `aria-describedby` | `string | undefined` | — | Identifies the element (or elements) that describes the object. |
| `aria-details` | `string | undefined` | — | Identifies the element (or elements) that provide a detailed, extended description for the object. |
| `aria-errormessage` | `string | undefined` | — | Identifies the element that provides an error message for the object. |
| `aria-label` | `string | undefined` | — | Defines a string value that labels the current element. |
| `aria-labelledby` | `string | undefined` | — | Identifies the element (or elements) that labels the current element. |
| `autoFocus` | `boolean | undefined` | — | Whether the element should receive focus on render. |
| `form` | `string | undefined` | — | The `<form>` element to associate the input with. The value of this attribute must be the id of a `<form>` in the same document. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#form). |
| `id` | `string | undefined` | — | The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). |
| `index` | `number | undefined` | 0 | Index of the thumb within the slider. |
| `isDisabled` | `boolean | undefined` | — | Whether the Thumb is disabled. |
| `label` | `React.ReactNode` | — | The content to display as the label. |
| `name` | `string | undefined` | — | The name of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname). |
| `onBlur` | `((e: React.FocusEvent<Element>) => void) | undefined` | — | Handler that is called when the element loses focus. |
| `onFocus` | `((e: React.FocusEvent<Element>) => void) | undefined` | — | Handler that is called when the element receives focus. |
| `onFocusChange` | `((isFocused: boolean) => void) | undefined` | — | Handler that is called when the element's focus status changes. |
| `onKeyDown` | `((e: KeyboardEvent) => void) | undefined` | — | Handler that is called when a key is pressed. |
| `onKeyUp` | `((e: KeyboardEvent) => void) | undefined` | — | Handler that is called when a key is released. |

### SliderThumbAria

| Name | Type | Description |
|------|------|-------------|
| `inputProps` \* | `React.InputHTMLAttributes<HTMLInputElement>` | Props for the visually hidden range input element. |
| `isDisabled` \* | `boolean` | Whether the thumb is disabled. |
| `isDragging` \* | `boolean` | Whether this thumb is currently being dragged. |
| `isFocused` \* | `boolean` | Whether the thumb is currently focused. |
| `labelProps` \* | `React.LabelHTMLAttributes<HTMLLabelElement>` | Props for the label element for this thumb (optional). |
| `thumbProps` \* | `DOMAttributes<FocusableElement>` | Props for the root thumb element; handles the dragging motion. |

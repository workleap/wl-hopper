# useColorWheel

Provides the behavior and accessibility implementation for a color wheel component.
Color wheels allow users to adjust the hue of an HSL or HSB color value on a circular track.

```tsx
import {ColorWheel} from 'hooks-starter/ColorWheel';

<ColorWheel defaultValue="hsl(30, 100%, 50%)" />
```

## API

```tsx
<ColorWheel>
  <ColorWheelTrack />
  <ColorThumb />
</ColorWheel>
```

<FunctionAPIGroup functions={[
    {function: statelyDocs.exports.useColorWheelState, links: statelyDocs.links},
    {function: docs.exports.useColorWheel, links: docs.links},
  ]}/>

### ColorWheelState

### AriaColorWheelOptions

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `innerRadius` \* | `number` | — | The inner radius of the color wheel. |
| `outerRadius` \* | `number` | — | The outer radius of the color wheel. |
| `aria-describedby` | `string | undefined` | — | Identifies the element (or elements) that describes the object. |
| `aria-details` | `string | undefined` | — | Identifies the element (or elements) that provide a detailed, extended description for the object. |
| `aria-label` | `string | undefined` | — | Defines a string value that labels the current element. |
| `aria-labelledby` | `string | undefined` | — | Identifies the element (or elements) that labels the current element. |
| `defaultValue` | `string | Color | undefined` | 'hsl(0, 100%, 50%)' | The default value (uncontrolled). |
| `form` | `string | undefined` | — | The `<form>` element to associate the input with. The value of this attribute must be the id of a `<form>` in the same document. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#form). |
| `id` | `string | undefined` | — | The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). |
| `isDisabled` | `boolean | undefined` | — | Whether the ColorWheel is disabled. |
| `name` | `string | undefined` | — | The name of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname). |
| `onChange` | `((value: Color) => void) | undefined` | — | Handler that is called when the value changes, as the user drags. |
| `onChangeEnd` | `((value: Color) => void) | undefined` | — | Handler that is called when the user stops dragging. |
| `value` | `string | Color | undefined` | — | The current value (controlled). |

### ColorWheelAria

| Name | Type | Description |
|------|------|-------------|
| `inputProps` \* | `React.InputHTMLAttributes<HTMLInputElement>` | Props for the visually hidden range input element. |
| `thumbProps` \* | `DOMAttributes<FocusableElement>` | Props for the thumb element. |
| `trackProps` \* | `DOMAttributes<FocusableElement>` | Props for the track element. |

# useColorSwatch

Provides the accessibility implementation for a color swatch component.
A color swatch displays a preview of a selected color.

```tsx
import {ColorSwatch} from 'hooks-starter/ColorSwatch';

<ColorSwatch color="#f00a" />
```

## API

<FunctionAPI
  function={docs.exports.useColorSwatch}
  links={docs.links}
/>

### AriaColorSwatchProps

| Name | Type | Description |
|------|------|-------------|
| `aria-describedby` | `string | undefined` | Identifies the element (or elements) that describes the object. |
| `aria-details` | `string | undefined` | Identifies the element (or elements) that provide a detailed, extended description for the object. |
| `aria-label` | `string | undefined` | Defines a string value that labels the current element. |
| `aria-labelledby` | `string | undefined` | Identifies the element (or elements) that labels the current element. |
| `color` | `string | Color | undefined` | The color value to display in the swatch. |
| `colorName` | `string | undefined` | A localized accessible name for the color. By default, a description is generated from the color value, but this can be overridden if you have a more specific color name (e.g. Pantone colors). |
| `id` | `string | undefined` | The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). |

### ColorSwatchAria

| Name | Type | Description |
|------|------|-------------|
| `color` \* | `Color` | The parsed color value of the swatch. |
| `colorSwatchProps` \* | `HTMLAttributes<HTMLElement>` | Props for the color swatch element. |

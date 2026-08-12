# useMeter

Provides the accessibility implementation for a meter component.
Meters represent a quantity within a known range, or a fractional value.

```tsx
import {Meter} from 'hooks-starter/Meter';

<Meter label="Storage space" value={25} />
```

## API

```tsx
<Meter>
  <Label />
</Meter>
```

<FunctionAPI
  function={docs.exports.useMeter}
  links={docs.links}
/>

### AriaMeterProps

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `aria-describedby` | `string | undefined` | — | Identifies the element (or elements) that describes the object. |
| `aria-details` | `string | undefined` | — | Identifies the element (or elements) that provide a detailed, extended description for the object. |
| `aria-label` | `string | undefined` | — | Defines a string value that labels the current element. |
| `aria-labelledby` | `string | undefined` | — | Identifies the element (or elements) that labels the current element. |
| `formatOptions` | `Intl.NumberFormatOptions | undefined` | \{ style: 'percent' } | The display format of the value label. |
| `id` | `string | undefined` | — | The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). |
| `label` | `ReactNode` | — | The content to display as the label. |
| `maxValue` | `number | undefined` | 100 | The largest value allowed for the input. |
| `minValue` | `number | undefined` | 0 | The smallest value allowed for the input. |
| `value` | `number | undefined` | 0 | The current value (controlled). |
| `valueLabel` | `ReactNode` | — | The content to display as the value's label (e.g. 1 of 4). |

### MeterAria

| Name | Type | Description |
|------|------|-------------|
| `labelProps` \* | `DOMAttributes<FocusableElement>` | Props for the meter's visual label (if any). |
| `meterProps` \* | `DOMAttributes<FocusableElement>` | Props for the meter container element. |

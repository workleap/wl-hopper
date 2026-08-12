# useProgressBar

Provides the accessibility implementation for a progress bar component.
Progress bars show either determinate or indeterminate progress of an operation
over time.

```tsx
import {ProgressBar} from 'hooks-starter/ProgressBar';

<ProgressBar label="Loading…" value={80} />
```

## API

```tsx
<ProgressBar>
  <Label />
</ProgressBar>
```

<FunctionAPI
  function={docs.exports.useProgressBar}
  links={docs.links}
/>

### AriaProgressBarProps

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `aria-describedby` | `string | undefined` | — | Identifies the element (or elements) that describes the object. |
| `aria-details` | `string | undefined` | — | Identifies the element (or elements) that provide a detailed, extended description for the object. |
| `aria-label` | `string | undefined` | — | Defines a string value that labels the current element. |
| `aria-labelledby` | `string | undefined` | — | Identifies the element (or elements) that labels the current element. |
| `formatOptions` | `Intl.NumberFormatOptions | undefined` | \{ style: 'percent' } | The display format of the value label. |
| `id` | `string | undefined` | — | The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). |
| `isIndeterminate` | `boolean | undefined` | — | Whether presentation is indeterminate when progress isn't known. |
| `label` | `ReactNode` | — | The content to display as the label. |
| `maxValue` | `number | undefined` | 100 | The largest value allowed for the input. |
| `minValue` | `number | undefined` | 0 | The smallest value allowed for the input. |
| `value` | `number | undefined` | 0 | The current value (controlled). |
| `valueLabel` | `ReactNode` | — | The content to display as the value's label (e.g. 1 of 4). |

### ProgressBarAria

| Name | Type | Description |
|------|------|-------------|
| `labelProps` \* | `DOMAttributes<FocusableElement>` | Props for the progress bar's visual label element (if any). |
| `progressBarProps` \* | `DOMAttributes<FocusableElement>` | Props for the progress bar container element. |

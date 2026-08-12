# useTooltipTrigger

Provides the behavior and accessibility implementation for a tooltip trigger, e.g. a button
that shows a description when focused or hovered.

```tsx
import {Button} from 'react-aria-components/Button';
import {TooltipTrigger} from 'hooks-starter/Tooltip';

<div style={{display: 'flex', gap: 8}}>
  <TooltipTrigger tooltip="Edit">
    <Button className="react-aria-Button button-base" data-variant="secondary">Edit</Button>
  </TooltipTrigger>
  <TooltipTrigger tooltip="Delete">
    <Button className="react-aria-Button button-base" data-variant="secondary">Delete</Button>
  </TooltipTrigger>
</div>
```

## API

```tsx
<TooltipTrigger>
  <Button />
  <Tooltip>
    <OverlayArrow />
  </Tooltip>
</TooltipTrigger>
```

<FunctionAPIGroup functions={[
    {function: statelyDocs.exports.useTooltipTriggerState, links: statelyDocs.links},
    {function: docs.exports.useTooltipTrigger, links: docs.links},
    {function: docs.exports.useTooltip, links: docs.links},
  ]}/>

### TooltipTriggerState

### TooltipTriggerProps

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `children` \* | `ReactNode` | — | The content of the tooltip. |
| `containerPadding` | `number | undefined` | 12 | The placement padding that should be applied between the element and its surrounding container. |
| `crossOffset` | `number | undefined` | 0 | The additional offset applied along the cross axis between the element and its anchor element. |
| `defaultOpen` | `boolean | undefined` | — | Whether the overlay is open by default (uncontrolled). |
| `delay` | `number | undefined` | 1500 | The delay time for the tooltip to show up. [See guidelines](https://spectrum.adobe.com/page/tooltip/#Immediate-or-delayed-appearance). |
| `isDisabled` | `boolean | undefined` | — | Whether the tooltip should be disabled, independent from the trigger. |
| `isOpen` | `boolean | undefined` | — | Whether the overlay is open by default (controlled). |
| `onOpenChange` | `((isOpen: boolean) => void) | undefined` | — | Handler that is called when the overlay's open state changes. |
| `placement` | `"bottom" | "end" | "left" | "right" | "start" | "top" | undefined` | 'top' | The placement of the element with respect to its anchor element. |
| `shouldCloseOnPress` | `boolean | undefined` | true | Whether the tooltip should close when the trigger is pressed. |
| `shouldFlip` | `boolean | undefined` | true | Whether the element should flip its orientation (e.g. top to bottom or left to right) when there is insufficient room for it to render completely. |
| `trigger` | `"focus" | "hover" | undefined` | 'hover' | By default, opens for both focus and hover. Can be made to open only for focus. |

### TooltipTriggerAria

| Name | Type | Description |
|------|------|-------------|
| `tooltipProps` \* | `DOMAttributes<FocusableElement>` | Props for the overlay container element. |
| `triggerProps` \* | `DOMAttributes<FocusableElement>` | Props for the trigger element. |

### AriaTooltipProps

| Name | Type | Description |
|------|------|-------------|
| `aria-describedby` | `string | undefined` | Identifies the element (or elements) that describes the object. |
| `aria-details` | `string | undefined` | Identifies the element (or elements) that provide a detailed, extended description for the object. |
| `aria-label` | `string | undefined` | Defines a string value that labels the current element. |
| `aria-labelledby` | `string | undefined` | Identifies the element (or elements) that labels the current element. |
| `id` | `string | undefined` | The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). |
| `isOpen` | `boolean | undefined` | — |

### TooltipAria

| Name | Type | Description |
|------|------|-------------|
| `tooltipProps` \* | `DOMAttributes<FocusableElement>` | Props for the tooltip element. |

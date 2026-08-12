# useToggleButtonGroup

Provides the behavior and accessibility implementation for a toggle button group component.
Toggle button groups allow users to select one or more options from a group.

```tsx
import {ToggleButtonGroup, ToggleButton} from 'hooks-starter/ToggleButtonGroup';

<ToggleButtonGroup>
  <ToggleButton id="left">Left</ToggleButton>
  <ToggleButton id="center">Center</ToggleButton>
  <ToggleButton id="right">Right</ToggleButton>
</ToggleButtonGroup>
```

## API

```tsx
<ToggleButtonGroup>
  <ToggleButton>
    <SelectionIndicator />
  </ToggleButton>
</ToggleButtonGroup>
```

<FunctionAPIGroup functions={[
    {function: statelyDocs.exports.useToggleGroupState, links: statelyDocs.links},
    {function: docs.exports.useToggleButtonGroup, links: docs.links},
    {function: docs.exports.useToggleButtonGroupItem, links: docs.links},
  ]}/>

### ToggleGroupState

### AriaToggleButtonGroupProps

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `aria-describedby` | `string | undefined` | — | Identifies the element (or elements) that describes the object. |
| `aria-details` | `string | undefined` | — | Identifies the element (or elements) that provide a detailed, extended description for the object. |
| `aria-label` | `string | undefined` | — | Defines a string value that labels the current element. |
| `aria-labelledby` | `string | undefined` | — | Identifies the element (or elements) that labels the current element. |
| `defaultSelectedKeys` | `Iterable<Key> | undefined` | — | The initial selected keys in the collection (uncontrolled). |
| `disallowEmptySelection` | `boolean | undefined` | — | Whether the collection allows empty selection. |
| `isDisabled` | `boolean | undefined` | — | Whether all items are disabled. |
| `onSelectionChange` | `((keys: Set<Key>) => void) | undefined` | — | Handler that is called when the selection changes. |
| `orientation` | `Orientation | undefined` | 'horizontal' | The orientation of the the toggle button group. |
| `selectedKeys` | `Iterable<Key> | undefined` | — | The currently selected keys in the collection (controlled). |
| `selectionMode` | `"multiple" | "single" | undefined` | 'single' | Whether single or multiple selection is enabled. |

### ToggleButtonGroupAria

| Name | Type | Description |
|------|------|-------------|
| `groupProps` \* | `DOMAttributes<FocusableElement>` | Props for the toggle button group container. |

### AriaToggleButtonGroupItemProps

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `id` \* | `Key` | — | An identifier for the item in the `selectedKeys` of a ToggleButtonGroup. |
| `aria-controls` | `string | undefined` | — | Identifies the element (or elements) whose contents or presence are controlled by the current element. |
| `aria-describedby` | `string | undefined` | — | Identifies the element (or elements) that describes the object. |
| `aria-details` | `string | undefined` | — | Identifies the element (or elements) that provide a detailed, extended description for the object. |
| `aria-disabled` | `boolean | "true" | "false" | undefined` | — | Indicates whether the element is disabled to users of assistive technology. |
| `aria-expanded` | `boolean | "true" | "false" | undefined` | — | Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed. |
| `aria-haspopup` | `boolean | "true" | "false" | "dialog" | "grid" | "listbox" | "menu" | "tree" | undefined` | — | Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element. |
| `aria-label` | `string | undefined` | — | Defines a string value that labels the current element. |
| `aria-labelledby` | `string | undefined` | — | Identifies the element (or elements) that labels the current element. |
| `aria-pressed` | `boolean | "true" | "false" | "mixed" | undefined` | — | Indicates the current "pressed" state of toggle buttons. |
| `autoFocus` | `boolean | undefined` | — | Whether the element should receive focus on render. |
| `children` | `ReactNode` | — | The content to display in the button. |
| `elementType` | `E | JSXElementConstructor<any> | undefined` | 'button' | The HTML element or React element used to render the button, e.g. 'div', 'a', or `RouterLink`. |
| `excludeFromTabOrder` | `boolean | undefined` | — | Whether to exclude the element from the sequential tab order. If true, the element will not be focusable via the keyboard by tabbing. This should be avoided except in rare scenarios where an alternative means of accessing the element or its functionality via the keyboard is available. |
| `isDisabled` | `boolean | undefined` | — | Whether the button is disabled. |
| `onBlur` | `((e: FocusEvent<Element>) => void) | undefined` | — | Handler that is called when the element loses focus. |
| `onClick` | `((e: MouseEvent<FocusableElement>) => void) | undefined` | — | **Not recommended – use `onPress` instead.** `onClick` is an alias for `onPress` provided for compatibility with other libraries. `onPress` provides additional event details for non-mouse interactions. |
| `onFocus` | `((e: FocusEvent<Element>) => void) | undefined` | — | Handler that is called when the element receives focus. |
| `onFocusChange` | `((isFocused: boolean) => void) | undefined` | — | Handler that is called when the element's focus status changes. |
| `onKeyDown` | `((e: KeyboardEvent) => void) | undefined` | — | Handler that is called when a key is pressed. |
| `onKeyUp` | `((e: KeyboardEvent) => void) | undefined` | — | Handler that is called when a key is released. |
| `onPress` | `((e: PressEvent) => void) | undefined` | — | Handler that is called when the press is released over the target. |
| `onPressChange` | `((isPressed: boolean) => void) | undefined` | — | Handler that is called when the press state changes. |
| `onPressEnd` | `((e: PressEvent) => void) | undefined` | — | Handler that is called when a press interaction ends, either over the target or when the pointer leaves the target. |
| `onPressStart` | `((e: PressEvent) => void) | undefined` | — | Handler that is called when a press interaction starts. |
| `onPressUp` | `((e: PressEvent) => void) | undefined` | — | Handler that is called when a press is released over the target, regardless of whether it started on the target or not. |
| `preventFocusOnPress` | `boolean | undefined` | — | Whether to prevent focus from moving to the button when pressing it. Caution, this can make the button inaccessible and should only be used when alternative keyboard interaction is provided, such as ComboBox's MenuTrigger or a NumberField's increment/decrement control. |

# useCheckbox

Provides the behavior and accessibility implementation for a checkbox component.
Checkboxes allow users to select multiple items from a list of individual items, or
to mark one individual item as selected.

```tsx
import {Checkbox} from 'hooks-starter/Checkbox';

<Checkbox>Unsubscribe</Checkbox>
```

## API

```tsx
<CheckboxField>
  <CheckboxButton>Label</CheckboxButton>
  <Text slot="description" />
  <FieldError />
</CheckboxField>
```

<FunctionAPIGroup functions={[
    {function: statelyDocs.exports.useToggleState, links: statelyDocs.links},
    {function: docs.exports.useCheckbox, links: docs.links},
  ]}/>

### ToggleState

### AriaCheckboxProps

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `aria-controls` | `string | undefined` | — | Identifies the element (or elements) whose contents or presence are controlled by the current element. |
| `aria-describedby` | `string | undefined` | — | Identifies the element (or elements) that describes the object. |
| `aria-details` | `string | undefined` | — | Identifies the element (or elements) that provide a detailed, extended description for the object. |
| `aria-errormessage` | `string | undefined` | — | Identifies the element that provides an error message for the object. |
| `aria-label` | `string | undefined` | — | Defines a string value that labels the current element. |
| `aria-labelledby` | `string | undefined` | — | Identifies the element (or elements) that labels the current element. |
| `autoFocus` | `boolean | undefined` | — | Whether the element should receive focus on render. |
| `children` | `ReactNode` | — | The label for the element. |
| `defaultSelected` | `boolean | undefined` | — | Whether the element should be selected (uncontrolled). |
| `excludeFromTabOrder` | `boolean | undefined` | — | Whether to exclude the element from the sequential tab order. If true, the element will not be focusable via the keyboard by tabbing. This should be avoided except in rare scenarios where an alternative means of accessing the element or its functionality via the keyboard is available. |
| `form` | `string | undefined` | — | The `<form>` element to associate the input with. The value of this attribute must be the id of a `<form>` in the same document. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#form). |
| `id` | `string | undefined` | — | The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). |
| `isDisabled` | `boolean | undefined` | — | Whether the input is disabled. |
| `isIndeterminate` | `boolean | undefined` | — | Indeterminism is presentational only. The indeterminate visual representation remains regardless of user interaction. |
| `isInvalid` | `boolean | undefined` | — | Whether the input value is invalid. |
| `isReadOnly` | `boolean | undefined` | — | Whether the input can be selected but not changed by the user. |
| `isRequired` | `boolean | undefined` | — | Whether user input is required on the input before form submission. |
| `isSelected` | `boolean | undefined` | — | Whether the element should be selected (controlled). |
| `name` | `string | undefined` | — | The name of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname). |
| `onBlur` | `((e: FocusEvent<Element>) => void) | undefined` | — | Handler that is called when the element loses focus. |
| `onChange` | `((isSelected: boolean) => void) | undefined` | — | Handler that is called when the element's selection state changes. |
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
| `validate` | `((value: boolean) => true | undefined) | ValidationError | null | undefined` | — | A function that returns an error message if a given value is invalid. Validation errors are displayed to the user when the form is submitted if `validationBehavior="native"`. For realtime validation, use the `isInvalid` prop instead. |
| `validationBehavior` | `"aria" | "native" | undefined` | 'aria' | Whether to use native HTML form validation to prevent form submission when the value is missing or invalid, or mark the field as required or invalid via ARIA. |
| `value` | `string | undefined` | — | The value of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefvalue). |

### CheckboxAria

| Name | Type | Description |
|------|------|-------------|
| `descriptionProps` \* | `DOMAttributesWithRef<HTMLElement>` | Props for the checkbox description element, if any. |
| `errorMessageProps` \* | `DOMAttributesWithRef<HTMLElement>` | Props for the checkbox error message element, if any. |
| `inputProps` \* | `InputHTMLAttributes<HTMLInputElement>` | Props for the input element. |
| `isDisabled` \* | `boolean` | Whether the checkbox is disabled. |
| `isInvalid` \* | `boolean` | Whether the input value is invalid. |
| `isPressed` \* | `boolean` | Whether the checkbox is in a pressed state. |
| `isReadOnly` \* | `boolean` | Whether the checkbox is read only. |
| `isSelected` \* | `boolean` | Whether the checkbox is selected. |
| `labelProps` \* | `LabelHTMLAttributes<HTMLLabelElement>` | Props for the label wrapper element. |
| `validationDetails` \* | `ValidityState` | The native validation details for the input. |
| `validationErrors` \* | `string[]` | The current error messages for the input if it is invalid, otherwise an empty array. |

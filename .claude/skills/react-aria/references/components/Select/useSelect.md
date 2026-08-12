# useSelect

Provides the behavior and accessibility implementation for a select component.
A select displays a collapsible list of options and allows a user to select one of them.

```tsx
import {Select, SelectItem} from 'hooks-starter/Select';

<Select label="Favorite Animal">
  <SelectItem>Aardvark</SelectItem>
  <SelectItem>Cat</SelectItem>
  <SelectItem>Dog</SelectItem>
  <SelectItem>Kangaroo</SelectItem>
  <SelectItem>Panda</SelectItem>
  <SelectItem>Snake</SelectItem>
</Select>
```

## API

<FunctionAPIGroup functions={[
    {function: statelyDocs.exports.useSelectState, links: statelyDocs.links},
    {function: docs.exports.useSelect, links: docs.links},
  ]}/>

### SelectState

### AriaSelectOptions

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `allowsEmptyCollection` | `boolean | undefined` | — | Whether the select should be allowed to be open when the collection is empty. |
| `aria-describedby` | `string | undefined` | — | Identifies the element (or elements) that describes the object. |
| `aria-details` | `string | undefined` | — | Identifies the element (or elements) that provide a detailed, extended description for the object. |
| `aria-label` | `string | undefined` | — | Defines a string value that labels the current element. |
| `aria-labelledby` | `string | undefined` | — | Identifies the element (or elements) that labels the current element. |
| `autoComplete` | `string | undefined` | — | Describes the type of autocomplete functionality the input should provide if any. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefautocomplete). |
| `autoFocus` | `boolean | undefined` | — | Whether the element should receive focus on render. |
| `defaultOpen` | `boolean | undefined` | — | Sets the default open state of the menu. |
| `defaultValue` | `ValueType<M> | undefined` | — | The default value (uncontrolled). |
| `description` | `ReactNode` | — | A description for the field. Provides a hint such as specific requirements for what to choose. |
| `disabledKeys` | `Iterable<Key> | undefined` | — | The item keys that are disabled. These items cannot be selected, focused, or otherwise interacted with. |
| `errorMessage` | `((v: ValidationResult) => ReactNode) | ReactNode` | — | An error message for the field. |
| `excludeFromTabOrder` | `boolean | undefined` | — | Whether to exclude the element from the sequential tab order. If true, the element will not be focusable via the keyboard by tabbing. This should be avoided except in rare scenarios where an alternative means of accessing the element or its functionality via the keyboard is available. |
| `form` | `string | undefined` | — | The `<form>` element to associate the input with. The value of this attribute must be the id of a `<form>` in the same document. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#form). |
| `id` | `string | undefined` | — | The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). |
| `isDisabled` | `boolean | undefined` | — | Whether the input is disabled. |
| `isInvalid` | `boolean | undefined` | — | Whether the input value is invalid. |
| `isOpen` | `boolean | undefined` | — | Sets the open state of the menu. |
| `isRequired` | `boolean | undefined` | — | Whether user input is required on the input before form submission. |
| `items` | `Iterable<T> | undefined` | — | Item objects in the collection. |
| `keyboardDelegate` | `KeyboardDelegate | undefined` | — | An optional keyboard delegate implementation for type to select, to override the default. |
| `label` | `ReactNode` | — | The content to display as the label. |
| `name` | `string | undefined` | — | The name of the input, used when submitting an HTML form. |
| `onBlur` | `((e: FocusEvent<Element>) => void) | undefined` | — | Handler that is called when the element loses focus. |
| `onChange` | `((value: ChangeValueType<M>) => void) | undefined` | — | Handler that is called when the value changes. |
| `onFocus` | `((e: FocusEvent<Element>) => void) | undefined` | — | Handler that is called when the element receives focus. |
| `onFocusChange` | `((isFocused: boolean) => void) | undefined` | — | Handler that is called when the element's focus status changes. |
| `onKeyDown` | `((e: KeyboardEvent) => void) | undefined` | — | Handler that is called when a key is pressed. |
| `onKeyUp` | `((e: KeyboardEvent) => void) | undefined` | — | Handler that is called when a key is released. |
| `onOpenChange` | `((isOpen: boolean) => void) | undefined` | — | Method that is called when the open state of the menu changes. |
| `placeholder` | `string | undefined` | — | Temporary text that occupies the text input when it is empty. |
| `selectionMode` | `M | undefined` | 'single' | Whether single or multiple selection is enabled. |
| `shouldCloseOnSelect` | `boolean | undefined` | — | Whether the Select should close when an item is selected. Defaults to true if selectionMode is single, false otherwise. |
| `validate` | `((value: M extends "single" ? Key : Key[]) => true | undefined) | ValidationError | null | undefined` | — | A function that returns an error message if a given value is invalid. Validation errors are displayed to the user when the form is submitted if `validationBehavior="native"`. For realtime validation, use the `isInvalid` prop instead. |
| `validationBehavior` | `"aria" | "native" | undefined` | 'aria' | Whether to use native HTML form validation to prevent form submission when the value is missing or invalid, or mark the field as required or invalid via ARIA. |
| `value` | `ValueType<M> | undefined` | — | The current value (controlled). |

### SelectAria

| Name | Type | Description |
|------|------|-------------|
| `descriptionProps` \* | `DOMAttributes<FocusableElement>` | Props for the select's description element, if any. |
| `errorMessageProps` \* | `DOMAttributes<FocusableElement>` | Props for the select's error message element, if any. |
| `hiddenSelectProps` \* | `HiddenSelectProps<T, M>` | Props for the hidden select element. |
| `isInvalid` \* | `boolean` | Whether the input value is invalid. |
| `labelProps` \* | `DOMAttributes<FocusableElement>` | Props for the label element. |
| `menuProps` \* | `AriaListBoxOptions<T>` | Props for the popup. |
| `triggerProps` \* | `AriaButtonProps<"button">` | Props for the popup trigger element. |
| `validationDetails` \* | `ValidityState` | The native validation details for the input. |
| `validationErrors` \* | `string[]` | The current error messages for the input if it is invalid, otherwise an empty array. |
| `valueProps` \* | `DOMAttributes<FocusableElement>` | Props for the element representing the selected value. |

# useComboBox

Provides the behavior and accessibility implementation for a combo box component. A combo box
combines a text input with a listbox, allowing users to filter a list of options to items
matching a query.

```tsx
import {ComboBox, ComboBoxItem} from 'hooks-starter/ComboBox';

<ComboBox label="Favorite Animal">
  <ComboBoxItem>Aardvark</ComboBoxItem>
  <ComboBoxItem>Cat</ComboBoxItem>
  <ComboBoxItem>Dog</ComboBoxItem>
  <ComboBoxItem>Kangaroo</ComboBoxItem>
  <ComboBoxItem>Panda</ComboBoxItem>
  <ComboBoxItem>Snake</ComboBoxItem>
</ComboBox>
```

## API

```tsx
<ComboBox>
  <Label />
  <Group>
    <Input />
    <Button />
  </Group>
  <ComboBoxValue />
  <Text slot="description" />
  <FieldError />
  <Popover>
    <ListBox />
  </Popover>
</ComboBox>
```

<FunctionAPIGroup functions={[
    {function: statelyDocs.exports.useComboBoxState, links: statelyDocs.links},
    {function: docs.exports.useComboBox, links: docs.links},
  ]}/>

### ComboBoxState

### AriaComboBoxOptions

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `inputRef` \* | `RefObject<HTMLInputElement | null>` | — | The ref for the input element. |
| `listBoxRef` \* | `RefObject<HTMLElement | null>` | — | The ref for the list box. |
| `popoverRef` \* | `RefObject<Element | null>` | — | The ref for the list box popover. |
| `allowsCustomValue` | `boolean | undefined` | — | Whether the ComboBox allows a non-item matching input value to be set. |
| `aria-describedby` | `string | undefined` | — | Identifies the element (or elements) that describes the object. |
| `aria-details` | `string | undefined` | — | Identifies the element (or elements) that provide a detailed, extended description for the object. |
| `aria-label` | `string | undefined` | — | Defines a string value that labels the current element. |
| `aria-labelledby` | `string | undefined` | — | Identifies the element (or elements) that labels the current element. |
| `autoFocus` | `boolean | undefined` | — | Whether the element should receive focus on render. |
| `buttonRef` | `RefObject<Element | null> | undefined` | — | The ref for the optional list box popup trigger button. |
| `defaultInputValue` | `string | undefined` | — | The default value of the ComboBox input (uncontrolled). |
| `defaultItems` | `Iterable<T> | undefined` | — | The list of ComboBox items (uncontrolled). |
| `defaultValue` | `ValueType<M> | undefined` | — | The default value (uncontrolled). |
| `description` | `ReactNode` | — | A description for the field. Provides a hint such as specific requirements for what to choose. |
| `disabledKeys` | `Iterable<Key> | undefined` | — | The item keys that are disabled. These items cannot be selected, focused, or otherwise interacted with. |
| `errorMessage` | `((v: ValidationResult) => ReactNode) | ReactNode` | — | An error message for the field. |
| `form` | `string | undefined` | — | The `<form>` element to associate the input with. The value of this attribute must be the id of a `<form>` in the same document. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#form). |
| `id` | `string | undefined` | — | The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). |
| `inputValue` | `string | undefined` | — | The value of the ComboBox input (controlled). |
| `isDisabled` | `boolean | undefined` | — | Whether the input is disabled. |
| `isInvalid` | `boolean | undefined` | — | Whether the input value is invalid. |
| `isReadOnly` | `boolean | undefined` | — | Whether the input can be selected but not changed by the user. |
| `isRequired` | `boolean | undefined` | — | Whether user input is required on the input before form submission. |
| `items` | `Iterable<T> | undefined` | — | The list of ComboBox items (controlled). |
| `keyboardDelegate` | `KeyboardDelegate | undefined` | — | An optional keyboard delegate implementation, to override the default. |
| `label` | `ReactNode` | — | The content to display as the label. |
| `labelElementType` | `ElementType | undefined` | 'label' | The HTML element used to render the label, e.g. 'label', or 'span'. |
| `layoutDelegate` | `LayoutDelegate | undefined` | — | A delegate object that provides layout information for items in the collection. By default this uses the DOM, but this can be overridden to implement things like virtualized scrolling. |
| `menuTrigger` | `MenuTriggerAction | undefined` | 'input' | The interaction required to display the ComboBox menu. |
| `name` | `string | undefined` | — | The name of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname). |
| `onBlur` | `((e: FocusEvent<HTMLInputElement, Element>) => void) | undefined` | — | Handler that is called when the element loses focus. |
| `onChange` | `((value: ChangeValueType<M>) => void) | undefined` | — | Handler that is called when the value changes. |
| `onFocus` | `((e: FocusEvent<HTMLInputElement, Element>) => void) | undefined` | — | Handler that is called when the element receives focus. |
| `onFocusChange` | `((isFocused: boolean) => void) | undefined` | — | Handler that is called when the element's focus status changes. |
| `onInputChange` | `((value: string) => void) | undefined` | — | Handler that is called when the ComboBox input value changes. |
| `onKeyDown` | `((e: KeyboardEvent) => void) | undefined` | — | Handler that is called when a key is pressed. |
| `onKeyUp` | `((e: KeyboardEvent) => void) | undefined` | — | Handler that is called when a key is released. |
| `onOpenChange` | `((isOpen: boolean, menuTrigger?: MenuTriggerAction) => void) | undefined` | — | Method that is called when the open state of the menu changes. Returns the new open state and the action that caused the opening of the menu. |
| `placeholder` | `string | undefined` | — | Temporary text that occupies the text input when it is empty. |
| `selectionMode` | `M | undefined` | 'single' | Whether single or multiple selection is enabled. |
| `shouldFocusWrap` | `boolean | undefined` | — | Whether keyboard navigation is circular. |
| `validate` | `((value: ComboBoxValidationValue<M>) => true | undefined) | ValidationError | null | undefined` | — | A function that returns an error message if a given value is invalid. Validation errors are displayed to the user when the form is submitted if `validationBehavior="native"`. For realtime validation, use the `isInvalid` prop instead. |
| `validationBehavior` | `"aria" | "native" | undefined` | 'aria' | Whether to use native HTML form validation to prevent form submission when the value is missing or invalid, or mark the field as required or invalid via ARIA. |
| `value` | `ValueType<M> | undefined` | — | The current value (controlled). |

### ComboBoxAria

| Name | Type | Description |
|------|------|-------------|
| `buttonProps` \* | `AriaButtonProps<"button">` | Props for the optional trigger button, to be passed to `useButton`. |
| `descriptionProps` \* | `DOMAttributes<FocusableElement>` | Props for the combo box description element, if any. |
| `errorMessageProps` \* | `DOMAttributes<FocusableElement>` | Props for the combo box error message element, if any. |
| `inputProps` \* | `InputHTMLAttributes<HTMLInputElement>` | Props for the combo box input element. |
| `isInvalid` \* | `boolean` | Whether the input value is invalid. |
| `labelProps` \* | `DOMAttributes<FocusableElement>` | Props for the label element. |
| `listBoxProps` \* | `AriaListBoxOptions<T>` | Props for the list box, to be passed to `useListBox`. |
| `validationDetails` \* | `ValidityState` | The native validation details for the input. |
| `validationErrors` \* | `string[]` | The current error messages for the input if it is invalid, otherwise an empty array. |
| `valueProps` \* | `DOMAttributes<FocusableElement>` | Props for the element representing the selected value. |

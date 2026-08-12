# useNumberField

Provides the behavior and accessibility implementation for a number field component. Number
fields allow users to enter a number, and increment or decrement the value using stepper
buttons.

```tsx
import {NumberField} from 'hooks-starter/NumberField';

<NumberField label="Price" defaultValue={6} formatOptions={{style: 'currency', currency: 'USD'}} />
```

## API

```tsx
<NumberField>
  <Label />
  <Group>
    <Input />
    <Button slot="increment" />
    <Button slot="decrement" />
  </Group>
  <Text slot="description" />
  <FieldError />
</NumberField>
```

<FunctionAPIGroup functions={[
    {function: statelyDocs.exports.useNumberFieldState, links: statelyDocs.links},
    {function: docs.exports.useNumberField, links: docs.links},
  ]}/>

### NumberFieldState

### AriaNumberFieldProps

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `aria-describedby` | `string | undefined` | — | Identifies the element (or elements) that describes the object. |
| `aria-details` | `string | undefined` | — | Identifies the element (or elements) that provide a detailed, extended description for the object. |
| `aria-label` | `string | undefined` | — | Defines a string value that labels the current element. |
| `aria-labelledby` | `string | undefined` | — | Identifies the element (or elements) that labels the current element. |
| `autoFocus` | `boolean | undefined` | — | Whether the element should receive focus on render. |
| `commitBehavior` | `"snap" | "validate" | undefined` | 'snap' | Controls the behavior of the number field when the user blurs the field after editing. 'snap' will clamp the value to the min/max values, and snap to the nearest step value. 'validate' will not clamp the value, and will validate that the value is within the min/max range and on a valid step. |
| `decrementAriaLabel` | `string | undefined` | — | A custom aria-label for the decrement button. If not provided, the localized string "Decrement" is used. |
| `defaultValue` | `number | undefined` | — | The default value (uncontrolled). |
| `description` | `ReactNode` | — | A description for the field. Provides a hint such as specific requirements for what to choose. |
| `errorMessage` | `((v: ValidationResult) => ReactNode) | ReactNode` | — | An error message for the field. |
| `formatOptions` | `Intl.NumberFormatOptions | undefined` | — | Formatting options for the value displayed in the number field. This also affects what characters are allowed to be typed by the user. |
| `id` | `string | undefined` | — | The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). |
| `incrementAriaLabel` | `string | undefined` | — | A custom aria-label for the increment button. If not provided, the localized string "Increment" is used. |
| `isDisabled` | `boolean | undefined` | — | Whether the input is disabled. |
| `isInvalid` | `boolean | undefined` | — | Whether the input value is invalid. |
| `isReadOnly` | `boolean | undefined` | — | Whether the input can be selected but not changed by the user. |
| `isRequired` | `boolean | undefined` | — | Whether user input is required on the input before form submission. |
| `isWheelDisabled` | `boolean | undefined` | — | Enables or disables changing the value with scroll. |
| `label` | `ReactNode` | — | The content to display as the label. |
| `maxValue` | `number | undefined` | — | The largest value allowed for the input. |
| `minValue` | `number | undefined` | — | The smallest value allowed for the input. |
| `onBeforeInput` | `FormEventHandler<HTMLInputElement> | undefined` | — | Handler that is called when the input value is about to be modified. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/beforeinput_event). |
| `onBlur` | `((e: FocusEvent<Element>) => void) | undefined` | — | Handler that is called when the element loses focus. |
| `onChange` | `((value: number) => void) | undefined` | — | Handler that is called when the value changes. |
| `onCompositionEnd` | `CompositionEventHandler<HTMLInputElement> | undefined` | — | Handler that is called when a text composition system completes or cancels the current text composition session. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionend_event). |
| `onCompositionStart` | `CompositionEventHandler<HTMLInputElement> | undefined` | — | Handler that is called when a text composition system starts a new text composition session. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionstart_event). |
| `onCompositionUpdate` | `CompositionEventHandler<HTMLInputElement> | undefined` | — | Handler that is called when a new character is received in the current text composition session. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionupdate_event). |
| `onCopy` | `ClipboardEventHandler<HTMLInputElement> | undefined` | — | Handler that is called when the user copies text. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/oncopy). |
| `onCut` | `ClipboardEventHandler<HTMLInputElement> | undefined` | — | Handler that is called when the user cuts text. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/oncut). |
| `onFocus` | `((e: FocusEvent<Element>) => void) | undefined` | — | Handler that is called when the element receives focus. |
| `onFocusChange` | `((isFocused: boolean) => void) | undefined` | — | Handler that is called when the element's focus status changes. |
| `onInput` | `FormEventHandler<HTMLInputElement> | undefined` | — | Handler that is called when the input value is modified. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event). |
| `onKeyDown` | `((e: KeyboardEvent) => void) | undefined` | — | Handler that is called when a key is pressed. |
| `onKeyUp` | `((e: KeyboardEvent) => void) | undefined` | — | Handler that is called when a key is released. |
| `onPaste` | `ClipboardEventHandler<HTMLInputElement> | undefined` | — | Handler that is called when the user pastes text. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/onpaste). |
| `onSelect` | `ReactEventHandler<HTMLInputElement> | undefined` | — | Handler that is called when text in the input is selected. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/select_event). |
| `placeholder` | `string | undefined` | — | Temporary text that occupies the text input when it is empty. |
| `step` | `number | undefined` | — | The amount that the input value changes with each increment or decrement "tick". |
| `validate` | `((value: number) => true | undefined) | ValidationError | null | undefined` | — | A function that returns an error message if a given value is invalid. Validation errors are displayed to the user when the form is submitted if `validationBehavior="native"`. For realtime validation, use the `isInvalid` prop instead. |
| `validationBehavior` | `"aria" | "native" | undefined` | 'aria' | Whether to use native HTML form validation to prevent form submission when the value is missing or invalid, or mark the field as required or invalid via ARIA. |
| `value` | `number | undefined` | — | The current value (controlled). |

### NumberFieldAria

| Name | Type | Description |
|------|------|-------------|
| `decrementButtonProps` \* | `AriaButtonProps<"button">` | Props for the decrement button, to be passed to `useButton`. |
| `descriptionProps` \* | `DOMAttributes<FocusableElement>` | Props for the number field's description element, if any. |
| `errorMessageProps` \* | `DOMAttributes<FocusableElement>` | Props for the number field's error message element, if any. |
| `groupProps` \* | `GroupDOMAttributes` | Props for the group wrapper around the input and stepper buttons. |
| `incrementButtonProps` \* | `AriaButtonProps<"button">` | Props for the increment button, to be passed to `useButton`. |
| `inputProps` \* | `InputHTMLAttributes<HTMLInputElement>` | Props for the input element. |
| `isInvalid` \* | `boolean` | Whether the input value is invalid. |
| `labelProps` \* | `LabelHTMLAttributes<HTMLLabelElement>` | Props for the label element. |
| `validationDetails` \* | `ValidityState` | The native validation details for the input. |
| `validationErrors` \* | `string[]` | The current error messages for the input if it is invalid, otherwise an empty array. |

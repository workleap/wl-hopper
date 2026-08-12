# useRadioGroup

Provides the behavior and accessibility implementation for a radio group component.
Radio groups allow users to select a single item from a list of mutually exclusive options.

```tsx
import {RadioGroup, Radio} from 'hooks-starter/RadioGroup';

<RadioGroup label="Favorite pet">
  <Radio value="dogs">Dogs</Radio>
  <Radio value="cats">Cats</Radio>
</RadioGroup>
```

## API

```tsx
<RadioGroup>
  <Label />
  <RadioField>
    <RadioButton>
      <SelectionIndicator />
    </RadioButton>
    <Text slot="description" />
  </RadioField>
  <Text slot="description" />
  <FieldError />
</RadioGroup>
```

<FunctionAPIGroup functions={[
    {function: statelyDocs.exports.useRadioGroupState, links: statelyDocs.links},
    {function: docs.exports.useRadioGroup, links: docs.links},
    {function: docs.exports.useRadio, links: docs.links},
  ]}/>

### RadioGroupState

### AriaRadioGroupProps

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `aria-describedby` | `string | undefined` | — | Identifies the element (or elements) that describes the object. |
| `aria-details` | `string | undefined` | — | Identifies the element (or elements) that provide a detailed, extended description for the object. |
| `aria-errormessage` | `string | undefined` | — | Identifies the element that provides an error message for the object. |
| `aria-label` | `string | undefined` | — | Defines a string value that labels the current element. |
| `aria-labelledby` | `string | undefined` | — | Identifies the element (or elements) that labels the current element. |
| `defaultValue` | `string | null | undefined` | — | The default value (uncontrolled). |
| `description` | `ReactNode` | — | A description for the field. Provides a hint such as specific requirements for what to choose. |
| `errorMessage` | `((v: ValidationResult) => ReactNode) | ReactNode` | — | An error message for the field. |
| `form` | `string | undefined` | — | The `<form>` element to associate the input with. The value of this attribute must be the id of a `<form>` in the same document. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#form). |
| `id` | `string | undefined` | — | The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). |
| `isDisabled` | `boolean | undefined` | — | Whether the input is disabled. |
| `isInvalid` | `boolean | undefined` | — | Whether the input value is invalid. |
| `isReadOnly` | `boolean | undefined` | — | Whether the input can be selected but not changed by the user. |
| `isRequired` | `boolean | undefined` | — | Whether user input is required on the input before form submission. |
| `label` | `ReactNode` | — | The content to display as the label. |
| `name` | `string | undefined` | — | The name of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname). |
| `onBlur` | `((e: FocusEvent<Element>) => void) | undefined` | — | Handler that is called when the element loses focus. |
| `onChange` | `((value: string) => void) | undefined` | — | Handler that is called when the value changes. |
| `onFocus` | `((e: FocusEvent<Element>) => void) | undefined` | — | Handler that is called when the element receives focus. |
| `onFocusChange` | `((isFocused: boolean) => void) | undefined` | — | Handler that is called when the element's focus status changes. |
| `orientation` | `Orientation | undefined` | 'vertical' | The axis the Radio Button(s) should align with. |
| `validate` | `((value: string) => true | undefined) | ValidationError | null | undefined` | — | A function that returns an error message if a given value is invalid. Validation errors are displayed to the user when the form is submitted if `validationBehavior="native"`. For realtime validation, use the `isInvalid` prop instead. |
| `validationBehavior` | `"aria" | "native" | undefined` | 'aria' | Whether to use native HTML form validation to prevent form submission when the value is missing or invalid, or mark the field as required or invalid via ARIA. |
| `value` | `string | null | undefined` | — | The current value (controlled). |

### RadioGroupAria

| Name | Type | Description |
|------|------|-------------|
| `descriptionProps` \* | `DOMAttributes<FocusableElement>` | Props for the radio group description element, if any. |
| `errorMessageProps` \* | `DOMAttributes<FocusableElement>` | Props for the radio group error message element, if any. |
| `isInvalid` \* | `boolean` | Whether the input value is invalid. |
| `labelProps` \* | `DOMAttributes<FocusableElement>` | Props for the radio group's visible label (if any). |
| `radioGroupProps` \* | `DOMAttributes<FocusableElement>` | Props for the radio group wrapper element. |
| `validationDetails` \* | `ValidityState` | The native validation details for the input. |
| `validationErrors` \* | `string[]` | The current error messages for the input if it is invalid, otherwise an empty array. |

### AriaRadioProps

| Name | Type | Description |
|------|------|-------------|
| `value` \* | `string` | The value of the radio button, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio#Value). |
| `aria-describedby` | `string | undefined` | Identifies the element (or elements) that describes the object. |
| `aria-details` | `string | undefined` | Identifies the element (or elements) that provide a detailed, extended description for the object. |
| `aria-label` | `string | undefined` | Defines a string value that labels the current element. |
| `aria-labelledby` | `string | undefined` | Identifies the element (or elements) that labels the current element. |
| `autoFocus` | `boolean | undefined` | Whether the element should receive focus on render. |
| `children` | `ReactNode` | The label for the Radio. Accepts any renderable node. |
| `id` | `string | undefined` | The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). |
| `isDisabled` | `boolean | undefined` | Whether the radio button is disabled or not. Shows that a selection exists, but is not available in that circumstance. |
| `onBlur` | `((e: FocusEvent<Element>) => void) | undefined` | Handler that is called when the element loses focus. |
| `onClick` | `((e: MouseEvent<FocusableElement>) => void) | undefined` | **Not recommended – use `onPress` instead.** `onClick` is an alias for `onPress` provided for compatibility with other libraries. `onPress` provides additional event details for non-mouse interactions. |
| `onFocus` | `((e: FocusEvent<Element>) => void) | undefined` | Handler that is called when the element receives focus. |
| `onFocusChange` | `((isFocused: boolean) => void) | undefined` | Handler that is called when the element's focus status changes. |
| `onKeyDown` | `((e: KeyboardEvent) => void) | undefined` | Handler that is called when a key is pressed. |
| `onKeyUp` | `((e: KeyboardEvent) => void) | undefined` | Handler that is called when a key is released. |
| `onPress` | `((e: PressEvent) => void) | undefined` | Handler that is called when the press is released over the target. |
| `onPressChange` | `((isPressed: boolean) => void) | undefined` | Handler that is called when the press state changes. |
| `onPressEnd` | `((e: PressEvent) => void) | undefined` | Handler that is called when a press interaction ends, either over the target or when the pointer leaves the target. |
| `onPressStart` | `((e: PressEvent) => void) | undefined` | Handler that is called when a press interaction starts. |
| `onPressUp` | `((e: PressEvent) => void) | undefined` | Handler that is called when a press is released over the target, regardless of whether it started on the target or not. |

### RadioAria

| Name | Type | Description |
|------|------|-------------|
| `descriptionProps` \* | `DOMAttributesWithRef<HTMLElement>` | Props for the checkbox description element, if any. |
| `inputProps` \* | `InputHTMLAttributes<HTMLInputElement>` | Props for the input element. |
| `isDisabled` \* | `boolean` | Whether the radio is disabled. |
| `isPressed` \* | `boolean` | Whether the radio is in a pressed state. |
| `isSelected` \* | `boolean` | Whether the radio is currently selected. |
| `labelProps` \* | `LabelHTMLAttributes<HTMLLabelElement>` | Props for the label wrapper element. |

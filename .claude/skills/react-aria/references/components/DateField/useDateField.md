# useDateField

Provides the behavior and accessibility implementation for a date field component.
A date field allows users to enter and edit date and time values using a keyboard.
Each part of a date value is displayed in an individually editable segment.

```tsx
import {DateField} from 'hooks-starter/DateField';

<DateField label="Event date" />
```

## API

```tsx
<DateField>
  <Label />
  <DateInput>
    {segment => <DateSegment segment={segment} />}
  </DateInput>
  <Text slot="description" />
  <FieldError />
</DateField>
```

<FunctionAPIGroup functions={[
    {function: statelyDocs.exports.useDateFieldState, links: statelyDocs.links},
    {function: docs.exports.useDateField, links: docs.links},
    {function: docs.exports.useDateSegment, links: docs.links},
  ]}/>

### DateFieldState

### AriaDateFieldProps

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `aria-describedby` | `string | undefined` | — | Identifies the element (or elements) that describes the object. |
| `aria-details` | `string | undefined` | — | Identifies the element (or elements) that provide a detailed, extended description for the object. |
| `aria-label` | `string | undefined` | — | Defines a string value that labels the current element. |
| `aria-labelledby` | `string | undefined` | — | Identifies the element (or elements) that labels the current element. |
| `autoComplete` | `string | undefined` | — | Describes the type of autocomplete functionality the input should provide if any. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefautocomplete). |
| `autoFocus` | `boolean | undefined` | — | Whether the element should receive focus on render. |
| `defaultValue` | `T | null | undefined` | — | The default value (uncontrolled). |
| `description` | `ReactNode` | — | A description for the field. Provides a hint such as specific requirements for what to choose. |
| `errorMessage` | `((v: ValidationResult) => ReactNode) | ReactNode` | — | An error message for the field. |
| `form` | `string | undefined` | — | The `<form>` element to associate the input with. The value of this attribute must be the id of a `<form>` in the same document. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#form). |
| `granularity` | `Granularity | undefined` | — | Determines the smallest unit that is displayed in the date picker. By default, this is `"day"` for dates, and `"minute"` for times. |
| `hideTimeZone` | `boolean | undefined` | false | Whether to hide the time zone abbreviation. |
| `hourCycle` | `12 | 24 | undefined` | — | Whether to display the time in 12 or 24 hour format. By default, this is determined by the user's locale. |
| `id` | `string | undefined` | — | The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). |
| `isDateUnavailable` | `((date: DateValue) => boolean) | undefined` | — | Callback that is called for each date of the calendar. If it returns true, then the date is unavailable. |
| `isDisabled` | `boolean | undefined` | — | Whether the input is disabled. |
| `isInvalid` | `boolean | undefined` | — | Whether the input value is invalid. |
| `isReadOnly` | `boolean | undefined` | — | Whether the input can be selected but not changed by the user. |
| `isRequired` | `boolean | undefined` | — | Whether user input is required on the input before form submission. |
| `label` | `ReactNode` | — | The content to display as the label. |
| `maxValue` | `DateValue | null | undefined` | — | The maximum allowed date that a user may select. |
| `minValue` | `DateValue | null | undefined` | — | The minimum allowed date that a user may select. |
| `name` | `string | undefined` | — | The name of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname). |
| `onBlur` | `((e: FocusEvent<Element>) => void) | undefined` | — | Handler that is called when the element loses focus. |
| `onChange` | `((value: MappedDateValue<T> | null) => void) | undefined` | — | Handler that is called when the value changes. |
| `onFocus` | `((e: FocusEvent<Element>) => void) | undefined` | — | Handler that is called when the element receives focus. |
| `onFocusChange` | `((isFocused: boolean) => void) | undefined` | — | Handler that is called when the element's focus status changes. |
| `onKeyDown` | `((e: KeyboardEvent) => void) | undefined` | — | Handler that is called when a key is pressed. |
| `onKeyUp` | `((e: KeyboardEvent) => void) | undefined` | — | Handler that is called when a key is released. |
| `placeholderValue` | `T | null | undefined` | — | A placeholder date that influences the format of the placeholder shown when no value is selected. Defaults to today's date at midnight. |
| `shouldForceLeadingZeros` | `boolean | undefined` | — | Whether to always show leading zeros in the month, day, and hour fields. By default, this is determined by the user's locale. |
| `validate` | `((value: MappedDateValue<T>) => true | undefined) | ValidationError | null | undefined` | — | A function that returns an error message if a given value is invalid. Validation errors are displayed to the user when the form is submitted if `validationBehavior="native"`. For realtime validation, use the `isInvalid` prop instead. |
| `validationBehavior` | `"aria" | "native" | undefined` | 'aria' | Whether to use native HTML form validation to prevent form submission when the value is missing or invalid, or mark the field as required or invalid via ARIA. |
| `value` | `T | null | undefined` | — | The current value (controlled). |

### DateFieldAria

| Name | Type | Description |
|------|------|-------------|
| `descriptionProps` \* | `DOMAttributes<FocusableElement>` | Props for the description element, if any. |
| `errorMessageProps` \* | `DOMAttributes<FocusableElement>` | Props for the error message element, if any. |
| `fieldProps` \* | `GroupDOMAttributes` | Props for the field grouping element. |
| `inputProps` \* | `InputHTMLAttributes<HTMLInputElement>` | Props for the hidden input element for HTML form submission. |
| `isInvalid` \* | `boolean` | Whether the input value is invalid. |
| `labelProps` \* | `DOMAttributes<FocusableElement>` | Props for the field's visible label element, if any. |
| `validationDetails` \* | `ValidityState` | The native validation details for the input. |
| `validationErrors` \* | `string[]` | The current error messages for the input if it is invalid, otherwise an empty array. |

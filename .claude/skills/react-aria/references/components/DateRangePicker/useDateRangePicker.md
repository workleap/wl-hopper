# useDateRangePicker

Provides the behavior and accessibility implementation for a date picker component.
A date range picker combines two DateFields and a RangeCalendar popover to allow
users to enter or select a date and time range.

```tsx
import {DateRangePicker} from 'hooks-starter/DateRangePicker';

<DateRangePicker label="Trip dates" />
```

## API

```tsx
<DateRangePicker>
  <Label />
  <Group>
    <DateInput slot="start">
      {segment => <DateSegment segment={segment} />}
    </DateInput>
    <span aria-hidden="true">–</span>
    <DateInput slot="end">
      {segment => <DateSegment segment={segment} />}
    </DateInput>
    <Button />
  </Group>
  <Popover>
    <RangeCalendar />
  </Popover>
</DateRangePicker>
```

<FunctionAPIGroup functions={[
    {function: statelyDocs.exports.useDateRangePickerState, links: statelyDocs.links},
    {function: docs.exports.useDateRangePicker, links: docs.links},
  ]}/>

### DateRangePickerState

### AriaDateRangePickerProps

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `allowsNonContiguousRanges` | `boolean | undefined` | — | When combined with `isDateUnavailable`, determines whether non-contiguous ranges, i.e. ranges containing unavailable dates, may be selected. |
| `aria-describedby` | `string | undefined` | — | Identifies the element (or elements) that describes the object. |
| `aria-details` | `string | undefined` | — | Identifies the element (or elements) that provide a detailed, extended description for the object. |
| `aria-label` | `string | undefined` | — | Defines a string value that labels the current element. |
| `aria-labelledby` | `string | undefined` | — | Identifies the element (or elements) that labels the current element. |
| `autoFocus` | `boolean | undefined` | — | Whether the element should receive focus on render. |
| `defaultOpen` | `boolean | undefined` | — | Whether the overlay is open by default (uncontrolled). |
| `defaultValue` | `RangeValue<T> | null | undefined` | — | The default value (uncontrolled). |
| `description` | `ReactNode` | — | A description for the field. Provides a hint such as specific requirements for what to choose. |
| `endName` | `string | undefined` | — | The name of the end date input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname). |
| `errorMessage` | `((v: ValidationResult) => ReactNode) | ReactNode` | — | An error message for the field. |
| `firstDayOfWeek` | `"fri" | "mon" | "sat" | "sun" | "thu" | "tue" | "wed" | undefined` | — | The day that starts the week. |
| `form` | `string | undefined` | — | The `<form>` element to associate the input with. The value of this attribute must be the id of a `<form>` in the same document. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#form). |
| `granularity` | `Granularity | undefined` | — | Determines the smallest unit that is displayed in the date picker. By default, this is `"day"` for dates, and `"minute"` for times. |
| `hideTimeZone` | `boolean | undefined` | false | Whether to hide the time zone abbreviation. |
| `hourCycle` | `12 | 24 | undefined` | — | Whether to display the time in 12 or 24 hour format. By default, this is determined by the user's locale. |
| `id` | `string | undefined` | — | The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). |
| `isDateUnavailable` | `((date: DateValue, anchorDate: CalendarDate | null) => boolean) | undefined` | — | Callback that is called for each date of the calendar. If it returns true, then the date is unavailable. |
| `isDisabled` | `boolean | undefined` | — | Whether the input is disabled. |
| `isInvalid` | `boolean | undefined` | — | Whether the input value is invalid. |
| `isOpen` | `boolean | undefined` | — | Whether the overlay is open by default (controlled). |
| `isReadOnly` | `boolean | undefined` | — | Whether the input can be selected but not changed by the user. |
| `isRequired` | `boolean | undefined` | — | Whether user input is required on the input before form submission. |
| `label` | `ReactNode` | — | The content to display as the label. |
| `maxValue` | `DateValue | null | undefined` | — | The maximum allowed date that a user may select. |
| `minValue` | `DateValue | null | undefined` | — | The minimum allowed date that a user may select. |
| `onBlur` | `((e: FocusEvent<Element>) => void) | undefined` | — | Handler that is called when the element loses focus. |
| `onChange` | `((value: RangeValue<MappedDateValue<T>> | null) => void) | undefined` | — | Handler that is called when the value changes. |
| `onFocus` | `((e: FocusEvent<Element>) => void) | undefined` | — | Handler that is called when the element receives focus. |
| `onFocusChange` | `((isFocused: boolean) => void) | undefined` | — | Handler that is called when the element's focus status changes. |
| `onKeyDown` | `((e: KeyboardEvent) => void) | undefined` | — | Handler that is called when a key is pressed. |
| `onKeyUp` | `((e: KeyboardEvent) => void) | undefined` | — | Handler that is called when a key is released. |
| `onOpenChange` | `((isOpen: boolean) => void) | undefined` | — | Handler that is called when the overlay's open state changes. |
| `pageBehavior` | `PageBehavior | undefined` | visible | Controls the behavior of paging. Pagination either works by advancing the visible page by visibleDuration (default) or one unit of visibleDuration. |
| `placeholderValue` | `T | null | undefined` | — | A placeholder date that influences the format of the placeholder shown when no value is selected. Defaults to today's date at midnight. |
| `shouldForceLeadingZeros` | `boolean | undefined` | — | Whether to always show leading zeros in the month, day, and hour fields. By default, this is determined by the user's locale. |
| `startName` | `string | undefined` | — | The name of the start date input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname). |
| `validate` | `((value: RangeValue<MappedDateValue<T>>) => true | undefined) | ValidationError | null | undefined` | — | A function that returns an error message if a given value is invalid. Validation errors are displayed to the user when the form is submitted if `validationBehavior="native"`. For realtime validation, use the `isInvalid` prop instead. |
| `validationBehavior` | `"aria" | "native" | undefined` | 'aria' | Whether to use native HTML form validation to prevent form submission when the value is missing or invalid, or mark the field as required or invalid via ARIA. |
| `value` | `RangeValue<T> | null | undefined` | — | The current value (controlled). |

### DateRangePickerAria

| Name | Type | Description |
|------|------|-------------|
| `buttonProps` \* | `AriaButtonProps<"button">` | Props for the popover trigger button. |
| `calendarProps` \* | `RangeCalendarProps<DateValue>` | Props for the range calendar within the popover dialog. |
| `descriptionProps` \* | `DOMAttributes<FocusableElement>` | Props for the description element, if any. |
| `dialogProps` \* | `AriaDialogProps` | Props for the popover dialog. |
| `endFieldProps` \* | `AriaDatePickerProps<DateValue>` | Props for the end date field. |
| `errorMessageProps` \* | `DOMAttributes<FocusableElement>` | Props for the error message element, if any. |
| `groupProps` \* | `GroupDOMAttributes` | Props for the grouping element containing the date fields and button. |
| `isInvalid` \* | `boolean` | Whether the input value is invalid. |
| `labelProps` \* | `DOMAttributes<FocusableElement>` | Props for the date range picker's visible label element, if any. |
| `startFieldProps` \* | `AriaDatePickerProps<DateValue>` | Props for the start date field. |
| `validationDetails` \* | `ValidityState` | The native validation details for the input. |
| `validationErrors` \* | `string[]` | The current error messages for the input if it is invalid, otherwise an empty array. |

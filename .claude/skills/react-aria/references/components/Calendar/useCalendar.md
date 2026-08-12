# useCalendar

Provides the behavior and accessibility implementation for a calendar component.
A calendar displays one or more date grids and allows users to select a single date.

```tsx
import {Calendar} from 'hooks-starter/Calendar';

<Calendar aria-label="Event date" />
```

## API

```tsx
<Calendar>
  <CalendarHeading />
  <CalendarMonthPicker />
  <CalendarYearPicker />
  <Button slot="previous" />
  <Button slot="next" />
  <CalendarGrid>
    <CalendarGridHeader>
      {day => <CalendarHeaderCell />}
    </CalendarGridHeader>
    <CalendarGridBody>
      {date => <CalendarCell date={date} />}
    </CalendarGridBody>
  </CalendarGrid>
  <Text slot="errorMessage" />
</Calendar>
```

<FunctionAPIGroup functions={[
    {function: statelyDocs.exports.useCalendarState, links: statelyDocs.links},
    {function: docs.exports.useCalendar, links: docs.links},
    {function: docs.exports.useCalendarGrid, links: docs.links},
    {function: docs.exports.useCalendarCell, links: docs.links},
    {function: docs.exports.useCalendarMonthPicker, links: docs.links},
    {function: docs.exports.useCalendarYearPicker, links: docs.links},
  ]}/>

### CalendarState

### AriaCalendarProps

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `aria-describedby` | `string | undefined` | — | Identifies the element (or elements) that describes the object. |
| `aria-details` | `string | undefined` | — | Identifies the element (or elements) that provide a detailed, extended description for the object. |
| `aria-label` | `string | undefined` | — | Defines a string value that labels the current element. |
| `aria-labelledby` | `string | undefined` | — | Identifies the element (or elements) that labels the current element. |
| `autoFocus` | `boolean | undefined` | false | Whether to automatically focus the calendar when it mounts. |
| `defaultFocusedValue` | `DateValue | null | undefined` | — | The date that is focused when the calendar first mounts (uncontrolled). |
| `defaultValue` | `CalendarValueType<null, M | T> | undefined` | — | The default value (uncontrolled). |
| `errorMessage` | `ReactNode` | — | An error message to display when the selected value is invalid. |
| `firstDayOfWeek` | `"fri" | "mon" | "sat" | "sun" | "thu" | "tue" | "wed" | undefined` | — | The day that starts the week. |
| `focusedValue` | `DateValue | null | undefined` | — | Controls the currently focused date within the calendar. |
| `id` | `string | undefined` | — | The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). |
| `isDateUnavailable` | `((date: DateValue) => boolean) | undefined` | — | Callback that is called for each date of the calendar. If it returns true, then the date is unavailable. |
| `isDisabled` | `boolean | undefined` | false | Whether the calendar is disabled. |
| `isInvalid` | `boolean | undefined` | — | Whether the current selection is invalid according to application logic. |
| `isReadOnly` | `boolean | undefined` | false | Whether the calendar value is immutable. |
| `maxValue` | `DateValue | null | undefined` | — | The maximum allowed date that a user may select. |
| `minValue` | `DateValue | null | undefined` | — | The minimum allowed date that a user may select. |
| `onChange` | `((value: CalendarValueType<MappedDateValue<T>, M>) => void) | undefined` | — | Handler that is called when the value changes. |
| `onFocusChange` | `((date: CalendarDate) => void) | undefined` | — | Handler that is called when the focused date changes. |
| `pageBehavior` | `PageBehavior | undefined` | visible | Controls the behavior of paging. Pagination either works by advancing the visible page by visibleDuration (default) or one unit of visibleDuration. |
| `selectionAlignment` | `"center" | "end" | "start" | undefined` | 'center' | Determines the alignment of the visible months on initial render based on the current selection or current date if there is no selection. |
| `selectionMode` | `M | undefined` | 'single' | Whether single or multiple selection is enabled. |
| `value` | `CalendarValueType<null, M | T> | undefined` | — | The current value (controlled). |
| `weeksInMonth` | `number | undefined` | — | The number of weeks in a month. This overrides the default set by the locale. |

### CalendarAria

| Name | Type | Description |
|------|------|-------------|
| `calendarProps` \* | `DOMAttributes<FocusableElement>` | Props for the calendar grouping element. |
| `errorMessageProps` \* | `DOMAttributes<FocusableElement>` | Props for the error message element, if any. |
| `nextButtonProps` \* | `AriaButtonProps<"button">` | Props for the next button. |
| `prevButtonProps` \* | `AriaButtonProps<"button">` | Props for the previous button. |
| `title` \* | `string` | A description of the visible date range, for use in the calendar title. |

### AriaCalendarGridProps

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `endDate` | `CalendarDate | undefined` | — | The last date displayed in the calendar grid. Defaults to the last visible date in the calendar. Override this to display multiple date grids in a calendar. |
| `firstDayOfWeek` | `"fri" | "mon" | "sat" | "sun" | "thu" | "tue" | "wed" | undefined` | — | The day that starts the week. |
| `startDate` | `CalendarDate | undefined` | — | The first date displayed in the calendar grid. Defaults to the first visible date in the calendar. Override this to display multiple date grids in a calendar. |
| `weekdayStyle` | `"long" | "narrow" | "short" | undefined` | 'narrow' | The style of weekday names to display in the calendar grid header, e.g. single letter, abbreviation, or full day name. |

### CalendarGridAria

| Name | Type | Description |
|------|------|-------------|
| `gridProps` \* | `DOMAttributes<FocusableElement>` | Props for the date grid element (e.g. `<table>`). |
| `headerProps` \* | `DOMAttributes<FocusableElement>` | Props for the grid header element (e.g. `<thead>`). |
| `weekDays` \* | `string[]` | A list of week day abbreviations formatted for the current locale, typically used in column headers. |
| `weeksInMonth` \* | `number` | The number of weeks in the month. |

### AriaCalendarCellProps

| Name | Type | Description |
|------|------|-------------|
| `date` \* | `CalendarDate` | The date that this cell represents. |
| `isDisabled` | `boolean | undefined` | Whether the cell is disabled. By default, this is determined by the Calendar's `minValue`, `maxValue`, and `isDisabled` props. |
| `isOutsideMonth` | `boolean | undefined` | Whether the cell is outside of the current month. |

### CalendarCellAria

| Name | Type | Description |
|------|------|-------------|
| `buttonProps` \* | `DOMAttributes<FocusableElement>` | Props for the button element within the cell. |
| `cellProps` \* | `DOMAttributes<FocusableElement>` | Props for the grid cell element (e.g. `<td>`). |
| `formattedDate` \* | `string` | The day number formatted according to the current locale. |
| `isDisabled` \* | `boolean` | Whether the cell is disabled, according to the calendar's `minValue`, `maxValue`, and `isDisabled` props. Disabled dates are not focusable, and cannot be selected by the user. They are typically displayed with a dimmed appearance. |
| `isFocused` \* | `boolean` | Whether the cell is focused. |
| `isInvalid` \* | `boolean` | Whether the cell is part of an invalid selection. |
| `isOutsideVisibleRange` \* | `boolean` | Whether the cell is outside the visible range of the calendar. For example, dates before the first day of a month in the same week. |
| `isPressed` \* | `boolean` | Whether the cell is currently being pressed. |
| `isSelected` \* | `boolean` | Whether the cell is selected. |
| `isUnavailable` \* | `boolean` | Whether the cell is unavailable, according to the calendar's `isDateUnavailable` prop. Unavailable dates remain focusable, but cannot be selected by the user. They should be displayed with a visual affordance to indicate they are unavailable, such as a different color or a strikethrough. Note that because they are focusable, unavailable dates must meet a 4.5:1 color contrast ratio, [as defined by WCAG](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html). |

### CalendarMonthPickerProps

### Properties

| Name | Type | Description |
|------|------|-------------|
| `format` | `"2-digit" | "long" | "narrow" | "numeric" | "short" | undefined` | The format of the month. |

### Methods

#### `children(renderProps: CalendarMonthPickerAria): JSX.Element`

A function to render the month picker.

### CalendarMonthPickerAria

### Properties

| Name | Type | Description |
|------|------|-------------|
| `aria-label` \* | `string` | — |
| `items` \* | `CalendarMonthPickerItem[]` | — |
| `value` \* | `Key` | — |

### Methods

#### `onChange(key: Key | null): void`

### CalendarYearPickerProps

### Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `format` | `CalendarYearPickerFormatOptions | undefined` | — | The format to display. |
| `visibleYears` | `number | undefined` | 20 | The number of years to display. |

### Methods

#### `children(renderProps: CalendarYearPickerAria): JSX.Element`

A function to render the year picker.

### CalendarYearPickerAria

### Properties

| Name | Type | Description |
|------|------|-------------|
| `aria-label` \* | `string` | — |
| `items` \* | `CalendarYearPickerItem[]` | — |
| `value` \* | `Key` | — |

### Methods

#### `onChange(key: Key | null): void`

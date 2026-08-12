# useRangeCalendar

Provides the behavior and accessibility implementation for a range calendar component. A range
calendar displays one or more date grids and allows users to select a contiguous range of dates.

```tsx
import {RangeCalendar} from 'hooks-starter/RangeCalendar';

<RangeCalendar aria-label="Trip dates" />
```

## API

```tsx
<RangeCalendar>
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
</RangeCalendar>
```

<FunctionAPIGroup functions={[
    {function: statelyDocs.exports.useRangeCalendarState, links: statelyDocs.links},
    {function: docs.exports.useRangeCalendar, links: docs.links},
    {function: docs.exports.useCalendarGrid, links: docs.links},
    {function: docs.exports.useCalendarCell, links: docs.links},
    {function: docs.exports.useCalendarMonthPicker, links: docs.links},
    {function: docs.exports.useCalendarYearPicker, links: docs.links},
  ]}/>

### RangeCalendarState

### AriaRangeCalendarProps

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `allowsNonContiguousRanges` | `boolean | undefined` | — | When combined with `isDateUnavailable`, determines whether non-contiguous ranges, i.e. ranges containing unavailable dates, may be selected. |
| `aria-describedby` | `string | undefined` | — | Identifies the element (or elements) that describes the object. |
| `aria-details` | `string | undefined` | — | Identifies the element (or elements) that provide a detailed, extended description for the object. |
| `aria-label` | `string | undefined` | — | Defines a string value that labels the current element. |
| `aria-labelledby` | `string | undefined` | — | Identifies the element (or elements) that labels the current element. |
| `autoFocus` | `boolean | undefined` | false | Whether to automatically focus the calendar when it mounts. |
| `commitBehavior` | `"clear" | "reset" | "select" | undefined` | 'select' | Controls the behavior when a pointer is released outside the calendar or a blur occurs mid selection: - `clear`: clear the currently selected range of dates. - `reset`: reset the selection to the previously selected range of dates. - `select`: select the currently hovered range of dates. |
| `defaultFocusedValue` | `DateValue | null | undefined` | — | The date that is focused when the calendar first mounts (uncontrolled). |
| `defaultValue` | `RangeValue<T> | null | undefined` | — | The default value (uncontrolled). |
| `errorMessage` | `ReactNode` | — | An error message to display when the selected value is invalid. |
| `firstDayOfWeek` | `"fri" | "mon" | "sat" | "sun" | "thu" | "tue" | "wed" | undefined` | — | The day that starts the week. |
| `focusedValue` | `DateValue | null | undefined` | — | Controls the currently focused date within the calendar. |
| `id` | `string | undefined` | — | The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). |
| `isDateUnavailable` | `((date: DateValue, anchorDate: CalendarDate | null) => boolean) | undefined` | — | Callback that is called for each date of the calendar. If it returns true, then the date is unavailable. The second argument provides the current selection anchor date, if any. This can be used to adjust the available dates based on the user's first selected date. |
| `isDisabled` | `boolean | undefined` | false | Whether the calendar is disabled. |
| `isInvalid` | `boolean | undefined` | — | Whether the current selection is invalid according to application logic. |
| `isReadOnly` | `boolean | undefined` | false | Whether the calendar value is immutable. |
| `maxValue` | `DateValue | null | undefined` | — | The maximum allowed date that a user may select. |
| `minValue` | `DateValue | null | undefined` | — | The minimum allowed date that a user may select. |
| `onChange` | `((value: RangeValue<MappedDateValue<T>>) => void) | undefined` | — | Handler that is called when the value changes. |
| `onFocusChange` | `((date: CalendarDate) => void) | undefined` | — | Handler that is called when the focused date changes. |
| `pageBehavior` | `PageBehavior | undefined` | visible | Controls the behavior of paging. Pagination either works by advancing the visible page by visibleDuration (default) or one unit of visibleDuration. |
| `selectionAlignment` | `"center" | "end" | "start" | undefined` | 'center' | Determines the alignment of the visible months on initial render based on the current selection or current date if there is no selection. |
| `value` | `RangeValue<T> | null | undefined` | — | The current value (controlled). |
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

### AriaCalendarCellProps

| Name | Type | Description |
|------|------|-------------|
| `date` \* | `CalendarDate` | The date that this cell represents. |
| `isDisabled` | `boolean | undefined` | Whether the cell is disabled. By default, this is determined by the Calendar's `minValue`, `maxValue`, and `isDisabled` props. |
| `isOutsideMonth` | `boolean | undefined` | Whether the cell is outside of the current month. |

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

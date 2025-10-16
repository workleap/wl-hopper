import type { ResponsiveProp, StyledComponentProps } from "@hopper-ui/styled-system";
import type { MutableRefObject } from "react";
import type {
    DateRangePickerProps as AriaDateRangePickerProps,
    DateValue
} from "react-aria-components";

import type { CalendarProps } from "../../calendar/index.ts";
import type { InputGroupProps } from "../../inputs/index.ts";
import type { FieldProps } from "../../utils/index.ts";


export const GlobalDateRangePickerCssSelector = "hop-DateRangePicker";

export interface DateRangePickerProps extends
    StyledComponentProps<Omit<AriaDateRangePickerProps<DateValue>, "children" | "hideTimezone" | "granularity" | "hourCycle">>,
    Pick<CalendarProps, "createCalendar" | "pageBehavior" | "firstDayOfWeek" | "isDateUnavailable">,
    FieldProps {
    /**
     * If `true`, the DateRangePicker will take all available width.
     * @default false
     */
    isFluid?: ResponsiveProp<boolean>;

    /**
     * A ref for the HTML input element.
     */
    inputStartRef?: MutableRefObject<HTMLInputElement | null>;

    /**
     * A ref for the HTML input element.
     */
    inputEndRef?: MutableRefObject<HTMLInputElement | null>;

    /**
     * The props for the InputGroup.
     */
    inputGroupProps?: InputGroupProps;

    /**
     * The maximum number of months to display at once in the calendar popover, if screen space permits.
     * @default 1
     */
    maxVisibleMonths?: number;
}

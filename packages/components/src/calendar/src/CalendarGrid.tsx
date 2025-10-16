import type { CalendarDate } from "@internationalized/date";
import { filterDOMProps } from "@react-aria/utils";
import clsx from "clsx";
import { cloneElement, useCallback, useContext, type PropsWithChildren } from "react";
import {
    CalendarGrid as AriaCalendarGrid,
    CalendarGridBody as AriaCalendarGridBody,
    CalendarHeaderCell as AriaCalendarHeaderCell,
    CalendarGridHeader,
    CalendarStateContext,
    RangeCalendarStateContext,
    type CalendarGridBodyProps as AriaCalendarGridBodyProps,
    type CalendarGridProps as AriaCalendarGridProps
} from "react-aria-components";

import { cssModule } from "../../utils/index.ts";

import { CalendarCell } from "./CalendarCell.tsx";
import { RangeCalendarCell } from "./RangeCalendarCell.tsx";

import styles from "./CalendarGrid.module.css";

export const GlobalCalendarGridCssSelector = "hop-CalendarGrid";

export interface CalendarGridProps extends Omit<AriaCalendarGridProps, "children">, PropsWithChildren {
    /**
   * Whether the calendar should always display 6 weeks.
   * @default false
   */
    isFixedWeeks?: boolean;
}

export const CalendarGrid = (props: CalendarGridProps) => {
    const { weekdayStyle = "short", isFixedWeeks } = props;
    const calendarState = useContext(CalendarStateContext);
    const rangeCalendarState = useContext(RangeCalendarStateContext);
    const state = calendarState ?? rangeCalendarState!;
    let startDate = state.visibleRange.start;
    if (props.offset) {
        startDate = startDate.add(props.offset);
    }

    const isRangeCalendar = !!rangeCalendarState;

    const classNames = clsx(
        GlobalCalendarGridCssSelector,
        cssModule(
            styles,
            GlobalCalendarGridCssSelector
        )
    );

    const formatMonthName = useCallback((day: string) => {
        if (weekdayStyle === "short") {
            // Removes the last letter of weekday style "short", from 3 letters to 2. E.g. "Mon" -> "Mo"
            return day.slice(0, -1);
        }

        return day;
    }, [weekdayStyle]);

    const renderDate = (date: CalendarDate) => (
        isRangeCalendar ? <RangeCalendarCell date={date} /> : <CalendarCell date={date} />
    );

    return (
        <AriaCalendarGrid
            weekdayStyle={weekdayStyle}
            className={classNames}
            {...props}
        >
            <CalendarGridHeader>
                {day => (
                    <AriaCalendarHeaderCell className={styles["hop-CalendarGrid__header-cell"]}>
                        {/* Removes the last letter of weekday style "short", from 3 letters to 2. E.g. "Mon" -> "Mo" */}
                        {formatMonthName(day)}
                    </AriaCalendarHeaderCell>
                )}
            </CalendarGridHeader>
            {isFixedWeeks ? (
                <CalendarGridBody startDate={startDate} className={styles["hop-CalendarGrid__body"]}>
                    {renderDate}
                </CalendarGridBody>
            ) : (
                <AriaCalendarGridBody className={styles["hop-CalendarGrid__body"]}>
                    {renderDate}
                </AriaCalendarGridBody>
            )}

        </AriaCalendarGrid>
    );
};

export interface CalendarGridBodyProps extends AriaCalendarGridBodyProps {
    startDate: CalendarDate;
}

/**
 * We always render 6 weeks (6 rows), to avoid the popover resizing when switching. It's impossible to have more than 6 weeks in a month.
 */
const FIXED_WEEKS_IN_MONTH = 6;

/**
 * We overwrite the CalendarGridBody, and we are not using the one from react-aria, because
 * we want to always render 6 weeks (6 rows), to avoid the popover resizing when switching
 * between months with different number of weeks (e.g. February vs March).
 *
 * It's basically the same as the one from react-aria, but startDate is taken from props instead of the Internal Context + we hardcode 6 weeks.
 */
function CalendarGridBody(props: CalendarGridBodyProps) {
    const { children, style, className, startDate } = props;

    const calendarState = useContext(CalendarStateContext);
    const rangeCalendarState = useContext(RangeCalendarStateContext);
    const state = calendarState ?? rangeCalendarState!;

    return (
        <tbody
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            {...filterDOMProps(props as any)}
            style={style}
            className={className}
        >
            {[...new Array(FIXED_WEEKS_IN_MONTH).keys()].map(weekIndex => (
                <tr key={weekIndex}>
                    {state.getDatesInWeek(weekIndex, startDate).map((date, i) => (
                        date
                            // eslint-disable-next-line react/no-array-index-key
                            ? cloneElement(children(date), { key: i })
                            // eslint-disable-next-line react/no-array-index-key
                            : <td key={i} />
                    ))}
                </tr>
            ))}
        </tbody>
    );
}

import clsx from "clsx";
import { useCallback, useContext, type PropsWithChildren } from "react";
import {
    CalendarGrid as AriaCalendarGrid,
    CalendarHeaderCell as AriaCalendarHeaderCell,
    CalendarGridBody,
    CalendarGridHeader,
    RangeCalendarStateContext,
    type CalendarGridProps as AriaCalendarGridProps
} from "react-aria-components";

import { cssModule } from "../../utils/index.ts";

import { CalendarCell } from "./CalendarCell.tsx";
import { RangeCalendarCell } from "./RangeCalendarCell.tsx";

import styles from "./CalendarGrid.module.css";

export const GlobalCalendarGridCssSelector = "hop-CalendarGrid";

type CalendarGridProps = Omit<AriaCalendarGridProps, "children"> & PropsWithChildren;

export const CalendarGrid = (props: CalendarGridProps) => {
    const { weekdayStyle = "short" } = props;

    const isRangeCalendar = !!useContext(RangeCalendarStateContext);

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
            <CalendarGridBody className={styles["hop-CalendarGrid__body"]}>
                {date => (
                    isRangeCalendar ? <RangeCalendarCell date={date} /> : <CalendarCell date={date} />
                )}
            </CalendarGridBody>
        </AriaCalendarGrid>
    );
};

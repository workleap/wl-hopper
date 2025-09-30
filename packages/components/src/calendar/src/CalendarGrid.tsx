import type { AriaCalendarGridProps } from "@react-aria/calendar";
import clsx from "clsx";
import type { PropsWithChildren } from "react";
import {
    CalendarGrid as AriaCalendarGrid,
    CalendarHeaderCell as AriaCalendarHeaderCell,
    CalendarGridBody, CalendarGridHeader,
    type CalendarHeaderCellProps as AriaCalendarHeaderCellProps
} from "react-aria-components";

import { cssModule } from "../../utils/index.ts";

import { CalendarCell } from "./CalendarCell.tsx";

import styles from "./CalendarGrid.module.css";

export const GlobalCalendarGridCssSelector = "hop-CalendarGrid";

interface CalendarGridProps extends Omit<AriaCalendarGridProps, "children">, PropsWithChildren {
    months: number;
}

export const CalendarGrid = (props: CalendarGridProps) => {
    const { months } = props;
    const classNames = clsx(
        GlobalCalendarGridCssSelector,
        cssModule(
            styles,
            GlobalCalendarGridCssSelector
        )
    );

    return (
        <AriaCalendarGrid
            weekdayStyle="short"
            className={classNames}
            offset={{ months }}
            {...props}
        >
            <CalendarGridHeader>
                {day => (
                    <CalendarHeaderCell>
                        {/* Removes the last letter of weekday style "short", from 3 letters to 2. E.g. "Mon" -> "Mo" */}
                        {day.slice(0, -1)}
                    </CalendarHeaderCell>
                )}
            </CalendarGridHeader>
            <CalendarGridBody className={styles["hop-CalendarGrid__body"]}>
                {date => (
                    <CalendarCell date={date} />
                )}
            </CalendarGridBody>
        </AriaCalendarGrid>
    );
};

interface CalendarHeaderCellProps extends Omit<AriaCalendarHeaderCellProps, "children">, PropsWithChildren { }

const CalendarHeaderCell = (props: CalendarHeaderCellProps) => {
    return (
        <AriaCalendarHeaderCell className={styles["hop-CalendarGrid__header-cell"]}>
            {props.children}
        </AriaCalendarHeaderCell>
    );
};



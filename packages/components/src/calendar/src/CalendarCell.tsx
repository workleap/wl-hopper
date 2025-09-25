import clsx from "clsx";
import type { PropsWithChildren } from "react";
import {
    CalendarCell as AriaCalendarCell,
    type CalendarCellProps as AriaCalendarCellProps
} from "react-aria-components";

import { cssModule } from "../../utils/index.ts";

import styles from "./CalendarCell.module.css";

export const GlobalCalendarCellCssSelector = "hop-CalendarCell";

interface CalendarCellProps extends Omit<AriaCalendarCellProps, "children">, PropsWithChildren {}

export const CalendarCell = (props: CalendarCellProps) => {
    const { date } = props;

    const classNames = clsx(
        GlobalCalendarCellCssSelector,
        cssModule(
            styles,
            GlobalCalendarCellCssSelector
        )
    );

    return (
        <AriaCalendarCell
            date={date}
            className={classNames}
        >
            {({ formattedDate }) => formattedDate}
        </AriaCalendarCell>
    );
};

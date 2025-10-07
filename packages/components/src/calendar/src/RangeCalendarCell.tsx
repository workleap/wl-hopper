import clsx from "clsx";
import type { PropsWithChildren } from "react";
import {
    CalendarCell as AriaCalendarCell,
    type CalendarCellProps as AriaCalendarCellProps
} from "react-aria-components";

import { cssModule } from "../../utils/index.ts";

import styles from "./RangeCalendarCell.module.css";

export const GlobalRangeCalendarCellCssSelector = "hop-RangeCalendarCell";

interface RangeCalendarCellProps extends Omit<AriaCalendarCellProps, "children">, PropsWithChildren {}

export const RangeCalendarCell = (props: RangeCalendarCellProps) => {
    const classNames = clsx(
        GlobalRangeCalendarCellCssSelector,
        cssModule(
            styles,
            GlobalRangeCalendarCellCssSelector
        )
    );

    return (
        <AriaCalendarCell
            className={classNames}
            {...props}
        >
            {({ formattedDate }) => <span>{formattedDate}</span>}
        </AriaCalendarCell>
    );
};

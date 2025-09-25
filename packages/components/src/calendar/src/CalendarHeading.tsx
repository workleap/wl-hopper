import clsx from "clsx";
import { Fragment, useContext, useMemo } from "react";
import { useDateFormatter } from "react-aria";
import { CalendarStateContext } from "react-aria-components";

import { Heading } from "../../typography/index.ts";
import { cssModule } from "../../utils/index.ts";

import styles from "./CalendarHeading.module.css";

export const GlobalCalendarHeadingCssSelector = "hop-CalendarHeading";

export const CalendarHeading = () => {
    const calendarStateContext = useContext(CalendarStateContext);
    const { visibleRange, timeZone } = calendarStateContext ?? {};
    const currentMonth = visibleRange?.start ?? visibleRange?.end;
    const monthFormatter = useDateFormatter({
        month: "long",
        year: "numeric",
        era: currentMonth && currentMonth.calendar.identifier === "gregory" && currentMonth.era === "BC" ? "short" : undefined,
        calendar: visibleRange?.start.calendar.identifier,
        timeZone
    });
    const visibleMonths = useMemo(() => {
        if (!visibleRange) {
            return [];
        }

        const months: string[] = [];

        for (let i = visibleRange.start; i.compare(visibleRange.end) <= 0; i = i.add({ months: 1 })) {
            // Comment taken from: https://github.com/adobe/react-spectrum/blob/main/packages/%40react-spectrum/s2/src/Calendar.tsx#L389-L390
            // TODO: account for the first week possibly overlapping, like with a custom 454 calendar.
            // there has to be a better way to do this...
            if (i.month === visibleRange.start.month) {
                i = i.add({ weeks: 1 });
            }
            months.push(monthFormatter.format(i.toDate(timeZone!)));
        }

        return months;
    }, [visibleRange, monthFormatter, timeZone]);

    const classNames = clsx(
        GlobalCalendarHeadingCssSelector,
        cssModule(
            styles,
            GlobalCalendarHeadingCssSelector
        )
    );

    return (
        <Heading className={classNames}>
            {visibleMonths.map(month => (
                <Fragment key={month}>
                    {month}
                </Fragment>
            ))}
        </Heading>
    );
};

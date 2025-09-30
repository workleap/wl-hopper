import { type CalendarDate, getDayOfWeek, startOfMonth } from "@internationalized/date";
import { useMemo } from "react";
import { useLocale } from "react-aria-components";

export type DayOfWeek = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";

/**
 * Calculate the week index (0-based) and day index (0-based) for a given date within a month in a calendar.
 * @param date - The date to calculate indices for.
 * @param firstDayOfWeek - Optional override for the first day of the week ('sun', 'mon', 'tue', etc.).
 * @returns Object with weekIndex and dayIndex.
 */
export function useWeekAndDayIndices(
    date: CalendarDate,
    firstDayOfWeek?: DayOfWeek
) {
    const { locale } = useLocale();

    const { dayIndex, weekIndex } = useMemo(() => {
        // Get the day index within the week (0-6)
        const indexOfDay = getDayOfWeek(date, locale, firstDayOfWeek);

        const monthStart = startOfMonth(date);

        // Calculate the week index by finding which week this date falls into
        // within the month's calendar grid
        const monthStartDayOfWeek = getDayOfWeek(monthStart, locale, firstDayOfWeek);
        const dayOfMonth = date.day;

        const indexOfWeek = Math.floor((dayOfMonth + monthStartDayOfWeek - 1) / 7);

        return {
            weekIndex: indexOfWeek,
            dayIndex: indexOfDay
        };
    }, [date, locale, firstDayOfWeek]);

    return { dayIndex, weekIndex };
}

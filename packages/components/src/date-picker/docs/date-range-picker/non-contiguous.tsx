import { DateRangePicker, useLocale } from "@hopper-ui/components";
import { isWeekend } from "@internationalized/date";

export default function Example() {
    const { locale } = useLocale();

    return (
        <DateRangePicker
            label="Trip dates"
            isDateUnavailable={date => isWeekend(date, locale)}
            allowsNonContiguousRanges
        />
    );
}

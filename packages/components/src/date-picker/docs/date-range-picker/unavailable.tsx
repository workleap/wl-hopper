import { DateRangePicker } from "@hopper-ui/components";
import { getLocalTimeZone, today } from "@internationalized/date";

export default function Example() {
    const now = today(getLocalTimeZone());
    const disabledRanges = [
        [now, now.add({ days: 5 })],
        [now.add({ days: 14 }), now.add({ days: 16 })],
        [now.add({ days: 23 }), now.add({ days: 24 })]
    ];

    return (
        <DateRangePicker
            label="Trip dates"
            minValue={today(getLocalTimeZone())}
            isDateUnavailable={date =>
                disabledRanges.some(interval =>
                    date.compare(interval[0]) >= 0 && date.compare(interval[1]) <= 0
                )}
            validate={value =>
                disabledRanges.some(interval => value && value.end.compare(interval[0]) >= 0 && value.start.compare(interval[1]) <= 0)
                    ? "Selected date range may not include unavailable dates."
                    : null}
        />
    );
}

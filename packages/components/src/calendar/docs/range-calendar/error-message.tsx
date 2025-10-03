import { RangeCalendar, type RangeValue } from "@hopper-ui/components";
import { type DateValue, getLocalTimeZone, today } from "@internationalized/date";
import { useState } from "react";

export default function Example() {
    const [range, setRange] = useState<RangeValue<DateValue>>({
        start: today(getLocalTimeZone()),
        end: today(getLocalTimeZone()).add({
            weeks: 1,
            days: 3
        })
    });

    const isInvalid = range.end.compare(range.start) > 7;

    return (
        <RangeCalendar
            aria-label="Trip dates"
            value={range}
            onChange={setRange}
            isInvalid={isInvalid}
            errorMessage="Maximum stay duration is 1 week"
        />
    );
}

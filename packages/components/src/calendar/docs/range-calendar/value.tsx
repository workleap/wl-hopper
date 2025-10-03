import { Inline, RangeCalendar, type RangeValue } from "@hopper-ui/components";
import { type DateValue, parseDate } from "@internationalized/date";
import { useState } from "react";

export default function Example() {
    const [value, setValue] = useState<RangeValue<DateValue>>({
        start: parseDate("2020-02-03"),
        end: parseDate("2020-02-12")
    });

    return (
        <Inline>
            <RangeCalendar
                aria-label="Trip dates (uncontrolled)"
                defaultValue={{
                    start: parseDate("2020-02-03"),
                    end: parseDate("2020-02-10")
                }}
            />
            <RangeCalendar
                aria-label="Trip dates (controlled)"
                value={value}
                onChange={setValue}
            />
        </Inline>
    );
}

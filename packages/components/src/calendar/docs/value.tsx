import { Calendar, Inline } from "@hopper-ui/components";
import { type DateValue, parseDate } from "@internationalized/date";
import { useState } from "react";

export default function Example() {
    const [value, setValue] = useState<DateValue>(parseDate("2020-02-03"));

    return (
        <Inline>
            <Calendar
                aria-label="Date (uncontrolled)"
                defaultValue={parseDate("2020-02-03")}
            />
            <Calendar
                aria-label="Date (controlled)"
                value={value}
                onChange={setValue}
            />
        </Inline>
    );
}

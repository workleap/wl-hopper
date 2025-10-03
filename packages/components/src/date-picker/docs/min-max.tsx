import { DatePicker, type DateValue } from "@hopper-ui/components";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { useState } from "react";

export default function Example() {
    const [value, setValue] = useState<DateValue | null>(parseDate("2022-02-03"));

    return (
        <DatePicker
            label="Appointment date"
            minValue={today(getLocalTimeZone())}
            value={value}
            onChange={setValue}
        />
    );
}

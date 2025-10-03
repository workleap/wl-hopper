import { DateRangePicker, Stack, type DateValue, type RangeValue } from "@hopper-ui/components";
import { parseDate } from "@internationalized/date";
import { useState } from "react";

export default function Example() {
    const [value, setValue] = useState<RangeValue<DateValue> | null>({
        start: parseDate("2020-02-03"),
        end: parseDate("2020-02-08")
    });

    return (
        <Stack>
            <DateRangePicker
                label="Dates (uncontrolled)"
                defaultValue={{
                    start: parseDate("2020-02-03"),
                    end: parseDate("2020-02-08")
                }}
            />
            <DateRangePicker
                label="Dates (controlled)"
                value={value}
                onChange={setValue}
            />
        </Stack>
    );
}

import { Stack, type DateValue } from "@hopper-ui/components";
import { parseDate } from "@internationalized/date";
import { useState } from "react";

import { DatePicker } from "../src/index.ts";

export default function Example() {
    const [value, setValue] = useState<DateValue | null>(parseDate("2020-02-03"));

    return (
        <Stack>
            <DatePicker
                label="Date (uncontrolled)"
                defaultValue={parseDate("2020-02-03")}
            />
            <DatePicker
                label="Date (controlled)"
                value={value}
                onChange={setValue}
            />
        </Stack>
    );
}

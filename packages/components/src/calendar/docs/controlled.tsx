import { Calendar, Paragraph, Stack, type DateValue } from "@hopper-ui/components";
import { getLocalTimeZone, parseDate } from "@internationalized/date";
import { useState } from "react";
import { useDateFormatter } from "react-aria";

export default function Example() {
    const [date, setDate] = useState<DateValue>(parseDate("2020-02-03"));
    const formatter = useDateFormatter({ dateStyle: "full" });

    return (
        <Stack>
            <Calendar
                aria-label="Date (controlled)"
                value={date}
                onChange={setDate}
            />
            <Paragraph>Selected date: {formatter.format(date.toDate(getLocalTimeZone()))}</Paragraph>
        </Stack>
    );
}

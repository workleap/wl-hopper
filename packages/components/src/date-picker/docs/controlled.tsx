import { DatePicker, Paragraph, Stack, type DateValue } from "@hopper-ui/components";
import { getLocalTimeZone, parseDate } from "@internationalized/date";
import { useState } from "react";
import { useDateFormatter } from "react-aria";

export default function Example() {
    const [date, setDate] = useState<DateValue | null>(parseDate("1985-07-03"));
    const formatter = useDateFormatter({ dateStyle: "full" });

    return (
        <Stack>
            <DatePicker label="Birth date" value={date} onChange={setDate} />
            <Paragraph>
                Selected date:{" "}
                {date ? formatter.format(date.toDate(getLocalTimeZone())) : "--"}
            </Paragraph>
        </Stack>
    );
}

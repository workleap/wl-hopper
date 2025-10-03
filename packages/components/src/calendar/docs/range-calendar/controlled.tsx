import { Paragraph, RangeCalendar, type RangeValue, Stack } from "@hopper-ui/components";
import { type DateValue, getLocalTimeZone, parseDate } from "@internationalized/date";
import { useState } from "react";
import { useDateFormatter } from "react-aria";

export default function Example() {
    const [range, setRange] = useState<RangeValue<DateValue>>({
        start: parseDate("2020-07-03"),
        end: parseDate("2020-07-10")
    });
    const formatter = useDateFormatter({ dateStyle: "full" });

    return (
        <Stack>
            <RangeCalendar
                aria-label="Trip dates"
                value={range}
                onChange={setRange}
            />
            <Paragraph>
                Selected date: {formatter.formatRange(
                    range.start.toDate(getLocalTimeZone()),
                    range.end.toDate(getLocalTimeZone())
                )}
            </Paragraph>
        </Stack>
    );
}

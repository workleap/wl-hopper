import { DateRangePicker, Paragraph, Stack, type DateValue, type RangeValue } from "@hopper-ui/components";
import { getLocalTimeZone, parseDate } from "@internationalized/date";
import { useState } from "react";
import { useDateFormatter } from "react-aria";

export default function Example() {
    const [range, setRange] = useState<RangeValue<DateValue> | null>({
        start: parseDate("2020-07-03"),
        end: parseDate("2020-07-10")
    });
    const formatter = useDateFormatter({ dateStyle: "long" });

    return (
        <Stack>
            <DateRangePicker label="Trip dates" value={range} onChange={setRange} />
            <Paragraph>
                Selected date: {range
                    ? formatter.formatRange(
                        range.start.toDate(getLocalTimeZone()),
                        range.end.toDate(getLocalTimeZone())
                    )
                    : "--"}
            </Paragraph>
        </Stack>
    );
}

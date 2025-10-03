import { RangeCalendar } from "@hopper-ui/components";
import { parseDate } from "@internationalized/date";

export default function Example() {
    return (
        <RangeCalendar
            defaultValue={{
                start: parseDate("2020-02-03"),
                end: parseDate("2020-02-10")
            }}
            aria-label="Trip dates"
            isReadOnly
        />
    );
}

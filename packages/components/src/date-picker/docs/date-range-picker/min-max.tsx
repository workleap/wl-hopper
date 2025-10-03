import { DateRangePicker } from "@hopper-ui/components";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";

export default function Example() {
    return (
        <DateRangePicker
            label="Trip dates"
            minValue={today(getLocalTimeZone())}
            defaultValue={{
                start: parseDate("2022-02-03"),
                end: parseDate("2022-05-03")
            }}
        />
    );
}

import { RangeCalendar } from "@hopper-ui/components";
import { getLocalTimeZone, today } from "@internationalized/date";

export default function Example() {
    return (
        <RangeCalendar
            aria-label="Trip dates"
            minValue={today(getLocalTimeZone())}
        />
    );
}

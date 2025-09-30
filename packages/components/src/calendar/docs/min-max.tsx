import { Calendar } from "@hopper-ui/components";
import { getLocalTimeZone, today } from "@internationalized/date";

export default function Example() {
    return (
        <Calendar aria-label="Appointment date" minValue={today(getLocalTimeZone())} />
    );
}

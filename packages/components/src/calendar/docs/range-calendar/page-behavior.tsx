import { RangeCalendar } from "@hopper-ui/components";

export default function Example() {
    return (
        <RangeCalendar aria-label="Trip dates" visibleMonths={3} pageBehavior="single" />
    );
}

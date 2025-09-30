import { Calendar } from "@hopper-ui/components";

export default function Example() {
    return (
        <Calendar aria-label="Appointment date" visibleMonths={3} pageBehavior="single" />
    );
}

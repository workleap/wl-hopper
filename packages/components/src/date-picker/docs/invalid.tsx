import { DatePicker } from "@hopper-ui/components";

export default function Example() {
    return (
        <DatePicker
            label="Appointment date"
            isInvalid
            errorMessage="Please select a valid date."
        />
    );
}

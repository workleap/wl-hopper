import { DateRangePicker } from "@hopper-ui/components";

export default function Example() {
    return (
        <DateRangePicker
            label="Trip dates"
            isInvalid
            errorMessage="Please select a valid date."
        />
    );
}

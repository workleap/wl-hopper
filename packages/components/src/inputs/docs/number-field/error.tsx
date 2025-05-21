import { NumberField } from "@hopper-ui/components";

export default function Example() {
    return (
        <NumberField value={42} isInvalid label="Training hours completed" errorMessage="You cannot enter more than 40 training hours for this period." />
    );
}

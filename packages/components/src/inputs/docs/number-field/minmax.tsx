import { NumberField } from "@hopper-ui/components";

export default function Example() {
    return (
        <NumberField minValue={42} maxValue={50} label="Training hours completed" description="Please enter a value between 10 and 40." />
    );
}

import { Radio, RadioGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <RadioGroup isDisabled aria-label="roles">
            <Radio value="manager">Manager</Radio>
            <Radio value="designer">Designer</Radio>
        </RadioGroup>
    );
}

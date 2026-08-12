import { Radio, RadioGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <RadioGroup aria-label="roles">
            <Radio value="manager" isDisabled>
                Manager
            </Radio>
            <Radio value="designer">Designer</Radio>
        </RadioGroup>
    );
}

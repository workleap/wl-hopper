import { Radio, RadioGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <RadioGroup label="Roles">
            <Radio value="developer">Developer</Radio>
            <Radio value="designer">Designer</Radio>
            <Radio value="manager">Manager</Radio>
        </RadioGroup>
    );
}

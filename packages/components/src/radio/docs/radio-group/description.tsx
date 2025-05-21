import { Radio, RadioGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <RadioGroup aria-label="roles" description="Select one to continue">
            <Radio value="developer">Developer</Radio>
            <Radio value="designer">Designer</Radio>
            <Radio value="manager">Manager</Radio>
        </RadioGroup>
    );
}

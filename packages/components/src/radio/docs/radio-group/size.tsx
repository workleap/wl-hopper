import { Inline, Radio, RadioGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline>
            <RadioGroup size="sm" aria-label="roles">
                <Radio value="manager">Manager</Radio>
                <Radio value="designer">Designer</Radio>
            </RadioGroup>
            <RadioGroup size="md" aria-label="roles">
                <Radio value="manager">Manager</Radio>
                <Radio value="designer">Designer</Radio>
            </RadioGroup>
        </Inline>
    );
}

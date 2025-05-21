import { Inline, Radio, RadioGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline gap="inline-xl">
            <RadioGroup orientation="horizontal" aria-label="roles">
                <Radio value="manager">Manager</Radio>
                <Radio value="designer">Designer</Radio>
            </RadioGroup>
            <RadioGroup orientation="vertical" aria-label="roles">
                <Radio value="manager">Manager</Radio>
                <Radio value="designer">Designer</Radio>
            </RadioGroup>
        </Inline>
    );
}

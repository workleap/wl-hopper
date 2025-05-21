import { Radio, RadioGroup, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <RadioGroup variant="bordered" aria-label="roles">
            <Radio value="developer"><Text>Developer</Text></Radio>
            <Radio value="designer">
                <Text>Designer</Text>
            </Radio>
        </RadioGroup>
    );
}

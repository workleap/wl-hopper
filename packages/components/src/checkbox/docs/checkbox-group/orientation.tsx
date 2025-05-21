import { Checkbox, CheckboxGroup, Inline } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline gap="inline-xl">
            <CheckboxGroup orientation="horizontal" label="Roles">
                <Checkbox value="developer">Developer</Checkbox>
                <Checkbox value="designer">Designer</Checkbox>
            </CheckboxGroup>
            <CheckboxGroup orientation="vertical" label="Roles">
                <Checkbox value="developer">Developer</Checkbox>
                <Checkbox value="designer">Designer</Checkbox>
            </CheckboxGroup>
        </Inline>
    );
}

import { Checkbox, CheckboxGroup, Inline } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline gap="inline-xl">
            <CheckboxGroup size="sm" label="Roles">
                <Checkbox value="developer">Developer</Checkbox>
                <Checkbox value="designer">Designer</Checkbox>
            </CheckboxGroup>
            <CheckboxGroup size="md" label="Roles">
                <Checkbox value="developer">Designer</Checkbox>
                <Checkbox value="designer">Developer</Checkbox>
            </CheckboxGroup>
        </Inline>
    );
}

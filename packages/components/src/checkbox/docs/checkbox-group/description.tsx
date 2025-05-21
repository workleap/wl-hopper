import { Checkbox, CheckboxGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <CheckboxGroup label="Roles" description="Select one to continue">
            <Checkbox value="option1">Developer</Checkbox>
            <Checkbox value="option2">Designer</Checkbox>
        </CheckboxGroup>
    );
}

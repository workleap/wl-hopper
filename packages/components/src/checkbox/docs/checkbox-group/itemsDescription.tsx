import { Checkbox, CheckboxField, CheckboxGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <CheckboxGroup label="Roles">
            <Checkbox value="developer">Developer</Checkbox>
            <Checkbox value="designer">Designer</Checkbox>
            <CheckboxField description="Team Manager">
                <Checkbox value="manager">Manager</Checkbox>
            </CheckboxField>
        </CheckboxGroup>
    );
}

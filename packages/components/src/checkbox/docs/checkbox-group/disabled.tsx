import { Checkbox, CheckboxGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <CheckboxGroup isDisabled label="Roles">
            <Checkbox value="option1">Developer</Checkbox>
            <Checkbox value="option2">Designer</Checkbox>
        </CheckboxGroup>
    );
}

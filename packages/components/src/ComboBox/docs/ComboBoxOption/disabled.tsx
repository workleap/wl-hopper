import { ComboBox, ComboBoxOption, ComboBoxOptions, Label } from "@hopper-ui/components";

export default function Example() {
    return (
        <ComboBox><Label>Roles</Label>
            <ComboBoxOptions>
                <ComboBoxOption id="designer" isDisabled>Designer</ComboBoxOption>
                <ComboBoxOption id="developer">Developer</ComboBoxOption>
                <ComboBoxOption id="manager">Manager</ComboBoxOption>
            </ComboBoxOptions>
        </ComboBox>
    );
}

import { ComboBox, ComboBoxItem } from "@hopper-ui/components";

export default function Example() {
    return (
        <ComboBox label="Roles">
            <ComboBoxItem id="designer" isDisabled>Designer</ComboBoxItem>
            <ComboBoxItem id="developer">Developer</ComboBoxItem>
            <ComboBoxItem id="manager">Manager</ComboBoxItem>
        </ComboBox>
    );
}

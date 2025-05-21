import { ComboBox, ComboBoxItem } from "@hopper-ui/components";

export default function Example() {
    return (
        <ComboBox isDisabled label="Roles">
            <ComboBoxItem id="designer">Designer</ComboBoxItem>
            <ComboBoxItem id="developer">Developer</ComboBoxItem>
            <ComboBoxItem id="manager">Manager</ComboBoxItem>
        </ComboBox>
    );
}

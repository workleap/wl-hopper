import { ComboBox, ComboBoxItem } from "@hopper-ui/components";

export default function Example() {
    return (
        <ComboBox isInvalid label="Roles" errorMessage="This field is required">
            <ComboBoxItem id="designer">Designer</ComboBoxItem>
            <ComboBoxItem id="developer">Developer</ComboBoxItem>
            <ComboBoxItem id="manager">Manager</ComboBoxItem>
        </ComboBox>
    );
}

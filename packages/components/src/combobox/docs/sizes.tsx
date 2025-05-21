import { ComboBox, ComboBoxItem, Stack } from "@hopper-ui/components";

export default function Example() {
    return (
        <Stack>
            <ComboBox size="sm" label="Roles">
                <ComboBoxItem id="designer">Designer</ComboBoxItem>
                <ComboBoxItem id="developer">Developer</ComboBoxItem>
                <ComboBoxItem id="manager">Manager</ComboBoxItem>
            </ComboBox>
            <ComboBox size="md" label="Roles">
                <ComboBoxItem id="designer">Designer</ComboBoxItem>
                <ComboBoxItem id="developer">Developer</ComboBoxItem>
                <ComboBoxItem id="manager">Manager</ComboBoxItem>
            </ComboBox>
        </Stack>
    );
}

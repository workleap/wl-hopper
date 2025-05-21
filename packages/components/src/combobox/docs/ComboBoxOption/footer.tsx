import { Button, ComboBox, ComboBoxItem, Text } from "@hopper-ui/components";
import { AddIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <ComboBox
            label="Roles"
            footer={(
                <Button variant="ghost-secondary" isFluid>
                    <AddIcon />
                    <Text>Add</Text></Button>
            )}
        >
            <ComboBoxItem id="developer">Developer</ComboBoxItem>
            <ComboBoxItem id="designer">Designer</ComboBoxItem>
            <ComboBoxItem id="manager">Manager</ComboBoxItem>
        </ComboBox>
    );
}

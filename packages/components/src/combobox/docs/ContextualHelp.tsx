import { ComboBox, ComboBoxItem, ContextualHelp } from "@hopper-ui/components";

export default function Example() {
    return (
        <ComboBox label="Roles" contextualHelp={<ContextualHelp>This is a list of roles in the project</ContextualHelp>}>
            <ComboBoxItem id="designer">Designer</ComboBoxItem>
            <ComboBoxItem id="developer">Developer</ComboBoxItem>
            <ComboBoxItem id="manager">Manager</ComboBoxItem>
        </ComboBox>
    );
}

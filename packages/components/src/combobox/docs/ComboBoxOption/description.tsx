import { ComboBox, ComboBoxItem, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <ComboBox label="Roles">
            <ComboBoxItem textValue="Developer">
                <Text>Developer</Text>
                <Text slot="description">Builds and maintains software.</Text>
            </ComboBoxItem>
            <ComboBoxItem textValue="Designer">
                <Text>Designer</Text>
                <Text slot="description">Creates visual design solutions.</Text>
            </ComboBoxItem>
            <ComboBoxItem textValue="Manager">
                <Text>Manager</Text>
                <Text slot="description">Leads teams and projects.</Text>
            </ComboBoxItem>
        </ComboBox>
    );
}

import { Badge, ComboBox, ComboBoxItem, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <ComboBox label="Roles">
            <ComboBoxItem textValue="Designer">
                <Text>Designer</Text>
                <Badge>50</Badge>
            </ComboBoxItem>
            <ComboBoxItem textValue="Developer">
                <Text>Developer</Text>
                <Badge variant="secondary">99+</Badge>
            </ComboBoxItem>
            <ComboBoxItem>Manager</ComboBoxItem>
        </ComboBox>
    );
}

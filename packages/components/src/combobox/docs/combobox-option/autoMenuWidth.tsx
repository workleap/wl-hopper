import { ComboBox, ComboBoxItem, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <ComboBox
            aria-label="list of options with a description"
            isAutoMenuWidth
            label="Roles"
        >
            <ComboBoxItem textValue="Developer">
                <Text>Developer</Text>
                <Text slot="description">Builds, tests, and maintains software.</Text>
            </ComboBoxItem>
            <ComboBoxItem textValue="Designer">
                <Text>Designer</Text>
                <Text slot="description">Creates visually appealing, functional solutions.</Text>
            </ComboBoxItem>
            <ComboBoxItem textValue="Manager">
                <Text>Manager</Text>
                <Text slot="description">Responsible for leading and overseeing a team or department to ensure organizational goals are met.</Text>
            </ComboBoxItem>
        </ComboBox>
    );
}

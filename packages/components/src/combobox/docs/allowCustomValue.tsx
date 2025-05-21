import { ComboBox, ComboBoxItem, ComboBoxSection, Header } from "@hopper-ui/components";

export default function Example() {
    return (
        <ComboBox allowsCustomValue label="Roles">
            <ComboBoxSection>
                <Header>Creative Department</Header>
                <ComboBoxItem id="1">Designer</ComboBoxItem>
                <ComboBoxItem id="2">Content creator</ComboBoxItem>
            </ComboBoxSection>
            <ComboBoxItem id="3">Manager</ComboBoxItem>
        </ComboBox>
    );
}

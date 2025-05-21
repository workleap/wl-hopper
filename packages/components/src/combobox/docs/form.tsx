import { ComboBox, ComboBoxItem, Form } from "@hopper-ui/components";

export default function Example() {
    return (
        <Form>
            <ComboBox name="Roles" label="Roles">
                <ComboBoxItem id="designer">Designer</ComboBoxItem>
                <ComboBoxItem id="developer">Developer</ComboBoxItem>
                <ComboBoxItem id="manager">Manager</ComboBoxItem>
            </ComboBox>
        </Form>
    );
}

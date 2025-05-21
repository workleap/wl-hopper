import { ComboBox, ComboBoxItem } from "@hopper-ui/components";

export default function Example() {
    return (
        <ComboBox
            prefix="Operations"
            label="Roles"
        >
            <ComboBoxItem id="project-coordinator">Project Coordinator</ComboBoxItem>
            <ComboBoxItem id="qa-specialist">QA Specialist</ComboBoxItem>
            <ComboBoxItem id="system-administrator">System Administrator</ComboBoxItem>
        </ComboBox>
    );
}

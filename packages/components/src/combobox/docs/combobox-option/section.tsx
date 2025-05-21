import { ComboBox, ComboBoxItem, ComboBoxSection, Header } from "@hopper-ui/components";

export default function Example() {
    return (
        <ComboBox label="Roles">
            <ComboBoxItem id="developer">Developer</ComboBoxItem>
            <ComboBoxItem id="manager">Manager</ComboBoxItem>
            <ComboBoxSection>
                <Header>Operations</Header>
                <ComboBoxItem id="project-coordinator">Project Coordinator</ComboBoxItem>
                <ComboBoxItem id="qa-specialist">QA Specialist</ComboBoxItem>
            </ComboBoxSection>
            <ComboBoxSection>
                <Header>Creative Department</Header>
                <ComboBoxItem id="designer">Designer</ComboBoxItem>
                <ComboBoxItem id="copywriter">Copywriter</ComboBoxItem>
                <ComboBoxItem id="ux-researcher">UX Researcher</ComboBoxItem>
            </ComboBoxSection>
        </ComboBox>
    );
}

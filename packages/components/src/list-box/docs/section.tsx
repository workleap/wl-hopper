import { Header, ListBox, ListBoxItem, ListBoxSection } from "@hopper-ui/components";

export default function Example() {
    return (
        <ListBox selectionMode="single" aria-label="list of options">
            <ListBoxItem>Developer</ListBoxItem>
            <ListBoxItem>Manager</ListBoxItem>
            <ListBoxSection>
                <Header>Creative Department</Header>
                <ListBoxItem>Designer</ListBoxItem>
                <ListBoxItem>Copywriter</ListBoxItem>
                <ListBoxItem>UX Researcher</ListBoxItem>
            </ListBoxSection>
            <ListBoxSection>
                <Header>Operations</Header>
                <ListBoxItem>Project Coordinator</ListBoxItem>
                <ListBoxItem>QA Specialist</ListBoxItem>
            </ListBoxSection>
            <ListBoxItem>Product Owner</ListBoxItem>
        </ListBox>
    );
}

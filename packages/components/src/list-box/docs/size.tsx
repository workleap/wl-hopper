import { Inline, ListBox, ListBoxItem } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline alignY="flex-start">
            <ListBox size="lg" selectionMode="single" aria-label="list of options">
                <ListBoxItem>Developer</ListBoxItem>
                <ListBoxItem>Designer</ListBoxItem>
                <ListBoxItem>Manager</ListBoxItem>
            </ListBox>
            <ListBox size="md" selectionMode="single" aria-label="list of options">
                <ListBoxItem>Developer</ListBoxItem>
                <ListBoxItem>Designer</ListBoxItem>
                <ListBoxItem>Manager</ListBoxItem>
            </ListBox>
            <ListBox size="sm" selectionMode="single" aria-label="list of options">
                <ListBoxItem>Developer</ListBoxItem>
                <ListBoxItem>Designer</ListBoxItem>
                <ListBoxItem>Manager</ListBoxItem>
            </ListBox>
            <ListBox size="xs" selectionMode="single" aria-label="list of options">
                <ListBoxItem>Developer</ListBoxItem>
                <ListBoxItem>Designer</ListBoxItem>
                <ListBoxItem>Manager</ListBoxItem>
            </ListBox>
        </Inline>
    );
}

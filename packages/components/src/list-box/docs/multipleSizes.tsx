import { ListBox, ListBoxItem } from "@hopper-ui/components";

export default function Example() {
    return (
        <ListBox selectionMode="single" aria-label="list of options">
            <ListBoxItem size="xs">Developer</ListBoxItem>
            <ListBoxItem size="sm">Designer</ListBoxItem>
            <ListBoxItem size="md">Manager</ListBoxItem>
            <ListBoxItem size="lg">Copywriter</ListBoxItem>
        </ListBox>
    );
}

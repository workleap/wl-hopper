import { ListBox, ListBoxItem } from "@hopper-ui/components";

export default function Example() {
    return (
        <ListBox aria-label="list of options">
            <ListBoxItem>Developer</ListBoxItem>
            <ListBoxItem>Designer</ListBoxItem>
            <ListBoxItem>Manager</ListBoxItem>
        </ListBox>
    );
}

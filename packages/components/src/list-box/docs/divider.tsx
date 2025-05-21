import { Divider, ListBox, ListBoxItem } from "@hopper-ui/components";

export default function Example() {
    return (
        <ListBox selectionMode="single" aria-label="list of options">
            <ListBoxItem>Item 1</ListBoxItem>
            <ListBoxItem>Item 2</ListBoxItem>
            <ListBoxItem>Item 3</ListBoxItem>
            <Divider />
            <ListBoxItem>Item 4</ListBoxItem>
            <ListBoxItem>Item 5</ListBoxItem>
        </ListBox>
    );
}

import { ListBox, ListBoxItem } from "@hopper-ui/components";

export default function Example() {
    return (
        <ListBox
            selectionMode="single"
            disabledKeys={["2"]}
            aria-label="list of options"
        >
            <ListBoxItem id="1">Developer</ListBoxItem>
            <ListBoxItem id="2">Designer</ListBoxItem>
            <ListBoxItem id="3">Manager</ListBoxItem>
        </ListBox>
    );
}

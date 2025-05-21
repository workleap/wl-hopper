import { Badge, ListBox, ListBoxItem, Text } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <ListBox selectionMode="single" aria-label="list of options">
            <ListBoxItem textValue="Manager">
                <Text>Manager</Text>
                <SparklesIcon slot="end-icon" />
                <Badge>50</Badge>
            </ListBoxItem>
            <ListBoxItem textValue="Developer">
                <Badge variant="subdued">99+</Badge>
                <Text>Developer</Text>
            </ListBoxItem>
            <ListBoxItem>Designer</ListBoxItem>
        </ListBox>
    );
}

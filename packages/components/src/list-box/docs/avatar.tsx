import { Avatar, ListBox, ListBoxItem, Text } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <ListBox selectionMode="single" aria-label="Team">
            <ListBoxItem textValue="Fred Smith">
                <Avatar src="https://i.pravatar.cc/96?img=3" name="Fred Smith" />
                <Text>Fred Smith</Text>
                <SparklesIcon slot="end-icon" />
            </ListBoxItem>
            <ListBoxItem textValue="Karen Smith">
                <Avatar name="Karen Smith" />
                <Text>Karen Smith</Text>
            </ListBoxItem>
            <ListBoxItem textValue="John Doe">
                <Avatar name="John Doe" />
                <Text>John Doe</Text>
            </ListBoxItem>
        </ListBox>
    );
}

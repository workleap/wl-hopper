import { IconList, ListBox, ListBoxItem, Text } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <ListBox selectionMode="single" aria-label="list of options">
            <ListBoxItem textValue="Developer">
                <Text>Developer</Text>
                <IconList>
                    <SparklesIcon />
                    <SparklesIcon />
                    <SparklesIcon />
                </IconList>
            </ListBoxItem>
            <ListBoxItem textValue="Designer">
                <SparklesIcon />
                <Text>Designer</Text>
            </ListBoxItem>
            <ListBoxItem>Manager</ListBoxItem>
        </ListBox>
    );
}

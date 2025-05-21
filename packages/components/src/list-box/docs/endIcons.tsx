import { IconList, ListBox, ListBoxItem, Text } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <ListBox selectionMode="single" aria-label="list of options">
            <ListBoxItem textValue="Developer">
                <Text>Developer</Text>
                <IconList slot="end-icon">
                    <SparklesIcon /><SparklesIcon /><SparklesIcon />
                </IconList>
            </ListBoxItem>
            <ListBoxItem textValue="Designer">
                <Text>Designer</Text>
                <SparklesIcon slot="end-icon" />
            </ListBoxItem>
            <ListBoxItem>Manager</ListBoxItem>
        </ListBox>
    );
}

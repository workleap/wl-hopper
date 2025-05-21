import { ComboBox, ComboBoxItem, IconList, Text } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <ComboBox label="Roles">
            <ComboBoxItem textValue="Developer">
                <Text>Developer</Text>
                <IconList>
                    <SparklesIcon /><SparklesIcon /><SparklesIcon />
                </IconList>
            </ComboBoxItem>
            <ComboBoxItem textValue="Designer">
                <SparklesIcon /><Text>Designer</Text>
            </ComboBoxItem>
            <ComboBoxItem>Manager</ComboBoxItem>
        </ComboBox>
    );
}

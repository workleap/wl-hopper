import { ComboBox, ComboBoxItem, IconList, Text } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <ComboBox label="Roles">
            <ComboBoxItem textValue="Designer">
                <Text>Designer</Text>
                <IconList slot="end-icon">
                    <SparklesIcon /><SparklesIcon /><SparklesIcon />
                </IconList>
            </ComboBoxItem>
            <ComboBoxItem textValue="Developer">
                <SparklesIcon slot="end-icon" /><Text>Developer</Text>
            </ComboBoxItem>
            <ComboBoxItem>Manager</ComboBoxItem>
        </ComboBox>
    );
}

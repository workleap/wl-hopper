import { IconList, Select, SelectItem, Text } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <Select aria-label="list of options">
            <SelectItem textValue="Designer">
                <Text>Designer</Text>
                <IconList slot="end-icon">
                    <SparklesIcon /><SparklesIcon /><SparklesIcon />
                </IconList>
            </SelectItem>
            <SelectItem textValue="Developer">
                <SparklesIcon slot="end-icon" />
                <Text>Developer</Text>
            </SelectItem>
            <SelectItem>Manager</SelectItem>
        </Select>
    );
}

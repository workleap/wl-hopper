import { IconList, Select, SelectField, SelectOption, Text } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <SelectField aria-label="list of options">
            <Select>
                <SelectOption textValue="Designer">
                    <Text slot="label">Designer</Text>
                    <IconList>
                        <SparklesIcon /><SparklesIcon /><SparklesIcon />
                    </IconList>
                </SelectOption>
                <SelectOption textValue="Developer">
                    <SparklesIcon /><Text slot="label">Developer</Text>
                </SelectOption>
                <SelectOption>Manager</SelectOption>
            </Select>
        </SelectField>
    );
}

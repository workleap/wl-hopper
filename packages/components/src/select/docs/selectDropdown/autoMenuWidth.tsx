import { Select, SelectItem, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <Select
            aria-label="list of options with a description"
            isAutoMenuWidth
        >
            <SelectItem textValue="Designer">
                <Text>Designer</Text>
                <Text slot="description">Builds and maintains software.</Text>
            </SelectItem>
            <SelectItem textValue="Developer">
                <Text>Developer</Text>
                <Text slot="description">Creates visual design solutions.</Text>
            </SelectItem>
            <SelectItem textValue="Manager">
                <Text>Manager</Text>
                <Text slot="description">Leads teams and projects.</Text>
            </SelectItem>
        </Select>
    );
}

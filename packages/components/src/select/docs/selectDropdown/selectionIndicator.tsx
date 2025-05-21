import { Select, SelectItem, Text, type Key } from "@hopper-ui/components";
import { useState } from "react";

export default function Example() {
    const [selectedKey, setSelectedKey] = useState<Key>("1");

    return (
        <Select
            aria-label="list of options"
            selectedKey={selectedKey}
            onSelectionChange={setSelectedKey}
            selectionIndicator="input"
        >
            <SelectItem textValue="Developer" id="1">
                <Text>Developer</Text>
                <Text slot="description">Builds and maintains software.</Text>
            </SelectItem>
            <SelectItem textValue="Designer" id="2">
                <Text>Designer</Text>
                <Text slot="description">Creates visual design solutions.</Text>
            </SelectItem>
            <SelectItem textValue="Manager" id="3">
                <Text>Manager</Text>
                <Text slot="description">Leads teams and projects.</Text>
            </SelectItem>
        </Select>
    );
}

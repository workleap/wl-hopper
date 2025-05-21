import { ComboBox, ComboBoxItem, Text, type Key } from "@hopper-ui/components";
import { useState } from "react";

export default function Example() {
    const [selectedKey, setSelectedKey] = useState<Key | null>("1");

    return (
        <ComboBox
            aria-label="list of options"
            selectedKey={selectedKey}
            onSelectionChange={setSelectedKey}
            label="Roles"
            selectionIndicator="input"
        >
            <ComboBoxItem textValue="Developer" id="1">
                <Text>Developer</Text>
                <Text slot="description">Builds and maintains software.</Text>
            </ComboBoxItem>
            <ComboBoxItem textValue="Designer" id="2">
                <Text>Designer</Text>
                <Text slot="description">Creates visual design solutions.</Text>
            </ComboBoxItem>
            <ComboBoxItem textValue="Manager" id="3">
                <Text>Manager</Text>
                <Text slot="description">Leads teams and projects.</Text>
            </ComboBoxItem>
        </ComboBox>
    );
}

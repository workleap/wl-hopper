import { ComboBox, ComboBoxItem, ComboBoxSection, Header, type Key } from "@hopper-ui/components";
import { useState } from "react";

export default function Example() {
    const [selectedKey, setSelectedKey] = useState<Key | null>();

    const handleSelectionChange = (key: Key | null) => {
        if (selectedKey === key) {
            setSelectedKey(null);
        } else {
            setSelectedKey(key);
        }
    };

    return (
        <ComboBox selectedKey={selectedKey} onSelectionChange={handleSelectionChange} label="Roles">
            <ComboBoxSection>
                <Header>Operations</Header>
                <ComboBoxItem id="1">Project Coordinator</ComboBoxItem>
                <ComboBoxItem id="2">QA Specialist</ComboBoxItem>
            </ComboBoxSection>
            <ComboBoxItem id="3">Manager</ComboBoxItem>
        </ComboBox>
    );
}

import { Header, Select, SelectItem, SelectSection, type Key } from "@hopper-ui/components";
import { useState } from "react";

export default function Example() {
    const [selectedKey, setSelectedKey] = useState<Key | null>();

    const handleSelectionChange = (key: Key) => {
        if (selectedKey === key) {
            setSelectedKey(null);
        } else {
            setSelectedKey(key);
        }
    };

    return (
        <Select selectedKey={selectedKey} onSelectionChange={handleSelectionChange} label="Roles">
            <SelectSection>
                <Header>Operations</Header>
                <SelectItem id="1">Project Coordinator</SelectItem>
                <SelectItem id="2">QA Specialist</SelectItem>
            </SelectSection>
            <SelectItem id="3">Manager</SelectItem>
        </Select>
    );
}

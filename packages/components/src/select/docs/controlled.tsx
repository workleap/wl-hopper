import { Header, Select, SelectItem, SelectSection, type Key } from "@hopper-ui/components";
import { useState } from "react";

export default function Example() {
    const [value, setValue] = useState<Key | null>();

    const handleSelectionChange = (key: Key | null) => {
        if (value === key) {
            setValue(null);
        } else {
            setValue(key);
        }
    };

    return (
        <Select value={value} onChange={handleSelectionChange} label="Roles">
            <SelectSection>
                <Header>Operations</Header>
                <SelectItem id="1">Project Coordinator</SelectItem>
                <SelectItem id="2">QA Specialist</SelectItem>
            </SelectSection>
            <SelectItem id="3">Manager</SelectItem>
        </Select>
    );
}

import { Tag, TagGroup, type Selection } from "@hopper-ui/components";
import { useState } from "react";

export default function Example() {
    const [selectedKeys, setSelectedKeys] = useState(["designer"]);

    const handleSelectionChange = (newSelectedKeys: Selection) => {
        if (newSelectedKeys === "all") {
            setSelectedKeys(["designer", "developer", "manager"]);
        } else {
            setSelectedKeys([...Array.from(newSelectedKeys).map(x => x.toString())]);
        }
    };

    return (
        <TagGroup
            aria-label="Jobs"
            selectionMode="multiple"
            selectedKeys={selectedKeys}
            onSelectionChange={handleSelectionChange}
        >
            <Tag id="designer">Designer</Tag>
            <Tag id="developer">Developer</Tag>
            <Tag id="manager">Manager</Tag>
        </TagGroup>
    );
}

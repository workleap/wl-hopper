import { Button, Menu, MenuItem, MenuTrigger, type Selection } from "@hopper-ui/components";
import { KebabIcon } from "@hopper-ui/icons";
import { useCallback, useState } from "react";

export default function Example() {
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set(["edit"]));
    const handleSelectionChange = useCallback((newKeys: Selection) => {
        setSelectedKeys(newKeys);
    }, [setSelectedKeys]);

    return (
        <MenuTrigger>
            <Button variant="secondary" aria-label="Actions for selected resource">
                <KebabIcon />
            </Button>
            <Menu
                selectionMode="multiple"
                selectedKeys={selectedKeys}
                onSelectionChange={handleSelectionChange}
            >
                <MenuItem id="favorite">Favorite</MenuItem>
                <MenuItem id="edit">Edit</MenuItem>
                <MenuItem id="delete">Delete</MenuItem>
            </Menu>
        </MenuTrigger>
    );
}

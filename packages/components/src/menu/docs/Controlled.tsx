import { Button, Menu, MenuItem, MenuTrigger, type Selection } from "@hopper-ui/components";
import { KebabIcon } from "@hopper-ui/icons";
import { useCallback, useState } from "react";

export default function Example() {
    const [selectedKey, setSelectedKey] = useState<Selection>(new Set([]));
    const [isOpen, setIsOpen] = useState(false);
    const handleOpenChange = useCallback((newOpen: boolean) => {
        setIsOpen(newOpen);
    }, [setIsOpen]);
    const handleSelectionChange = useCallback((newKeys: Selection) => {
        setSelectedKey(newKeys);
    }, []);

    return (
        <MenuTrigger onOpenChange={handleOpenChange} isOpen={isOpen}>
            <Button variant="secondary" aria-label="Actions for selected resource">
                <KebabIcon />
            </Button>
            <Menu
                onSelectionChange={handleSelectionChange}
                selectedKeys={selectedKey}
                selectionMode="single"
            >
                <MenuItem>Favorite</MenuItem>
                <MenuItem>Edit</MenuItem>
                <MenuItem>Delete</MenuItem>
            </Menu>
        </MenuTrigger>
    );
}

import { Button, Menu, MenuItem, MenuTrigger } from "@hopper-ui/components";
import { useCallback, useState } from "react";

export default function Example() {
    const [isOpen, setIsOpen] = useState(false);
    const handleOpenChange = useCallback((newOpen: boolean) => {
        setIsOpen(newOpen);
    }, [setIsOpen]);

    const customTrigger = <Button variant={isOpen ? "primary" : "secondary"}>Custom Trigger</Button>;

    return (
        <MenuTrigger onOpenChange={handleOpenChange} isOpen={isOpen}>
            {customTrigger}
            <Menu>
                <MenuItem>Favorite</MenuItem>
                <MenuItem>Edit</MenuItem>
                <MenuItem>Delete</MenuItem>
            </Menu>
        </MenuTrigger>
    );
}

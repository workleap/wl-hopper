import { Menu, MenuItem, MenuTrigger, Pressable } from "@hopper-ui/components";
import { useCallback, useState } from "react";

export default function Example() {
    const [isOpen, setIsOpen] = useState(false);
    const handleOpenChange = useCallback((newOpen: boolean) => {
        setIsOpen(newOpen);
    }, [setIsOpen]);

    return (
        <MenuTrigger onOpenChange={handleOpenChange} isOpen={isOpen}>
            <Pressable>
                <span role="button">Custom trigger</span>
            </Pressable>
            <Menu>
                <MenuItem>Favorite</MenuItem>
                <MenuItem>Edit</MenuItem>
                <MenuItem>Delete</MenuItem>
            </Menu>
        </MenuTrigger>
    );
}

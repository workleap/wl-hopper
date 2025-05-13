import { Button, Content, Heading, Menu, MenuItem, MenuTrigger, Modal } from "@hopper-ui/components";
import { KebabIcon } from "@hopper-ui/icons";
import { useCallback, useState } from "react";

export default function Example() {
    const [isOpen, setIsOpen] = useState(false);
    const handleSelectionChange = useCallback(() => {
        setIsOpen(true);
    }, [setIsOpen]);
    const handleModalClose = useCallback((open: boolean) => {
        if (open) {
            return;
        }

        setIsOpen(false);
    }, [setIsOpen]);

    return (
        <>
            <MenuTrigger>
                <Button variant="secondary" aria-label="Actions for selected resource">
                    <KebabIcon />
                </Button>
                <Menu onSelectionChange={handleSelectionChange} selectionMode="single">
                    <MenuItem>Favorite</MenuItem>
                    <MenuItem>Edit</MenuItem>
                    <MenuItem>Delete</MenuItem>
                </Menu>
            </MenuTrigger>
            <Modal onOpenChange={handleModalClose} isOpen={isOpen}>
                <Heading>Frogs</Heading>
                <Content>
                    Hoppity hops
                </Content>
            </Modal>
        </>
    );
}

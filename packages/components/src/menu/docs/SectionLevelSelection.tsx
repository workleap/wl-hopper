import { Button, Header, Menu, MenuItem, MenuSection, MenuTrigger, type Selection } from "@hopper-ui/components";
import { KebabIcon } from "@hopper-ui/icons";
import { useState } from "react";

export default function Example() {
    const [style, setStyle] = useState<Selection>(new Set(["bold"]));
    const [align, setAlign] = useState<Selection>(new Set(["left"]));

    return (
        <MenuTrigger>
            <Button variant="secondary" aria-label="Actions for selected resource">
                <KebabIcon />
            </Button>
            <Menu>
                <MenuSection>
                    <Header>Actions</Header>
                    <MenuItem>Cut</MenuItem>
                    <MenuItem>Copy</MenuItem>
                    <MenuItem>Paste</MenuItem>
                </MenuSection>
                <MenuSection
                    selectionMode="multiple"
                    selectedKeys={style}
                    onSelectionChange={setStyle}
                >
                    <Header>Text style</Header>
                    <MenuItem id="bold">Bold</MenuItem>
                    <MenuItem id="italic">Italic</MenuItem>
                    <MenuItem id="underline">Underline</MenuItem>
                </MenuSection>
                <MenuSection
                    selectionMode="single"
                    selectedKeys={align}
                    onSelectionChange={setAlign}
                >
                    <Header>Text alignment</Header>
                    <MenuItem id="left">Left</MenuItem>
                    <MenuItem id="center">Center</MenuItem>
                    <MenuItem id="right">Right</MenuItem>
                </MenuSection>
            </Menu>
        </MenuTrigger>
    );
}

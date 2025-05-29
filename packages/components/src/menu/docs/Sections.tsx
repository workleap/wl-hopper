import { Button, Header, Menu, MenuItem, MenuSection, MenuTrigger } from "@hopper-ui/components";
import { KebabIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <MenuTrigger>
            <Button variant="secondary" aria-label="Actions for selected resource">
                <KebabIcon />
            </Button>
            <Menu>
                <MenuSection>
                    <Header>Actions</Header>
                    <MenuItem>Favorite</MenuItem>
                    <MenuItem>Edit</MenuItem>
                    <MenuItem>Delete</MenuItem>
                </MenuSection>
                <MenuSection>
                    <Header>Others</Header>
                    <MenuItem>Help</MenuItem>
                    <MenuItem>Exit</MenuItem>
                </MenuSection>
            </Menu>
        </MenuTrigger>
    );
}

import { Button, Inline, Menu, MenuItem, MenuTrigger } from "@hopper-ui/components";
import { KebabIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <Inline>
            <MenuTrigger>
                <Button variant="secondary" aria-label="Actions for selected resource">
                    <KebabIcon />
                </Button>
                <Menu size="xs">
                    <MenuItem>Favorite</MenuItem>
                    <MenuItem>Edit</MenuItem>
                    <MenuItem>Delete</MenuItem>
                </Menu>
            </MenuTrigger>
            <MenuTrigger>
                <Button variant="secondary" aria-label="Actions for selected resource">
                    <KebabIcon />
                </Button>
                <Menu size="sm">
                    <MenuItem>Favorite</MenuItem>
                    <MenuItem>Edit</MenuItem>
                    <MenuItem>Delete</MenuItem>
                </Menu>
            </MenuTrigger>
            <MenuTrigger>
                <Button variant="secondary" aria-label="Actions for selected resource">
                    <KebabIcon />
                </Button>
                <Menu size="md">
                    <MenuItem>Favorite</MenuItem>
                    <MenuItem>Edit</MenuItem>
                    <MenuItem>Delete</MenuItem>
                </Menu>
            </MenuTrigger>
            <MenuTrigger>
                <Button variant="secondary" aria-label="Actions for selected resource">
                    <KebabIcon />
                </Button>
                <Menu size="lg">
                    <MenuItem>Favorite</MenuItem>
                    <MenuItem>Edit</MenuItem>
                    <MenuItem>Delete</MenuItem>
                </Menu>
            </MenuTrigger>
        </Inline>
    );
}

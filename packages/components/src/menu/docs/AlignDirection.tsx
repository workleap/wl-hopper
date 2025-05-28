import { Button, Inline, Menu, MenuItem, MenuTrigger } from "@hopper-ui/components";
import { KebabIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <Inline>
            <MenuTrigger align="start">
                <Button variant="secondary" aria-label="Actions for selected resource">
                    <KebabIcon />
                </Button>
                <Menu>
                    <MenuItem>Favorite</MenuItem>
                    <MenuItem>Edit</MenuItem>
                    <MenuItem>Delete</MenuItem>
                </Menu>
            </MenuTrigger>
            <MenuTrigger align="end" direction="top">
                <Button variant="secondary" aria-label="Actions for selected resource">
                    <KebabIcon />
                </Button>
                <Menu>
                    <MenuItem>Favorite</MenuItem>
                    <MenuItem>Edit</MenuItem>
                    <MenuItem>Delete</MenuItem>
                </Menu>
            </MenuTrigger>
            <MenuTrigger align="start" direction="top">
                <Button variant="secondary" aria-label="Actions for selected resource">
                    <KebabIcon />
                </Button>
                <Menu>
                    <MenuItem>Favorite</MenuItem>
                    <MenuItem>Edit</MenuItem>
                    <MenuItem>Delete</MenuItem>
                </Menu>
            </MenuTrigger>
            <MenuTrigger align="end" direction="bottom">
                <Button variant="secondary" aria-label="Actions for selected resource">
                    <KebabIcon />
                </Button>
                <Menu>
                    <MenuItem>Favorite</MenuItem>
                    <MenuItem>Edit</MenuItem>
                    <MenuItem>Delete</MenuItem>
                </Menu>
            </MenuTrigger>
        </Inline>
    );
}

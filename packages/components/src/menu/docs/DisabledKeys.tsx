import { Button, Menu, MenuItem, MenuTrigger } from "@hopper-ui/components";
import { KebabIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <MenuTrigger>
            <Button variant="secondary" aria-label="Actions for selected resource">
                <KebabIcon />
            </Button>
            <Menu disabledKeys={["edit", "delete"]}>
                <MenuItem id="favorite">Favorite</MenuItem>
                <MenuItem id="edit">Edit</MenuItem>
                <MenuItem id="delete">Delete</MenuItem>
            </Menu>
        </MenuTrigger>
    );
}

import { Button, Menu, MenuItem, MenuTrigger } from "@hopper-ui/components";
import { DeleteIcon, EditIcon, KebabIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <MenuTrigger>
            <Button variant="secondary" aria-label="Actions for selected resource">
                <KebabIcon />
            </Button>
            <Menu>
                <MenuItem>
                    <EditIcon />
                    Edit
                </MenuItem>
                <MenuItem>
                    <DeleteIcon />
                    Delete
                </MenuItem>
            </Menu>
        </MenuTrigger>
    );
}

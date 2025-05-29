import { Button, Menu, MenuItem, MenuTrigger, Text } from "@hopper-ui/components";
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
                    <Text>Edit</Text>
                </MenuItem>
                <MenuItem>
                    <DeleteIcon />
                    <Text>Delete</Text>
                </MenuItem>
            </Menu>
        </MenuTrigger>
    );
}

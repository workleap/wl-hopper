import { Button, Menu, MenuItem, MenuTrigger, Text } from "@hopper-ui/components";
import { DeleteIcon, EditIcon, KebabIcon, SparklesIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <MenuTrigger>
            <Button variant="secondary" aria-label="Actions for selected resource">
                <KebabIcon />
            </Button>
            <Menu>
                <MenuItem>
                    <EditIcon slot="end-icon" />
                    <Text>Edit</Text>
                </MenuItem>
                <MenuItem>
                    <DeleteIcon slot="end-icon" />
                    <Text>Delete</Text>
                </MenuItem>
                <MenuItem>
                    <SparklesIcon slot="end-icon" />
                    <Text>Miscellaneous</Text>
                </MenuItem>
            </Menu>
        </MenuTrigger>
    );
}

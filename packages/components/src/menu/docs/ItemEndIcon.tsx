import { Button, IconList, Menu, MenuItem, MenuTrigger } from "@hopper-ui/components";
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
                    Edit
                </MenuItem>
                <MenuItem>
                    <DeleteIcon slot="end-icon" />
                    Delete
                </MenuItem>
                <MenuItem>
                    <IconList slot="end-icon">
                        <SparklesIcon />
                        <EditIcon />
                        <DeleteIcon />
                    </IconList>
                    Miscellaneous
                </MenuItem>
            </Menu>
        </MenuTrigger>
    );
}

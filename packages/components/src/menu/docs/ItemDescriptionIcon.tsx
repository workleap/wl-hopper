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
                    <SparklesIcon />
                    <Text>Favorite</Text>
                    <Text slot="description">You can favorite your item</Text>
                </MenuItem>
                <MenuItem>
                    <DeleteIcon />
                    <Text>Delete</Text>
                    <Text slot="description">Your item will be forever gone</Text>
                </MenuItem>
                <MenuItem>
                    <EditIcon />
                    <Text>Edit</Text>
                    <Text slot="description">Edit your item at your own risk</Text>
                </MenuItem>
            </Menu>
        </MenuTrigger>
    );
}

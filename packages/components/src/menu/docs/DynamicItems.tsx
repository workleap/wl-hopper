import { Button, Menu, MenuItem, MenuTrigger } from "@hopper-ui/components";
import { KebabIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <MenuTrigger>
            <Button variant="secondary" aria-label="Actions for selected resource">
                <KebabIcon />
            </Button>
            <Menu>
                {["Favorite", "Edit", "Delete"].map(x => (
                    <MenuItem key={x.toLowerCase()}>{x}</MenuItem>
                ))}
            </Menu>
        </MenuTrigger>
    );
}

import { Button, Div, Menu, MenuTrigger } from "@hopper-ui/components";
import { KebabIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <MenuTrigger>
            <Button variant="secondary" aria-label="Actions for selected resource">
                <KebabIcon />
            </Button>
            <Menu renderEmptyState={() => <Div paddingX="inset-md" paddingY="inset-sm">No results found.</Div>}>
                {[]}
            </Menu>
        </MenuTrigger>
    );
}

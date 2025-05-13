import { Avatar, Button, Menu, MenuItem, MenuTrigger, Text } from "@hopper-ui/components";
import { KebabIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <MenuTrigger>
            <Button variant="secondary" aria-label="Actions for selected resource">
                <KebabIcon />
            </Button>
            <Menu>
                <MenuItem>
                    <Avatar name="Red-Eyed Tree Frog" />
                    <Text>Red-Eyed Tree Frog</Text>
                    <Text slot="description">The Red-Eyed Tree Frog (Agalychnis callidryas) is a vibrant nocturnal climber</Text>
                </MenuItem>
                <MenuItem>
                    <Avatar name="Poison Dart Frog" />
                    <Text>Poison Dart Frog</Text>
                    <Text slot="description">
                        The Poison Dart Frog (Dendrobatidae) is a tiny but highly toxic amphibian
                    </Text>
                </MenuItem>
                <MenuItem>
                    <Avatar name="Goliath Frog" />
                    <Text>Goliath Frog</Text>
                    <Text slot="description">
                        The Goliath Frog (Conraua goliath) is the largest frog in the world
                    </Text>
                </MenuItem>
            </Menu>
        </MenuTrigger>
    );
}

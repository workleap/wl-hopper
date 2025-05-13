import { DeleteIcon, EditIcon, KebabIcon, SparklesIcon } from "@hopper-ui/icons";
import { hopperParameters } from "@hopper-ui/storybook-addon";
import { Div } from "@hopper-ui/styled-system";
import type { Meta, StoryObj } from "@storybook/react";
import { userEvent } from "@storybook/test";

import { Avatar } from "../../../avatar/index.ts";
import { Button } from "../../../buttons/index.ts";
import { Divider } from "../../../divider/index.ts";
import { Header } from "../../../header/index.ts";
import { IconList } from "../../../icon-list/index.ts";
import { Text } from "../../../typography/index.ts";
import { Menu, MenuItem, MenuSection, MenuTrigger, SubmenuTrigger } from "../../src/index.ts";
import { CombinedMenu } from "../../src/Menu.tsx";

const meta = {
    title: "Components/Menu",
    component: CombinedMenu,
    decorators: [
        Story => (
            <Div UNSAFE_height="300px">
                <Story />
            </Div>
        )
    ],
    args: {
        isOpen: true
    }
} satisfies Meta<typeof CombinedMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
    render: args => (
        <MenuTrigger {...args}>
            <Button variant="secondary" aria-label="Actions for selected resource">
                <KebabIcon />
            </Button>
            <Menu {...args}>
                <MenuItem>Favorite</MenuItem>
                <MenuItem>Edit</MenuItem>
                <MenuItem>Delete</MenuItem>
            </Menu>
        </MenuTrigger>
    )
} satisfies Story;

export const Sections = {
    render: args => (
        <MenuTrigger {...args}>
            <Button variant="secondary" aria-label="Actions for selected resource">
                <KebabIcon />
            </Button>
            <Menu {...args}>
                <MenuSection>
                    <Header>Actions</Header>
                    <MenuItem>Favorite</MenuItem>
                    <MenuItem>Edit</MenuItem>
                    <MenuItem>Delete</MenuItem>
                </MenuSection>
                <MenuSection>
                    <Header>Others</Header>
                    <MenuItem>Help</MenuItem>
                    <MenuItem>Exit</MenuItem>
                </MenuSection>
            </Menu>
        </MenuTrigger>
    )
} satisfies Story;

export const Dividers = {
    render: args => (
        <MenuTrigger {...args}>
            <Button variant="secondary" aria-label="Actions for selected resource">
                <KebabIcon />
            </Button>
            <Menu {...args}>
                <MenuItem>Favorite</MenuItem>
                <MenuItem>Edit</MenuItem>
                <Divider />
                <MenuItem>Delete</MenuItem>
            </Menu>
        </MenuTrigger>
    )
} satisfies Story;

export const ItemIcon = {
    render: args => (
        <MenuTrigger {...args}>
            <Button variant="secondary" aria-label="Actions for selected resource">
                <KebabIcon />
            </Button>
            <Menu {...args}>
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
    )
} satisfies Story;

export const ItemEndIcon = {
    render: args => (
        <MenuTrigger {...args}>
            <Button variant="secondary" aria-label="Actions for selected resource">
                <KebabIcon />
            </Button>
            <Menu {...args}>
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
    )
} satisfies Story;

export const ItemDescription = {
    render: args => (
        <MenuTrigger {...args}>
            <Button variant="secondary" aria-label="Actions for selected resource">
                <KebabIcon />
            </Button>
            <Menu {...args}>
                <MenuItem>
                    <Text>Favorite</Text>
                    <Text slot="description">You can favorite your item</Text>
                </MenuItem>
                <MenuItem>
                    <Text>Delete</Text>
                    <Text slot="description">Your item will be forever gone</Text>
                </MenuItem>
                <MenuItem>
                    <Text>Edit</Text>
                    <Text slot="description">Edit your item at your own risk</Text>
                </MenuItem>
            </Menu>
        </MenuTrigger>
    )
} satisfies Story;

export const ItemDescriptionIcon = {
    render: args => (
        <MenuTrigger {...args}>
            <Button variant="secondary" aria-label="Actions for selected resource">
                <KebabIcon />
            </Button>
            <Menu {...args}>
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
    )
} satisfies Story;

export const ItemDescriptionAvatar = {
    render: args => (
        <MenuTrigger {...args}>
            <Button variant="secondary" aria-label="Actions for selected resource">
                <KebabIcon />
            </Button>
            <Menu {...args}>
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
    )
} satisfies Story;

export const DisabledItem = {
    render: args => (
        <MenuTrigger {...args}>
            <Button variant="secondary" aria-label="Actions for selected resource">
                <KebabIcon />
            </Button>
            <Menu {...args}>
                <MenuItem>Favorite</MenuItem>
                <MenuItem isDisabled>Edit</MenuItem>
                <MenuItem>Delete</MenuItem>
            </Menu>
        </MenuTrigger>
    )
} satisfies Story;

export const Validation = {
    render: args => (
        <MenuTrigger {...args}>
            <Button variant="secondary" aria-label="Actions for selected resource">
                <KebabIcon />
            </Button>
            <Menu {...args}>
                <MenuItem id="favorite">Favorite</MenuItem>
                <MenuItem id="edit">Edit</MenuItem>
                <MenuItem id="delete">Delete</MenuItem>
            </Menu>
        </MenuTrigger>
    ),
    args: {
        isOpen: true,
        validationState: "invalid",
        selectionMode: "single",
        selectedKeys: ["edit"]
    }
} satisfies Story;

export const SubmenuLight = {
    render: args => (
        <MenuTrigger {...args}>
            <Button variant="secondary" aria-label="Actions for selected resource">
                <KebabIcon />
            </Button>
            <Menu {...args}>
                <MenuItem>Favorite</MenuItem>
                <MenuItem>Edit</MenuItem>
                <SubmenuTrigger>
                    <MenuItem>Share</MenuItem>
                    <Menu>
                        <MenuItem>SMS</MenuItem>
                        <MenuItem>Email</MenuItem>
                    </Menu>
                </SubmenuTrigger>
            </Menu>
        </MenuTrigger>
    ),
    parameters: {
        ...hopperParameters({ colorSchemes: ["light"] })
    },
    play: async () => {
        await userEvent.keyboard("{ArrowDown}");
        await userEvent.keyboard("{ArrowDown}");
        await userEvent.keyboard("{ArrowDown}");
        await userEvent.keyboard("{Enter}");
    }
} satisfies Story;

export const SubmenuDark = {
    ...SubmenuLight,
    parameters: {
        ...hopperParameters({ colorSchemes: ["dark"] })
    }
} satisfies Story;

export const SingleSelectionMode = {
    render: args => (
        <MenuTrigger {...args}>
            <Button variant="secondary" aria-label="Actions for selected resource">
                <KebabIcon />
            </Button>
            <Menu {...args}>
                <MenuItem id="favorite">Favorite</MenuItem>
                <MenuItem id="edit">Edit</MenuItem>
                <MenuItem id="delete">Delete</MenuItem>
            </Menu>
        </MenuTrigger>
    ),
    args: {
        selectionMode: "single",
        selectedKeys: ["favorite"]
    }
} satisfies Story;

export const MultipleSelectionMode = {
    render: args => (
        <MenuTrigger {...args}>
            <Button variant="secondary" aria-label="Actions for selected resource">
                <KebabIcon />
            </Button>
            <Menu {...args}>
                <MenuItem id="favorite">Favorite</MenuItem>
                <MenuItem id="edit">Edit</MenuItem>
                <MenuItem id="delete">Delete</MenuItem>
            </Menu>
        </MenuTrigger>
    ),
    args: {
        selectionMode: "multiple",
        selectedKeys: ["favorite", "delete"]
    }
} satisfies Story;



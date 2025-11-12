import { DeleteIcon, EditIcon, KebabIcon, SparklesIcon } from "@hopper-ui/icons";
import { hopperParameters } from "@hopper-ui/storybook-addon";
import { Div } from "@hopper-ui/styled-system";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { userEvent } from "storybook/test";

import { Avatar } from "../../../avatar/index.ts";
import { Button } from "../../../buttons/index.ts";
import { Divider } from "../../../divider/index.ts";
import { Header } from "../../../header/index.ts";
import { IconList } from "../../../icon-list/index.ts";
import { Inline } from "../../../layout/index.ts";
import { Text } from "../../../typography/index.ts";
import { Menu, MenuItem, MenuSection, MenuTrigger, SubmenuTrigger } from "../../src/index.ts";

const meta = {
    title: "Components/Menu",
    component: Menu,
    decorators: [
        (Story, { parameters }) => (
            parameters.disableWrapper ? (
                <Story />
            ) : (
                <Div UNSAFE_minHeight="300px">
                    <MenuTrigger isOpen>
                        <Button variant="secondary" aria-label="Actions for selected resource">
                            <KebabIcon />
                        </Button>
                        <Story />
                    </MenuTrigger>
                </Div>
            ))
    ]
} satisfies Meta<typeof Menu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
    render: args => (
        <Menu {...args}>
            <MenuItem>Favorite</MenuItem>
            <MenuItem>Edit</MenuItem>
            <MenuItem>Delete</MenuItem>
        </Menu>
    )
} satisfies Story;

export const AlignAndDirection = {
    render: args => (
        <Div UNSAFE_minHeight="800px">
            <Inline alignY="center" alignX="center" UNSAFE_gap="200px" UNSAFE_minHeight="400px">
                <MenuTrigger isOpen align="start">
                    <Button variant="secondary" aria-label="Actions for selected resource">
                        <KebabIcon />
                    </Button>
                    <Menu {...args}>
                        <MenuItem>Favorite</MenuItem>
                        <MenuItem>Edit</MenuItem>
                        <MenuItem>Delete</MenuItem>
                    </Menu>
                </MenuTrigger>
                <MenuTrigger isOpen align="end" direction="top">
                    <Button variant="secondary" aria-label="Actions for selected resource">
                        <KebabIcon />
                    </Button>
                    <Menu {...args}>
                        <MenuItem>Favorite</MenuItem>
                        <MenuItem>Edit</MenuItem>
                        <MenuItem>Delete</MenuItem>
                    </Menu>
                </MenuTrigger>
                <MenuTrigger isOpen align="start" direction="top">
                    <Button variant="secondary" aria-label="Actions for selected resource">
                        <KebabIcon />
                    </Button>
                    <Menu {...args}>
                        <MenuItem>Favorite</MenuItem>
                        <MenuItem>Edit</MenuItem>
                        <MenuItem>Delete</MenuItem>
                    </Menu>
                </MenuTrigger>
                <MenuTrigger isOpen align="end" direction="bottom">
                    <Button variant="secondary" aria-label="Actions for selected resource">
                        <KebabIcon />
                    </Button>
                    <Menu {...args}>
                        <MenuItem>Favorite</MenuItem>
                        <MenuItem>Edit</MenuItem>
                        <MenuItem>Delete</MenuItem>
                    </Menu>
                </MenuTrigger>
            </Inline>
        </Div>
    ),
    parameters: {
        disableWrapper: true
    }
} satisfies Story;

export const Sizes = {
    render: args => (
        <Div UNSAFE_minHeight="800px">
            <Inline alignY="center" alignX="center" UNSAFE_gap="200px" UNSAFE_minHeight="400px">
                <MenuTrigger isOpen align="start">
                    <Button variant="secondary" aria-label="Actions for selected resource">
                        <KebabIcon />
                    </Button>
                    <Menu {...args} size="xs">
                        <MenuItem>Favorite</MenuItem>
                        <MenuItem>Edit</MenuItem>
                        <MenuItem>Delete</MenuItem>
                    </Menu>
                </MenuTrigger>
                <MenuTrigger isOpen align="end" direction="top">
                    <Button variant="secondary" aria-label="Actions for selected resource">
                        <KebabIcon />
                    </Button>
                    <Menu {...args} size="sm">
                        <MenuItem>Favorite</MenuItem>
                        <MenuItem>Edit</MenuItem>
                        <MenuItem>Delete</MenuItem>
                    </Menu>
                </MenuTrigger>
                <MenuTrigger isOpen align="start" direction="top">
                    <Button variant="secondary" aria-label="Actions for selected resource">
                        <KebabIcon />
                    </Button>
                    <Menu {...args} size="md">
                        <MenuItem>Favorite</MenuItem>
                        <MenuItem>Edit</MenuItem>
                        <MenuItem>Delete</MenuItem>
                    </Menu>
                </MenuTrigger>
                <MenuTrigger isOpen align="end" direction="bottom">
                    <Button variant="secondary" aria-label="Actions for selected resource">
                        <KebabIcon />
                    </Button>
                    <Menu {...args} size="lg">
                        <MenuItem>Favorite</MenuItem>
                        <MenuItem>Edit</MenuItem>
                        <MenuItem>Delete</MenuItem>
                    </Menu>
                </MenuTrigger>
            </Inline>
        </Div>
    ),
    parameters: {
        disableWrapper: true
    }
} satisfies Story;

export const Sections = {
    render: args => (
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
    )
} satisfies Story;

export const SelectedSubmenu = {
    render: args => (
        <Menu {...args}>
            <MenuItem id="favorite">Favorite</MenuItem>
            <MenuItem id="edit">Edit</MenuItem>
            <SubmenuTrigger>
                <MenuItem id="share">Share</MenuItem>
                <Menu>
                    <MenuItem>SMS</MenuItem>
                    <MenuItem>Email</MenuItem>
                </Menu>
            </SubmenuTrigger>
        </Menu>
    ),
    args: {
        selectionMode: "single",
        selectedKeys: ["share"]
    }
} satisfies Story;

export const Dividers = {
    render: args => (
        <Menu {...args}>
            <MenuItem>Favorite</MenuItem>
            <MenuItem>Edit</MenuItem>
            <Divider />
            <MenuItem>Delete</MenuItem>
        </Menu>
    )
} satisfies Story;

export const ItemIcon = {
    render: args => (
        <Menu {...args}>
            <MenuItem>
                <EditIcon />
                <Text>Edit</Text>
            </MenuItem>
            <MenuItem>
                <DeleteIcon />
                <Text>Delete</Text>
            </MenuItem>
        </Menu>
    )
} satisfies Story;

export const ItemEndIcon = {
    render: args => (
        <Menu {...args}>
            <MenuItem>
                <EditIcon slot="end-icon" />
                <Text>Edit</Text>
            </MenuItem>
            <MenuItem>
                <DeleteIcon slot="end-icon" />
                <Text>Delete</Text>
            </MenuItem>
            <MenuItem>
                <IconList slot="end-icon">
                    <SparklesIcon />
                    <EditIcon />
                    <DeleteIcon />
                </IconList>
                <Text>Miscellaneous</Text>
            </MenuItem>
        </Menu>
    )
} satisfies Story;

export const ItemDescription = {
    render: args => (
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
    )
} satisfies Story;

export const ItemDescriptionIcon = {
    render: args => (
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
    )
} satisfies Story;

export const ItemDescriptionAvatar = {
    render: args => (
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
    )
} satisfies Story;

export const DisabledItem = {
    render: args => (
        <Menu {...args}>
            <MenuItem>Favorite</MenuItem>
            <MenuItem isDisabled>Edit</MenuItem>
            <MenuItem>Delete</MenuItem>
        </Menu>
    )
} satisfies Story;

export const Validation = {
    render: args => (
        <Menu {...args}>
            <MenuItem id="favorite">Favorite</MenuItem>
            <MenuItem id="edit" isInvalid>Edit</MenuItem>
            <MenuItem id="delete" isInvalid>Delete</MenuItem>
        </Menu>
    ),
    args: {
        selectionMode: "single",
        selectedKeys: ["edit"]
    }
} satisfies Story;

export const SubmenuLight = {
    render: args => (
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
        <Menu {...args}>
            <MenuItem id="favorite">Favorite</MenuItem>
            <MenuItem id="edit">Edit</MenuItem>
            <MenuItem id="delete">Delete</MenuItem>
        </Menu>
    ),
    args: {
        selectionMode: "single",
        selectedKeys: ["favorite"]
    }
} satisfies Story;

export const MultipleSelectionMode = {
    render: args => (
        <Menu {...args}>
            <MenuItem id="favorite">Favorite</MenuItem>
            <MenuItem id="edit">Edit</MenuItem>
            <MenuItem id="delete">Delete</MenuItem>
        </Menu>
    ),
    args: {
        selectionMode: "multiple",
        selectedKeys: ["favorite", "delete"]
    }
} satisfies Story;

export const Overflowing = {
    parameters: {
        ...hopperParameters({
            colorSchemes: ["light"]
        }),
        chromatic: {
            modes: {
                "Small height": { viewport: { height: 200 } }
            }
        }
    },
    render: args => (
        <Menu {...args}>
            <MenuItem>Favorite</MenuItem>
            <MenuItem>Edit</MenuItem>
            <MenuItem>Delete</MenuItem>
            <MenuItem>Help</MenuItem>
            <MenuItem>Exit</MenuItem>
            <MenuItem>Share</MenuItem>
            <MenuItem>Download</MenuItem>
            <MenuItem>Duplicate</MenuItem>
            <MenuItem>Move to...</MenuItem>
            <MenuItem>Copy to...</MenuItem>
            <MenuItem>Archive</MenuItem>
            <MenuItem>Print</MenuItem>
        </Menu>
    )
} satisfies Story;

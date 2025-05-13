import { DeleteIcon, EditIcon, KebabIcon } from "@hopper-ui/icons";
import type { Meta, StoryObj } from "@storybook/react";

import { Avatar } from "../../../avatar/index.ts";
import { Button } from "../../../buttons/index.ts";
import { Menu, MenuItem, MenuTrigger, SubmenuTrigger } from "../../src/index.ts";
import { CombinedMenu } from "../../src/Menu.tsx";

const meta = {
    title: "Components/Menu",
    component: CombinedMenu,
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
                <MenuItem>
                    <EditIcon />
                    Edit
                </MenuItem>
                <MenuItem>
                    <DeleteIcon slot="end-icon" />
                    Delete
                </MenuItem>
                <MenuItem>
                    <Avatar name="Fred Freeman" />
                    Fred Freeman
                </MenuItem>
            </Menu>
        </MenuTrigger>
    )
} satisfies Story;

export const WithSubmenu = {
    render: args => (
        <MenuTrigger {...args}>
            <Button variant="secondary" aria-label="Actions for selected resource">
                <KebabIcon />
            </Button>
            <Menu {...args}>
                <MenuItem>Favorite</MenuItem>
                <MenuItem>Edit</MenuItem>
                <MenuItem>Delete</MenuItem>
                <SubmenuTrigger>
                    <MenuItem>Share</MenuItem>
                    <Menu>
                        <MenuItem>SMS</MenuItem>
                        <MenuItem>Email</MenuItem>
                    </Menu>
                </SubmenuTrigger>
            </Menu>
        </MenuTrigger>
    )
} satisfies Story;

export const WithSelectionMode = {
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

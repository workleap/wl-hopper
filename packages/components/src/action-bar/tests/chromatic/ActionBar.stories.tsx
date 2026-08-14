import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { Button } from "../../../buttons/index.ts";
import { Stack } from "../../../layout/index.ts";
import { ActionBar } from "../../src/index.ts";

const meta = {
    title: "Components/ActionBar",
    component: ActionBar
} satisfies Meta<typeof ActionBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
    render: props => (
        <ActionBar selectedItemCount={12} totalItemCount={230} {...props}>
            <Button variant="primary" size="sm">
                Approve
            </Button>
            <Button variant="secondary" size="sm">
                Export
            </Button>
            <Button variant="danger" size="sm">
                Delete
            </Button>
        </ActionBar>
    ),
    args: {
        children: null
    }
} satisfies Story;

export const Actions = {
    render: props => (
        <Stack>
            <ActionBar selectedItemCount={1} {...props}>
                <Button variant="primary" size="sm">
                    Primary action
                </Button>
            </ActionBar>
            <ActionBar selectedItemCount={1} {...props}>
                <Button variant="primary" size="sm">
                    Primary action
                </Button>
                <Button variant="secondary" size="sm">
                    More
                </Button>
            </ActionBar>
            <ActionBar selectedItemCount={1} {...props}>
                <Button variant="primary" size="sm">
                    Primary action
                </Button>
                <Button variant="danger" size="sm">
                    Destructive action
                </Button>
                <Button variant="secondary" size="sm">
                    More
                </Button>
            </ActionBar>
        </Stack>
    ),
    args: {
        children: null
    }
} satisfies Story;

export const SelectedItemCount = {
    render: props => (
        <Stack>
            <ActionBar selectedItemCount={1} {...props}>
                <Button variant="secondary" size="sm">
                    Export
                </Button>
            </ActionBar>
            <ActionBar selectedItemCount={12} totalItemCount={230} {...props}>
                <Button variant="secondary" size="sm">
                    Export
                </Button>
            </ActionBar>
            <ActionBar selectedItemCount="all" {...props}>
                <Button variant="secondary" size="sm">
                    Export
                </Button>
            </ActionBar>
        </Stack>
    ),
    args: {
        children: null
    }
} satisfies Story;

// Narrowing widths show the degradation chain: the count text truncates first, then the actions
// wrap to their own row, then the buttons wrap among themselves.
export const NarrowContainers = {
    render: props => (
        <Stack>
            {["32rem", "24rem", "18rem", "12rem"].map(width => (
                <ActionBar key={width} UNSAFE_width={width} selectedItemCount={12} totalItemCount={230} {...props}>
                    <Button variant="primary" size="sm">
                        Approve
                    </Button>
                    <Button variant="danger" size="sm">
                        Delete
                    </Button>
                </ActionBar>
            ))}
        </Stack>
    ),
    args: {
        children: null
    }
} satisfies Story;

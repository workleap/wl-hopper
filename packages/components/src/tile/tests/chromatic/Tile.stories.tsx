import type { Meta, StoryObj } from "@storybook/react";

import { Text } from "../../../typography/index.ts";
import { Tile } from "../../src/index.ts";

const meta = {
    title: "Components/Tile",
    component: Tile,
    args: {
        id: "test"
    }
} satisfies Meta<typeof Tile>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
    render: props => (
        <Tile {...props}>
            <Text>Label</Text>
        </Tile>
    )
} satisfies Story;

export const Selected = {
    ...Default,
    args: {
        isSelected: true
    }
} satisfies Story;

export const Disabled = {
    ...Default,
    args: {
        isDisabled: true
    }
} satisfies Story;

export const DisabledAndSelected = {
    ...Default,
    args: {
        isDisabled: true,
        isSelected: true
    }
} satisfies Story;

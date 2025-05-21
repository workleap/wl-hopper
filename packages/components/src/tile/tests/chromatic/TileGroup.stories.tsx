import type { Meta, StoryObj } from "@storybook/react";

import { Tile, TileGroup } from "../../src/index.ts";

const meta = {
    title: "Components/Tile/TileGroup",
    component: TileGroup
} satisfies Meta<typeof TileGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
    render: props => (
        <TileGroup {...props} aria-label="Animals">
            <Tile id="frog">Frog</Tile>
            <Tile id="camel">Camel</Tile>
        </TileGroup>
    )
} satisfies Story;

export const Selected = {
    ...Default,
    args: {
        defaultSelectedKeys: ["camel"]
    }
} satisfies Story;

export const Disabled = {
    ...Default,
    args: {
        isDisabled: true
    }
} satisfies Story;

export const SelectedAndDisabled = {
    ...Default,
    args: {
        selectedKeys: ["camel"],
        isDisabled: true
    }
} satisfies Story;

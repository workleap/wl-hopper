import type { Meta, StoryObj } from "@storybook/react-webpack5";

import Card from "./Card";

const meta = {
    title: "components/Card",
    component: Card,
    args: {
        children: "Card content"
    }
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
    args: {
        size: "sm"
    }
};

export const Align: Story = {
    args: {
        align: "start"
    }
};

export const Ghost: Story = {
    args: {
        ghost: true,
        align: "start"
    }
};

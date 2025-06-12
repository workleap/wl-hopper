import type { Meta, StoryObj } from "@storybook/react-webpack5";

import CopyButton from "./CopyButton";

const meta = {
    title: "components/CopyButton",
    component: CopyButton,
    args: {
        text: "storybook is awesome"
    }
} satisfies Meta<typeof CopyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Inline: Story = {
    args: {
        variant: "inline"
    }
};

export const Ghost: Story = {
    args: {
        variant: "ghost",
        children: "this text can be copied in 1 click"
    }
};

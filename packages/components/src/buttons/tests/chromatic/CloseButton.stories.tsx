import type { Meta, StoryObj } from "@storybook/react";

import { CloseButton } from "../../src/CloseButton.tsx";

const meta = {
    title: "Components/Buttons/CloseButton",
    component: CloseButton
} satisfies Meta<typeof CloseButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
    render: args => {
        return (
            <CloseButton {...args} />
        );
    }
} satisfies Story;

export const SizeXs = {
    ...Default,
    args: {
        size: "xs"
    }
};

export const SizeSm = {
    ...Default,
    args: {
        size: "sm"
    }
};

export const SizeLg = {
    ...Default,
    args: {
        size: "lg"
    }
};

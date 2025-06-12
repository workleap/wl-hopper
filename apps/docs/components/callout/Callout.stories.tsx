import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { Callout } from "./Callout.tsx";

const meta = {
    title: "components/Callout",
    component: Callout,
    args: {
        children: "Content of the callout"
    }
} satisfies Meta<typeof Callout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {}
};

export const Warning: Story = {
    args: {
        variant: "warning"
    }
};

export const Success: Story = {
    args: {
        variant: "success"
    }
};

export const Error: Story = {
    args: {
        variant: "error"
    }
};

export const Message: Story = {
    args: {
        variant: "message"
    }
};


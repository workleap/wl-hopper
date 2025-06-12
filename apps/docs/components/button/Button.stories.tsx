import type { Meta, StoryObj } from "@storybook/react-webpack5";

import Button from "./Button";

const meta = {
    title: "components/Button",
    component: Button
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: "Get started"
    }
};

export const Secondary: Story = {
    args: {
        variant: "secondary",
        children: "Github"
    }
};

export const Ghost: Story = {
    args: {
        variant: "ghost",
        children: "view on npm"
    }
};

export const Sizes: Story = {
    args: {
        children: "Get started",
        variant: "secondary"
    },
    render: args => (
        <div style={{ display: "flex", gap: "1rem", alignItems: "start" }}>
            <Button {...args} size="md" />
            <Button {...args} size="sm" />
        </div>
    )
};

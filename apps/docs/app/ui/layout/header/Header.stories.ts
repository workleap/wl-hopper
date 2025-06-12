import type { Meta, StoryObj } from "@storybook/react-webpack5";

import Header from "./Header";

const meta = {
    title: "app/layout/Header",
    component: Header
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

import type { Meta, StoryObj } from "@storybook/react-webpack5";

import TableSection from "./TableSection";

const meta = {
    title: "app/tokens/TableSection",
    component: TableSection
} satisfies Meta<typeof TableSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        tokens: [
            {
                name: "color-primary",
                value: "#000"
            },
            {
                name: "color-secondary",
                value: "#fff"
            },
            {
                name: "hop-space-0",
                value: "0"
            },
            {
                name: "hop-space-20",
                value: "0.125"
            }
        ],
        categories: ["color", "space"],
        categoryKey: "name"
    }
};

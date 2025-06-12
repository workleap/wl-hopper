import type { Meta, StoryObj } from "@storybook/react-webpack5";

import Aside from "./Aside";

const meta = {
    title: "app/layout/Aside",
    component: Aside
} satisfies Meta<typeof Aside>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: "Title",
        links: [
            { id: "1", title: "Link 1", url: "#" },
            { id: "2", title: "Link 2", url: "#" },
            { id: "3", title: "Link 3", url: "#" }
        ]
    }
};

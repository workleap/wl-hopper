import type { Meta, StoryObj } from "@storybook/react-webpack5";

import Tabs from "./Tabs";

const meta = {
    title: "components/Tabs",
    component: Tabs
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        tabs: [
            {
                id: "tab1",
                title: "Tab 1"
            },
            {
                id: "tab2",
                title: "Tab 2"
            },
            {
                id: "tab3",
                title: "Tab 3"
            }
        ],
        children: [
            <div key="tab1">Tab 1 content</div>,
            <div key="tab2">Tab 2 content</div>,
            <div key="tab3">Tab 3 content</div>
        ]

    }
};

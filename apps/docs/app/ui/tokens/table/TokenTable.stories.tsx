import type { Meta, StoryObj } from "@storybook/react-webpack5";

import TokenTable from "./TokenTable.tsx";

const meta = {
    title: "app/tokens/TokenTable",
    component: TokenTable
} satisfies Meta<typeof TokenTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        category: "react",
        data: [
            {
                name: "--hop-sapphire-200",
                value: "#95b1ff"
            },
            {
                name: "--hop-primary-surface-disabled",
                value: "#95b1ff"
            },
            {
                name: "--hop-primary-surface-disabled",
                value: "#2040c7"
            }
        ]
    }
};

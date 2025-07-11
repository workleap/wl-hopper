import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { IconTable } from "./IconTable";
import { iconNames, richIconNames } from "@hopper-ui/icons";

const meta = {
    title: "app/icons/IconTable",
    component: IconTable
} satisfies Meta<typeof IconTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        size: "lg",
        items: iconNames,
        type: "react"
    }
};

export const Rich: Story = {
    args: {
        size: "lg",
        items: richIconNames,
        type: "react"
    }
};

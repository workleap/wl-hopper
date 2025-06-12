import type { Meta, StoryObj } from "@storybook/react-webpack5";

import Expand from "./Expand.tsx";

const meta = {
    title: "components/Expand",
    component: Expand
} satisfies Meta<typeof Expand>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: "Label",
        children: "Content of the expand",
        className: "custom-class"
    }
};

export const Open: Story = {
    args: {
        ...Default.args,
        defaultExpanded: true
    }
};

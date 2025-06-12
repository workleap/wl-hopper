import type { Meta, StoryObj } from "@storybook/react-webpack5";

import Tag from "./Tag";

const meta = {
    title: "components/Tag",
    component: Tag
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: "draft"
    }
};

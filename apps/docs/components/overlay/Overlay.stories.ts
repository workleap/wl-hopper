import type { Meta, StoryObj } from "@storybook/react-webpack5";

import Overlay from "./Overlay";

const meta = {
    title: "components/Overlay",
    component: Overlay
} satisfies Meta<typeof Overlay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        isOpen: true
    }
};

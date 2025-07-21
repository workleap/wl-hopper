import type { Meta, StoryObj } from "@storybook/react-webpack5";

import Image from "./Image";

const meta = {
    title: "components/Image",
    component: Image
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        src: "https://placebear.com/640/360",
        alt: "Image",
        width: 640,
        height: 360
    }
};

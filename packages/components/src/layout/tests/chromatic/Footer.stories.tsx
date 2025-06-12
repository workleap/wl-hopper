import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { Footer } from "../../src/Footer.tsx";

const meta = {
    title: "Components/Layout/Footer",
    component: Footer,
    args: {
        children: "Footer content"
    }

} satisfies Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

import type { Meta, StoryObj } from "@storybook/react-webpack5";

import Switcher from "./Switcher";

const meta = {
    title: "app/icons/Switcher",
    component: Switcher
} satisfies Meta<typeof Switcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const React: Story = {
    args: {
        type: "react",
        iconType: "icon"
    }
};

export const Svg: Story = {
    args: {
        type: "svg",
        iconType: "icon"
    }
};

export const RichReact: Story = {
    args: {
        type: "react",
        iconType: "richIcon"
    }
};

export const RichSvg: Story = {
    args: {
        type: "svg",
        iconType: "richIcon"
    }
};

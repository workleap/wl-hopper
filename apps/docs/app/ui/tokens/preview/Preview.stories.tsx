import type { Meta, StoryObj } from "@storybook/react-webpack5";

import Preview from "./Preview";

const meta = {
    title: "app/tokens/Preview",
    component: Preview
} satisfies Meta<typeof Preview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Color: Story = {
    args: {
        category: "color",
        name: "sapphire-500",
        value: "#5f61c5"
    }
};

export const FontFamily: Story = {
    args: {
        category: "fontFamily",
        name: "font-family-primary",
        value: "ABC Favorit"
    }
};

export const FontSize: Story = {
    args: {
        category: "fontSize",
        name: "font-size-120",
        value: "1rem"
    }
};

export const FontWeight: Story = {
    args: {
        category: "fontWeight",
        name: "font-weight-400",
        value: "400"
    }
};

export const LineHeight: Story = {
    args: {
        category: "lineHeight",
        name: "line-height-120",
        value: "1.125rem"
    }
};

export const BorderRadius: Story = {
    args: {
        category: "borderRadius",
        name: "border-radius-4",
        value: "1.5rem"
    }
};

export const Size: Story = {
    args: {
        category: "size",
        name: "space-1280",
        value: "8rem"
    }
};

export const Shadow: Story = {
    args: {
        category: "shadow",
        name: "shadow-sm",
        value: "0 1px 6px 0 rgba(60, 60, 60, 0.10)"
    }
};

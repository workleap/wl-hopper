import type { Meta, StoryObj } from "@storybook/react-webpack5";

import Code from "./Code";

const meta = {
    title: "components/Code",
    component: Code
} satisfies Meta<typeof Code>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: "const foo = 'bar';",
        value: "const foo = 'bar';"
    }
};

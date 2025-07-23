import type { Meta, StoryObj } from "@storybook/react-webpack5";

import Pre from "./Pre";

const meta = {
    title: "components/Pre",
    component: Pre
} satisfies Meta<typeof Pre>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        raw: "const foo = 'bar';",
        title: "Story.tsx",
        "data-language": "tsx",
        children: <code>const foo = &apos;bar&apos;;</code>
    }
};

export const WithoutTitle: Story = {
    args: {
        raw: "const foo = 'bar';",
        "data-language": "tsx",
        children: <code>const foo = &apos;bar&apos;;</code>
    }
};

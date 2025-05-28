import type { Meta, StoryObj } from "@storybook/react";

import { ContextualHelp } from "../../src/ContextualHelp.tsx";

const meta = {
    title: "Components/ContextualHelp",
    component: ContextualHelp,
    args: {
        children: "This is a contextual help message."
    }
} satisfies Meta<typeof ContextualHelp>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
} satisfies Story;

import type { Meta, StoryObj } from "@storybook/react";

import { Inline } from "../../../layout/index.ts";
import { ContextualHelp } from "../../src/ContextualHelp.tsx";

const meta = {
    title: "Components/ContextualHelp",
    component: ContextualHelp,
    args: {
        children: "This is a contextual help message."
    },
    decorators: [
        Story => (
            <Inline alignX="center" alignY="center" UNSAFE_height="150px">
                <Story />
            </Inline>
        )
    ]
} satisfies Meta<typeof ContextualHelp>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
} satisfies Story;

export const Open = {
    ...Default,
    args: {
        isOpen: true
    }
} satisfies Story;

export const Sizes = {
    render: args => (
        <Inline UNSAFE_gap="200px">
            <ContextualHelp {...args} size="sm">Small size</ContextualHelp>
            <ContextualHelp {...args} size="md">Medium size</ContextualHelp>
        </Inline>
    ),
    args: {
        isOpen: true
    }
} satisfies Story;

export const Variants = {
    render: args => (
        <Inline UNSAFE_gap="200px">
            <ContextualHelp {...args} variant="help">Help</ContextualHelp>
            <ContextualHelp {...args} variant="info">Information</ContextualHelp>
        </Inline>
    ),
    args: {
        isOpen: true
    }
} satisfies Story;

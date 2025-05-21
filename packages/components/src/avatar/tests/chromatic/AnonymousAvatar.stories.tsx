import type { Meta, StoryObj } from "@storybook/react";

import { Inline } from "../../../layout/index.ts";
import { AnonymousAvatar } from "../../src/AnonymousAvatar.tsx";

const meta = {
    title: "Components/Avatar/AnonymousAvatar",
    component: AnonymousAvatar
} satisfies Meta<typeof AnonymousAvatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
    render: args => (
        <Inline alignY="center">
            <AnonymousAvatar {...args} size="xs" />
            <AnonymousAvatar {...args} size="sm" />
            <AnonymousAvatar {...args} />
            <AnonymousAvatar {...args} size="lg" />
            <AnonymousAvatar {...args} size="xl" />
            <AnonymousAvatar {...args} size="2xl" />
        </Inline>
    ),
    args: {
        "aria-label": "deleted"
    }
} satisfies Story;

export const AccessToDisabledState: Story = {
    render: props => (
        <AnonymousAvatar
            {...props}
            isDisabled
            aria-label="deleted"
            style={({ isDisabled }) => isDisabled ? { border: "1px solid red" } : {}}
        />
    )
};


import type { Meta, StoryObj } from "@storybook/react";

import { Inline } from "../../../layout/index.ts";
import { DeletedAvatar } from "../../src/DeletedAvatar.tsx";

const meta = {
    title: "Components/Avatar/DeletedAvatar",
    component: DeletedAvatar
} satisfies Meta<typeof DeletedAvatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
    render: args => (
        <Inline alignY="center">
            <DeletedAvatar {...args} size="xs" />
            <DeletedAvatar {...args} size="sm" />
            <DeletedAvatar {...args} />
            <DeletedAvatar {...args} size="lg" />
            <DeletedAvatar {...args} size="xl" />
            <DeletedAvatar {...args} size="2xl" />
        </Inline>
    ),
    args: {
        "aria-label": "deleted"
    }
} satisfies Story;

export const AccessToDisabledState = {
    render: props => (
        <DeletedAvatar
            {...props}
            isDisabled
            style={({ isDisabled }) => isDisabled ? { border: "1px solid red" } : {}}
        />
    ),
    args: {
        "aria-label": "deleted"
    }
} satisfies Story;


import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { Inline } from "../../../layout/index.ts";
import { BrokenAvatar } from "../../src/BrokenAvatar.tsx";

const meta = {
    title: "Components/Avatar/BrokenAvatar",
    component: BrokenAvatar
} satisfies Meta<typeof BrokenAvatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
    render: args => (
        <Inline alignY="center">
            <BrokenAvatar {...args} size="xs" />
            <BrokenAvatar {...args} size="sm" />
            <BrokenAvatar {...args} />
            <BrokenAvatar {...args} size="lg" />
            <BrokenAvatar {...args} size="xl" />
            <BrokenAvatar {...args} size="2xl" />
        </Inline>
    ),
    args: {
        "aria-label": "broken"
    }
} satisfies Story;

export const AccessToDisabledState = {
    render: props => (
        <BrokenAvatar
            {...props}
            isDisabled
            style={({ isDisabled }) => isDisabled ? { border: "1px solid red" } : {}}
        />
    ),
    args: {
        "aria-label": "broken"
    }
} satisfies Story;


import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { Inline } from "../../../layout/index.ts";
import { RemainingCharacterCount } from "../../src/RemainingCharacterCount.tsx";

const meta = {
    title: "Components/Forms/RemainingCharacterCount",
    component: RemainingCharacterCount
} satisfies Meta<typeof RemainingCharacterCount>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
    render: args => (
        <RemainingCharacterCount {...args} />
    ),
    args: {
        count: 3
    }
} satisfies Story;

export const Disabled = {
    render: args => (
        <RemainingCharacterCount {...args} />
    ),
    args: {
        count: 3,
        isDisabled: true
    }
} satisfies Story;

export const Invalid = {
    render: args => (
        <RemainingCharacterCount {...args} />
    ),
    args: {
        count: 3,
        isInvalid: true
    }
} satisfies Story;

export const AccessToStates = {
    render: args => (
        <Inline alignY="end">
            <RemainingCharacterCount {...args} style={({ isDisabled }) => isDisabled ? { border: "1px solid red" } : {}} />
            <RemainingCharacterCount {...args} style={({ isInvalid }) => isInvalid ? { border: "1px solid red" } : {}} />
        </Inline>
    ),
    args: {
        count: 3,
        isDisabled: true,
        isInvalid: true
    }
} satisfies Story;


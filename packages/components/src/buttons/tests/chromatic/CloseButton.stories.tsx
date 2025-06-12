import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { Inline } from "../../../layout/index.ts";
import { CloseButton } from "../../src/CloseButton.tsx";

const meta = {
    title: "Components/Buttons/CloseButton",
    component: CloseButton
} satisfies Meta<typeof CloseButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
    render: args => {
        return (
            <CloseButton {...args} />
        );
    }
} satisfies Story;

export const Sizes = {
    render: args => {
        return (
            <Inline>
                <CloseButton {...args} size="xs" />
                <CloseButton {...args} size="sm" />
                <CloseButton {...args} />
            </Inline>
        );
    }
} satisfies Story;

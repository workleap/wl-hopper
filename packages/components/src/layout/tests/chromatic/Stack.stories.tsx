import { Div, type DivProps } from "@hopper-ui/styled-system";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { Stack } from "../../src/Stack.tsx";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" height="core_640" width="core_640" flexShrink={0} {...props} />;
}

const meta = {
    title: "Components/Layout/Stack",
    component: Stack,
    args: {
        children: [
            <Square key="1" backgroundColor="decorative-option1" />,
            <Square key="2" backgroundColor="decorative-option3" />,
            <Square key="3" backgroundColor="decorative-option4" />
        ]
    }

} satisfies Meta<typeof Stack>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Reverse: Story = {
    args: {
        reverse: true
    }
};

export const AlignXStart: Story = {
    args: {
        alignX: "start"
    }
};

export const AlignXCenter: Story = {
    args: {
        alignX: "center"
    }
};

export const AlignXEnd: Story = {
    args: {
        alignX: "end"
    }
};

export const AlignYStart: Story = {
    args: {
        alignY: "start",
        UNSAFE_height: "400px"
    }
};

export const AlignYCenter: Story = {
    ...AlignYStart,
    args: {
        ...AlignYStart.args,
        alignY: "center"
    }
};

export const AlignYEnd: Story = {
    ...AlignYStart,
    args: {
        ...AlignYStart.args,
        alignY: "end"
    }
};

export const Wrap: Story = {
    args: {
        UNSAFE_height: "150px",
        width: "min-content",
        wrap: true
    }
};

export const Inline: Story = {
    render: args => (
        <>
            <Stack inline {...args} />
            <Stack inline {...args} />
        </>
    )
};

export const Nested: Story = {
    render: args => (
        <Stack gap="stack-xl">
            <Stack>
                {args.children}
            </Stack>
            <Stack>
                {args.children}
            </Stack>
        </Stack>
    )
};

import { Div, type DivProps } from "@hopper-ui/styled-system";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { Inline } from "../../src/Inline.tsx";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" height="core_640" width="core_640" flexShrink={0} {...props} />;
}

const meta = {
    title: "Components/Layout/Inline",
    component: Inline,
    args: {
        children: [
            <Square key="1" backgroundColor="decorative-option1" />,
            <Square key="2" backgroundColor="decorative-option3" />,
            <Square key="3" backgroundColor="decorative-option4" />
        ]
    }
} satisfies Meta<typeof Inline>;

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
        height: "core_1280",
        alignY: "start"
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
        UNSAFE_width: "150px"
    }
};

export const Nowrap: Story = {
    ...Wrap,
    args: {
        ...Wrap.args,
        wrap: false
    }
};

export const DefaultInline: Story = {
    render: args => (
        <Div>
            <Inline inline {...args} />
            <Inline inline {...args} />
        </Div>
    )
};

export const Nested: Story = {
    render: args => (
        <Inline gap="stack-xl">
            <Inline>
                {args.children}
            </Inline>
            <Inline>
                {args.children}
            </Inline>
        </Inline>
    )
};

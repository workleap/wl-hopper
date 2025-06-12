import { a11yParameters } from "@hopper-ui/storybook-addon";
import { Div, type DivProps } from "@hopper-ui/styled-system";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { Flex } from "../../src/Flex.tsx";
import { Inline } from "../../src/Inline.tsx";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" height="core_640" width="core_640" {...props} />;
}

const meta = {
    title: "Components/Layout/Flex-Column",
    component: Flex,
    args: {
        direction: "column",
        children: [
            <Square key="1" backgroundColor="decorative-option1" />,
            <Square key="2" backgroundColor="decorative-option3" />,
            <Square key="3" backgroundColor="decorative-option4" />
        ]
    }
} satisfies Meta<typeof Flex>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Gap: Story = {
    args: {
        gap: "stack-md"
    }
};

export const AlignItemsStart: Story = {
    args: {
        alignItems: "start",
        children: [
            <Square key="1" backgroundColor="decorative-option1" />,
            <Square key="2" backgroundColor="decorative-option3" width="core_1280" />,
            <Square key="3" backgroundColor="decorative-option4" />
        ]
    }
};

export const AlignItemsCenter: Story = {
    ...AlignItemsStart,
    args: {
        ...AlignItemsStart.args,
        alignItems: "center"
    }
};

export const AlignItemsEnd: Story = {
    ...AlignItemsStart,
    args: {
        ...AlignItemsStart.args,
        alignItems: "end"
    }
};

export const JustifyContentStart: Story = {
    args: {
        justifyContent: "start",
        width: "100%",
        UNSAFE_height: "300px",
        children: [
            <Square key="1" backgroundColor="decorative-option1" />,
            <Square key="2" backgroundColor="decorative-option3" width="core_1280" />,
            <Square key="3" backgroundColor="decorative-option4" />
        ]
    }
};

export const JustifyContentCenter: Story = {
    ...JustifyContentStart,
    args: {
        ...JustifyContentStart.args,
        justifyContent: "center",
        width: "80%"
    }
};

export const JustifyContentEnd: Story = {
    ...JustifyContentStart,
    args: {
        ...JustifyContentStart.args,
        justifyContent: "end",
        width: "100%"
    }
};

export const JustifyContentSpaceBetween: Story = {
    ...JustifyContentStart,
    args: {
        ...JustifyContentStart.args,
        justifyContent: "space-between",
        width: "100%"
    }
};

export const Wrap: Story = {
    args: {
        wrap: "wrap",
        height: "core_1280",
        width: "core_1280"
    }
};

export const WrapReverse: Story = {
    ...Wrap,
    args: {
        ...Wrap.args,
        wrap: "wrap-reverse"
    }
};

export const Reverse: Story = {
    args: {
        direction: "column-reverse"
    }
};

export const Styling: Story = {
    parameters: {
        ...a11yParameters({ disableContrastCheck: true })
    },
    render: args => (
        <Inline>
            <Flex border="danger-strong" direction="column" {...args} />
            <Flex className="border-red" direction="row" {...args} />
            <Flex style={{ border: "1px solid red" }} direction="row" {...args} />
        </Inline>
    )
};

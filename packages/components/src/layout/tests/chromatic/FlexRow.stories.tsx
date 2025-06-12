import { a11yParameters } from "@hopper-ui/storybook-addon";
import { Div, type DivProps } from "@hopper-ui/styled-system";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { Flex } from "../../src/Flex.tsx";
import { Inline } from "../../src/Inline.tsx";

const meta = {
    title: "Components/Layout/Flex-Row",
    component: Flex,
    args: {
        direction: "row",
        children: [
            <Square key="1" backgroundColor="decorative-option1" />,
            <Square key="2" backgroundColor="decorative-option3" />,
            <Square key="3" backgroundColor="decorative-option4" />
        ]
    }
} satisfies Meta<typeof Flex>;

export default meta;

type Story = StoryObj<typeof meta>;

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" height="core_640" width="core_640" {...props} />;
}

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
            <Square key="2" backgroundColor="decorative-option3" height="core_1280" />,
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
        width: "100%"
    }
};

export const JustifyContentCenter: Story = {
    ...JustifyContentStart,
    args: {
        ...JustifyContentStart.args,
        justifyContent: "center"
    }
};

export const JustifyContentEnd: Story = {
    ...JustifyContentStart,
    args: {
        ...JustifyContentStart.args,
        justifyContent: "end"
    }
};

export const JustifyContentSpaceAround: Story = {
    ...JustifyContentStart,
    args: {
        ...JustifyContentStart.args,
        justifyContent: "space-around"
    }
};

export const JustifyContentSpaceBetween: Story = {
    ...JustifyContentStart,
    args: {
        ...JustifyContentStart.args,
        justifyContent: "space-between"
    }
};

export const Wrap: Story = {
    args: {
        wrap: true,
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
        direction: "row-reverse"
    }
};

export const Styling: Story = {
    parameters: {
        ...a11yParameters({ disableContrastCheck: true })
    },
    render: args => (
        <Inline>
            <Flex border="danger-strong" {...args} />
            <Flex UNSAFE_border="#fa4d59" {...args} />
            <Flex className="border-red" {...args} />
            <Flex style={{ border: "1px solid red" }} {...args} />
        </Inline>
    )
};

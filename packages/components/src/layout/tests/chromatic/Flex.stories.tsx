import { Div, type DivProps } from "@hopper-ui/styled-system";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { Flex } from "../../src/Flex.tsx";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" height="core_640" width="core_640" {...props} />;
}

const meta = {
    title: "Components/Layout/Flex",
    component: Flex,
    args: {
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

export const FlexInline: Story = {
    name: "Inline",
    args: {
        inline: true
    },
    render: args => (
        <Div>
            <Flex {...args} />
            <Flex {...args} />
        </Div>
    )
};

export const Nesting: Story = {
    render: args => (
        <Flex direction="column" gap="stack-xs" width="min-content">
            <Square backgroundColor="decorative-option6" width="100%" />
            <Flex direction="row" gap="stack-xs">
                {args.children}
            </Flex>
            <Square backgroundColor="decorative-option8" width="100%" />
        </Flex>
    )
};

export const Gap: Story = {
    args: {
        gap: "stack-md"
    }
};

export const ColumnGap: Story = {
    args: {
        columnGap: "stack-md"
    }
};

export const RowGap: Story = {
    args: {
        rowGap: "stack-md",
        direction: "column"
    }
};

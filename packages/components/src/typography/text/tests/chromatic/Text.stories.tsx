import { a11yParameters } from "@hopper-ui/storybook-addon";
import type { Meta, StoryObj } from "@storybook/react";

import { Text } from "../../src/Text.tsx";

const meta = {
    title: "Components/Typography/Text",
    component: Text,
    args: {
        children: "Software built for everyone to do their best work."
    }
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: props => (
        <>
            <Text size="2xl" {...props} />
            <Text size="xl" {...props} />
            <Text size="lg" {...props} />
            <Text {...props} />
            <Text size="sm" {...props} />
            <Text size="xs" {...props} />
        </>
    )
};

export const Inherit: Story = {
    render: props => (
        <div style={{ fontSize: "0.625rem" }}>
            <Text size="inherit" {...props} />
        </div>
    )
};

export const Styling: Story = {
    parameters: {
        ...a11yParameters({ disableContrastCheck: true })
    },
    render: props => (
        <>
            <Text border="warning" {...props} />
            <Text className="bg-red" {...props} />
            <Text style={{ backgroundColor: "red" }} {...props} />
        </>
    )
};

export const Nested: Story = {
    args: {
        size: "lg",
        children: [
            "Test",
            <Text>Nested</Text>
        ]
    }
};

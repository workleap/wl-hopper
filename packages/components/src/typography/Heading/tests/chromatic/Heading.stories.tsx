import { a11yParameters } from "@hopper-ui/storybook-addon";
import type { Meta, StoryObj } from "@storybook/react";

import { H1, H2, H3, H4, H5, H6, Heading } from "../../src/Heading.tsx";

const meta = {
    title: "Components/Typography/Heading",
    component: Heading,
    args: {
        children: "Great work!"
    }
} satisfies Meta<typeof Heading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
    render: props => (
        <>
            <Heading size="3xl" {...props} />
            <Heading size="2xl" {...props} />
            <Heading size="xl" {...props} />
            <Heading size="lg" {...props} />
            <Heading {...props} />
            <Heading size="sm" {...props} />
            <Heading size="xs" {...props} />
        </>
    )
} satisfies Story;

export const Inherit = {
    render: props => (
        <div style={{ fontSize: "0.625rem" }}>
            <Heading size="inherit" {...props} />
        </div>
    )
} satisfies Story;

export const Styling: Story = {
    parameters: {
        ...a11yParameters({ disableContrastCheck: true })
    },
    render: props => (
        <>
            <Heading border="warning" {...props} />
            <Heading className="bg-red" {...props} />
            <Heading style={{ backgroundColor: "red" }} {...props} />
        </>
    )
} satisfies Story;

export const CreateHeading: Story = {
    render: props => (
        <>
            <H1 {...props} size="3xl" />
            <H2 {...props} size="2xl" />
            <H3 {...props} size="xl" />
            <H4 {...props} size="lg" />
            <H5 {...props} size="sm" />
            <H6 {...props} size="xs" />
        </>
    )
} satisfies Story;

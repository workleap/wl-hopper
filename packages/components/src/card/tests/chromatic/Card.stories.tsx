import type { Meta, StoryObj } from "@storybook/react";

import { Card } from "../../src/Card.tsx";

const meta = {
    title: "Components/Card",
    component: Card
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Main = {
    render: props => (
        <Card {...props}>
            Content
        </Card>
    )
} satisfies Story;

export const SecondLevel = {
    render: props => (
        <Card variant="second-level" {...props}>
            Content
        </Card>
    )
} satisfies Story;

export const EmbeddedCard = {
    render: props => (
        <Card variant="second-level" {...props}>
            Above
            <Card>
                Embedded
            </Card>
            Under
        </Card>
    )
} satisfies Story;

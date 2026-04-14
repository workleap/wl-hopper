import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { Card } from "../../src/Card.tsx";

const meta = {
    title: "Components/Card",
    component: Card
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Main = {
    render: props => (
        <Card {...props} padding="inset-sm" height="core_800">
            Content
        </Card>
    )
} satisfies Story;

export const SecondLevel = {
    render: props => (
        <Card variant="second-level" {...props} padding="inset-sm" height="core_800">
            Content
        </Card>
    )
} satisfies Story;

export const EmbeddedCard = {
    render: props => (
        <Card variant="second-level" {...props} padding="inset-sm" height="core_1280">
            Above
            <Card padding="inset-sm" height="core_400">
                Embedded
            </Card>
            Under
        </Card>
    )
} satisfies Story;

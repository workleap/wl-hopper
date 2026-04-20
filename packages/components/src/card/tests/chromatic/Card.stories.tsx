import { Flex } from "@hopper-ui/components";
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

export const MainElevated = {
    render: props => (
        <Card {...props} elevation="elevated" padding="inset-sm" height="core_800">
            Content
        </Card>
    )
} satisfies Story;

export const SecondLevelElevated = {
    render: props => (
        <Card variant="second-level" {...props} elevation="elevated" padding="inset-sm" height="core_800">
            Content
        </Card>
    )
} satisfies Story;

export const Embedded = {
    render: () => (
        <Flex gap="inline-md">
            <Card elevation="elevated" padding="inset-sm" height="core_1280">
                Above
                <Card variant="second-level" elevation="elevated" padding="inset-sm" height="core_400">
                    Embedded
                </Card>
                Under
            </Card>
            <Card elevation="flat" padding="inset-sm" height="core_1280">
                Above
                <Card variant="second-level" elevation="flat" padding="inset-sm" height="core_400">
                    Embedded
                </Card>
                Under
            </Card>
            <Card elevation="elevated" padding="inset-sm" height="core_1280">
                Above
                <Card variant="second-level" elevation="flat" padding="inset-sm" height="core_400">
                    Embedded
                </Card>
                Under
            </Card>
            <Card elevation="flat" padding="inset-sm" height="core_1280">
                Above
                <Card variant="second-level" elevation="elevated" padding="inset-sm" height="core_400">
                    Embedded
                </Card>
                Under
            </Card>
            <Card elevation="elevated" padding="inset-sm">
                Above
                <Card variant="second-level" elevation="flat" padding="inset-sm" height="core_960">
                    Middle
                    <Card elevation="flat" padding="inset-sm" height="core_400">
                        Embedded
                    </Card>
                </Card>
                Under
            </Card>
        </Flex>
    )
} satisfies Story;

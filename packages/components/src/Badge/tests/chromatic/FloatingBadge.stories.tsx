import { SparklesIcon } from "@hopper-ui/icons";
import { Div } from "@hopper-ui/styled-system";
import type { Meta, StoryObj } from "@storybook/react";

import { Avatar } from "../../../avatar/index.ts";
import { Inline, Stack } from "../../../layout/index.ts";
import { Badge } from "../../src/Badge.tsx";
import { FloatingBadge } from "../../src/FloatingBadge.tsx";

const meta = {
    title: "Components/Badge/FloatingBadge",
    component: FloatingBadge,
    args: {
        children: "12"
    },
    decorators: [
        Story => (
            <Div marginBottom="stack-lg" marginTop="stack-lg">
                <Story />
            </Div>
        )
    ]
} satisfies Meta<typeof FloatingBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const RectangularOverlap = {
    render: props => (
        <Inline gap="inline-xl">
            <FloatingBadge {...props} overlap="rectangular">
                <Div height="core_320" width="core_320" backgroundColor="primary-weak" />
                <Badge>NEW</Badge>
            </FloatingBadge>
            <FloatingBadge {...props} overlap="rectangular">
                <Div height="core_320" width="core_320" backgroundColor="primary-weak" />
                <Badge />
            </FloatingBadge>
        </Inline>
    )
} satisfies Story;

export const CircularOverlap = {
    render: props => (
        <Inline gap="inline-xl">
            <FloatingBadge {...props} overlap="circular">
                <Avatar src="https://randomuser.me/api/portraits/men/10.jpg" name="John Doe" />
                <Badge>99+</Badge>
            </FloatingBadge>

            <FloatingBadge {...props} overlap="circular">
                <Avatar src="https://randomuser.me/api/portraits/men/10.jpg" name="John Doe" />
                <Badge />
            </FloatingBadge>

            <FloatingBadge {...props} overlap="circular">
                <SparklesIcon />
                <Badge />
            </FloatingBadge>
        </Inline>
    )
} satisfies Story;

export const Placement = {
    render: props => (
        <Stack gap="stack-xl">
            <Inline gap="inline-xl">
                <FloatingBadge {...props} placement="top right">
                    <Div height="core_320" width="core_320" backgroundColor="primary-weak" />
                    <Badge>12</Badge>
                </FloatingBadge>
                <FloatingBadge {...props} placement="bottom right">
                    <Div height="core_320" width="core_320" backgroundColor="primary-weak" />
                    <Badge>12</Badge>
                </FloatingBadge>
                <FloatingBadge {...props} placement="top left">
                    <Div height="core_320" width="core_320" backgroundColor="primary-weak" />
                    <Badge>12</Badge>
                </FloatingBadge>
                <FloatingBadge {...props} placement="bottom left">
                    <Div height="core_320" width="core_320" backgroundColor="primary-weak" />
                    <Badge>12</Badge>
                </FloatingBadge>
            </Inline>

            <Inline gap="inline-xl">
                <FloatingBadge {...props} placement="top right" overlap="circular">
                    <Avatar src="https://randomuser.me/api/portraits/men/10.jpg" name="John Doe" />
                    <Badge>12</Badge>
                </FloatingBadge>
                <FloatingBadge {...props} placement="bottom right" overlap="circular">
                    <Avatar src="https://randomuser.me/api/portraits/men/10.jpg" name="John Doe" />
                    <Badge>12</Badge>
                </FloatingBadge>
                <FloatingBadge {...props} placement="top left" overlap="circular">
                    <Avatar src="https://randomuser.me/api/portraits/men/10.jpg" name="John Doe" />
                    <Badge>12</Badge>
                </FloatingBadge>
                <FloatingBadge {...props} placement="bottom left" overlap="circular">
                    <Avatar src="https://randomuser.me/api/portraits/men/10.jpg" name="John Doe" />
                    <Badge>12</Badge>
                </FloatingBadge>
            </Inline>

            <Inline gap="inline-xl">
                <FloatingBadge {...props} placement="top right">
                    <Div height="core_320" width="core_320" backgroundColor="primary-weak" />
                    <Badge isIndeterminate />
                </FloatingBadge>
                <FloatingBadge {...props} placement="bottom right">
                    <Div height="core_320" width="core_320" backgroundColor="primary-weak" />
                    <Badge isIndeterminate />
                </FloatingBadge>
                <FloatingBadge {...props} placement="top left">
                    <Div height="core_320" width="core_320" backgroundColor="primary-weak" />
                    <Badge isIndeterminate />
                </FloatingBadge>
                <FloatingBadge {...props} placement="bottom left">
                    <Div height="core_320" width="core_320" backgroundColor="primary-weak" />
                    <Badge isIndeterminate />
                </FloatingBadge>
            </Inline>

            <Inline gap="inline-xl">
                <FloatingBadge {...props} placement="top right" overlap="circular">
                    <Avatar src="https://randomuser.me/api/portraits/men/10.jpg" name="John Doe" />
                    <Badge isIndeterminate />
                </FloatingBadge>
                <FloatingBadge {...props} placement="bottom right" overlap="circular">
                    <Avatar src="https://randomuser.me/api/portraits/men/10.jpg" name="John Doe" />
                    <Badge isIndeterminate />
                </FloatingBadge>
                <FloatingBadge {...props} placement="top left" overlap="circular">
                    <Avatar src="https://randomuser.me/api/portraits/men/10.jpg" name="John Doe" />
                    <Badge isIndeterminate />
                </FloatingBadge>
                <FloatingBadge {...props} placement="bottom left" overlap="circular">
                    <Avatar src="https://randomuser.me/api/portraits/men/10.jpg" name="John Doe" />
                    <Badge isIndeterminate />
                </FloatingBadge>
            </Inline>
        </Stack>
    )
} satisfies Story;

export const Offset = {
    ...Placement,
    args: {
        offset: [10, "-5%"]
    }
} satisfies Story;

export const Styling = {
    render: props => (
        <Inline gap="inline-xl">
            <FloatingBadge {...props} border="warning">
                <Div height="core_320" width="core_320" backgroundColor="primary-weak" />
                <Badge border="warning">NEW</Badge>
            </FloatingBadge>
            <FloatingBadge {...props} className="border-red">
                <Div height="core_320" width="core_320" backgroundColor="primary-weak" />
                <Badge className="border-red">NEW</Badge>
            </FloatingBadge>
            <FloatingBadge {...props} style={{ border: "1px solid darkRed" }}>
                <Div height="core_320" width="core_320" backgroundColor="primary-weak" />
                <Badge style={{ border: "1px solid darkRed" }}>NEW</Badge>
            </FloatingBadge>
        </Inline>
    )
} satisfies Story;

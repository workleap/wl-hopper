import { Div } from "@hopper-ui/styled-system";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { Stack } from "../../../layout/index.ts";
import { AnonymousAvatar } from "../../src/AnonymousAvatar.tsx";
import { Avatar } from "../../src/Avatar.tsx";
import { AvatarGroup } from "../../src/AvatarGroup.tsx";
import { DeletedAvatar } from "../../src/DeletedAvatar.tsx";

const meta = {
    title: "Components/AvatarGroup",
    component: AvatarGroup,
    args: {
        children: [
            <Avatar name="Croakster" />,
            <Avatar name="Lily Puddle" />,
            <Avatar name="Hopperton" />,
            <Avatar name="Ribbitus Maximus" />,
            <Avatar name="Toadie McLeap" />,
            <Avatar name="Bubbles McFrog" />
        ]

    }
} satisfies Meta<typeof AvatarGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const Sizes = {
    render: args => (
        <Stack>
            <AvatarGroup size="xs" {...args} />
            <AvatarGroup size="sm" {...args} />
            <AvatarGroup size="md" {...args} />
            <AvatarGroup size="lg" {...args} />
            <AvatarGroup size="xl" {...args} />
            <AvatarGroup size="2xl" {...args} />
        </Stack>
    )
} satisfies Story;

export const Wrap = {
    ...Default,
    decorators: [
        Story => (
            <Div UNSAFE_width="100px">
                <Story />
            </Div>
        )
    ],
    args: {
        ...meta.args,
        maxNumberOfAvatar: 10
    }
} satisfies Story;

export const NoWrap = {
    ...Default,
    decorators: [
        Story => (
            <Div UNSAFE_width="100px">
                <Story />
            </Div>
        )
    ],
    args: {
        ...meta.args,
        maxNumberOfAvatar: 10,
        wrap: false
    }
} satisfies Story;

export const TooManyAvatars = {
    ...Default,
    args: {
        ...meta.args,
        maxNumberOfAvatar: 2
    }
} satisfies Story;

export const WithDeletedAndAnonymous = {
    render: args => (
        <AvatarGroup {...args}>
            <Avatar name="Croakster" />
            <Avatar name="Lily Puddle" />
            <Avatar name="Hopperton" />
            <Avatar name="Ribbitus Maximus" />
            <Avatar name="Toadie McLeap" />
            <Avatar name="Bubbles McFrog" />
            <DeletedAvatar aria-label="Deleted user" />
            <AnonymousAvatar aria-label="Anonymous user" />
        </AvatarGroup>
    ),
    args: {
        maxNumberOfAvatar: 8
    }
} satisfies Story;


export const Alignments = {
    render: args => (
        <Stack>
            <AvatarGroup align="start" {...args} />
            <AvatarGroup align="center" {...args} />
            <AvatarGroup align="end" {...args} />
        </Stack>
    )
} satisfies Story;


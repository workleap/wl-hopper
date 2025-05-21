import { Div } from "@hopper-ui/styled-system";
import type { Meta, StoryObj } from "@storybook/react";

import { Inline } from "../../../layout/index.ts";
import { Frog } from "../../assets/index.ts";
import { Image } from "../../src/Image.tsx";

const meta = {
    title: "Components/Image",
    component: Image,
    args: {
        src: Frog,
        alt: "Frog"
    }
} satisfies Meta<typeof Image>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const Contained = {
    decorators: [Story => (
        <Div UNSAFE_width="200px" UNSAFE_height="200px">
            <Story />
        </Div>
    )]
} satisfies Story;

export const Size = {
    render: args => (
        <Inline>
            <Image UNSAFE_width="200px" {...args} />
            <Image UNSAFE_width="300px" {...args} />
        </Inline>
    )
} satisfies Story;

export const Straight = {
    render: args => (
        <Inline alignY="end">
            <Image UNSAFE_width="50px" UNSAFE_height="50px" {...args} />
            <Image UNSAFE_width="100px" UNSAFE_height="100px" {...args} />
            <Image UNSAFE_width="200px" UNSAFE_height="200px" {...args} />
            <Image UNSAFE_width="300px" UNSAFE_height="300px" {...args} />
            <Image {...args} />
        </Inline>
    ),
    args: {
        shape: "straight"
    }
} satisfies Story;

export const Rounded = {
    render: args => (
        <Inline alignY="end">
            <Image UNSAFE_width="50px" UNSAFE_height="50px" {...args} />
            <Image UNSAFE_width="100px" UNSAFE_height="100px" {...args} />
            <Image UNSAFE_width="200px" UNSAFE_height="200px" {...args} />
            <Image UNSAFE_width="300px" UNSAFE_height="300px" {...args} />
            <Image {...args} />
        </Inline>
    ),
    args: {
        shape: "rounded"
    }
} satisfies Story;

export const Circular = {
    render: args => (
        <Inline alignY="end">
            <Image UNSAFE_width="50px" UNSAFE_height="50px" {...args} />
            <Image UNSAFE_width="100px" UNSAFE_height="100px" {...args} />
            <Image UNSAFE_width="200px" UNSAFE_height="200px" {...args} />
            <Image UNSAFE_width="300px" UNSAFE_height="300px" {...args} />
            <Image {...args} />
        </Inline>
    ),
    args: {
        shape: "circular"
    }
} satisfies Story;

export const ObjectFit = {
    render: args => (
        <Inline>
            <Div UNSAFE_width="200px" UNSAFE_height="100px">
                <Image objectFit="fill" {...args} />
            </Div>
            <Div UNSAFE_width="200px" UNSAFE_height="100px">
                <Image objectFit="contain" {...args} />
            </Div>
            <Div UNSAFE_width="200px" UNSAFE_height="100px">
                <Image objectFit="cover" {...args} />
            </Div>
            <Div UNSAFE_width="200px" UNSAFE_height="100px">
                <Image objectFit="scale-down" {...args} />
            </Div>
            <Div UNSAFE_width="200px" UNSAFE_height="100px">
                <Image objectFit="none" {...args} />
            </Div>
        </Inline>
    ),
    args: {
        UNSAFE_width: "100%",
        UNSAFE_height: "100%"
    }
} satisfies Story;

export const ObjectPosition = {
    render: args => (
        <Inline>
            <Image objectPosition="50% 50%" {...args} />
            <Image objectPosition="right top" {...args} />
            <Image objectPosition="left bottom" {...args} />
            <Image objectPosition="27 17" {...args} />
        </Inline>
    ),
    args: {
        objectFit: "none",
        UNSAFE_width: "200px",
        UNSAFE_height: "200px"
    }
} satisfies Story;

export const ZoomIn = {
    decorators: [Story => (
        <Div className="zoom-in">
            <Story />
        </Div>
    )]
} satisfies Story;

export const ZoomOut = {
    decorators: [Story => (
        <Div className="zoom-in">
            <Story />
        </Div>
    )]
} satisfies Story;

export const Styling = {
    render: args => (
        <Inline>
            <Image border="warning" {...args} />
            <Image className="border-red" {...args} />
            <Image style={{ border: "1px solid red" }} {...args} />
        </Inline>
    )
} satisfies Story;


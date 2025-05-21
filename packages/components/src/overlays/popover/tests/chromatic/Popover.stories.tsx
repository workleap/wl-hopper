import { Button, ButtonGroup, Content, Div, Footer, Heading, Link } from "@hopper-ui/components";
import type { Meta, StoryObj } from "@storybook/react";

import { Popover } from "../../src/Popover.tsx";
import { PopoverTrigger } from "../../src/PopoverTrigger.tsx";

const TRIGGER = "Trigger";
const TITLE = "Engagement score";
const CONTENT = "The engagement score is the weighted average of the key metric scores below. To calculate these, we take the latest answers from each survey questions within the last 90 days.";
const LINK = "Tell me more";
const PRIMARY_ACTION = "Got it";
const SECONDARY_ACTION = "Next";

const meta = {
    title: "Components/Popover",
    component: Popover,
    args: {
        isOpen: true
    },
    decorators: [
        Story => (
            <Div UNSAFE_marginBottom="12rem">
                <Story />
            </Div>
        )
    ]
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
    render: args => (
        <PopoverTrigger>
            <Button>{TRIGGER}</Button>
            <Popover {...args} >
                <Heading>{TITLE}</Heading>
                <Content>{CONTENT}</Content>
            </Popover>
        </PopoverTrigger>
    )
} satisfies Story;

export const HasLink = {
    render: args => (
        <PopoverTrigger>
            <Button>{TRIGGER}</Button>
            <Popover {...args} >
                <Heading>{TITLE}</Heading>
                <Content>{CONTENT}</Content>
                <Footer>
                    <Link href="#">{LINK}</Link>
                </Footer>
            </Popover>
        </PopoverTrigger>
    )
} satisfies Story;

export const Buttons = {
    render: args => (
        <PopoverTrigger>
            <Button>{TRIGGER}</Button>
            <Popover {...args} >
                <Heading>{TITLE}</Heading>
                <Content>{CONTENT}</Content>
                <Button>{PRIMARY_ACTION}</Button>
            </Popover>
        </PopoverTrigger>
    )
} satisfies Story;

export const HasButtonGroup = {
    render: args => (
        <PopoverTrigger>
            <Button>{TRIGGER}</Button>
            <Popover {...args} >
                <Heading>{TITLE}</Heading>
                <Content>{CONTENT}</Content>
                <ButtonGroup>
                    <Button variant="secondary">{SECONDARY_ACTION}</Button>
                    <Button>{PRIMARY_ACTION}</Button>
                </ButtonGroup>
            </Popover>
        </PopoverTrigger>
    )
} satisfies Story;

export const HasFooter = {
    render: args => (
        <PopoverTrigger>
            <Button>{TRIGGER}</Button>
            <Popover {...args} >
                <Heading>{TITLE}</Heading>
                <Content>{CONTENT}</Content>
                <Footer>
                    All right reserved.
                </Footer>
                <Button>{PRIMARY_ACTION}</Button>
            </Popover>
        </PopoverTrigger>
    )
} satisfies Story;


export const Styling = {
    render: args => (
        <PopoverTrigger>
            <Button>{TRIGGER}</Button>
            <Popover {...args}
                borderRadius={0}
                containerProps={{
                    border: "transparent",
                    boxShadow: "none"
                }}
            >
                <Heading>{TITLE}</Heading>
                <Content>{CONTENT}</Content>
            </Popover>
        </PopoverTrigger>
    )
} satisfies Story;

export const NoHeading = {
    render: args => (
        <PopoverTrigger>
            <Button>{TRIGGER}</Button>
            <Popover {...args} >
                <Content>{CONTENT}</Content>
            </Popover>
        </PopoverTrigger>
    )
} satisfies Story;

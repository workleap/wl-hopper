import { IdeaRichIcon } from "@hopper-ui/icons";
import type { Meta, StoryObj } from "@storybook/react";

import { Button, LinkButton } from "../../../buttons/index.ts";
import { Content } from "../../../layout/index.ts";
import { Heading } from "../../../typography/index.ts";
import { Callout } from "../../src/Callout.tsx";

const meta = {
    title: "Components/Callout",
    component: Callout,
    args: {
        children: (
            <>
                <Heading>Callout title</Heading>
                <Content>Callout content</Content>
            </>
        )
    }
} satisfies Meta<typeof Callout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
} satisfies Story;

export const NoHeader = {
    args: {
        children: (
            <>
                <Content>{new Array(30).fill("Callout Content").join(" ")}</Content>
            </>
        )
    }
} satisfies Story;

export const Inline = {
    ...Default,
    args: {
        fillStyle: "subtleFill"
    }
} satisfies Story;

export const Information = {
    ...Default,
    args: {
        variant: "information"
    }
} satisfies Story;

export const Warning = {
    ...Default,
    args: {
        variant: "warning"
    }
} satisfies Story;

export const Success = {
    ...Default,
    args: {
        variant: "success"
    }
} satisfies Story;

export const Upsell = {
    ...Default,
    args: {
        variant: "upsell"
    }
} satisfies Story;

export const WithClose = {
    ...Default,
    args: {
        onClose: () => alert("Closed")
    }
} satisfies Story;

export const HideIcon = {
    ...Default,
    args: {
        hideIcon: true
    }
} satisfies Story;

export const WithCta = {
    render: props => (
        <Callout {...props}>
            <Heading>Callout title</Heading>
            <Content>Callout content</Content>
            <Button>Label</Button>
        </Callout>
    )
} satisfies Story;

export const WithLinkButtonAndCta = {
    args: {
        onClose: () => alert("Closed"),
        children: (
            <>
                <Heading>Callout title</Heading>
                <Content>Callout content</Content>
                <LinkButton>Label</LinkButton>
            </>
        )
    }
} satisfies Story;

export const CustomRichIcon = {
    render: props => (
        <Callout {...props}>
            <IdeaRichIcon />
            <Heading>Callout title</Heading>
            <Content>Callout content</Content>
            <Button>Label</Button>
        </Callout>
    )
} satisfies Story;

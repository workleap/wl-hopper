import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../../../buttons/index.ts";
import { Content } from "../../../layout/index.ts";
import { Link } from "../../../Link/index.ts";
import { CompactCallout } from "../../src/index.ts";

const meta = {
    title: "Components/Callout/Compact",
    component: CompactCallout,
    args: {
        children: <Content>Callout content</Content>
    }
} satisfies Meta<typeof CompactCallout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
} satisfies Story;

export const Inline = {
    args: {
        fillStyle: "subtleFill"
    }
} satisfies Story;

export const Information = {
    args: {
        variant: "information"
    }
} satisfies Story;

export const Warning = {
    args: {
        variant: "warning"
    }
} satisfies Story;

export const Success = {
    args: {
        variant: "success"
    }
} satisfies Story;

export const Upsell = {
    args: {
        variant: "upsell"
    }
} satisfies Story;

export const WithClose = {
    args: {
        onClose: () => alert("Closed")
    }
} satisfies Story;

export const WithCta = {
    args: {
        children: (
            <>
                <Content>Callout content</Content>
                <Button>Label</Button>
            </>
        )
    }
} satisfies Story;

export const WithButtonAndCta = {
    args: {
        onClose: () => alert("Closed"),
        children: (
            <>
                <Content>Callout content</Content>
                <Button>Label</Button>
            </>
        )
    }
} satisfies Story;

export const WithLink = {
    args: {
        children: (
            <>
                <Content>Callout content</Content>
                <Link>Label</Link>
            </>
        )
    }
} satisfies Story;

export const WithButtonAndLink = {
    args: {
        onClose: () => alert("Closed"),
        children: (
            <>
                <Content>Callout content</Content>
                <Link>Label</Link>
            </>
        )
    }
} satisfies Story;

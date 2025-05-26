import { a11yParameters } from "@hopper-ui/storybook-addon";
import type { Meta, StoryObj } from "@storybook/react";

import { Link } from "../../../../link/index.ts";
import { Paragraph } from "../../src/Paragraph.tsx";

const meta = {
    title: "Components/Typography/Paragraph",
    component: Paragraph,
    args: {
        children: "Software built for everyone to do their best work."
    }
} satisfies Meta<typeof Paragraph>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <>
            <Paragraph size="2xl">If two pieces of the same type of metal touch<br />in space they will permanently bond.</Paragraph>
            <Paragraph size="xl">If two pieces of the same type of metal touch<br />in space they will permanently bond.</Paragraph>
            <Paragraph size="lg">If two pieces of the same type of metal touch<br />in space they will permanently bond.</Paragraph>
            <Paragraph>If two pieces of the same type of metal touch<br />in space they will permanently bond.</Paragraph>
            <Paragraph size="sm">If two pieces of the same type of metal touch<br />in space they will permanently bond.</Paragraph>
            <Paragraph size="xs">If two pieces of the same type of metal touch<br />in space they will permanently bond.</Paragraph>
        </>
    )
};

export const WithLink: Story = {
    render: () => (
        <>
            <Paragraph size="2xl">If two pieces of the same type of <Link href="#">metal touch</Link> in space they <Link href="https://www.workleap.com" isExternal>will permanently</Link> bond.</Paragraph>
            <Paragraph size="xl">If two pieces of the same type of <Link href="#">metal touch</Link> in space they <Link href="https://www.workleap.com" isExternal>will permanently</Link> bond.</Paragraph>
            <Paragraph size="lg">If two pieces of the same type of <Link href="#">metal touch</Link> in space they <Link href="https://www.workleap.com" isExternal>will permanently</Link> bond.</Paragraph>
            <Paragraph>If two pieces of the same type of <Link href="#">metal touch</Link> in space they <Link href="https://www.workleap.com" isExternal>will permanently</Link> bond.</Paragraph>
            <Paragraph size="sm">If two pieces of the same type of <Link href="#">metal touch</Link> in space they <Link href="https://www.workleap.com" isExternal>will permanently</Link> bond.</Paragraph>
            <Paragraph size="xs">If two pieces of the same type of <Link href="#">metal touch</Link> in space they <Link href="https://www.workleap.com" isExternal>will permanently</Link> bond.</Paragraph>
        </>
    )
};

export const Styling: Story = {
    parameters: {
        ...a11yParameters({ disableContrastCheck: true })
    },
    render: () => (
        <>
            <Paragraph border="warning">If two pieces of the same type of metal touch<br />in space they will permanently bond.</Paragraph>
            <Paragraph className="bg-red">If two pieces of the same type of metal touch<br />in space they will permanently bond.</Paragraph>
            <Paragraph style={{ backgroundColor: "red" }}>If two pieces of the same type of metal touch<br />in space they will permanently bond.</Paragraph>
        </>
    )
};

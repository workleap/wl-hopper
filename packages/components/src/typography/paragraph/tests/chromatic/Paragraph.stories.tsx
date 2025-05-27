import { a11yParameters } from "@hopper-ui/storybook-addon";
import type { Meta, StoryObj } from "@storybook/react";

import { Link } from "../../../../link/index.ts";
import { Paragraph } from "../../src/Paragraph.tsx";

const meta = {
    title: "Components/Typography/Paragraph",
    component: Paragraph
} satisfies Meta<typeof Paragraph>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <>
            <Paragraph size="2xl">One simple employee experience platform to boost engagement,<br /> drive performance, and develop your people.</Paragraph>
            <Paragraph size="xl">One simple employee experience platform to boost engagement,<br /> drive performance, and develop your people.</Paragraph>
            <Paragraph size="lg">One simple employee experience platform to boost engagement,<br /> drive performance, and develop your people.</Paragraph>
            <Paragraph>One simple employee experience platform to boost engagement,<br /> drive performance, and develop your people.</Paragraph>
            <Paragraph size="sm">One simple employee experience platform to boost engagement,<br /> drive performance, and develop your people.</Paragraph>
            <Paragraph size="xs">One simple employee experience platform to boost engagement,<br /> drive performance, and develop your people.</Paragraph>
        </>
    )
};

export const WithLink: Story = {
    render: () => (
        <>
            <Paragraph size="2xl">One simple employee experience platform to boost <Link href="#">engagement</Link>, drive performance, and <Link href="https://www.workleap.com" isExternal>develop</Link> your people bond.</Paragraph>
            <Paragraph size="xl">One simple employee experience platform to boost <Link href="#">engagement</Link>, drive performance, and <Link href="https://www.workleap.com" isExternal>develop</Link> your people bond.</Paragraph>
            <Paragraph size="lg">One simple employee experience platform to boost <Link href="#">engagement</Link>, drive performance, and <Link href="https://www.workleap.com" isExternal>develop</Link> your people bond.</Paragraph>
            <Paragraph>One simple employee experience platform to boost <Link href="#">engagement</Link>, drive performance, and <Link href="https://www.workleap.com" isExternal>develop</Link> your people bond.</Paragraph>
            <Paragraph size="sm">One simple employee experience platform to boost <Link href="#">engagement</Link>, drive performance, and <Link href="https://www.workleap.com" isExternal>develop</Link> your people bond.</Paragraph>
            <Paragraph size="xs">One simple employee experience platform to boost <Link href="#">engagement</Link>, drive performance, and <Link href="https://www.workleap.com" isExternal>develop</Link> your people bond.</Paragraph>
        </>
    )
};

export const Styling: Story = {
    parameters: {
        ...a11yParameters({ disableContrastCheck: true })
    },
    render: () => (
        <>
            <Paragraph border="warning">One simple employee experience platform to boost engagement,<br /> drive performance, and develop your people.</Paragraph>
            <Paragraph className="bg-red">One simple employee experience platform to boost engagement,<br /> drive performance, and develop your people.</Paragraph>
            <Paragraph style={{ backgroundColor: "red" }}>One simple employee experience platform to boost engagement,<br /> drive performance, and develop your people.</Paragraph>
        </>
    )
};

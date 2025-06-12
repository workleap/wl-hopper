import { ExternalLinkIcon, GithubIcon, Icon, NpmIcon } from "@/components/icon";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

import LinkButton from "./LinkButton";

const meta = {
    title: "components/LinkButton",
    component: LinkButton
} satisfies Meta<typeof LinkButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: "Get started",
        href: "https://www.npmjs.com/package/@hopper-ui/components",
        target: "_blank"
    }
};

export const Secondary: Story = {
    args: {
        variant: "secondary",
        children: "Github"
    }
};

export const Ghost: Story = {
    args: {
        variant: "ghost",
        children: "view on npm"
    }
};

export const Sizes: Story = {
    args: {
        children: "Get started",
        variant: "secondary"
    },
    render: args => (
        <div style={{ display: "flex", gap: "1rem", alignItems: "start" }}>
            <LinkButton {...args} size="md" />
            <LinkButton {...args} size="sm" />
        </div>
    )
};

export const AsLink: Story = {
    render: args => (
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <LinkButton variant="secondary" size="md" {...args} >
                Github
                <Icon src={ExternalLinkIcon} slot="end-icon" />
            </LinkButton>
            <LinkButton variant="ghost" size="sm" {...args} >
                View source
                <Icon src={GithubIcon} />
            </LinkButton>
            <LinkButton variant="ghost" size="sm" {...args} >
                View on npm
                <Icon src={NpmIcon} />
            </LinkButton>
            <LinkButton variant="ghost" size="sm" {...args} >
                Report an issue
                <Icon src={ExternalLinkIcon} />
            </LinkButton>
        </div>
    )
};

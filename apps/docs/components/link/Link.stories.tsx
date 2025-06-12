import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { NewTabIcon } from "@hopper-ui/icons";

import Link from "./Link";

const meta = {
    title: "components/Link",
    component: Link
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: "github.com",
        href: "https://github.com"
    }
};

export const Inline: Story = {
    args: {
        underline: true
    },
    render: args => (
        <p>
            Built with accessibility in mind Hopper is based on <Link {...args}
                href="https://react-spectrum.adobe.com/react-aria/Link.html"
            >React
            Aria Components <NewTabIcon slot="end-icon" /></Link>
        </p>
    )
};

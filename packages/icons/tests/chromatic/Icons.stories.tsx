import { LI, UL } from "@hopper-ui/styled-system";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

import * as IconLibrary from "../../src/index.ts";

type ListProps = IconLibrary.CreatedIconProps;

const List = ({ ...iconProps }: ListProps) => {
    const listItems = IconLibrary.iconNames.map(name => {
        const Component = IconLibrary[name];

        return (
            <LI key={name} display="block">
                <Component {...iconProps} />
            </LI>
        );
    });

    return (
        <UL display="flex" flexWrap="wrap" alignItems="center" gap="inline-md" margin="core_0" padding="core_0" style={{ listStyle: "none" }}>
            {listItems}
        </UL>
    );
};

const meta = {
    component: List,
    title: "Icons/Icons"
} satisfies Meta<typeof List>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: args => {
        return (
            <>
                <h1>Small</h1>
                <List {...args} size="sm" />
                <h1>Medium</h1>
                <List {...args} size="md" />
                <h1>Large</h1>
                <List {...args} size="lg" />
            </>
        );
    }
};

export const Styles: Story = {
    ...Default,
    args: {
        fill: "danger-press"
    }
};


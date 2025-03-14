import { Button, Div, PopoverTrigger } from "@hopper-ui/components";
import { hopperParameters } from "@hopper-ui/storybook-addon";
import type { Meta, StoryObj } from "@storybook/react";

import { PopoverBase } from "../../src/PopoverBase.tsx";


const meta = {
    title: "Components/PopoverBase",
    component: PopoverBase,
    args: {
        isOpen: true,
        UNSAFE_height: "300px",
        UNSAFE_width: "400px"
    },
    parameters: {
        ...hopperParameters({
            colorSchemes: ["light"]
        })
    },
    decorators: [
        Story => (
            <Div UNSAFE_marginBottom="12rem">
                <Story />
            </Div>
        )
    ]
} satisfies Meta<typeof PopoverBase>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
    render: args => (
        <PopoverTrigger>
            <Button>Open</Button>
            <PopoverBase {...args}>
                This is a base popover with no Padding
            </PopoverBase>
        </PopoverTrigger>
    )
} satisfies Story;

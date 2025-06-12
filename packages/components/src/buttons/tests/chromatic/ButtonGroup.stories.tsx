import { SparklesIcon } from "@hopper-ui/icons";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { Stack } from "../../../layout/index.ts";
import { Button } from "../../src/Button.tsx";
import { ButtonGroup } from "../../src/ButtonGroup.tsx";

const meta = {
    title: "Components/Buttons/ButtonGroup",
    component: ButtonGroup,
    args:{
        children: [
            <Button key="1" variant="secondary">No, thanks</Button>,
            <Button key="2" variant="secondary">Remind me later</Button>,
            <Button key="3" variant="primary">Rate Now</Button>
        ]
    }
} satisfies Meta<typeof ButtonGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: args => (
        <Stack>
            <ButtonGroup size="xs" {...args} />
            <ButtonGroup size="sm" {...args} />
            <ButtonGroup {...args} />
        </Stack>
    )
};

export const ButtonGroupIconButton: Story = {
    ...Default,
    args:{
        ...Default.args,
        children: [
            <Button key="1" variant="secondary" aria-label="Clean"><SparklesIcon /></Button>,
            <Button key="2" variant="secondary" aria-label="Clean"><SparklesIcon /></Button>,
            <Button key="3" variant="secondary" aria-label="Clean"><SparklesIcon /></Button>
        ]
    }
};

export const Fluid: Story = {
    ...Default,
    args:{
        ...Default.args,
        isFluid: true
    }
};

export const Disabled: Story = {
    ...Default,
    args:{
        ...Default.args,
        isDisabled: true
    }
};

export const Align: Story = {
    args:{
        children: [
            <Button key="1" variant="secondary">Reset</Button>,
            <Button key="2" variant="primary">Submit form</Button>
        ]
    },
    render: args => (
        <Stack>
            <ButtonGroup align="start" {...args} />
            <ButtonGroup align="end" {...args} />
            <ButtonGroup align="center"{...args} />
            <ButtonGroup {...args} />
        </Stack>
    )
};

export const Zoom: Story = {
    render: args => (
        <Stack>
            <div className="zoom-in">
                <ButtonGroup {...args} />
            </div>
            <div className="zoom-out">
                <ButtonGroup {...args} />
            </div>
        </Stack>
    )
};

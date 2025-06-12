import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { Inline, Stack } from "../../../layout/index.ts";
import { Checkbox } from "../../src/Checkbox.tsx";
import { CheckboxField } from "../../src/CheckboxField.tsx";

const meta = {
    title: "Components/Forms/CheckboxField",
    component: CheckboxField
} satisfies Meta<typeof CheckboxField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: props => (
        <Inline alignY="end">
            <CheckboxField {...props} size="sm" description="Description">
                <Checkbox>Option 1</Checkbox>
            </CheckboxField>
            <CheckboxField {...props} size="md" description="Description">
                <Checkbox>Option 1</Checkbox>
            </CheckboxField>
        </Inline>
    )
};

export const Validation: Story = {
    render: props => (
        <Inline alignY="end">
            <CheckboxField {...props} size="sm" description="Description">
                <Checkbox isInvalid>Option 1</Checkbox>
            </CheckboxField>
            <CheckboxField {...props} size="md" description="Description">
                <Checkbox isInvalid>Option 1</Checkbox>
            </CheckboxField>
        </Inline>
    )
};

export const Disabled: Story = {
    render: props => (
        <Inline alignY="end">
            <CheckboxField {...props} size="sm" isDisabled description="Description">
                <Checkbox>Option 1</Checkbox>
            </CheckboxField>
            <CheckboxField {...props} size="md" isDisabled description="Description">
                <Checkbox>Option 1</Checkbox>
            </CheckboxField>
        </Inline>
    )
};

export const Zoom: Story = {
    render: props => (
        <Stack>
            <Inline alignY="end">
                <CheckboxField {...props} size="sm" className="zoom-in" description="Description">
                    <Checkbox>Option 1</Checkbox>
                </CheckboxField>
                <CheckboxField {...props} size="md" className="zoom-in" description="Description">
                    <Checkbox>Option 1</Checkbox>
                </CheckboxField>
            </Inline>
            <Inline alignY="end">
                <CheckboxField {...props} size="sm" className="zoom-out" description="Description">
                    <Checkbox>Option 1</Checkbox>
                </CheckboxField>
                <CheckboxField {...props} size="md" className="zoom-out" description="Description">
                    <Checkbox>Option 1</Checkbox>
                </CheckboxField>
            </Inline>
        </Stack>
    )
};

export const AccessToDisabledState: Story = {
    render: props => (
        <Inline alignY="end">
            <CheckboxField {...props} isDisabled description="Value should be true">
                {({ isDisabled }) => (
                    <Checkbox>
                            Is disabled: {String(isDisabled)}
                    </Checkbox>
                )}
            </CheckboxField>
            <CheckboxField
                {...props}
                isDisabled
                style={({ isDisabled }) => isDisabled ? { border: "1px solid red" } : {}}
                description="Border should be red"
            >
                <Checkbox>Disabled</Checkbox>
            </CheckboxField>
        </Inline>
    )
};

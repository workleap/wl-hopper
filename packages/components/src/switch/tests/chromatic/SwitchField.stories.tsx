import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { Inline, Stack } from "../../../layout/index.ts";
import { Switch } from "../../src/Switch.tsx";
import { SwitchField } from "../../src/SwitchField.tsx";

const meta = {
    title: "Components/Forms/SwitchField",
    component: SwitchField
} satisfies Meta<typeof SwitchField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: props => (
        <Inline alignY="end">
            <SwitchField {...props} size="sm" description="Description">
                <Switch>
                    Option 1
                </Switch>
            </SwitchField>
            <SwitchField {...props} size="md" description="Description">
                <Switch>
                    Option 1
                </Switch>
            </SwitchField>
        </Inline>
    )
};

export const Disabled: Story = {
    render: props => (
        <Inline alignY="end">
            <SwitchField {...props} size="sm" isDisabled description="Description">
                <Switch>
                    Option 1
                </Switch>
            </SwitchField>
            <SwitchField {...props} size="md" isDisabled description="Description">
                <Switch>
                    Option 1
                </Switch>
            </SwitchField>
        </Inline>
    )
};

export const Zoom: Story = {
    render: props => (
        <Stack>
            <Inline alignY="end">
                <SwitchField {...props} size="sm" className="zoom-in" description="Description">
                    <Switch>
                        Option 1
                    </Switch>
                </SwitchField>
                <SwitchField {...props} size="md" className="zoom-in" description="Description">
                    <Switch>
                        Option 1
                    </Switch>
                </SwitchField>
            </Inline>
            <Inline alignY="end">
                <SwitchField {...props} size="sm" className="zoom-out" description="Description">
                    <Switch>
                        Option 1
                    </Switch>
                </SwitchField>
                <SwitchField {...props} size="md" className="zoom-out" description="Description">
                    <Switch>
                        Option 1
                    </Switch>
                </SwitchField>
            </Inline>
        </Stack>
    )
};

export const AccessToDisabledState: Story = {
    render: props => (
        <Inline alignY="end">
            <SwitchField {...props} size="sm" isDisabled description="Value should be true">
                {({ isDisabled }) => (
                    <Switch>
                            Is disabled: {String(isDisabled)}
                    </Switch>
                )}
            </SwitchField>
            <SwitchField
                {...props}
                size="sm"
                isDisabled
                style={({ isDisabled }) => isDisabled ? { border: "1px solid red" } : {}}
                description="Border should be red"
            >
                <Switch>
                    Disable and red border
                </Switch>
            </SwitchField>
        </Inline>
    )
};

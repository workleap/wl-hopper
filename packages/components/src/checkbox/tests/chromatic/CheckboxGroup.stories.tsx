import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { ContextualHelp } from "../../../contextual-help/index.ts";
import { Inline, Stack } from "../../../layout/index.ts";
import { Checkbox } from "../../src/Checkbox.tsx";
import { CheckboxField } from "../../src/CheckboxField.tsx";
import { CheckboxGroup } from "../../src/CheckboxGroup.tsx";

const meta = {
    title: "Components/Forms/CheckboxGroup",
    component: CheckboxGroup
} satisfies Meta<typeof CheckboxGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Vertical = {
    render: props => (
        <Stack>
            <h1>Default</h1>
            <CheckboxGroup {...props} description="Select one to continue">
                <Checkbox value="developer">Developer</Checkbox>
                <Checkbox value="designer">Designer</Checkbox>
                <CheckboxField description="Product Owner">
                    <Checkbox value="po">PO</Checkbox>
                </CheckboxField>
                <Checkbox value="manager">Manager</Checkbox>
            </CheckboxGroup>
            <h1>Fluid</h1>
            <CheckboxGroup isFluid variant="bordered" {...props} description="Select one to continue">
                <Checkbox value="developer">Developer</Checkbox>
                <Checkbox value="designer">Designer</Checkbox>
                <CheckboxField description="Product Owner">
                    <Checkbox value="po">PO</Checkbox>
                </CheckboxField>
                <Checkbox value="manager">Manager</Checkbox>
            </CheckboxGroup>
            <h1>Checked</h1>
            <CheckboxGroup {...props} defaultValue={["developer", "designer", "manager"]}>
                <Checkbox value="developer">Developer</Checkbox>
                <Checkbox value="designer">Designer</Checkbox>
                <Checkbox value="manager">Manager</Checkbox>
            </CheckboxGroup>
            <h1>Size</h1>
            <Inline alignY="start">
                <CheckboxGroup {...props} size="sm">
                    <Checkbox value="developer">Developer</Checkbox>
                    <Checkbox value="designer">Designer</Checkbox>
                    <Checkbox value="manager">Manager</Checkbox>
                </CheckboxGroup>
                <CheckboxGroup {...props} size="md">
                    <Checkbox value="developer">Developer</Checkbox>
                    <Checkbox value="designer">Designer</Checkbox>
                    <Checkbox value="manager">Manager</Checkbox>
                </CheckboxGroup>
            </Inline>
            <h1>Disabled</h1>
            <CheckboxGroup {...props} isDisabled>
                <Checkbox value="developer">Developer</Checkbox>
                <Checkbox value="designer">Designer</Checkbox>
                <Checkbox value="manager">Manager</Checkbox>
            </CheckboxGroup>
            <h1>Invalid</h1>
            <Inline alignY="start">
                <CheckboxGroup {...props} size="sm" isInvalid errorMessage="This field is required">
                    <Checkbox value="developer">Developer</Checkbox>
                    <Checkbox value="designer">Designer</Checkbox>
                    <Checkbox value="manager">Manager</Checkbox>
                </CheckboxGroup>
                <CheckboxGroup {...props} size="md" isInvalid errorMessage="This field is required">
                    <Checkbox value="developer">Developer</Checkbox>
                    <Checkbox value="designer">Designer</Checkbox>
                    <Checkbox value="manager">Manager</Checkbox>
                </CheckboxGroup>
            </Inline>
            <h1>Invalid & Disabled</h1>
            <CheckboxGroup {...props} isDisabled isInvalid>
                <Checkbox value="developer">Developer</Checkbox>
                <Checkbox value="designer">Designer</Checkbox>
                <Checkbox value="manager">Manager</Checkbox>
            </CheckboxGroup>
            <h1>Bordered</h1>
            <Inline alignY="start">
                <CheckboxGroup {...props} size="sm" variant="bordered">
                    <Checkbox value="developer">Developer</Checkbox>
                    <Checkbox value="designer">Designer</Checkbox>
                    <Checkbox value="manager">Manager</Checkbox>
                </CheckboxGroup>
                <CheckboxGroup {...props} size="md" variant="bordered">
                    <Checkbox value="developer">Developer</Checkbox>
                    <Checkbox value="designer">Designer</Checkbox>
                    <Checkbox value="manager">Manager</Checkbox>
                </CheckboxGroup>
            </Inline>
            <h1>Bordered with Description</h1>
            <Inline alignY="start">
                <CheckboxGroup {...props} size="sm" variant="bordered" description="Select one to continue">
                    <CheckboxField description="Team Lead">
                        <Checkbox value="developer">Developer</Checkbox>
                    </CheckboxField>
                    <Checkbox value="designer">Designer</Checkbox>
                    <CheckboxField description="Team Manager">
                        <Checkbox value="manager">Manager</Checkbox>
                    </CheckboxField>
                </CheckboxGroup>
                <CheckboxGroup {...props} size="md" variant="bordered" description="Select one to continue">
                    <CheckboxField description="Team Lead">
                        <Checkbox value="developer">Developer</Checkbox>
                    </CheckboxField>
                    <Checkbox value="designer">Designer</Checkbox>
                    <CheckboxField description="Team Manager">
                        <Checkbox value="manager">Manager</Checkbox>
                    </CheckboxField>
                </CheckboxGroup>
            </Inline>
            <h1>Bordered & Invalid</h1>
            <Inline alignY="start">
                <CheckboxGroup {...props} size="sm" variant="bordered" isInvalid errorMessage="This field is required">
                    <Checkbox value="developer">Developer</Checkbox>
                    <Checkbox value="designer">Designer</Checkbox>
                    <Checkbox value="manager">Manager</Checkbox>
                </CheckboxGroup>
                <CheckboxGroup {...props} size="md" variant="bordered" isInvalid errorMessage="This field is required">
                    <Checkbox value="developer">Developer</Checkbox>
                    <Checkbox value="designer">Designer</Checkbox>
                    <Checkbox value="manager">Manager</Checkbox>
                </CheckboxGroup>
            </Inline>
            <h1>Styling</h1>
            <Inline>
                <CheckboxGroup {...props} label="Numbers" border="warning">
                    <Checkbox value="1">1</Checkbox>
                    <Checkbox value="2">2</Checkbox>
                    <Checkbox value="3">3</Checkbox>
                </CheckboxGroup>
                <CheckboxGroup {...props} label="Numbers" className="border-blue">
                    <Checkbox value="1">1</Checkbox>
                    <Checkbox value="2">2</Checkbox>
                    <Checkbox value="3">3</Checkbox>
                </CheckboxGroup>
                <CheckboxGroup {...props} label="Numbers" style={{ border: "1px solid red" }}>
                    <Checkbox value="1">1</Checkbox>
                    <Checkbox value="2">2</Checkbox>
                    <Checkbox value="3">3</Checkbox>
                </CheckboxGroup>
            </Inline>
            <h1>Zoom</h1>
            <Inline alignY="start">
                <CheckboxGroup {...props} className="zoom-in">
                    <Checkbox value="developer">Developer</Checkbox>
                    <Checkbox value="designer">Designer</Checkbox>
                    <Checkbox value="manager">Manager</Checkbox>
                </CheckboxGroup>
                <CheckboxGroup {...props} className="zoom-out">
                    <Checkbox value="developer">Developer</Checkbox>
                    <Checkbox value="designer">Designer</Checkbox>
                    <Checkbox value="manager">Manager</Checkbox>
                </CheckboxGroup>
            </Inline>
        </Stack>
    ),
    args: {
        orientation: "vertical",
        label: "Roles"
    }
} satisfies Story;

export const WithContextualHelp = {
    render: props => (
        <CheckboxGroup {...props}>
            <Checkbox value="developer">Developer</Checkbox>
            <Checkbox value="designer">Designer</Checkbox>
            <Checkbox value="manager">Manager</Checkbox>
        </CheckboxGroup>
    ),
    args: {
        label: "Roles",
        contextualHelp: <ContextualHelp isOpen>Some help for the checkbox group</ContextualHelp>
    }
} satisfies Story;

export const Horizontal = {
    ...Vertical,
    args: {
        orientation: "horizontal",
        label: "Roles"
    }
} satisfies Story;

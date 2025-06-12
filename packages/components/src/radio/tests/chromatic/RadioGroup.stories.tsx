import { SparklesIcon } from "@hopper-ui/icons";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { ContextualHelp } from "../../../contextual-help/index.ts";
import { IconList } from "../../../icon-list/index.ts";
import { Inline, Stack } from "../../../layout/index.ts";
import { Text } from "../../../typography/index.ts";
import { Radio } from "../../src/Radio.tsx";
import { RadioField } from "../../src/RadioField.tsx";
import { RadioGroup } from "../../src/RadioGroup.tsx";

const meta = {
    title: "Components/Forms/RadioGroup",
    component: RadioGroup
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Vertical = {
    render: props => (
        <Stack>
            <h1>Default</h1>
            <RadioGroup {...props} description="Select one to continue">
                <Radio value="developer">Developer</Radio>
                <Radio value="designer">Designer</Radio>
                <RadioField description="Product Owner">
                    <Radio value="po">PO</Radio>
                </RadioField>
                <Radio value="manager">Manager</Radio>
            </RadioGroup>
            <h1>Selected</h1>
            <RadioGroup {...props} defaultValue="developer">
                <Radio value="developer">Developer</Radio>
                <Radio value="designer">Designer</Radio>
                <Radio value="manager">Manager</Radio>
            </RadioGroup>
            <h1>Size</h1>
            <Inline alignY="start">
                <RadioGroup {...props} size="sm">
                    <Radio value="developer">Developer</Radio>
                    <Radio value="designer">Designer</Radio>
                    <Radio value="manager">Manager</Radio>
                </RadioGroup>
                <RadioGroup {...props} size="md">
                    <Radio value="developer">Developer</Radio>
                    <Radio value="designer">Designer</Radio>
                    <Radio value="manager">Manager</Radio>
                </RadioGroup>
            </Inline>
            <h1>Icons</h1>
            <RadioGroup {...props} description="Select one to continue">
                <Radio value="developer"><SparklesIcon /><Text>Developer</Text></Radio>
                <Radio value="designer">
                    <Text>Designer</Text>
                    <IconList>
                        <SparklesIcon /><SparklesIcon /><SparklesIcon />
                    </IconList>
                </Radio>
                <RadioField description="Team Manager">
                    <Radio value="manager">
                        <Text>Manager</Text>
                        <IconList>
                            <SparklesIcon /><SparklesIcon />
                        </IconList>
                    </Radio>
                </RadioField>
            </RadioGroup>
            <h1>Disabled</h1>
            <RadioGroup {...props} isDisabled>
                <Radio value="developer">Developer</Radio>
                <Radio value="designer">Designer</Radio>
                <Radio value="manager">Manager</Radio>
            </RadioGroup>
            <h1>Invalid</h1>
            <Inline alignY="start">
                <RadioGroup {...props} size="sm" isInvalid errorMessage="This field is required">
                    <Radio value="developer">Developer</Radio>
                    <Radio value="designer">Designer</Radio>
                    <Radio value="manager">Manager</Radio>
                </RadioGroup>
                <RadioGroup {...props} size="md" isInvalid errorMessage="This field is required">
                    <Radio value="developer">Developer</Radio>
                    <Radio value="designer">Designer</Radio>
                    <Radio value="manager">Manager</Radio>
                </RadioGroup>
            </Inline>
            <h1>Invalid & Disabled</h1>
            <RadioGroup {...props} isDisabled isInvalid>
                <Radio value="developer">Developer</Radio>
                <Radio value="designer">Designer</Radio>
                <Radio value="manager">Manager</Radio>
            </RadioGroup>
            <h1>Bordered</h1>
            <Inline alignY="start">
                <RadioGroup {...props} size="sm" variant="bordered">
                    <Radio value="developer">Developer</Radio>
                    <Radio value="designer">Designer</Radio>
                    <Radio value="manager">Manager</Radio>
                </RadioGroup>
                <RadioGroup {...props} size="md" variant="bordered">
                    <Radio value="developer">Developer</Radio>
                    <Radio value="designer">Designer</Radio>
                    <Radio value="manager">Manager</Radio>
                </RadioGroup>
            </Inline>
            <h1>Bordered with Description</h1>
            <Inline alignY="start">
                <RadioGroup {...props} size="sm" variant="bordered" description="Select one to continue">
                    <RadioField description="Team Lead">
                        <Radio value="developer">Developer</Radio>
                    </RadioField>
                    <Radio value="designer">Designer</Radio>
                    <RadioField description="Team Manager">
                        <Radio value="manager">Manager</Radio>
                    </RadioField>
                </RadioGroup>
                <RadioGroup {...props} size="md" variant="bordered" description="Select one to continue">
                    <RadioField description="Team Lead">
                        <Radio value="developer">Developer</Radio>
                    </RadioField>
                    <Radio value="designer">Designer</Radio>
                    <RadioField description="Team Manager">
                        <Radio value="manager">Manager</Radio>
                    </RadioField>
                </RadioGroup>
            </Inline>
            <h1>Bordered & Invalid</h1>
            <Inline alignY="start">
                <RadioGroup {...props} size="sm" variant="bordered" isInvalid errorMessage="This field is required">
                    <Radio value="developer">Developer</Radio>
                    <Radio value="designer">Designer</Radio>
                    <Radio value="manager">Manager</Radio>
                </RadioGroup>
                <RadioGroup {...props} size="md" variant="bordered" isInvalid errorMessage="This field is required">
                    <Radio value="developer">Developer</Radio>
                    <Radio value="designer">Designer</Radio>
                    <Radio value="manager">Manager</Radio>
                </RadioGroup>
            </Inline>
            <h1>Styling</h1>
            <Inline>
                <RadioGroup {...props} border="warning" label="Numbers">
                    <Radio value="1">1</Radio>
                    <Radio value="2">2</Radio>
                    <Radio value="3">3</Radio>
                </RadioGroup>
                <RadioGroup {...props} className="border-blue" label="Numbers">
                    <Radio value="1">1</Radio>
                    <Radio value="2">2</Radio>
                    <Radio value="3">3</Radio>
                </RadioGroup>
                <RadioGroup {...props} style={{ border: "1px solid red" }} label="Numbers">
                    <Radio value="1">1</Radio>
                    <Radio value="2">2</Radio>
                    <Radio value="3">3</Radio>
                </RadioGroup>
            </Inline>
            <h1>Zoom</h1>
            <Inline alignY="start">
                <RadioGroup {...props} className="zoom-in">
                    <Radio value="developer">Developer</Radio>
                    <Radio value="designer">Designer</Radio>
                    <Radio value="manager">Manager</Radio>
                </RadioGroup>
                <RadioGroup {...props} className="zoom-out">
                    <Radio value="developer">Developer</Radio>
                    <Radio value="designer">Designer</Radio>
                    <Radio value="manager">Manager</Radio>
                </RadioGroup>
            </Inline>
        </Stack>
    ),
    args: {
        label: "Roles",
        orientation: "vertical"
    }
} satisfies Story;

export const WithContextualHelp = {
    render: props => (
        <RadioGroup {...props}>
            <Radio value="developer">Developer</Radio>
            <Radio value="designer">Designer</Radio>
            <Radio value="manager">Manager</Radio>
        </RadioGroup>
    ),
    args: {
        label: "Roles",
        contextualHelp: <ContextualHelp isOpen>Some help for the RadioGroup</ContextualHelp>
    }
} satisfies Story;

export const Horizontal = {
    ...Vertical,
    args: {
        label: "Roles",
        orientation: "horizontal"
    }
} satisfies Story;

export const Overflow = {
    render: props => (
        <Inline alignY="start">
            <RadioGroup {...props} size="sm" style={{ maxWidth: "16rem" }}>
                <Radio value="developer">PA-99-N2 event and possible exoplanet in galaxy</Radio>
                <Radio value="designer">PA-99-N2 event and possible exoplanet in galaxy</Radio>
                <Radio value="manager">PA-99-N2 event and possible exoplanet in galaxy</Radio>
            </RadioGroup>
            <RadioGroup {...props} size="md" style={{ maxWidth: "16rem" }}>
                <Radio value="developer">PA-99-N2 event and possible exoplanet in galaxy</Radio>
                <Radio value="designer">PA-99-N2 event and possible exoplanet in galaxy</Radio>
                <Radio value="manager">PA-99-N2 event and possible exoplanet in galaxy</Radio>
            </RadioGroup>
        </Inline>
    ),
    args: {
        label: "Roles",
        orientation: "vertical"
    }
} satisfies Story;

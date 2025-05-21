import { SparklesIcon } from "@hopper-ui/icons";
import { Div } from "@hopper-ui/styled-system";
import type { Meta, StoryObj } from "@storybook/react";

import { IconList } from "../../../icon-list/index.ts";
import { Inline, Stack } from "../../../layout/index.ts";
import { Text } from "../../../typography/Text/index.ts";
import { Checkbox } from "../../src/Checkbox.tsx";


const meta = {
    title: "Components/Forms/Checkbox",
    component: Checkbox
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {
    render: props => (
        <Stack>
            <h1>Labeled</h1>
            <Inline alignY="end">
                <Checkbox {...props} size="sm">
                    Option 1
                </Checkbox>
                <Checkbox {...props} size="md">
                    Option 2
                </Checkbox>
            </Inline>
            <Inline alignY="end">
                <Checkbox {...props} size="sm">
                    <Text>Option 1</Text>
                    <SparklesIcon />
                </Checkbox>
                <Checkbox {...props} size="md">
                    <Text>Option 2</Text>
                    <SparklesIcon />
                </Checkbox>
            </Inline>
            <Inline alignY="end">
                <Checkbox {...props} size="sm">
                    <Text>Option 1</Text>
                    <IconList><SparklesIcon /><SparklesIcon /><SparklesIcon /></IconList>
                </Checkbox>
                <Checkbox {...props} size="md">
                    <Text>Option 2</Text>
                    <IconList><SparklesIcon /><SparklesIcon /><SparklesIcon /></IconList>
                </Checkbox>
            </Inline>
            <h1>Unlabeled</h1>
            <Inline alignY="end">
                <Checkbox {...props} size="sm" aria-label="Option 1" />
                <Checkbox {...props} size="md" aria-label="Option 2" />
            </Inline>
            <Inline alignY="end">
                <Checkbox {...props} size="sm" aria-label="Option 1">
                    <SparklesIcon />
                </Checkbox>
                <Checkbox {...props} aria-label="Option 2">
                    <SparklesIcon />
                </Checkbox>
            </Inline>
            <Inline alignY="end">
                <Checkbox {...props} size="sm" aria-label="Option 1">
                    <IconList><SparklesIcon /><SparklesIcon /><SparklesIcon /></IconList>
                </Checkbox>
                <Checkbox {...props} size="md" aria-label="Option 2">
                    <IconList><SparklesIcon /><SparklesIcon /><SparklesIcon /></IconList>
                </Checkbox>
            </Inline>
            <h1>Validation</h1>
            <Inline alignY="end">
                <Checkbox {...props} size="sm" isInvalid>
                    Option 1
                </Checkbox>
                <Checkbox {...props} size="md" isInvalid>
                    Option 2
                </Checkbox>
            </Inline>
            <Inline alignY="end">
                <Checkbox {...props} size="sm" isInvalid>
                    <Text>Option 1</Text>
                    <SparklesIcon />
                </Checkbox>
                <Checkbox {...props} size="md" isInvalid>
                    <Text>Option 2</Text>
                    <SparklesIcon />
                </Checkbox>
            </Inline>
            <h1>Overflow</h1>
            <Div maxWidth="1/4">
                <Checkbox {...props}>PA-99-N2 event and possible exoplanet in galaxy</Checkbox>
            </Div>
            <Div maxWidth="1/4">
                <Checkbox {...props}>
                    <Text>PA-99-N2 event and possible exoplanet in galaxy</Text>
                    <IconList>
                        <SparklesIcon /><SparklesIcon />
                    </IconList>
                </Checkbox>
            </Div>
            <Div maxWidth="1/4">
                <Checkbox {...props} size="sm">PA-99-N2 event and possible exoplanet in galaxy</Checkbox>
            </Div>
            <Div maxWidth="1/4">
                <Checkbox {...props} size="sm">
                    <Text>PA-99-N2 event and possible exoplanet in galaxy</Text>
                    <IconList>
                        <SparklesIcon /><SparklesIcon />
                    </IconList>
                </Checkbox>
            </Div>
            <h1>Zoom</h1>
            <Inline>
                <Div className="zoom-in">
                    <Checkbox {...props}>Option 1</Checkbox>
                </Div>
                <Div className="zoom-out">
                    <Checkbox {...props}>Option 2</Checkbox>
                </Div>
            </Inline>
        </Stack>
    )
};

export const Checked: Story = {
    ...Unchecked,
    args: {
        defaultSelected: true
    }
};

export const Indeterminate: Story = {
    ...Unchecked,
    args: {
        defaultSelected: true,
        isIndeterminate: true
    }
};

export const UncheckedStates: Story = {
    play: async ({ canvasElement }) => {
        const checkboxLabels = canvasElement.querySelectorAll("label");

        checkboxLabels.forEach(checkboxLabel => {
            const checkbox = checkboxLabel.querySelector("input[type='checkbox']");
            if (checkbox && checkbox.getAttribute("disabled") !== "") { // don't try and force states on a disabled input
                if (checkboxLabel.getAttribute("data-chromatic-force-press")) {
                    checkboxLabel.setAttribute("data-pressed", "true");
                    checkboxLabel.removeAttribute("data-chromatic-force-press");
                }

                if (checkboxLabel.getAttribute("data-chromatic-force-focus")) {
                    checkboxLabel.setAttribute("data-focus-visible", "true");
                    checkboxLabel.removeAttribute("data-chromatic-force-focus");
                }

                if (checkboxLabel.getAttribute("data-chromatic-force-hover")) {
                    checkboxLabel.setAttribute("data-hovered", "true");
                    checkboxLabel.removeAttribute("data-chromatic-force-hover");
                }
            }
        });
    },
    render: props => (
        <Stack>
            <h1>Focus Visible</h1>
            <Inline alignY="end">
                <Checkbox {...props} size="sm" data-chromatic-force-focus>
                    Option 1
                </Checkbox>
                <Checkbox {...props} size="md" data-chromatic-force-focus>
                    Option 2
                </Checkbox>
            </Inline>
            <h1>Hovered</h1>
            <Inline alignY="end">
                <Checkbox {...props} size="sm" data-chromatic-force-hover>
                    Option 1
                </Checkbox>
                <Checkbox {...props} size="md" data-chromatic-force-hover>
                    Option 2
                </Checkbox>
            </Inline>
            <h1>Focus Visible & Hovered</h1>
            <Inline alignY="end">
                <Checkbox {...props} size="sm" data-chromatic-force-focus data-chromatic-force-hover>
                    Option 1
                </Checkbox>
                <Checkbox {...props} size="md" data-chromatic-force-focus data-chromatic-force-hover>
                    Option 2
                </Checkbox>
            </Inline>
            <h1>Pressed</h1>
            <Inline alignY="end">
                <Checkbox {...props} size="sm" data-chromatic-force-press>
                    Option 1
                </Checkbox>
                <Checkbox {...props} size="md" data-chromatic-force-press>
                    Option 2
                </Checkbox>
            </Inline>
            <h1>Disabled & Focus Visible</h1>
            <Inline alignY="end">
                <Checkbox {...props} size="sm" isDisabled data-chromatic-force-focus>
                    Option 1
                </Checkbox>
                <Checkbox {...props} size="md" isDisabled data-chromatic-force-focus>
                    Option 2
                </Checkbox>
            </Inline>
            <h1>Disabled & Hovered</h1>
            <Inline alignY="end">
                <Checkbox {...props} size="sm" isDisabled data-chromatic-force-hover>
                    Option 1
                </Checkbox>
                <Checkbox {...props} size="md" isDisabled data-chromatic-force-hover>
                    Option 2
                </Checkbox>
            </Inline>
            <h1>Disabled, Focus Visible & Hovered</h1>
            <Inline alignY="end">
                <Checkbox {...props} size="sm" isDisabled data-chromatic-force-focus data-chromatic-force-hover>
                    Option 1
                </Checkbox>
                <Checkbox {...props} size="md" isDisabled data-chromatic-force-focus data-chromatic-force-hover>
                    Option 2
                </Checkbox>
            </Inline>
        </Stack>
    )
};

export const CheckedStates: Story = {
    ...UncheckedStates,
    args: {
        defaultSelected: true
    }
};

export const IndeterminateStates: Story = {
    ...UncheckedStates,
    args: {
        defaultSelected: true,
        isIndeterminate: true
    }
};

export const InvalidUncheckedStates: Story = {
    ...UncheckedStates,
    args: {
        isInvalid: true
    }
};

export const InvalidCheckedStates: Story = {
    ...UncheckedStates,
    args: {
        isInvalid: true,
        defaultSelected: true
    }
};

export const InvalidIndeterminateStates: Story = {
    ...UncheckedStates,
    args: {
        isInvalid: true,
        defaultSelected: true,
        isIndeterminate: true
    }
};

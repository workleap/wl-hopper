import { SparklesIcon } from "@hopper-ui/icons";
import { Div } from "@hopper-ui/styled-system";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { IconList } from "../../../icon-list/index.ts";
import { Inline, Stack } from "../../../layout/index.ts";
import { Text } from "../../../typography/index.ts";
import { Switch } from "../../src/Switch.tsx";

const meta = {
    title: "Components/Forms/Switch",
    component: Switch
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {
    render: props => (
        <Stack>
            <h1>Labeled</h1>
            <Inline alignY="end">
                <Switch {...props} size="sm">
                    Option 1
                </Switch>
                <Switch {...props} size="md">
                    Option 2
                </Switch>
            </Inline>
            <Inline alignY="end">
                <Switch {...props} size="sm">
                    <Text>Option 1</Text>
                    <SparklesIcon />
                </Switch>
                <Switch {...props} size="md">
                    <Text>Option 2</Text>
                    <SparklesIcon />
                </Switch>
            </Inline>
            <Inline alignY="end">
                <Switch {...props} size="sm">
                    <Text>Option 1</Text>
                    <IconList><SparklesIcon /><SparklesIcon /><SparklesIcon /></IconList>
                </Switch>
                <Switch {...props} size="md">
                    <Text>Option 2</Text>
                    <IconList><SparklesIcon /><SparklesIcon /><SparklesIcon /></IconList>
                </Switch>
            </Inline>
            <h1>Unlabeled</h1>
            <Inline alignY="end">
                <Switch {...props} size="sm" aria-label="Option 1" />
                <Switch {...props} size="md" aria-label="Option 2" />
            </Inline>
            <Inline alignY="end">
                <Switch {...props} size="sm" aria-label="Option 1">
                    <SparklesIcon />
                </Switch>
                <Switch {...props} aria-label="Option 2">
                    <SparklesIcon />
                </Switch>
            </Inline>
            <Inline alignY="end">
                <Switch {...props} size="sm" aria-label="Option 1">
                    <IconList><SparklesIcon /><SparklesIcon /><SparklesIcon /></IconList>
                </Switch>
                <Switch {...props} size="md" aria-label="Option 2">
                    <IconList><SparklesIcon /><SparklesIcon /><SparklesIcon /></IconList>
                </Switch>
            </Inline>
            <h1>Overflow</h1>
            <Div maxWidth="1/4">
                <Switch {...props}>PA-99-N2 event and possible exoplanet in galaxy</Switch>
            </Div>
            <Div maxWidth="1/4">
                <Switch {...props}>
                    <Text>PA-99-N2 event and possible exoplanet in galaxy</Text>
                    <IconList>
                        <SparklesIcon /><SparklesIcon />
                    </IconList>
                </Switch>
            </Div>
            <Div maxWidth="1/4">
                <Switch {...props} size="sm">PA-99-N2 event and possible exoplanet in galaxy</Switch>
            </Div>
            <Div maxWidth="1/4">
                <Switch {...props} size="sm">
                    <Text>PA-99-N2 event and possible exoplanet in galaxy</Text>
                    <IconList>
                        <SparklesIcon /><SparklesIcon />
                    </IconList>
                </Switch>
            </Div>
            <h1>Zoom</h1>
            <Inline>
                <Div className="zoom-in">
                    <Switch {...props}>Option 1</Switch>
                </Div>
                <Div className="zoom-out">
                    <Switch {...props}>Option 2</Switch>
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

export const UncheckedStates: Story = {
    play: ({ canvasElement }) => {
        const switchLabels = canvasElement.querySelectorAll("label");

        switchLabels.forEach(switchLabel => {
            const switchElem = switchLabel.querySelector("input[type='checkbox']");

            if (switchElem && switchElem.getAttribute("disabled") !== "") { // don't try and force states on a disabled input
                if (switchLabel.getAttribute("data-chromatic-force-press")) {
                    switchLabel.setAttribute("data-pressed", "true");
                    switchLabel.removeAttribute("data-chromatic-force-press");
                }

                if (switchLabel.getAttribute("data-chromatic-force-focus")) {
                    switchLabel.setAttribute("data-focus-visible", "true");
                    switchLabel.removeAttribute("data-chromatic-force-focus");
                }

                if (switchLabel.getAttribute("data-chromatic-force-hover")) {
                    switchLabel.setAttribute("data-hovered", "true");
                    switchLabel.removeAttribute("data-chromatic-force-hover");
                }
            }
        });
    },
    render: props => (
        <Stack>
            <h1>Focus Visible</h1>
            <Inline alignY="end">
                <Switch {...props} size="sm" data-chromatic-force-focus>
                    Option 1
                </Switch>
                <Switch {...props} size="md" data-chromatic-force-focus>
                    Option 2
                </Switch>
            </Inline>
            <h1>Hovered</h1>
            <Inline alignY="end">
                <Switch {...props} size="sm" data-chromatic-force-hover>
                    Option 1
                </Switch>
                <Switch {...props} size="md" data-chromatic-force-hover>
                    Option 2
                </Switch>
            </Inline>
            <h1>Pressed</h1>
            <Inline alignY="end">
                <Switch {...props} size="sm" data-chromatic-force-press>
                    Option 1
                </Switch>
                <Switch {...props} size="md" data-chromatic-force-press>
                    Option 2
                </Switch>
            </Inline>
            <h1>Focus Visible & Hovered</h1>
            <Inline alignY="end">
                <Switch {...props} size="sm" data-chromatic-force-focus data-chromatic-force-hover>
                    Option 1
                </Switch>
                <Switch {...props} size="md" data-chromatic-force-focus data-chromatic-force-hover>
                    Option 2
                </Switch>
            </Inline>
            <h1>Disabled & Focus Visible</h1>
            <Inline alignY="end">
                <Switch {...props} size="sm" isDisabled data-chromatic-force-focus>
                    Option 1
                </Switch>
                <Switch {...props} size="md" isDisabled data-chromatic-force-focus>
                    Option 2
                </Switch>
            </Inline>
            <h1>Disabled & Hovered</h1>
            <Inline alignY="end">
                <Switch {...props} size="sm" isDisabled data-chromatic-force-hover>
                    Option 1
                </Switch>
                <Switch {...props} size="md" isDisabled data-chromatic-force-hover>
                    Option 2
                </Switch>
            </Inline>
            <h1>Disabled, Focus Visible & Hovered</h1>
            <Inline alignY="end">
                <Switch {...props} size="sm" isDisabled data-chromatic-force-focus data-chromatic-force-hover>
                    Option 1
                </Switch>
                <Switch {...props} size="md" isDisabled data-chromatic-force-focus data-chromatic-force-hover>
                    Option 2
                </Switch>
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

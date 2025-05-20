import { SparklesIcon } from "@hopper-ui/icons";
import type { Meta, StoryObj } from "@storybook/react";
import { within } from "@storybook/test";

import { Disclosure, DisclosureHeader, DisclosurePanel } from "../../../Disclosure/index.ts";
import { Inline, Stack } from "../../../layout/index.ts";
import { Text } from "../../../typography/Text/index.ts";
import { Accordion, type AccordionProps } from "../../src/Accordion.tsx";

const meta = {
    title: "Components/Accordion",
    component: Accordion
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
    render: args => (
        <Stack>
            <h1>Default</h1>
            <Accordion {...args}>
                <Disclosure id="officevibe">
                    <DisclosureHeader>Workleap Officevibe</DisclosureHeader>
                    <DisclosurePanel>Help employees speak up and make sure they feel heard. Continuous and real-time surveys offer feedback to celebrate every win, recognize commitment, and uncover challenges.</DisclosurePanel>
                </Disclosure>
                <Disclosure id="pingboard">
                    <DisclosureHeader>Workleap Pingboard</DisclosureHeader>
                    <DisclosurePanel>Make teamwork work. Use your org chart to create lasting connections across your distributed and hybrid teams to make collaboration easier.</DisclosurePanel>
                </Disclosure>
                <Disclosure id="performance">
                    <DisclosureHeader>Workleap Performance</DisclosureHeader>
                    <DisclosurePanel>Drive impact by simplifying how your leaders and you manage team performance throughout the year.</DisclosurePanel>
                </Disclosure>
            </Accordion>
            <h1>Multiple Expanded</h1>
            <Accordion {...args} defaultExpandedKeys={["officevibe", "performance"]} allowsMultipleExpanded>
                <Disclosure id="officevibe">
                    <DisclosureHeader>Workleap Officevibe</DisclosureHeader>
                    <DisclosurePanel>Help employees speak up and make sure they feel heard. Continuous and real-time surveys offer feedback to celebrate every win, recognize commitment, and uncover challenges.</DisclosurePanel>
                </Disclosure>
                <Disclosure id="pingboard">
                    <DisclosureHeader>Workleap Pingboard</DisclosureHeader>
                    <DisclosurePanel>Make teamwork work. Use your org chart to create lasting connections across your distributed and hybrid teams to make collaboration easier.</DisclosurePanel>
                </Disclosure>
                <Disclosure id="performance">
                    <DisclosureHeader>Workleap Performance</DisclosureHeader>
                    <DisclosurePanel>Drive impact by simplifying how your leaders and you manage team performance throughout the year.</DisclosurePanel>
                </Disclosure>
            </Accordion>
            <h1>Description</h1>
            <Accordion {...args}>
                <Disclosure id="officevibe">
                    <DisclosureHeader>
                        <Inline columnGap="inline-sm" rowGap="core_0" alignY="baseline">
                            <Text>Workleap Officevibe</Text>
                            <Text color="neutral-weak" size="sm">Engagement and Feedback</Text>
                        </Inline>
                    </DisclosureHeader>
                    <DisclosurePanel>Help employees speak up and make sure they feel heard. Continuous and real-time surveys offer feedback to celebrate every win, recognize commitment, and uncover challenges.</DisclosurePanel>
                </Disclosure>
                <Disclosure id="pingboard">
                    <DisclosureHeader>
                        <Inline columnGap="inline-sm" rowGap="core_0" alignY="baseline">
                            <Text>Workleap Pingboard</Text>
                            <Text color="neutral-weak" size="sm">Org Chart</Text>
                        </Inline>
                    </DisclosureHeader>
                    <DisclosurePanel>Make teamwork work. Use your org chart to create lasting connections across your distributed and hybrid teams to make collaboration easier.</DisclosurePanel>
                </Disclosure>
                <Disclosure id="performance">
                    <DisclosureHeader>
                        <Inline columnGap="inline-sm" rowGap="core_0" alignY="baseline">
                            <Text>Workleap Performance</Text>
                            <Text color="neutral-weak" size="sm">Performance Management</Text>
                        </Inline>
                    </DisclosureHeader>
                    <DisclosurePanel>Drive impact by simplifying how your leaders and you manage team performance throughout the year.</DisclosurePanel>
                </Disclosure>
            </Accordion>
            <h1>Icon</h1>
            <Accordion {...args}>
                <Disclosure id="officevibe">
                    <DisclosureHeader>
                        <SparklesIcon />
                        <Inline columnGap="inline-sm" rowGap="core_0" alignY="baseline">
                            <Text>Workleap Officevibe</Text>
                            <Text color="neutral-weak" size="sm">Engagement and Feedback</Text>
                        </Inline>
                    </DisclosureHeader>
                    <DisclosurePanel>Help employees speak up and make sure they feel heard. Continuous and real-time surveys offer feedback to celebrate every win, recognize commitment, and uncover challenges.</DisclosurePanel>
                </Disclosure>
                <Disclosure id="pingboard">
                    <DisclosureHeader>
                        <SparklesIcon />
                        <Inline columnGap="inline-sm" rowGap="core_0" alignY="baseline">
                            <Text>Workleap Pingboard</Text>
                            <Text color="neutral-weak" size="sm">Org Chart</Text>
                        </Inline>
                    </DisclosureHeader>
                    <DisclosurePanel>Make teamwork work. Use your org chart to create lasting connections across your distributed and hybrid teams to make collaboration easier.</DisclosurePanel>
                </Disclosure>
                <Disclosure id="performance">
                    <DisclosureHeader>
                        <SparklesIcon />
                        <Inline columnGap="inline-sm" rowGap="core_0" alignY="baseline">
                            <Text>Workleap Performance</Text>
                            <Text color="neutral-weak" size="sm">Performance Management</Text>
                        </Inline>
                    </DisclosureHeader>
                    <DisclosurePanel>Drive impact by simplifying how your leaders and you manage team performance throughout the year.</DisclosurePanel>
                </Disclosure>
            </Accordion>
            <h1>Style</h1>
            <Accordion {...args} border="decorative-option5">
                <Disclosure id="officevibe">
                    <DisclosureHeader>Workleap Officevibe</DisclosureHeader>
                    <DisclosurePanel>Help employees speak up and make sure they feel heard. Continuous and real-time surveys offer feedback to celebrate every win, recognize commitment, and uncover challenges.</DisclosurePanel>
                </Disclosure>
                <Disclosure id="pingboard">
                    <DisclosureHeader>Workleap Pingboard</DisclosureHeader>
                    <DisclosurePanel>Make teamwork work. Use your org chart to create lasting connections across your distributed and hybrid teams to make collaboration easier.</DisclosurePanel>
                </Disclosure>
                <Disclosure id="performance">
                    <DisclosureHeader>Workleap Performance</DisclosureHeader>
                    <DisclosurePanel>Drive impact by simplifying how your leaders and you manage team performance throughout the year.</DisclosurePanel>
                </Disclosure>
            </Accordion>
            <h1>Zoom</h1>
            <Accordion {...args} className="zoom-in">
                <Disclosure id="officevibe">
                    <DisclosureHeader>
                        <SparklesIcon />
                        <Inline columnGap="inline-sm" rowGap="core_0" alignY="baseline">
                            <Text>Workleap Officevibe</Text>
                            <Text color="neutral-weak" size="sm">Engagement and Feedback</Text>
                        </Inline>
                    </DisclosureHeader>
                    <DisclosurePanel>Help employees speak up and make sure they feel heard. Continuous and real-time surveys offer feedback to celebrate every win, recognize commitment, and uncover challenges.</DisclosurePanel>
                </Disclosure>
                <Disclosure id="pingboard">
                    <DisclosureHeader>
                        <SparklesIcon />
                        <Inline columnGap="inline-sm" rowGap="core_0" alignY="baseline">
                            <Text>Workleap Pingboard</Text>
                            <Text color="neutral-weak" size="sm">Org Chart</Text>
                        </Inline>
                    </DisclosureHeader>
                    <DisclosurePanel>Make teamwork work. Use your org chart to create lasting connections across your distributed and hybrid teams to make collaboration easier.</DisclosurePanel>
                </Disclosure>
                <Disclosure id="performance">
                    <DisclosureHeader>
                        <SparklesIcon />
                        <Inline columnGap="inline-sm" rowGap="core_0" alignY="baseline">
                            <Text>Workleap Performance</Text>
                            <Text color="neutral-weak" size="sm">Performance Management</Text>
                        </Inline>
                    </DisclosureHeader>
                    <DisclosurePanel>Drive impact by simplifying how your leaders and you manage team performance throughout the year.</DisclosurePanel>
                </Disclosure>
            </Accordion>
            <Accordion {...args} className="zoom-out">
                <Disclosure id="officevibe">
                    <DisclosureHeader>
                        <SparklesIcon />
                        <Inline columnGap="inline-sm" rowGap="core_0" alignY="baseline">
                            <Text>Workleap Officevibe</Text>
                            <Text color="neutral-weak" size="sm">Engagement and Feedback</Text>
                        </Inline>
                    </DisclosureHeader>
                    <DisclosurePanel>Help employees speak up and make sure they feel heard. Continuous and real-time surveys offer feedback to celebrate every win, recognize commitment, and uncover challenges.</DisclosurePanel>
                </Disclosure>
                <Disclosure id="pingboard">
                    <DisclosureHeader>
                        <SparklesIcon />
                        <Inline columnGap="inline-sm" rowGap="core_0" alignY="baseline">
                            <Text>Workleap Pingboard</Text>
                            <Text color="neutral-weak" size="sm">Org Chart</Text>
                        </Inline>
                    </DisclosureHeader>
                    <DisclosurePanel>Make teamwork work. Use your org chart to create lasting connections across your distributed and hybrid teams to make collaboration easier.</DisclosurePanel>
                </Disclosure>
                <Disclosure id="performance">
                    <DisclosureHeader>
                        <SparklesIcon />
                        <Inline columnGap="inline-sm" rowGap="core_0" alignY="baseline">
                            <Text>Workleap Performance</Text>
                            <Text color="neutral-weak" size="sm">Performance Management</Text>
                        </Inline>
                    </DisclosureHeader>
                    <DisclosurePanel>Drive impact by simplifying how your leaders and you manage team performance throughout the year.</DisclosurePanel>
                </Disclosure>
            </Accordion>
        </Stack>
    ),
    args: {
        defaultExpandedKeys: ["officevibe"]
    }
} satisfies Story;

export const InlineVariant = {
    ...Default,
    args: {
        defaultExpandedKeys: ["officevibe"],
        variant: "inline"
    }
} satisfies Story;

const StateTemplate = (args: Partial<AccordionProps>) => (
    <Accordion {...args}>
        <Disclosure id="officevibe">
            <DisclosureHeader>
                <SparklesIcon />
                <Inline columnGap="inline-sm" rowGap="core_0" alignY="baseline">
                    <Text>Workleap Officevibe</Text>
                    <Text color={args.isDisabled ? "neutral-disabled" : "neutral-weak"} size="sm">Engagement and Feedback</Text>
                </Inline>
            </DisclosureHeader>
            <DisclosurePanel>Help employees speak up and make sure they feel heard. Continuous and real-time surveys offer feedback to celebrate every win, recognize commitment, and uncover challenges.</DisclosurePanel>
        </Disclosure>
        <Disclosure id="pingboard">
            <DisclosureHeader>
                <SparklesIcon />
                <Inline columnGap="inline-sm" rowGap="core_0" alignY="baseline">
                    <Text>Workleap Pingboard</Text>
                    <Text color={args.isDisabled ? "neutral-disabled" : "neutral-weak"} size="sm">Org Chart</Text>
                </Inline>
            </DisclosureHeader>
            <DisclosurePanel>Make teamwork work. Use your org chart to create lasting connections across your distributed and hybrid teams to make collaboration easier.</DisclosurePanel>
        </Disclosure>
        <Disclosure id="performance">
            <DisclosureHeader>
                <SparklesIcon />
                <Inline columnGap="inline-sm" rowGap="core_0" alignY="baseline">
                    <Text>Workleap Performance</Text>
                    <Text color={args.isDisabled ? "neutral-disabled" : "neutral-weak"} size="sm">Performance Management</Text>
                </Inline>
            </DisclosureHeader>
            <DisclosurePanel>Drive impact by simplifying how your leaders and you manage team performance throughout the year.</DisclosurePanel>
        </Disclosure>
    </Accordion>
);

export const DefaultStates = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const triggers = canvas.getAllByRole("button");

        triggers.forEach(trigger => {
            if (trigger.getAttribute("disabled") !== "") {
                const accordionElem = trigger.closest(".hop-Accordion");

                if (accordionElem?.getAttribute("data-chromatic-force-focus")) {
                    trigger?.setAttribute("data-focus-visible", "true");
                    accordionElem?.removeAttribute("data-chromatic-force-focus");
                }

                if (accordionElem?.getAttribute("data-chromatic-force-press")) {
                    trigger?.setAttribute("data-pressed", "true");
                    accordionElem?.removeAttribute("data-chromatic-force-press");
                }

                if (accordionElem?.getAttribute("data-chromatic-force-hover")) {
                    trigger.setAttribute("data-hovered", "true");
                    accordionElem?.removeAttribute("data-chromatic-force-hover");
                }
            }
        });
    },
    render: args => (
        <Stack>
            <h1>Default</h1>
            <StateTemplate {...args} />
            <h1>Disabled</h1>
            <StateTemplate {...args} isDisabled />
            <h1>Focus Visible</h1>
            <StateTemplate {...args} data-chromatic-force-focus />
            <h1>Hovered</h1>
            <StateTemplate {...args} data-chromatic-force-hover />
            <h1>Pressed</h1>
            <StateTemplate {...args} data-chromatic-force-press />
            <h1>Focus Visible & Disabled</h1>
            <StateTemplate {...args} data-chromatic-force-focus isDisabled />
        </Stack>
    ),
    args: {
        defaultExpandedKeys: ["officevibe"]
    }
} satisfies Story;

export const InlineStates = {
    ...DefaultStates,
    args: {
        defaultExpandedKeys: ["officevibe"],
        variant: "inline"
    }
} satisfies Story;
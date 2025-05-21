import { SparklesIcon } from "@hopper-ui/icons";
import type { Meta, StoryObj } from "@storybook/react";
import { within } from "@storybook/test";

import { Button } from "../../../buttons/index.ts";
import { Inline, Stack } from "../../../layout/index.ts";
import { Text } from "../../../typography/Text/index.ts";
import { DisclosureHeader, DisclosurePanel } from "../../index.ts";
import { Disclosure, type DisclosureProps } from "../../src/Disclosure.tsx";

const meta = {
    title: "Components/Disclosure",
    component: Disclosure,
    args: {
        children: []
    }
} satisfies Meta<typeof Disclosure>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
    render: args => (
        <Stack>
            <h1>Default</h1>
            <Disclosure {...args}>
                <DisclosureHeader level={2}>
                    Disclosure Header
                </DisclosureHeader>
                <DisclosurePanel>
                Disclosure Panel
                </DisclosurePanel>
            </Disclosure>
            <h1>Description</h1>
            <Disclosure {...args}>
                <DisclosureHeader level={2}>
                    <Inline columnGap="inline-sm" rowGap="core_0" alignY="baseline">
                        <Text>Disclosure Header</Text>
                        <Text color="neutral-weak" size="sm">Disclosure Description</Text>
                    </Inline>
                </DisclosureHeader>
                <DisclosurePanel>
                Disclosure Panel
                </DisclosurePanel>
            </Disclosure>
            <h1>Icon</h1>
            <Disclosure {...args}>
                <DisclosureHeader level={2}>
                    <SparklesIcon />
                    <Text>Disclosure Header</Text>
                </DisclosureHeader>
                <DisclosurePanel>
                    Disclosure Panel
                </DisclosurePanel>
            </Disclosure>
            <h1>Long</h1>
            <Disclosure {...args}>
                <DisclosureHeader level={2}>
                    <SparklesIcon />
                    <Inline columnGap="inline-sm" rowGap="core_0" alignY="baseline">
                        <Text>Shipping, Delivery Times, and Easy Returns Policy Overview</Text>
                        <Text color="neutral-weak" size="sm">Explore our comprehensive shipping options, estimated delivery times for various regions, and our simple, customer-friendly returns process to make sure you feel comfortable with every purchase.</Text>
                    </Inline>
                </DisclosureHeader>
                <DisclosurePanel>
                    We offer free standard shipping on all orders over $50. Orders are typically processed within 1-2 business days, and delivery times vary based on your location. Expedited shipping options are available for an additional fee.
                    Returns are easy and hassle-free. You have 30 days from the date of delivery to return items for a full refund. Items must be in their original condition and packaging. For further assistance, please contact our support team.
                </DisclosurePanel>
            </Disclosure>
            <h1>Custom Header</h1>
            <Disclosure {...args}>
                <Button slot="trigger">Custom Header</Button>
                <DisclosurePanel>
                Disclosure Panel
                </DisclosurePanel>
            </Disclosure>
            <h1>Style</h1>
            <Disclosure {...args} border="decorative-option5" defaultExpanded>
                <DisclosureHeader level={2} buttonProps={{ backgroundColor: "decorative-option5", color: "decorative-option5" }}>
                    Disclosure Header
                </DisclosureHeader>
                <DisclosurePanel>
                Disclosure Panel
                </DisclosurePanel>
            </Disclosure>
            <h1>Zoom</h1>
            <Disclosure {...args} className="zoom-in">
                <DisclosureHeader level={2}>
                    <SparklesIcon />
                    <Inline columnGap="inline-sm" rowGap="core_0" alignY="baseline">
                        <Text>Shipping, Delivery Times, and Easy Returns Policy Overview</Text>
                        <Text color="neutral-weak" size="sm">Explore our comprehensive shipping options, estimated delivery times for various regions, and our simple, customer-friendly returns process to make sure you feel comfortable with every purchase.</Text>
                    </Inline>
                </DisclosureHeader>
                <DisclosurePanel>
                    We offer free standard shipping on all orders over $50. Orders are typically processed within 1-2 business days, and delivery times vary based on your location. Expedited shipping options are available for an additional fee.
                    Returns are easy and hassle-free. You have 30 days from the date of delivery to return items for a full refund. Items must be in their original condition and packaging. For further assistance, please contact our support team.
                </DisclosurePanel>
            </Disclosure>
            <Disclosure {...args} className="zoom-out">
                <DisclosureHeader level={2}>
                    <SparklesIcon />
                    <Inline columnGap="inline-sm" rowGap="core_0" alignY="baseline">
                        <Text>Shipping, Delivery Times, and Easy Returns Policy Overview</Text>
                        <Text color="neutral-weak" size="sm">Explore our comprehensive shipping options, estimated delivery times for various regions, and our simple, customer-friendly returns process to make sure you feel comfortable with every purchase.</Text>
                    </Inline>
                </DisclosureHeader>
                <DisclosurePanel>
                    We offer free standard shipping on all orders over $50. Orders are typically processed within 1-2 business days, and delivery times vary based on your location. Expedited shipping options are available for an additional fee.
                    Returns are easy and hassle-free. You have 30 days from the date of delivery to return items for a full refund. Items must be in their original condition and packaging. For further assistance, please contact our support team.
                </DisclosurePanel>
            </Disclosure>
        </Stack>
    ),
    args: {
        defaultExpanded: true
    }
} satisfies Story;

export const InlineVariant = {
    ...Default,
    args: {
        defaultExpanded: true,
        variant: "inline"
    }
} satisfies Story;

const StateTemplate = (args: Partial<DisclosureProps>) => (
    <Disclosure {...args}>
        <DisclosureHeader level={2}>
            <SparklesIcon />
            <Inline columnGap="inline-sm" rowGap="core_0" alignY="baseline">
                <Text>Shipping, Delivery Times, and Easy Returns Policy Overview</Text>
                <Text color={args.isDisabled ? "neutral-disabled" : "neutral-weak"} size="sm">Explore our comprehensive shipping options, estimated delivery times for various regions, and our simple, customer-friendly returns process to make sure you feel comfortable with every purchase.</Text>
            </Inline>
        </DisclosureHeader>
        <DisclosurePanel>
            We offer free standard shipping on all orders over $50. Orders are typically processed within 1-2 business days, and delivery times vary based on your location. Expedited shipping options are available for an additional fee.
            Returns are easy and hassle-free. You have 30 days from the date of delivery to return items for a full refund. Items must be in their original condition and packaging. For further assistance, please contact our support team.
        </DisclosurePanel>
    </Disclosure>
);

export const DefaultStates = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const triggers = canvas.getAllByRole("button");

        triggers.forEach(trigger => {
            if (trigger.getAttribute("disabled") !== "") {
                const disclosureElem = trigger.closest(".hop-Disclosure");

                if (disclosureElem?.getAttribute("data-chromatic-force-focus")) {
                    trigger?.setAttribute("data-focus-visible", "true");
                    disclosureElem?.removeAttribute("data-chromatic-force-focus");
                }

                if (disclosureElem?.getAttribute("data-chromatic-force-press")) {
                    trigger?.setAttribute("data-pressed", "true");
                    disclosureElem?.removeAttribute("data-chromatic-force-press");
                }

                if (disclosureElem?.getAttribute("data-chromatic-force-hover")) {
                    trigger.setAttribute("data-hovered", "true");
                    disclosureElem?.removeAttribute("data-chromatic-force-hover");
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
        defaultExpanded: true
    }
} satisfies Story;

export const InlineStates = {
    ...DefaultStates,
    args: {
        variant: "inline",
        defaultExpanded: true
    }
} satisfies Story;
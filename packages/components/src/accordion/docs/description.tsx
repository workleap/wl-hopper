import { Accordion, Disclosure, DisclosureHeader, DisclosurePanel, Div, Inline, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <Div width="100%" paddingX="core_320" paddingY="core_480">
            <Accordion>
                <Disclosure id="officevibe">
                    <DisclosureHeader>
                        <Inline columnGap="inline-sm" rowGap="core_0" alignY="baseline">
                            <Text>Workleap Officevibe</Text>
                            <Text color="neutral-weak" size="sm">Engagement survey and feedback</Text>
                        </Inline>
                    </DisclosureHeader>
                    <DisclosurePanel>Help employees speak up and make sure they feel heard. Continuous and real-time surveys offer feedback to celebrate every win, recognize commitment, and uncover challenges.</DisclosurePanel>
                </Disclosure>
                <Disclosure id="pingboard">
                    <DisclosureHeader>
                        <Inline columnGap="inline-sm" rowGap="core_0" alignY="baseline">
                            <Text>Workleap Pingboard</Text>
                            <Text color="neutral-weak" size="sm">Interactive org chart and directory</Text>
                        </Inline>
                    </DisclosureHeader>
                    <DisclosurePanel>Make teamwork work. Use your org chart to create lasting connections across your distributed and hybrid teams to make collaboration easier.</DisclosurePanel>
                </Disclosure>
                <Disclosure id="performance">
                    <DisclosureHeader>
                        <Inline columnGap="inline-sm" rowGap="core_0" alignY="baseline">
                            <Text>Workleap Performance</Text>
                            <Text color="neutral-weak" size="sm">Performance review management and tracking</Text>
                        </Inline>
                    </DisclosureHeader>
                    <DisclosurePanel>Drive impact by simplifying how your leaders and you manage team performance throughout the year.</DisclosurePanel>
                </Disclosure>
            </Accordion>
        </Div>
    );
}


import { Accordion, Disclosure, DisclosureHeader, DisclosurePanel, Div } from "@hopper-ui/components";

export default function Example() {
    return (
        <Div width="100%" paddingX="core_320" paddingY="core_480">
            <Accordion defaultExpandedKeys={["pingboard"]}>
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
        </Div>
    );
}

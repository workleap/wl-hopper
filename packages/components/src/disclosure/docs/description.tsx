import { Disclosure, DisclosureHeader, DisclosurePanel, Inline, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <Disclosure width="100%">
            <DisclosureHeader>
                <Inline columnGap="inline-sm" rowGap="core_0" alignY="baseline">
                    <Text>Workleap Officevibe</Text>
                    <Text color="neutral-weak" size="sm">Engagement and Feedback</Text>
                </Inline>
            </DisclosureHeader>
            <DisclosurePanel>
                Help employees speak up and make sure they feel heard.
                Continuous and real-time surveys offer feedback to celebrate every win, recognize commitment, and uncover challenges.
            </DisclosurePanel>
        </Disclosure>
    );
}

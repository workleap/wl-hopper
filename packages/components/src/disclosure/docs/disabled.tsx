import { Disclosure, DisclosureHeader, DisclosurePanel, Inline, Text } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <Disclosure width="100%" isDisabled>
            <DisclosureHeader>
                <SparklesIcon />
                <Inline columnGap="inline-sm" rowGap="core_0" alignY="baseline">
                    <Text>Workleap Officevibe</Text>
                    <Text color="neutral-disabled" size="sm">Engagement and Feedback</Text>
                </Inline>
            </DisclosureHeader>
            <DisclosurePanel>
                Help employees speak up and make sure they feel heard.
                Continuous and real-time surveys offer feedback to celebrate every win, recognize commitment, and uncover challenges.
            </DisclosurePanel>
        </Disclosure>
    );
}

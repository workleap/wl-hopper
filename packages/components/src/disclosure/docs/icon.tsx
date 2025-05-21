import { Disclosure, DisclosureHeader, DisclosurePanel, Text } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <Disclosure width="100%">
            <DisclosureHeader>
                <SparklesIcon />
                <Text>Help your people work better</Text>
            </DisclosureHeader>
            <DisclosurePanel>
                Tackle the challenges of hybrid, remote and distributed work, no matter what.
                The Workleap platform builds solutions tailored to your existing HR and productivity tools to answer these challenges.
            </DisclosurePanel>
        </Disclosure>
    );
}

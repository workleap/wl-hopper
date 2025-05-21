import { Disclosure, DisclosureHeader, DisclosurePanel, Stack } from "@hopper-ui/components";

export default function Example() {
    return (
        <Stack width="100%">
            <Disclosure variant="standalone">
                <DisclosureHeader>
                    Help your people work better
                </DisclosureHeader>
                <DisclosurePanel>
                    Tackle the challenges of hybrid, remote and distributed work, no matter what.
                    The Workleap platform builds solutions tailored to your existing HR and productivity tools to answer these challenges.
                </DisclosurePanel>
            </Disclosure>
            <Disclosure variant="inline">
                <DisclosureHeader>
                    Help your people work better
                </DisclosureHeader>
                <DisclosurePanel>
                    Tackle the challenges of hybrid, remote and distributed work, no matter what.
                    The Workleap platform builds solutions tailored to your existing HR and productivity tools to answer these challenges.
                </DisclosurePanel>
            </Disclosure>
        </Stack>
    );
}

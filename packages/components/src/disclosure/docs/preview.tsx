import { Disclosure, DisclosureHeader, DisclosurePanel } from "@hopper-ui/components";

export default function Example() {
    return (
        <Disclosure width="100%">
            <DisclosureHeader>
                Help your people work better
            </DisclosureHeader>
            <DisclosurePanel>
                Tackle the challenges of hybrid, remote and distributed work, no matter what.
                The Workleap platform builds solutions tailored to your existing HR and productivity tools to answer these challenges.
            </DisclosurePanel>
        </Disclosure>
    );
}

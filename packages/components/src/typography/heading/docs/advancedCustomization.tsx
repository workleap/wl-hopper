import { Heading, HeadingContext, SlotProvider } from "@hopper-ui/components";

export default function Example() {
    return (
        <SlotProvider values={[
            [HeadingContext, { size: "3xl" }]
        ]}
        >
            <Heading>Great work!</Heading>
        </SlotProvider>
    );
}

import { SlotProvider, Text, TextContext } from "@hopper-ui/components";

export default function Example() {
    return (
        <SlotProvider values={[
            [TextContext, { size: "xl" }]
        ]}
        >
            <Text>Software built for everyone to do their best work</Text>
        </SlotProvider>
    );
}

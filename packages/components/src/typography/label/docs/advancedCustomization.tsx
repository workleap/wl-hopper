import { Label, LabelContext, SlotProvider } from "@hopper-ui/components";

export default function Example() {
    return (
        <SlotProvider values={[
            [LabelContext, { color: "decorative-option2" }]
        ]}
        >
            <Label>Software built for everyone to do their best work</Label>
        </SlotProvider>
    );
}

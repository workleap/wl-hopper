import { SlotProvider, Spinner, SpinnerContext } from "@hopper-ui/components";

export default function Example() {
    return (
        <SlotProvider values={[
            [SpinnerContext, { color: "primary", size: "lg" }]
        ]}
        >
            <Spinner aria-label="Loading..." />
        </SlotProvider>
    );
}

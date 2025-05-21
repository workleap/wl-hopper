import { NumberField } from "@hopper-ui/components";

export default function Example() {
    return (
        <NumberField
            formatOptions={{
                style: "currency",
                currency: "USD"
            }}
            label="Training Budget Allocated"
        />
    );
}

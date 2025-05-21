import { ErrorMessage, SlotProvider } from "@hopper-ui/components";
import { FieldErrorContext } from "react-aria-components";

export default function Example() {
    return (
        <SlotProvider values={[
            [FieldErrorContext, {
                isInvalid: true,
                validationErrors: ["This field is required.", "This field is too long."],
                validationDetails: {} as never
            }]
        ]}
        >
            <ErrorMessage />
        </SlotProvider>
    );
}

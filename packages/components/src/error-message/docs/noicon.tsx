import { ErrorMessage, SlotProvider } from "@hopper-ui/components";
import { FieldErrorContext } from "react-aria-components";

export default function Example() {
    return (
        <SlotProvider values={[
            [FieldErrorContext, {
                isInvalid: true,
                validationErrors: [] as never[],
                validationDetails: {} as never
            }]
        ]}
        >
            <ErrorMessage hideIcon>This field is required</ErrorMessage>
        </SlotProvider>
    );
}


import { Div, useResponsiveValue } from "@hopper-ui/components";

export default function Example() {
    const isFluidValue = useResponsiveValue({ base: true, lg: false });

    return (
        <Div
            UNSAFE_width={isFluidValue ? "100%" : "30rem"}
            backgroundColor="core_moss-200"
            maxWidth="100%"
            padding="inset-md"
        >
            Content
        </Div>
    );
}

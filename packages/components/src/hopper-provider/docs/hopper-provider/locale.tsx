import { Div, HopperProvider } from "@hopper-ui/components";

export default function Example() {
    return (
        <HopperProvider colorScheme="light" locale="en-US">
            <Div>{/* Your app here */}</Div>
        </HopperProvider>
    );
}

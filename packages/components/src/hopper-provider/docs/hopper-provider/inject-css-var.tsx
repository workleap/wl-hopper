import { Div, HopperProvider } from "@hopper-ui/components";

export default function Example() {
    return (
        <HopperProvider colorScheme="light" withCssVariables={false}>
            <Div>{/* Your app here */}</Div>
        </HopperProvider>
    );
}

import { Div, HopperProvider } from "@hopper-ui/components";

export default function Example() {
    return (
        <HopperProvider colorScheme="light" withBodyStyle>
            <Div>{/* Your app here */}</Div>
        </HopperProvider>
    );
}

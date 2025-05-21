import { HopperProvider } from "@hopper-ui/components";

export default function Example() {
    return (
        <HopperProvider colorScheme="light" withBodyStyle>
            <div>{/* Your app here */}</div>
        </HopperProvider>
    );
}

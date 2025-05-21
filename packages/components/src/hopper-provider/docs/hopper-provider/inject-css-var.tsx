import { HopperProvider } from "@hopper-ui/components";

export default function Example() {
    return (
        <HopperProvider colorScheme="light" withCssVariables={false}>
            <div>{/* Your app here */}</div>
        </HopperProvider>
    );
}

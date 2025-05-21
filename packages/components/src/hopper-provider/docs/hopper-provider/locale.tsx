import { HopperProvider } from "@hopper-ui/components";

export default function Example() {
    return (
        <HopperProvider colorScheme="light" locale="en-US">
            <div>{/* Your app here */}</div>
        </HopperProvider>
    );
}

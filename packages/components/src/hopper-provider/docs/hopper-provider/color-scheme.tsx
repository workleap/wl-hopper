import { Button, HopperProvider } from "@hopper-ui/components";

export default function Example() {
    return (
        <HopperProvider colorScheme="light">
            <Button>I'm a light button</Button>
        </HopperProvider>
    );
}

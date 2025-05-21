import { Button, HopperProvider } from "@hopper-ui/components";

export default function Example() {
    return (
        <HopperProvider colorScheme="light">
            <Button variant="secondary" margin="inline-md">
                I'm a light button
            </Button>
            <HopperProvider colorScheme="dark">
                <Button variant="secondary" margin="inline-md">
                    I'm a dark button
                </Button>
            </HopperProvider>
        </HopperProvider>
    );
}

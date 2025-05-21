import { Button, HopperProvider } from "@hopper-ui/components";

export default function Example() {
    return (
        <HopperProvider colorScheme="system" defaultColorScheme="light">
            <Button variant="secondary">Button</Button>
        </HopperProvider>
    );
}

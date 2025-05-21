import { Button, HopperProvider } from "@hopper-ui/components";

export default function Example() {
    return (
        <HopperProvider colorScheme="light" withBodyStyle>
            <Button variant="primary">
                Hello!
            </Button>
        </HopperProvider>
    );
}

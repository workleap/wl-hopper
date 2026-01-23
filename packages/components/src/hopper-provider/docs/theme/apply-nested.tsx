import { Button, HopperProvider } from "@hopper-ui/components";

export default function Example() {
    return (
        <HopperProvider theme="workleap">
            <Button variant="secondary" margin="inline-md">
                I'm a workleap button
            </Button>
            <HopperProvider theme="sharegate">
                <Button variant="secondary" margin="inline-md">
                    I'm a sharegate button
                </Button>
            </HopperProvider>
        </HopperProvider>
    );
}

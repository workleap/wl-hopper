import { Button, useDebounceCallback } from "@hopper-ui/components";

export default function Example() {
    const handlePress = useDebounceCallback(
        () => {
            // eslint-disable-next-line no-console
            console.log("Button clicked!");
            // Expensive operation here
        },
        400,
        // Leading edge - executes immediately on first click
        true
    );

    return <Button onPress={handlePress}>Click me</Button>;
}

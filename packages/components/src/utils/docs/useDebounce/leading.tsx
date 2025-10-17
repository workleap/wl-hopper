import { Button, useDebounceCallback } from "@hopper-ui/components";

export default function Example() {
    const handlePress = useDebounceCallback(() => {
            console.log("Button clicked!");
            // Expensive operation here
        },
        400,
        true   // Leading edge - executes immediately on first click
    );

    return <Button onPress={handlePress}>Click me</Button>;
}

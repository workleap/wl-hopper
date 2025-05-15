import { Button } from "@hopper-ui/components";
import { useState } from "react";

export default function Example() {
    const [isLoading, setIsLoading] = useState(false);

    const handlePress = () => {
    // Trigger button pending state
        setIsLoading(true);

        setTimeout(() => {
            // Cancel button pending state
            setIsLoading(false);
        }, 3000);
    };

    return (
        <Button isLoading={isLoading} onPress={handlePress}>
            Click me!
        </Button>
    );
}

import { ToggleButton } from "@hopper-ui/components";
import { useCallback, useState } from "react";

export default function Example() {
    const [isLoading, setIsLoading] = useState(false);

    const handlePress = useCallback(() => {
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, [setIsLoading]);

    return (
        <ToggleButton isLoading={isLoading} onPress={handlePress}>
            Click me!
        </ToggleButton>
    );
}

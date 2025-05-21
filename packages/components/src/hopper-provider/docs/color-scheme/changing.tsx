import {
    Button,
    Div,
    HopperProvider,
    useColorSchemeContext
} from "@hopper-ui/components";
import { useCallback } from "react";

function ColorSchemeToggle() {
    const { colorScheme, setColorScheme } = useColorSchemeContext();

    const handleClick = useCallback(() => {
        setColorScheme(colorScheme === "light" ? "dark" : "light");
    }, [colorScheme, setColorScheme]);

    return (
        <Button variant="secondary" onPress={handleClick}>
            Toggle Color Scheme
        </Button>
    );
}

export default function Example() {
    const { colorScheme: parentColorScheme } = useColorSchemeContext();

    return (
        <HopperProvider colorScheme={parentColorScheme}>
            <Div backgroundColor="neutral" padding="inset-lg" borderRadius="core_2">
                <ColorSchemeToggle />
            </Div>
        </HopperProvider>
    );
}

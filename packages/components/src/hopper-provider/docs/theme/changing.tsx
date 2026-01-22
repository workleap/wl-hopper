import {
    Button,
    Div,
    HopperProvider,
    useThemeContext
} from "@hopper-ui/components";
import { useCallback } from "react";

function ColorSchemeToggle() {
    const { theme, setTheme } = useThemeContext();

    const handleClick = useCallback(() => {
        setTheme(theme === "workleap" ? "sharegate" : "workleap");
    }, [theme, setTheme]);
    return (
        <Button variant="secondary" onPress={handleClick}>
            Toggle Theme
        </Button>
    );
}

export default function Example() {
    const { theme: parentTheme } = useThemeContext();

    return (
        <HopperProvider theme={parentTheme}>
            <Div backgroundColor="neutral" padding="inset-lg" borderRadius="core_2">
                <ColorSchemeToggle />
            </Div>
        </HopperProvider>
    );
}

"use client";

import { createContext, useEffect, useState, type ReactNode } from "react";
import { getInitialColorMode } from "./getInitialColorMode";

interface ColorSchemeContextType {
    colorMode: ColorScheme | undefined;
    setColorMode: (newColorScheme: ColorScheme) => void;
}

interface ThemeProviderProps {
    children: ReactNode;
}

export type ColorScheme = "light" | "dark";

export const ThemeContext = createContext<ColorSchemeContextType>({
    colorMode: "light",

    setColorMode: () => {}
});

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [colorMode, setColorMode] = useState<ColorScheme | undefined>(
        undefined
    );

    useEffect(() => {
        if (colorMode) {
            document.documentElement.setAttribute("data-theme", colorMode);
            window.localStorage.setItem("hdTheme", colorMode);
        }
    }, [colorMode]);

    useEffect(() => {
        setColorMode(getInitialColorMode());
    }, [setColorMode]);

    return (
        <ThemeContext.Provider value={{
            colorMode: colorMode ?? "light",
            setColorMode
        }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

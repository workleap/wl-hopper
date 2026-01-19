"use client";

import type { ColorScheme, Theme } from "@hopper-ui/styled-system";
import { createContext, useEffect, useState, type ReactNode } from "react";
import { getInitialColorScheme } from "./getInitialColorScheme.ts";

interface ThemeContextType {
    theme: Theme | undefined;
    colorScheme: ColorScheme | undefined;
    setColorScheme: (newColorScheme: ColorScheme) => void;
    setTheme: (newTheme: Theme) => void;
}

export { ColorScheme, Theme };
interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeContext = createContext<ThemeContextType>({
    colorScheme: "light",
    theme: "workleap",
    setColorScheme: () => {},
    setTheme: () => {}
});

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [colorScheme, setColorScheme] = useState<ColorScheme | undefined>(
        undefined
    );

    const [theme, setTheme] = useState<Theme | undefined>(
        undefined
    );

    useEffect(() => {
        if (colorScheme) {
            document.documentElement.setAttribute("data-color-scheme", colorScheme);
            window.localStorage.setItem("hdColorScheme", colorScheme);
        }
    }, [colorScheme]);

    useEffect(() => {
        if (theme) {
            document.documentElement.setAttribute("data-theme", theme);
            window.localStorage.setItem("hdTheme", theme);
        }
    }, [theme]);

    useEffect(() => {
        setColorScheme(getInitialColorScheme());
    }, [setColorScheme]);

    return (
        <ThemeContext.Provider value={{
            theme: theme ?? "workleap",
            setTheme,
            colorScheme: colorScheme ?? "light",
            setColorScheme
        }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

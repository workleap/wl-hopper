"use client";

import Card from "@/app/ui/components/card/Card";
import ColorSchemeSwitch from "@/components/themeSwitch/ColorSchemeSwitch";
import { ThemeContext, type ColorScheme } from "@/context/theme/ThemeProvider.tsx";
import { memo, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

import ThemeSwitch from "@/components/themeSwitch/ThemeSwitch";
import { HopperProvider } from "@hopper-ui/components";
import "./componentPreviewWrapper.css";

interface ComponentPreviewWrapperProps {
    openInStackblitzButton?: ReactNode;
    preview?: ReactNode;
    toggleButton?: ReactNode;
    minHeight?: string;
}

const ComponentPreviewWrapper = memo(({ openInStackblitzButton, preview, toggleButton, minHeight = "13rem" }: ComponentPreviewWrapperProps) => {
    const { colorScheme = "light", theme = "workleap" } = useContext(ThemeContext);
    const [localColorScheme, setLocalColorScheme] = useState(colorScheme);
    const [localTheme, setLocalTheme] = useState(theme);

    useEffect(() => {
        // keep the local color mode in sync with the global color mode when the global changes
        setLocalColorScheme(colorScheme);
        setLocalTheme(theme);
    }, [colorScheme, theme]);

    const toggleColorScheme = useCallback(() => {
        const cs: ColorScheme = localColorScheme === "dark"
            ? "light"
            : "dark";

        setLocalColorScheme(cs);
    }, [localColorScheme]);

    return (
        <div
            className="hd-component-preview-wrapper"
            data-schema={localColorScheme}
            style={{ minHeight: minHeight }}
        >
            <div className="hd-component-preview-wrapper__actions">
                {openInStackblitzButton}
                {toggleButton}
                <ColorSchemeSwitch
                    className="hd-component-preview-wrapper__action"
                    onChange={toggleColorScheme}
                    colorScheme={localColorScheme}
                />
                <ThemeSwitch
                    onThemeChange={theme => {
                        setLocalTheme(theme);
                    }}
                    theme={localTheme}
                />
            </div>
            <HopperProvider theme={localTheme} colorScheme={localColorScheme} locale="en-US">
                <Card className="hd-component-preview-wrapper__card" size="sm" style={{ minHeight: minHeight }}>
                    {preview}
                </Card>
            </HopperProvider>
        </div>
    );
});

ComponentPreviewWrapper.displayName = "ComponentPreviewWrapper";

export default ComponentPreviewWrapper;

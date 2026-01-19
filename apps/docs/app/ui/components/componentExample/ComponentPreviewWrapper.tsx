"use client";

import Card from "@/app/ui/components/card/Card";
import ThemeSwitch from "@/components/themeSwitch/ThemeSwitch.tsx";
import { ThemeContext, type ColorScheme } from "@/context/theme/ThemeProvider.tsx";
import { memo, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

import { HopperProvider } from "@hopper-ui/components";
import "./componentPreviewWrapper.css";

interface ComponentPreviewWrapperProps {
    openInStackblitzButton?: ReactNode;
    preview?: ReactNode;
    toggleButton?: ReactNode;
    minHeight?: string;
}

const ComponentPreviewWrapper = memo(({ openInStackblitzButton, preview, toggleButton, minHeight = "13rem" }: ComponentPreviewWrapperProps) => {
    const { colorScheme = "light" } = useContext(ThemeContext);
    const [localColorScheme, setLocalColorScheme] = useState(colorScheme);

    useEffect(() => {
        // keep the local color mode in sync with the global color mode when the global changes
        setLocalColorScheme(colorScheme);
    }, [colorScheme]);

    const toggleTheme = useCallback(() => {
        const theme: ColorScheme = localColorScheme === "dark"
            ? "light"
            : "dark";

        setLocalColorScheme(theme);
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
                <ThemeSwitch
                    className="hd-component-preview-wrapper__action"
                    onChange={toggleTheme}
                    colorScheme={localColorScheme}
                />
            </div>
            <HopperProvider colorScheme={localColorScheme} locale="en-US">
                <Card className="hd-component-preview-wrapper__card" size="sm" style={{ minHeight: minHeight }}>
                    {preview}
                </Card>
            </HopperProvider>
        </div>
    );
});

ComponentPreviewWrapper.displayName = "ComponentPreviewWrapper";

export default ComponentPreviewWrapper;

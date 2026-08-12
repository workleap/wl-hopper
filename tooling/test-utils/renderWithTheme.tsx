import { type ColorScheme, HopperProvider } from "@hopper-ui/components";
import { type RenderHookOptions, type RenderOptions, render, renderHook } from "@testing-library/react";
import type { ReactElement } from "react";

export interface HopperProviderWrapperOptions {
    colorScheme?: ColorScheme;
    locale?: string;
}

function createHopperProviderWrapper({
    colorScheme = "light",
    locale = "en-US"
}: HopperProviderWrapperOptions = {}): RenderOptions["wrapper"] {
    return ({ children }) => {
        return (
            <HopperProvider colorScheme={colorScheme} locale={locale}>
                {children}
            </HopperProvider>
        );
    };
}

function renderWithTheme(
    ui: ReactElement,
    testingLibraryOptions: RenderOptions = {},
    themeOptions?: HopperProviderWrapperOptions
): ReturnType<typeof render> {
    return render(ui, {
        wrapper: createHopperProviderWrapper(themeOptions),
        ...testingLibraryOptions
    });
}

function renderHookWithTheme<TProps, TResult>(
    callback: (props: TProps) => TResult,
    renderHookOptions: RenderHookOptions<TProps> = {},
    themeOptions?: HopperProviderWrapperOptions
): ReturnType<typeof renderHook<TResult, TProps>> {
    return renderHook(callback, {
        wrapper: createHopperProviderWrapper(themeOptions),
        ...renderHookOptions
    });
}

export { act, fireEvent, screen, waitFor } from "@testing-library/react";
export { renderWithTheme as render, renderHookWithTheme as renderHook };

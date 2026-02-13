import { useColorSchemeContext, useThemeContext } from "@hopper-ui/styled-system";
import { act, render, renderHook, screen } from "@hopper-ui/test-utils";
import { type ReactNode, createRef, useState } from "react";
import { useLocale } from "react-aria-components";

import { HopperProvider } from "../../src/index.ts";

describe("HopperProvider", () => {
    it("should render with default class", () => {
        render(
            <HopperProvider colorScheme="light">
                Test
            </HopperProvider>
        );

        const element = screen.getByText("Test");
        expect(element).toHaveClass("hop-HopperProvider");
    });

    it("should support custom class", () => {
        render(
            <HopperProvider colorScheme="light" className="test">
                Test
            </HopperProvider>
        );

        const element = screen.getByText("Test");
        expect(element).toHaveClass("hop-HopperProvider");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(
            <HopperProvider colorScheme="light" marginTop="stack-sm" style={{ marginBottom: "13px" }}>
                Test
            </HopperProvider>
        );

        const element = screen.getByText("Test");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(
            <HopperProvider colorScheme="light" data-foo="bar">
                Test
            </HopperProvider>
        );

        const element = screen.getByText("Test");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLDivElement>();
        render(
            <HopperProvider ref={ref} colorScheme="light" data-foo="bar">
                Test
            </HopperProvider>
        );

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLDivElement).toBeTruthy();
    });

    it("should support locale", () => {
        const { result } = renderHook(() => useLocale(), {
            wrapper: ({ children }) => (
                <HopperProvider colorScheme="light" locale="fr-CA">
                    {children}
                </HopperProvider>
            )
        });

        expect(result.current.locale).toBe("fr-CA");
    });
});

describe("Theme", () => {
    it("should default to 'workleap' when no theme or defaultTheme is provided", () => {
        const { result } = renderHook(() => useThemeContext(), {
            wrapper: ({ children }) => (
                <HopperProvider>{children}</HopperProvider>
            )
        });

        expect(result.current.theme).toBe("workleap");
    });

    it("should use the theme prop when provided", () => {
        const { result } = renderHook(() => useThemeContext(), {
            wrapper: ({ children }) => (
                <HopperProvider theme="sharegate">{children}</HopperProvider>
            )
        });

        expect(result.current.theme).toBe("sharegate");
    });

    it("should use the defaultTheme prop when theme is not provided", () => {
        const { result } = renderHook(() => useThemeContext(), {
            wrapper: ({ children }) => (
                <HopperProvider defaultTheme="sharegate">{children}</HopperProvider>
            )
        });

        expect(result.current.theme).toBe("sharegate");
    });

    it("should allow setTheme to override the theme prop", () => {
        const { result } = renderHook(() => useThemeContext(), {
            wrapper: ({ children }) => (
                <HopperProvider theme="workleap">{children}</HopperProvider>
            )
        });

        expect(result.current.theme).toBe("workleap");

        act(() => {
            result.current.setTheme("sharegate");
        });

        expect(result.current.theme).toBe("sharegate");
    });

    it("should allow setTheme to override the defaultTheme prop", () => {
        const { result } = renderHook(() => useThemeContext(), {
            wrapper: ({ children }) => (
                <HopperProvider defaultTheme="workleap">{children}</HopperProvider>
            )
        });

        expect(result.current.theme).toBe("workleap");

        act(() => {
            result.current.setTheme("sharegate");
        });

        expect(result.current.theme).toBe("sharegate");
    });

    it("should keep the setTheme value even when the parent re-renders", () => {
        function Wrapper({ children }: { children: ReactNode }) {
            const [, setCount] = useState(0);

            return (
                <HopperProvider theme="workleap">
                    {children}
                    <button type="button" onClick={() => setCount(c => c + 1)}>Re-render</button>
                </HopperProvider>
            );
        }

        const { result } = renderHook(() => useThemeContext(), {
            wrapper: Wrapper
        });

        act(() => {
            result.current.setTheme("sharegate");
        });

        expect(result.current.theme).toBe("sharegate");

        // Trigger a parent re-render
        act(() => {
            screen.getByRole("button", { name: /re-render/i }).click();
        });

        // setTheme value should persist
        expect(result.current.theme).toBe("sharegate");
    });

    it("should prefer theme prop over defaultTheme", () => {
        const { result } = renderHook(() => useThemeContext(), {
            wrapper: ({ children }) => (
                <HopperProvider theme="sharegate" defaultTheme="workleap">{children}</HopperProvider>
            )
        });

        expect(result.current.theme).toBe("sharegate");
    });
});

describe("ColorScheme", () => {
    it("should allow setColorScheme to override the colorScheme prop", () => {
        const { result } = renderHook(() => useColorSchemeContext(), {
            wrapper: ({ children }) => (
                <HopperProvider colorScheme="light">{children}</HopperProvider>
            )
        });

        expect(result.current.colorScheme).toBe("light");

        act(() => {
            result.current.setColorScheme("dark");
        });

        expect(result.current.colorScheme).toBe("dark");
    });

    it("should keep the setColorScheme value even when the parent re-renders", () => {
        function Wrapper({ children }: { children: ReactNode }) {
            const [, setCount] = useState(0);

            return (
                <HopperProvider colorScheme="light">
                    {children}
                    <button type="button" onClick={() => setCount(c => c + 1)}>Re-render</button>
                </HopperProvider>
            );
        }

        const { result } = renderHook(() => useColorSchemeContext(), {
            wrapper: Wrapper
        });

        act(() => {
            result.current.setColorScheme("dark");
        });

        expect(result.current.colorScheme).toBe("dark");

        // Trigger a parent re-render
        act(() => {
            screen.getByRole("button", { name: /re-render/i }).click();
        });

        // setColorScheme value should persist
        expect(result.current.colorScheme).toBe("dark");
    });
});

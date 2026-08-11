import { render, renderHook, screen } from "@hopper-ui/test-utils";
import { createRef } from "react";
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

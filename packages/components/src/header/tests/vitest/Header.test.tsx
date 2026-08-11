import { render, screen } from "@hopper-ui/test-utils";
import { createRef } from "react";

import { Header } from "../../src/Header.tsx";
import { HeaderContext } from "../../src/HeaderContext.ts";

describe("Header", () => {
    it("should render with default class", () => {
        render(<Header data-testid="header">Test</Header>);

        const element = screen.getByTestId("header");
        expect(element).toHaveClass("hop-Header");
    });

    it("should support custom class", () => {
        render(<Header data-testid="header" className="test">Test</Header>);

        const element = screen.getByTestId("header");
        expect(element).toHaveClass("hop-Header");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<Header data-testid="header" marginTop="stack-sm" style={{ marginBottom: "13px" }} >Test</Header>);

        const element = screen.getByTestId("header");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<Header data-testid="header" data-foo="bar">Test</Header>);

        const element = screen.getByTestId("header");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <HeaderContext.Provider value={{ slots: { test: { "aria-label": "test" } } }}>
                <Header data-testid="header" slot="test">Test</Header>
            </HeaderContext.Provider>
        );

        const element = screen.getByTestId("header");
        expect(element).toHaveAttribute("slot", "test");
        expect(element).toHaveAttribute("aria-label", "test");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLElement>();
        render(<Header data-testid="header" ref={ref}>Test</Header>);

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLElement).toBeTruthy();
    });
});

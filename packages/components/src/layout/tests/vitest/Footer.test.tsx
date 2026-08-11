import { render, screen } from "@hopper-ui/test-utils";
import { createRef } from "react";

import { Footer } from "../../src/Footer.tsx";
import { FooterContext } from "../../src/FooterContext.ts";

describe("Footer", () => {
    it("should render with default class", () => {
        render(<Footer>Test</Footer>);

        const element = screen.getByText("Test");
        expect(element).toHaveClass("hop-Footer");
    });

    it("should support custom class", () => {
        render(<Footer className="test">Test</Footer>);

        const element = screen.getByText("Test");
        expect(element).toHaveClass("hop-Footer");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<Footer marginTop="stack-sm" style={{ marginBottom: "13px" }}>Test</Footer>);

        const element = screen.getByText("Test");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<Footer data-foo="bar">Test</Footer>);

        const element = screen.getByText("Test");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <FooterContext.Provider value={{ slots: { test: { "aria-label": "test" } } }}>
                <Footer slot="test">Test</Footer>
            </FooterContext.Provider>
        );

        const element = screen.getByText("Test");
        expect(element).toHaveAttribute("slot", "test");
        expect(element).toHaveAttribute("aria-label", "test");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLElement>();
        render(<Footer ref={ref}>Test</Footer>);

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLElement).toBeTruthy();
    });
});

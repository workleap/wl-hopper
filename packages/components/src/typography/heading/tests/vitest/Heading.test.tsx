import { render, screen } from "@hopper-ui/test-utils";
import { createRef } from "react";

import { HeadingContext, Heading } from "../../src/index.ts";

describe("Heading", () => {
    it("should render with default class", () => {
        render(<Heading>Test</Heading>);

        const element = screen.getByText("Test");
        expect(element).toHaveClass("hop-Heading");
    });

    it("should support custom class", () => {
        render(<Heading className="test">Test</Heading>);

        const element = screen.getByText("Test");
        expect(element).toHaveClass("hop-Heading");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<Heading marginTop="stack-sm" style={{ marginBottom: "13px" }}>Test</Heading>);

        const element = screen.getByText("Test");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<Heading data-foo="bar">Test</Heading>);

        const element = screen.getByText("Test");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <HeadingContext.Provider value={{ slots: { test: { "aria-label": "test" } } }}>
                <Heading slot="test">Test</Heading>
            </HeadingContext.Provider>
        );

        const element = screen.getByText("Test");
        expect(element).toHaveAttribute("slot", "test");
        expect(element).toHaveAttribute("aria-label", "test");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLHeadingElement>();
        render(<Heading ref={ref}>Test</Heading>);

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLHeadingElement).toBeTruthy();
    });

    it("should support level", () => {
        render(<Heading level={1}>Test</Heading>);

        const element = screen.getByText("Test");
        expect(element.tagName).toBe("H1");
    });
});

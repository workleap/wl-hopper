import { render, screen } from "@hopper-ui/test-utils";
import { createRef } from "react";

import { Illustration } from "../../src/Illustration.tsx";
import { IllustrationContext } from "../../src/IllustrationContext.ts";

describe("Illustration", () => {
    it("should render with default class", () => {
        render(<Illustration data-testid="illustration">Test</Illustration>);

        const element = screen.getByTestId("illustration");
        expect(element).toHaveClass("hop-Illustration");
    });

    it("should support custom class", () => {
        render(<Illustration data-testid="illustration" className="test">Test</Illustration>);

        const element = screen.getByTestId("illustration");
        expect(element).toHaveClass("hop-Illustration");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<Illustration data-testid="illustration" marginTop="stack-sm" style={{ marginBottom: "13px" }}>Test</Illustration>);

        const element = screen.getByTestId("illustration");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<Illustration data-testid="illustration" data-foo="bar">Test</Illustration>);

        const element = screen.getByTestId("illustration");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <IllustrationContext.Provider value={{ slots: { test: { "aria-label": "test" } } }}>
                <Illustration data-testid="illustration" slot="test">Test</Illustration>
            </IllustrationContext.Provider>
        );

        const element = screen.getByTestId("illustration");
        expect(element).toHaveAttribute("slot", "test");
        expect(element).toHaveAttribute("aria-label", "test");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLDivElement>();
        render(<Illustration data-testid="illustration" ref={ref}>Test</Illustration>);

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLDivElement).toBeTruthy();
    });
});

import { render, screen } from "@hopper-ui/test-utils";
import { createRef } from "react";

import { OverlineText } from "../../src/OverlineText.tsx";
import { OverlineTextContext } from "../../src/OverlineTextContext.ts";

describe("OverlineText", () => {
    it("should render with default class", () => {
        render(<OverlineText data-testid="overline-text">Test</OverlineText>);

        const element = screen.getByTestId("overline-text");
        expect(element).toHaveClass("hop-OverlineText");
    });

    it("should support custom class", () => {
        render(<OverlineText data-testid="overline-text" className="test">Test</OverlineText>);

        const element = screen.getByTestId("overline-text");
        expect(element).toHaveClass("hop-OverlineText");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<OverlineText data-testid="overline-text" marginTop="stack-sm" style={{ marginBottom: "13px" }} >Test</OverlineText>);

        const element = screen.getByTestId("overline-text");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<OverlineText data-testid="overline-text" data-foo="bar">Test</OverlineText>);

        const element = screen.getByTestId("overline-text");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <OverlineTextContext.Provider value={{ slots: { test: { "aria-label": "test" } } }}>
                <OverlineText data-testid="overline-text" slot="test">Test</OverlineText>
            </OverlineTextContext.Provider>
        );

        const element = screen.getByTestId("overline-text");
        expect(element).toHaveAttribute("slot", "test");
        expect(element).toHaveAttribute("aria-label", "test");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLSpanElement>();
        render(<OverlineText data-testid="overline-text" ref={ref}>Test</OverlineText>);

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLSpanElement).toBeTruthy();
    });
});

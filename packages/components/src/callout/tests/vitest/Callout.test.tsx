import { render, screen } from "@hopper-ui/test-utils";
import { createRef } from "react";

import { Callout } from "../../src/Callout.tsx";
import { CalloutContext } from "../../src/CalloutContext.ts";

describe("Callout", () => {
    it("should render with default class", () => {
        render(<Callout data-testid="Callout">12</Callout>);

        const element = screen.getByTestId("Callout");
        expect(element).toHaveClass("hop-Callout");
    });

    it("should support custom class", () => {
        render(<Callout data-testid="Callout" className="test">12</Callout>);

        const element = screen.getByTestId("Callout");
        expect(element).toHaveClass("hop-Callout");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<Callout data-testid="Callout" marginTop="stack-sm" style={{ marginBottom: "13px" }} >12</Callout>);

        const element = screen.getByTestId("Callout");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<Callout data-testid="Callout" data-foo="bar">12</Callout>);

        const element = screen.getByTestId("Callout");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <CalloutContext.Provider value={{ slots: { test: { "aria-label": "test" } } }}>
                <Callout data-testid="Callout" slot="test">12</Callout>
            </CalloutContext.Provider>
        );

        const element = screen.getByTestId("Callout");
        expect(element).toHaveAttribute("slot", "test");
        expect(element).toHaveAttribute("aria-label", "test");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLDivElement>();
        render(<Callout data-testid="Callout" ref={ref}>12</Callout>);

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLDivElement).toBeTruthy();
    });
});

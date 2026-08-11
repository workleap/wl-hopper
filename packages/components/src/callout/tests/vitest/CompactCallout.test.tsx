import { render, screen } from "@hopper-ui/test-utils";
import { createRef } from "react";

import { CompactCallout } from "../../src/CompactCallout.tsx";
import { CompactCalloutContext } from "../../src/CompactCalloutContext.ts";

describe("CompactCallout", () => {
    it("should render with default class", () => {
        render(<CompactCallout data-testid="CompactCallout">12</CompactCallout>);

        const element = screen.getByTestId("CompactCallout");
        expect(element).toHaveClass("hop-CompactCallout");
    });

    it("should support custom class", () => {
        render(<CompactCallout data-testid="CompactCallout" className="test">12</CompactCallout>);

        const element = screen.getByTestId("CompactCallout");
        expect(element).toHaveClass("hop-CompactCallout");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<CompactCallout data-testid="CompactCallout" marginTop="stack-sm" style={{ marginBottom: "13px" }} >12</CompactCallout>);

        const element = screen.getByTestId("CompactCallout");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<CompactCallout data-testid="CompactCallout" data-foo="bar">12</CompactCallout>);

        const element = screen.getByTestId("CompactCallout");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <CompactCalloutContext.Provider value={{ slots: { test: { "aria-label": "test" } } }}>
                <CompactCallout data-testid="CompactCallout" slot="test">12</CompactCallout>
            </CompactCalloutContext.Provider>
        );

        const element = screen.getByTestId("CompactCallout");
        expect(element).toHaveAttribute("slot", "test");
        expect(element).toHaveAttribute("aria-label", "test");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLDivElement>();
        render(<CompactCallout data-testid="CompactCallout" ref={ref}>12</CompactCallout>);

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLDivElement).toBeTruthy();
    });
});

import { render, screen } from "@hopper-ui/test-utils";
import { createRef } from "react";

import { Label } from "../../src/Label.tsx";
import { LabelContext } from "../../src/LabelContext.ts";

describe("Label", () => {
    it("should render with default class", () => {
        render(<Label>Test</Label>);

        const element = screen.getByText("Test");
        expect(element).toHaveClass("hop-Label");
    });

    it("should render with custom class", () => {
        render(<Label className="test">Test</Label>);

        const element = screen.getByText("Test");
        expect(element).toHaveClass("hop-Label");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<Label marginTop="stack-sm" style={{ marginBottom: "13px" }} >Test</Label>);

        const element = screen.getByText("Test");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<Label data-foo="bar">Test</Label>);

        const element = screen.getByText("Test");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <LabelContext.Provider value={{ slots: { test: { "aria-label": "test" } } }}>
                <Label slot="test">Test</Label>
            </LabelContext.Provider>
        );

        const element = screen.getByText("Test");
        expect(element).toHaveAttribute("slot", "test");
        expect(element).toHaveAttribute("aria-label", "test");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLLabelElement>();
        render(<Label ref={ref}>Test</Label>);

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLLabelElement).toBeTruthy();
    });
});

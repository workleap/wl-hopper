import { render, screen } from "@hopper-ui/test-utils";
import { createRef } from "react";

import { ContextualHelp } from "../../src/ContextualHelp.tsx";
import { ContextualHelpContext } from "../../src/ContextualHelpContext.ts";

describe("ContextualHelp", () => {
    it("should render with default class", () => {
        render(<ContextualHelp data-testid="ContextualHelp">12</ContextualHelp>);

        const element = screen.getByTestId("ContextualHelp");
        expect(element).toHaveClass("hop-ContextualHelp");
    });

    it("should support custom class", () => {
        render(<ContextualHelp data-testid="ContextualHelp" className="test">12</ContextualHelp>);

        const element = screen.getByTestId("ContextualHelp");
        expect(element).toHaveClass("hop-ContextualHelp");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<ContextualHelp data-testid="ContextualHelp" marginTop="stack-sm" style={{ marginBottom: "13px" }}>12</ContextualHelp>);

        const element = screen.getByTestId("ContextualHelp");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<ContextualHelp data-testid="ContextualHelp" data-foo="bar">12</ContextualHelp>);

        const element = screen.getByTestId("ContextualHelp");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <ContextualHelpContext.Provider value={{ slots: { test: { "aria-label": "test" } } }}>
                <ContextualHelp data-testid="ContextualHelp" slot="test">12</ContextualHelp>
            </ContextualHelpContext.Provider>
        );

        const element = screen.getByTestId("ContextualHelp");
        expect(element).toHaveAttribute("slot", "test");
        expect(element).toHaveAttribute("aria-label", "test");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLButtonElement>();
        render(<ContextualHelp data-testid="ContextualHelp" ref={ref}>12</ContextualHelp>);

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLButtonElement).toBeTruthy();
    });
});

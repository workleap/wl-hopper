import { render, screen } from "@hopper-ui/test-utils";
import { createRef } from "react";

import { IllustratedMessage } from "../../src/IllustratedMessage.tsx";
import { IllustratedMessageContext } from "../../src/IllustratedMessageContext.ts";

describe("IllustratedMessage", () => {
    it("should render with default class", () => {
        render(<IllustratedMessage>Test</IllustratedMessage>);

        const element = screen.getByText("Test");
        expect(element).toHaveClass("hop-IllustratedMessage");
    });

    it("should support custom class", () => {
        render(<IllustratedMessage className="test">Test</IllustratedMessage>);

        const element = screen.getByText("Test");
        expect(element).toHaveClass("hop-IllustratedMessage");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<IllustratedMessage marginTop="stack-sm" style={{ marginBottom: "13px" }}>Test</IllustratedMessage>);

        const element = screen.getByText("Test");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<IllustratedMessage data-foo="bar">Test</IllustratedMessage>);

        const element = screen.getByText("Test");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <IllustratedMessageContext.Provider value={{ slots: { test: { "aria-label": "test" } } }}>
                <IllustratedMessage slot="test">Test</IllustratedMessage>
            </IllustratedMessageContext.Provider>
        );

        const element = screen.getByText("Test");
        expect(element).toHaveAttribute("slot", "test");
        expect(element).toHaveAttribute("aria-label", "test");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLDivElement>();
        render(<IllustratedMessage ref={ref}>Test</IllustratedMessage>);

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLDivElement).toBeTruthy();
    });
});

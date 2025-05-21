import { render, screen } from "@hopper-ui/test-utils";
import { createRef } from "react";

import { HelperMessage } from "../../src/HelperMessage.tsx";
import { HelperMessageContext } from "../../src/HelperMessageContext.ts";

describe("HelperMessage", () => {
    it("should render with default class", () => {
        render(<HelperMessage>Test</HelperMessage>);

        const element = screen.getByText("Test");
        expect(element).toHaveClass("hop-HelperMessage");
    });

    it("should support custom class", () => {
        render(<HelperMessage className="test">Test</HelperMessage>);

        const element = screen.getByText("Test");
        expect(element).toHaveClass("hop-HelperMessage");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<HelperMessage marginTop="stack-sm" style={{ marginBottom: "13px" }} >Test</HelperMessage>);

        const element = screen.getByText("Test");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<HelperMessage data-foo="bar">Test</HelperMessage>);

        const element = screen.getByText("Test");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <HelperMessageContext.Provider value={{ slots: { test: { "aria-label": "test" } } }}>
                <HelperMessage slot="test">Test</HelperMessage>
            </HelperMessageContext.Provider>
        );

        const element = screen.getByText("Test");
        expect(element).toHaveAttribute("slot", "test");
        expect(element).toHaveAttribute("aria-label", "test");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLSpanElement>();
        render(<HelperMessage ref={ref}>Test</HelperMessage>);

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLSpanElement).toBeTruthy();
    });

    it("should support showing an icon by default", () => {
        render(<HelperMessage>Test</HelperMessage>);

        const element = screen.getByText("Test");
        const svgElement = element.querySelector(".hop-Icon");
        
        expect(svgElement).not.toBeNull();
    });

    it("should support hiding an icon", () => {
        render(<HelperMessage hideIcon>Test</HelperMessage>);

        const element = screen.getByText("Test");
        const svgElement = element.querySelector(".hop-Icon");
        
        expect(svgElement).toBeNull();
    });
});

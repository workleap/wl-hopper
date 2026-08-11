import { render, screen } from "@hopper-ui/test-utils";
import { createRef } from "react";

import { ActionListRichIcon, RichIconContext } from "../../src/index.ts";

describe("Rich Icons", () => {
    it("should render with default class", () => {
        render(<ActionListRichIcon />);

        const element = screen.getByRole("img", { hidden: true });

        expect(element).toHaveClass("hop-RichIcon");
    });

    it("should support custom class", () => {
        render(<ActionListRichIcon className="test" />);

        const element = screen.getByRole("img", { hidden: true });

        expect(element).toHaveClass("hop-RichIcon");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<ActionListRichIcon marginTop="stack-sm" style={{ marginBottom: "13px" }} />);

        const element = screen.getByRole("img", { hidden: true });

        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<ActionListRichIcon data-foo="bar" />);

        const element = screen.getByRole("img", { hidden: true });

        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <RichIconContext.Provider value={{ slots: { test: { "aria-label": "test" } } }}>
                <ActionListRichIcon slot="test" />
            </RichIconContext.Provider>
        );

        const element = screen.getByRole("img", { hidden: true });
        expect(element).not.toHaveAttribute("slot", "test"); // svg doesn't have slot attribute
        expect(element).toHaveAttribute("aria-label", "test");
    });

    it("should support refs", () => {
        const ref = createRef<SVGSVGElement>();
        render(<ActionListRichIcon ref={ref} />);

        const element = screen.getByRole("img", { hidden: true });

        expect(ref.current).toBe(element);
        expect(ref.current instanceof SVGElement).toBeTruthy();
        expect(ref.current?.tagName.toUpperCase()).toBe("SVG");
    });

    it("should apply default displayName", () => {
        expect(ActionListRichIcon.displayName).toBe("ActionListRichIcon");
    });

    it("should apply aria-label and aria-hidden attributes", () => {
        render(<ActionListRichIcon aria-label="Test Icon" />);

        const icon = screen.getByRole("img");

        expect(icon).toHaveAttribute("aria-label", "Test Icon");
        expect(icon).not.toHaveAttribute("aria-hidden");
    });

    it("should apply aria-hidden attributes when no aria-label is provided", () => {
        render(<ActionListRichIcon />);

        const icon = screen.getByRole("img", { hidden: true });

        expect(icon).not.toHaveAttribute("aria-label");
        expect(icon).toHaveAttribute("aria-hidden", "true");
    });
});

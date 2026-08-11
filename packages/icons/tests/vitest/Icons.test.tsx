import { render, screen } from "@hopper-ui/test-utils";
import { createRef } from "react";

import { AddIcon, IconContext } from "../../src/index.ts";

describe("Icons", () => {
    it("should render with default class", () => {
        render(<AddIcon />);

        const element = screen.getByRole("img", { hidden: true });

        expect(element).toHaveClass("hop-Icon");
    });

    it("should support custom class", () => {
        render(<AddIcon className="test" />);

        const element = screen.getByRole("img", { hidden: true });

        expect(element).toHaveClass("hop-Icon");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<AddIcon marginTop="stack-sm" style={{ marginBottom: "13px" }} />);

        const element = screen.getByRole("img", { hidden: true });

        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<AddIcon data-foo="bar" />);

        const element = screen.getByRole("img", { hidden: true });

        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <IconContext.Provider value={{ slots: { test: { "aria-label": "test" } } }}>
                <AddIcon slot="test" />
            </IconContext.Provider>
        );

        const element = screen.getByRole("img", { hidden: true });
        expect(element).not.toHaveAttribute("slot", "test"); // svg doesn't have slot attribute
        expect(element).toHaveAttribute("data-slot", "test");
        expect(element).toHaveAttribute("aria-label", "test");
    });

    it("should support refs", () => {
        const ref = createRef<SVGSVGElement>();
        render(<AddIcon ref={ref} />);

        const element = screen.getByRole("img", { hidden: true });

        expect(ref.current).toBe(element);
        expect(ref.current instanceof SVGElement).toBeTruthy();
        expect(ref.current?.tagName.toUpperCase()).toBe("SVG");
    });

    it("should apply default displayName", () => {
        expect(AddIcon.displayName).toBe("AddIcon");
    });

    it("should apply aria-label and aria-hidden attributes", () => {
        render(<AddIcon aria-label="Test Icon" />);

        const icon = screen.getByRole("img");

        expect(icon).toHaveAttribute("aria-label", "Test Icon");
        expect(icon).not.toHaveAttribute("aria-hidden");
    });

    it("should apply aria-hidden attributes when no aria-label is provided", () => {
        render(<AddIcon />);

        const icon = screen.getByRole("img", { hidden: true });

        expect(icon).not.toHaveAttribute("aria-label");
        expect(icon).toHaveAttribute("aria-hidden", "true");
    });
});

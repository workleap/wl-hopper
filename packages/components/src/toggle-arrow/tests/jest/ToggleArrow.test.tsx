import { render, screen } from "@hopper-ui/test-utils";
import { createRef } from "react";

import { ToggleArrow } from "../../src/ToggleArrow.tsx";
import { ToggleArrowContext } from "../../src/ToggleArrowContext.ts";

describe("ToggleArrow", () => {
    it("should render with default class", () => {
        render(<ToggleArrow data-testid="toggle-arrow" />);

        const element = screen.getByTestId("toggle-arrow");
        expect(element).toHaveClass("hop-ToggleArrow");
    });

    it("should render with custom class", () => {
        render(<ToggleArrow data-testid="toggle-arrow" className="test" />);

        const element = screen.getByTestId("toggle-arrow");
        expect(element).toHaveClass("hop-ToggleArrow");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<ToggleArrow data-testid="toggle-arrow" marginTop="stack-sm" style={{ marginBottom: "13px" }} />);

        const element = screen.getByTestId("toggle-arrow");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<ToggleArrow data-testid="toggle-arrow" data-foo="bar" />);

        const element = screen.getByTestId("toggle-arrow");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <ToggleArrowContext.Provider value={{ slots: { test: { "aria-label": "test" } } }}>
                <ToggleArrow data-testid="toggle-arrow" slot="test" />
            </ToggleArrowContext.Provider>
        );

        const element = screen.getByTestId("toggle-arrow");
        expect(element).toHaveAttribute("aria-label", "test");
    });

    it("should support refs", () => {
        const ref = createRef<SVGSVGElement>();
        render(<ToggleArrow data-testid="toggle-arrow" ref={ref} />);

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof SVGSVGElement).toBeTruthy();
    });
});

import { render, screen } from "@hopper-ui/test-utils";
import { createRef } from "react";

import { DateRangePicker } from "../../src/DateRangePicker.tsx";
import { DateRangePickerContext } from "../../src/DateRangePickerContext.ts";

describe("DateRangePicker", () => {
    it("should render with default class", () => {
        render(<DateRangePicker aria-label="DateRangePicker" data-testid="DateRangePicker" />);

        const element = screen.getByTestId("DateRangePicker");
        expect(element).toHaveClass("hop-DateRangePicker");
    });

    it("should support custom class", () => {
        render(<DateRangePicker label="DateRangePicker" data-testid="DateRangePicker" className="test" />);

        const element = screen.getByTestId("DateRangePicker");
        expect(element).toHaveClass("hop-DateRangePicker");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<DateRangePicker label="DateRangePicker" data-testid="DateRangePicker" marginTop="stack-sm" style={{ marginBottom: "13px" }} />);

        const element = screen.getByTestId("DateRangePicker");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<DateRangePicker label="DateRangePicker" data-testid="DateRangePicker" data-foo="bar" />);

        const element = screen.getByTestId("DateRangePicker");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <DateRangePickerContext.Provider value={{ slots: { test: { "aria-label": "test" } } }}>
                <DateRangePicker label="DateRangePicker" data-testid="DateRangePicker" slot="test" />
            </DateRangePickerContext.Provider>
        );

        const element = screen.getByTestId("DateRangePicker");
        expect(element).toHaveAttribute("slot", "test");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLDivElement>();
        render(<DateRangePicker label="DateRangePicker" data-testid="DateRangePicker" ref={ref} />);

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLDivElement).toBeTruthy();
    });
});

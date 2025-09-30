import { render, screen } from "@hopper-ui/test-utils";
import { createRef } from "react";

import { RangeCalendar } from "../../src/RangeCalendar.tsx";
import { RangeCalendarContext } from "../../src/RangeCalendarContext.ts";

describe("RangeCalendar", () => {
    it("should render with default class", () => {
        render(<RangeCalendar data-testid="RangeCalendar" />);

        const element = screen.getByTestId("RangeCalendar");
        expect(element).toHaveClass("hop-RangeCalendar");
    });

    it("should support custom class", () => {
        render(<RangeCalendar data-testid="RangeCalendar" className="test" />);

        const element = screen.getByTestId("RangeCalendar");
        expect(element).toHaveClass("hop-RangeCalendar");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<RangeCalendar data-testid="RangeCalendar" marginTop="stack-sm" style={{ marginBottom: "13px" }} />);

        const element = screen.getByTestId("RangeCalendar");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<RangeCalendar data-testid="RangeCalendar" data-foo="bar" />);

        const element = screen.getByTestId("RangeCalendar");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <RangeCalendarContext.Provider value={{ slots: { test: { "aria-label": "test" } } }}>
                <RangeCalendar data-testid="RangeCalendar" slot="test" />
            </RangeCalendarContext.Provider>
        );

        const element = screen.getByTestId("RangeCalendar");
        expect(element).toHaveAttribute("slot", "test");
        expect(element).toHaveAttribute("aria-label", expect.stringContaining("test"));
    });

    it("should support refs", () => {
        const ref = createRef<HTMLDivElement>();
        render(<RangeCalendar data-testid="RangeCalendar" ref={ref} />);

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLDivElement).toBeTruthy();
    });
});

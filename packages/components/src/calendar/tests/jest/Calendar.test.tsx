import { render, screen } from "@hopper-ui/test-utils";
import { createRef } from "react";

import { Calendar } from "../../src/Calendar.tsx";
import { CalendarContext } from "../../src/CalendarContext.ts";

describe("Calendar", () => {
    it("should render with default class", () => {
        render(<Calendar data-testid="Calendar" />);

        const element = screen.getByTestId("Calendar");
        expect(element).toHaveClass("hop-Calendar");
    });

    it("should support custom class", () => {
        render(<Calendar data-testid="Calendar" className="test" />);

        const element = screen.getByTestId("Calendar");
        expect(element).toHaveClass("hop-Calendar");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<Calendar data-testid="Calendar" marginTop="stack-sm" style={{ marginBottom: "13px" }} />);

        const element = screen.getByTestId("Calendar");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<Calendar data-testid="Calendar" data-foo="bar" />);

        const element = screen.getByTestId("Calendar");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <CalendarContext.Provider value={{ slots: { test: { "aria-label": "test" } } }}>
                <Calendar data-testid="Calendar" slot="test" />
            </CalendarContext.Provider>
        );

        const element = screen.getByTestId("Calendar");
        expect(element).toHaveAttribute("slot", "test");
        expect(element).toHaveAttribute("aria-label", expect.stringContaining("test"));
    });

    it("should support refs", () => {
        const ref = createRef<HTMLDivElement>();
        render(<Calendar data-testid="Calendar" ref={ref} />);

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLDivElement).toBeTruthy();
    });
});

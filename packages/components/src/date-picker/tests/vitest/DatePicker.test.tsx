import { render, screen } from "@hopper-ui/test-utils";
import { createRef } from "react";

import { DatePicker } from "../../src/DatePicker.tsx";
import { DatePickerContext } from "../../src/DatePickerContext.ts";

describe("DatePicker", () => {
    it("should render with default class", () => {
        render(<DatePicker aria-label="DatePicker" data-testid="DatePicker" />);

        const element = screen.getByTestId("DatePicker");
        expect(element).toHaveClass("hop-DatePicker");
    });

    it("should support custom class", () => {
        render(<DatePicker label="DatePicker" data-testid="DatePicker" className="test" />);

        const element = screen.getByTestId("DatePicker");
        expect(element).toHaveClass("hop-DatePicker");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<DatePicker label="DatePicker" data-testid="DatePicker" marginTop="stack-sm" style={{ marginBottom: "13px" }} />);

        const element = screen.getByTestId("DatePicker");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<DatePicker label="DatePicker" data-testid="DatePicker" data-foo="bar" />);

        const element = screen.getByTestId("DatePicker");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <DatePickerContext.Provider value={{ slots: { test: { "aria-label": "test" } } }}>
                <DatePicker label="DatePicker" data-testid="DatePicker" slot="test" />
            </DatePickerContext.Provider>
        );

        const element = screen.getByTestId("DatePicker");
        expect(element).toHaveAttribute("slot", "test");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLDivElement>();
        render(<DatePicker label="DatePicker" data-testid="DatePicker" ref={ref} />);

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLDivElement).toBeTruthy();
    });
});

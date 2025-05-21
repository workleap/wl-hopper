/* eslint-disable testing-library/no-node-access */
/* Using closest to get the label is the best way, even react-aria does this. */
import { render, screen } from "@hopper-ui/test-utils";
import { createRef } from "react";

import { SegmentedControl, SegmentedControlItem } from "../../src/index.ts";
import { SegmentedControlContext } from "../../src/SegmentedControlContext.ts";

describe("SegmentedControl", () => {
    it("should render with default class", () => {
        render(<SegmentedControl aria-label="options"><SegmentedControlItem id="day">Day</SegmentedControlItem><SegmentedControlItem id="week">Week</SegmentedControlItem></SegmentedControl>);

        const element = screen.getByRole("radiogroup");
        expect(element).toHaveClass("hop-SegmentedControl");
    });

    it("should support custom class", () => {
        render(<SegmentedControl aria-label="options" className="test"><SegmentedControlItem id="option1">option 1</SegmentedControlItem></SegmentedControl>);

        const element = screen.getByRole("radiogroup");
        expect(element).toHaveClass("hop-SegmentedControl");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<SegmentedControl aria-label="options" marginTop="stack-sm" style={{ marginBottom: "13px" }}>
            <SegmentedControlItem id="option1">option 1</SegmentedControlItem>
        </SegmentedControl>);

        const element = screen.getByRole("radiogroup");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<SegmentedControl aria-label="options" data-foo="bar"><SegmentedControlItem id="option1">option 1</SegmentedControlItem></SegmentedControl>);

        const element = screen.getByRole("radiogroup");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <SegmentedControlContext.Provider value={{ slots: { test: { "aria-label": "test" } } }}>
                <SegmentedControl slot="test"><SegmentedControlItem id="option1">option 1</SegmentedControlItem></SegmentedControl>
            </SegmentedControlContext.Provider>
        );

        const element = screen.getByRole("radiogroup");

        expect(element).toHaveAttribute("slot", "test");
        expect(element).toHaveAttribute("aria-label", "test");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLDivElement>();
        render(<SegmentedControl aria-label="options" ref={ref}><SegmentedControlItem id="option1">option 1</SegmentedControlItem></SegmentedControl>);

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLDivElement).toBeTruthy();
    });

    it("should pass the size to the SegmentedControlItem.", () => {
        render(
            <SegmentedControl aria-label="options" size="sm">
                <SegmentedControlItem id="option1">
                    option 1
                </SegmentedControlItem>
            </SegmentedControl>
        );

        const item = screen.getByRole("radio");
        expect(item).toHaveClass("hop-SegmentedControlItem--sm");
    });

    it("should be disabled and pass it to the SegmentedControlItem.", () => {
        render(<SegmentedControl aria-label="options" isDisabled><SegmentedControlItem id="option1">option 1</SegmentedControlItem></SegmentedControl>);

        const element = screen.getByRole("radiogroup");
        expect(element).toHaveAttribute("data-disabled", "true");

        const item = screen.getByRole("radio");
        expect(item).toHaveAttribute("data-disabled", "true");

        expect(item).toBeDisabled();
    });
});

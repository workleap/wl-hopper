import { Select, SelectItem } from "@hopper-ui/components";
import { render, screen } from "@hopper-ui/test-utils";
import { createRef } from "react";

import { SelectContext } from "../../src/SelectContext.ts";

describe("Select", () => {
    it("should render with default class", () => {
        render(<Select aria-label="Animals" data-testid="select">
            <SelectItem>Item 1</SelectItem>
            <SelectItem>Item 2</SelectItem>
            <SelectItem>Item 3</SelectItem>
        </Select>);

        const element = screen.getByTestId("select");
        expect(element).toHaveClass("hop-Select");
    });

    it("should support custom class", () => {
        render(<Select aria-label="Animals" className="test" data-testid="select">
            <SelectItem>Item 1</SelectItem>
            <SelectItem>Item 2</SelectItem>
            <SelectItem>Item 3</SelectItem>
        </Select>);

        const element = screen.getByTestId("select");
        expect(element).toHaveClass("hop-Select");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<Select aria-label="Animals" marginTop="stack-sm" style={{ marginBottom: "13px" }} data-testid="select">
            <SelectItem>Item 1</SelectItem>
            <SelectItem>Item 2</SelectItem>
            <SelectItem>Item 3</SelectItem>
        </Select>);

        const element = screen.getByTestId("select");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<Select aria-label="Animals" data-foo="bar" data-testid="select">
            <SelectItem>Item 1</SelectItem>
            <SelectItem>Item 2</SelectItem>
            <SelectItem>Item 3</SelectItem>
        </Select>);

        const element = screen.getByTestId("select");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <SelectContext.Provider value={{ slots: { test: { "aria-label": "test" } } }}>
                <Select slot="test" data-testid="select">
                    <SelectItem>Item 1</SelectItem>
                    <SelectItem>Item 2</SelectItem>
                    <SelectItem>Item 3</SelectItem>
                </Select>
            </SelectContext.Provider>
        );

        const element = screen.getByTestId("select");
        const selectTrigger = screen.getByRole("button");
        expect(element).toHaveAttribute("slot", "test");
        expect(selectTrigger).toHaveAttribute("aria-label", "test");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLDivElement>();
        render(<Select ref={ref} aria-label="Animals">
            <SelectItem>Item 1</SelectItem>
            <SelectItem>Item 2</SelectItem>
            <SelectItem>Item 3</SelectItem>
        </Select>);

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLDivElement).toBeTruthy();
    });
});

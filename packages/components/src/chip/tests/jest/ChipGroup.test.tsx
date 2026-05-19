import { render, screen } from "@hopper-ui/test-utils";
import { createRef } from "react";

import { Chip, ChipGroup, ChipGroupContext } from "../../src/index.ts";

describe("ChipGroup", () => {
    it("should render with default class", () => {
        render(<ChipGroup aria-label="filters" data-testid="chip-group"><Chip id="option1">option 1</Chip></ChipGroup>);

        const element = screen.getByTestId("chip-group");
        expect(element).toHaveClass("hop-ChipGroup");
    });

    it("should support custom class", () => {
        render(<ChipGroup aria-label="filters" data-testid="chip-group" className="test"><Chip id="option1">option 1</Chip></ChipGroup>);

        const element = screen.getByTestId("chip-group");
        expect(element).toHaveClass("hop-ChipGroup");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<ChipGroup aria-label="filters" data-testid="chip-group" marginTop="stack-sm" style={{ marginBottom: "13px" }}><Chip id="option1">option 1</Chip></ChipGroup>);

        const element = screen.getByTestId("chip-group");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<ChipGroup aria-label="filters" data-testid="chip-group" data-foo="bar"><Chip id="option1">option 1</Chip></ChipGroup>);

        const element = screen.getByTestId("chip-group");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <ChipGroupContext.Provider value={{ slots: { test: { "aria-label": "test" } } }}>
                <ChipGroup slot="test" data-testid="chip-group">
                    <Chip id="option1">option 1</Chip>
                </ChipGroup>
            </ChipGroupContext.Provider>
        );

        const element = screen.getByTestId("chip-group");
        const chipList = screen.getByRole("grid");

        expect(element).toHaveAttribute("slot", "test");
        expect(chipList).toHaveAttribute("aria-label", "test");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLDivElement>();
        render(
            <ChipGroup aria-label="filters" data-testid="chip-group" ref={ref}>
                <Chip id="option1">option 1</Chip>
            </ChipGroup>
        );

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLDivElement).toBeTruthy();
    });

    it("should pass the size class to both group and chip", () => {
        const chipTestId = "chip-option";
        render(
            <ChipGroup aria-label="filters" data-testid="chip-group" size="lg">
                <Chip id="option1" data-testid={chipTestId}>option 1</Chip>
            </ChipGroup>
        );

        expect(screen.getByTestId("chip-group")).toHaveClass("hop-ChipGroup--lg");
        expect(screen.getByTestId(chipTestId)).toHaveClass("hop-Chip--lg");
    });

    it("should default to multiple selection", () => {
        render(
            <ChipGroup aria-label="filters" data-testid="chip-group" defaultSelectedKeys={["option1", "option2"]}>
                <Chip id="option1">option 1</Chip>
                <Chip id="option2">option 2</Chip>
                <Chip id="option3">option 3</Chip>
            </ChipGroup>
        );

        const selected = screen.getAllByRole("row", { selected: true });
        expect(selected).toHaveLength(2);
    });

    it("should throw when a Chip is rendered outside a ChipGroup", () => {
        const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});
        expect(() => render(<Chip id="alone">alone</Chip>)).toThrow(
            "Chip cannot be rendered outside a ChipGroup."
        );
        consoleError.mockRestore();
    });
});

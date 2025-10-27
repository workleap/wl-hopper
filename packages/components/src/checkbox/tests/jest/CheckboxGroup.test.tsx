/* eslint-disable testing-library/no-node-access */
/* Using closest to get the label is the best way, even react-aria does this. */
import { render, screen } from "@hopper-ui/test-utils";
import { userEvent } from "@testing-library/user-event";
import { createRef } from "react";

import { Checkbox } from "../../src/Checkbox.tsx";
import { CheckboxField } from "../../src/CheckboxField.tsx";
import { CheckboxGroup } from "../../src/CheckboxGroup.tsx";
import { CheckboxGroupContext } from "../../src/CheckboxGroupContext.ts";

describe("Checkbox", () => {
    it("should render with default class", () => {
        render(<CheckboxGroup aria-label="options"><Checkbox>option 1</Checkbox></CheckboxGroup>);

        const element = screen.getByRole("group");
        expect(element).toHaveClass("hop-CheckboxGroup");
    });

    it("should support custom class", () => {
        render(<CheckboxGroup aria-label="options" className="test"><Checkbox>option 1</Checkbox></CheckboxGroup>);

        const element = screen.getByRole("group");
        expect(element).toHaveClass("hop-CheckboxGroup");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(
            <CheckboxGroup aria-label="options" marginTop="stack-sm" style={{ marginBottom: "13px" }}>
                <Checkbox>option 1</Checkbox>
            </CheckboxGroup>
        );

        const element = screen.getByRole("group");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<CheckboxGroup aria-label="options" data-foo="bar"><Checkbox>option 1</Checkbox></CheckboxGroup>);

        const element = screen.getByRole("group");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <CheckboxGroupContext.Provider value={{ slots: { test: { "aria-label": "test" } } }}>
                <CheckboxGroup slot="test"><Checkbox>option 1</Checkbox></CheckboxGroup>
            </CheckboxGroupContext.Provider>
        );

        const element = screen.getByRole("group");

        expect(element).toHaveAttribute("slot", "test");
        expect(element).toHaveAttribute("aria-label", "test");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLDivElement>();
        render(<CheckboxGroup aria-label="options" ref={ref}><Checkbox>option 1</Checkbox></CheckboxGroup>);

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLDivElement).toBeTruthy();
    });

    it("should set the size class name and pass the size to the checkbox and checkbox field.", () => {
        const testId = "checkbox-field";
        render(
            <CheckboxGroup aria-label="options" size="sm">
                <CheckboxField data-testid={testId} description="Description">
                    <Checkbox>option 1</Checkbox>
                </CheckboxField>
            </CheckboxGroup>
        );

        const element = screen.getByRole("group");
        const checkboxField = screen.getByTestId(testId);
        const checkbox = screen.getByRole("checkbox").closest("label");
        expect(element).toHaveClass("hop-CheckboxGroup--sm");
        expect(checkboxField).toHaveClass("hop-CheckboxField--sm");
        expect(checkbox).toHaveClass("hop-Checkbox--sm");
    });

    it("should be disabled and pass it to the checkbox.", () => {
        render(<CheckboxGroup aria-label="options" isDisabled><Checkbox>option 1</Checkbox></CheckboxGroup>);

        const element = screen.getByRole("group");
        const checkbox = screen.getByRole("checkbox");

        expect(element).toHaveAttribute("data-disabled", "true");
        expect(checkbox).toBeDisabled();
    });

    it("should call onChange when a single checkbox is selected.", async () => {
        const user = userEvent.setup();
        const onChange = jest.fn();
        render(
            <CheckboxGroup aria-label="options" onChange={onChange}>
                <Checkbox value="option 1" aria-label="option 1">option 1</Checkbox>
                <Checkbox value="option 2">option 2</Checkbox>
                <Checkbox value="option 3">option 3</Checkbox>
            </CheckboxGroup>
        );

        const checkbox = screen.getAllByRole("checkbox")[0];
        await user.click(checkbox);
        expect(onChange).toHaveBeenCalledWith(["option 1"]);
    });

    it("should call onChange when a single checkbox is unselected.", async () => {
        const user = userEvent.setup();
        const onChange = jest.fn();
        render(
            <CheckboxGroup aria-label="options" onChange={onChange}>
                <Checkbox value="option 1">option 1</Checkbox>
                <Checkbox value="option 2">option 2</Checkbox>
                <Checkbox value="option 3">option 3</Checkbox>
            </CheckboxGroup>
        );

        const checkboxes = screen.getAllByRole("checkbox");
        await user.click(checkboxes[0]);
        await user.click(checkboxes[2]);
        await user.click(checkboxes[0]);
        expect(onChange).toHaveBeenLastCalledWith(["option 3"]);
        expect(onChange).toHaveBeenCalledTimes(3);
    });
});

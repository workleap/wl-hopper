/* eslint-disable testing-library/no-node-access */
/* Using closest to get the label is the best way, even react-aria does this. */
import { render, screen } from "@hopper-ui/test-utils";
import { userEvent } from "@testing-library/user-event";
import { createRef } from "react";

import { Radio } from "../../src/Radio.tsx";
import { RadioField } from "../../src/RadioField.tsx";
import { RadioGroup } from "../../src/RadioGroup.tsx";
import { RadioGroupContext } from "../../src/RadioGroupContext.ts";

describe("Radio", () => {
    it("should render with default class", () => {
        render(<RadioGroup aria-label="options"><Radio value="option1">option 1</Radio></RadioGroup>);

        const element = screen.getByRole("radiogroup");
        expect(element).toHaveClass("hop-RadioGroup");
    });

    it("should support custom class", () => {
        render(<RadioGroup aria-label="options" className="test"><Radio value="option1">option 1</Radio></RadioGroup>);

        const element = screen.getByRole("radiogroup");
        expect(element).toHaveClass("hop-RadioGroup");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(
            <RadioGroup aria-label="options" marginTop="stack-sm" style={{ marginBottom: "13px" }}>
                <Radio value="option1">option 1</Radio>
            </RadioGroup>
        );

        const element = screen.getByRole("radiogroup");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<RadioGroup aria-label="options" data-foo="bar"><Radio value="option1">option 1</Radio></RadioGroup>);

        const element = screen.getByRole("radiogroup");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <RadioGroupContext.Provider value={{ slots: { test: { "aria-label": "test" } } }}>
                <RadioGroup slot="test"><Radio value="option1">option 1</Radio></RadioGroup>
            </RadioGroupContext.Provider>
        );

        const element = screen.getByRole("radiogroup");

        expect(element).toHaveAttribute("slot", "test");
        expect(element).toHaveAttribute("aria-label", "test");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLDivElement>();
        render(<RadioGroup aria-label="options" ref={ref}><Radio value="option1">option 1</Radio></RadioGroup>);

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLDivElement).toBeTruthy();
    });

    it("should set the size class name and pass the size to the radio and radio field.", () => {
        const testId = "radio-field";
        render(
            <RadioGroup aria-label="options" size="sm">
                <RadioField data-testid={testId} description="Description">
                    <Radio value="option1">option 1</Radio>
                </RadioField>
            </RadioGroup>
        );

        const element = screen.getByRole("radiogroup");
        const radioField = screen.getByTestId(testId);
        const radio = screen.getByRole("radio").closest("label");
        expect(element).toHaveClass("hop-RadioGroup--sm");
        expect(radioField).toHaveClass("hop-RadioField--sm");
        expect(radio).toHaveClass("hop-Radio--sm");
    });

    it("should be disabled and pass it to the radio.", () => {
        render(<RadioGroup aria-label="options" isDisabled><Radio value="option1">option 1</Radio></RadioGroup>);

        const element = screen.getByRole("radiogroup");
        const radio = screen.getByRole("radio");

        expect(element).toHaveAttribute("data-disabled", "true");
        expect(radio).toBeDisabled();
    });

    it("should call onChange when a single radio is selected.", async () => {
        const user = userEvent.setup();
        const onChange = jest.fn();
        render(
            <RadioGroup aria-label="options" onChange={onChange}>
                <Radio value="option 1" aria-label="option 1">option 1</Radio>
                <Radio value="option 2">option 2</Radio>
                <Radio value="option 3">option 3</Radio>
            </RadioGroup>
        );

        const radio = screen.getAllByRole("radio")[0];
        await user.click(radio);
        expect(onChange).toHaveBeenCalledWith("option 1");
    });
});

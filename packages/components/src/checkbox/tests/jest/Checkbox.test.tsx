/* eslint-disable testing-library/no-node-access */
/* Using closest to get the label is the best way, even react-aria does this. */
import { act, render, screen, waitFor } from "@hopper-ui/test-utils";
import { userEvent } from "@testing-library/user-event";
import { createRef } from "react";

import { Checkbox } from "../../src/Checkbox.tsx";
import { CheckboxContext } from "../../src/CheckboxContext.ts";


describe("Checkbox", () => {
    it("should render with default class", () => {
        render(<Checkbox>option 1</Checkbox>);

        const element = screen.getByRole("checkbox").closest("label");
        expect(element).toHaveClass("hop-Checkbox");
    });

    it("should support custom class", () => {
        render(<Checkbox className="test">option 1</Checkbox>);

        const element = screen.getByRole("checkbox").closest("label");
        expect(element).toHaveClass("hop-Checkbox");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<Checkbox marginTop="stack-sm" style={{ marginBottom: "13px" }} >option 1</Checkbox>);

        const element = screen.getByRole("checkbox").closest("label");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<Checkbox data-foo="bar">option 1</Checkbox>);

        const element = screen.getByRole("checkbox").closest("label");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <CheckboxContext.Provider value={{ slots: { test: { "aria-label": "test" } } }}>
                <Checkbox slot="test">option 1</Checkbox>
            </CheckboxContext.Provider>
        );

        const checkbox = screen.getByRole("checkbox");
        const element = checkbox.closest("label");

        expect(element).toHaveAttribute("slot", "test");
        expect(checkbox).toHaveAttribute("aria-label", "test");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLLabelElement>();
        render(<Checkbox ref={ref}>option 1</Checkbox>);

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLLabelElement).toBeTruthy();
    });

    it("should prevent onChange when the checkbox is disabled", async () => {
        const handler = jest.fn();
        const user = userEvent.setup();

        render(
            <Checkbox
                isDisabled
                onChange={handler}
            >
                Disabled button
            </Checkbox>
        );

        const element = screen.getByRole("checkbox");
        await user.click(element);

        expect(handler).not.toHaveBeenCalled();
    });

    // ***** Api *****

    it("should be focused on render when the focus api is called", async () => {
        const ref = createRef<HTMLLabelElement>();

        render(<Checkbox ref={ref}>option 1</Checkbox>);
        const checkboxElement = ref.current?.querySelector("input[type='checkbox']") as HTMLInputElement;

        act(() => {
            checkboxElement?.focus();
        });

        await waitFor(() => expect(checkboxElement).toHaveFocus());
    });
});

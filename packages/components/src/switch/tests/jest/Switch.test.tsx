/* eslint-disable testing-library/no-node-access */
/* Using closest to get the label is the best way, even react-aria does this. */
import { act, render, screen, waitFor } from "@hopper-ui/test-utils";
import { userEvent } from "@testing-library/user-event";
import { createRef } from "react";

import { Switch } from "../../src/Switch.tsx";
import { SwitchContext } from "../../src/SwitchContext.ts";


describe("Switch", () => {
    it("should render with default class", () => {
        render(<Switch>option 1</Switch>);

        const element = screen.getByRole("switch").closest("label");
        expect(element).toHaveClass("hop-Switch");
    });

    it("should support custom class", () => {
        render(<Switch className="test">option 1</Switch>);

        const element = screen.getByRole("switch").closest("label");
        expect(element).toHaveClass("hop-Switch");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<Switch marginTop="stack-sm" style={{ marginBottom: "13px" }} >option 1</Switch>);

        const element = screen.getByRole("switch").closest("label");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<Switch data-foo="bar">option 1</Switch>);

        const element = screen.getByRole("switch").closest("label");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <SwitchContext.Provider value={{ slots: { test: { "aria-label": "test" } } }}>
                <Switch slot="test">option 1</Switch>
            </SwitchContext.Provider>
        );

        const switchElem = screen.getByRole("switch");
        const element = switchElem.closest("label");

        expect(element).toHaveAttribute("slot", "test");
        expect(switchElem).toHaveAttribute("aria-label", "test");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLLabelElement>();
        render(<Switch ref={ref}>option 1</Switch>);

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLLabelElement).toBeTruthy();
    });

    it("should prevent onChange when the switch is disabled", async () => {
        const handler = jest.fn();
        const user = userEvent.setup();

        render(
            <Switch
                isDisabled
                onChange={handler}
            >
                Disabled button
            </Switch>
        );

        const element = screen.getByRole("switch");
        await user.click(element);

        expect(handler).not.toHaveBeenCalled();
    });

    // ***** Api *****

    it("should be focused on render when the focus api is called", async () => {
        const ref = createRef<HTMLInputElement>();

        render(<Switch inputRef={ref} >option 1</Switch>);

        const switchElement = ref.current;

        act(() => {
            switchElement?.focus();
        });

        await waitFor(() => expect(switchElement).toHaveFocus());
    });
});

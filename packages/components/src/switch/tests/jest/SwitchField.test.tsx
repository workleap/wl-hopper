
/* Using closest to get the label is the best way, even react-aria does this. */
import { render, screen } from "@hopper-ui/test-utils";
import { createRef } from "react";

import { Switch } from "../../src/Switch.tsx";
import { SwitchField } from "../../src/SwitchField.tsx";
import { SwitchFieldContext } from "../../src/SwitchFieldContext.ts";

describe("Switch", () => {
    const testId = "switch-field";

    it("should render with default class", () => {
        render(
            <SwitchField data-testid={testId} description="description">
                <Switch>option 1</Switch>
            </SwitchField>
        );

        const element = screen.getByTestId(testId);
        expect(element).toHaveClass("hop-SwitchField");
    });

    it("should support custom class", () => {
        render(
            <SwitchField data-testid={testId} className="test" description="description">
                <Switch>option 1</Switch>
            </SwitchField>
        );

        const element = screen.getByTestId(testId);
        expect(element).toHaveClass("hop-SwitchField");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(
            <SwitchField data-testid={testId} marginTop="stack-sm" style={{ marginBottom: "13px" }} description="description">
                <Switch>option 1</Switch>
            </SwitchField>
        );

        const element = screen.getByTestId(testId);
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(
            <SwitchField data-testid={testId} data-foo="bar" description="description">
                <Switch>option 1</Switch>
            </SwitchField>
        );

        const element = screen.getByTestId(testId);
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <SwitchFieldContext.Provider value={{ slots: { test: { "aria-label": "test" } } }}>
                <SwitchField data-testid={testId} slot="test" description="description">
                    <Switch>option 1</Switch>
                </SwitchField>
            </SwitchFieldContext.Provider>
        );

        const element = screen.getByTestId(testId);

        expect(element).toHaveAttribute("slot", "test");
        expect(element).toHaveAttribute("aria-label", "test");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLDivElement>();
        render(
            <SwitchField ref={ref} description="description">
                <Switch>option 1</Switch>
            </SwitchField>
        );

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLDivElement).toBeTruthy();
    });

    it("should set the size class name and pass the size to the switch", () => {
        render(
            <SwitchField data-testid={testId} size="sm" description="description">
                <Switch>option 1</Switch>
            </SwitchField>
        );

        const element = screen.getByTestId(testId);
        const switchElem = screen.getByRole("switch").closest("label");
        expect(element).toHaveClass("hop-SwitchField--sm");
        expect(switchElem).toHaveClass("hop-Switch--sm");
    });

    it("should set an id on the description and aria-describedby on the switch", () => {
        render(
            <SwitchField data-testid={testId} description="description">
                <Switch>option 1</Switch>
            </SwitchField>
        );

        const switchElem = screen.getByRole("switch");
        const descriptionElement = screen.getByText("description");

        expect(descriptionElement).toHaveAttribute("id");
        const descriptionId = descriptionElement.getAttribute("id");
        expect(switchElem).toHaveAttribute("aria-describedby", descriptionId);
    });

    it("should be disabled and pass it to the switch", () => {
        render(
            <SwitchField
                data-testid={testId}
                isDisabled
                className={({ isDisabled }) => (isDisabled ? "disabled" : "")}
                description="description"
            >
                <Switch>option 1</Switch>
            </SwitchField>
        );

        const element = screen.getByTestId(testId);
        const switchElem = screen.getByRole("switch");

        expect(element).toHaveAttribute("data-disabled", "true");
        expect(switchElem).toBeDisabled();
        expect(element).toHaveClass("disabled");
    });
});

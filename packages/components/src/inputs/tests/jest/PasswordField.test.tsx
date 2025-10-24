import { render, screen } from "@hopper-ui/test-utils";
import { userEvent } from "@testing-library/user-event";
import { createRef } from "react";

import { PasswordField } from "../../src/PasswordField.tsx";
import { PasswordFieldContext } from "../../src/PasswordFieldContext.ts";

describe("PasswordField", () => {
    it("should render with default class", () => {
        render(
            <PasswordField data-testid="field" label="Label" />
        );

        const element = screen.getByTestId("field");
        expect(element).toHaveClass("hop-PasswordField");
    });

    it("should have password type", () => {
        render(
            <PasswordField data-testid="field" label="Label" />
        );

        const element = screen.getByLabelText("Label");
        expect(element).toHaveAttribute("type", "password");
    });

    it("should have password text when show password is clicked", async () => {
        const user = userEvent.setup();
        render(
            <PasswordField data-testid="field" label="Label" />
        );

        let element = screen.getByLabelText("Label");
        expect(element).toHaveAttribute("type", "password");

        await user.click(screen.getByRole("button"));

        element = screen.getByLabelText("Label");
        expect(element).toHaveAttribute("type", "text");

        await user.click(screen.getByRole("button"));

        element = screen.getByLabelText("Label");
        expect(element).toHaveAttribute("type", "password");
    });

    it("should support custom class", () => {
        render(
            <PasswordField className="test" data-testid="field" label="Label" />
        );

        const element = screen.getByTestId("field");
        expect(element).toHaveClass("hop-PasswordField");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(
            <PasswordField data-testid="field" marginTop="stack-sm" style={{ marginBottom: "13px" }} label="Label" />
        );

        const element = screen.getByTestId("field");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(
            <PasswordField data-testid="field" data-foo="bar" label="Label" />
        );

        const element = screen.getByTestId("field");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        const inputRef = createRef<HTMLInputElement>();

        render(
            <PasswordFieldContext.Provider value={{ slots: { test: { "aria-label": "test label" } } }}>
                <PasswordField inputRef={inputRef} data-testid="field" slot="test" />
            </PasswordFieldContext.Provider>
        );
        const element = screen.getByTestId("field");
        expect(element).toHaveAttribute("slot", "test");

        expect(inputRef.current).toHaveAttribute("aria-label", "test label");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLDivElement>();
        render(
            <PasswordField ref={ref} data-testid="field" label="Label" />
        );

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLDivElement).toBeTruthy();
    });

    it("should support input refs", () => {
        const ref = createRef<HTMLInputElement>();
        render(
            <PasswordField inputRef={ref} data-testid="field" label="Label" />
        );

        expect(ref.current).toBe(screen.getByLabelText("Label"));
        expect(ref.current instanceof HTMLInputElement).toBeTruthy();
    });

    it("should support and merge input ref on context", () => {
        const inputRef = createRef<HTMLInputElement>();
        const contextInputRef = createRef<HTMLInputElement>();
        render(
            <PasswordFieldContext.Provider value={{ inputRef: contextInputRef }}>
                <PasswordField inputRef={inputRef} label="Label" />
            </PasswordFieldContext.Provider>
        );

        const element = screen.getByLabelText("Label");
        expect(inputRef.current).toBe(element);
        expect(contextInputRef.current).toBe(element);
    });
});

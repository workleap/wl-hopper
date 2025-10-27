import { render, screen } from "@hopper-ui/test-utils";
import { userEvent } from "@testing-library/user-event";
import { createRef } from "react";

import { TextField } from "../../src/TextField.tsx";
import { TextFieldContext } from "../../src/TextFieldContext.ts";

describe("TextField", () => {
    it("should render with default class", () => {
        render(
            <TextField data-testid="field" label="Label" />
        );

        const element = screen.getByTestId("field");
        expect(element).toHaveClass("hop-TextField");
    });

    it("should support custom class", () => {
        render(
            <TextField className="test" data-testid="field" label="Label" />
        );

        const element = screen.getByTestId("field");
        expect(element).toHaveClass("hop-TextField");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(
            <TextField data-testid="field" marginTop="stack-sm" style={{ marginBottom: "13px" }} label="Label" />
        );

        const element = screen.getByTestId("field");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(
            <TextField data-testid="field" data-foo="bar" label="Label" />
        );

        const element = screen.getByTestId("field");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <TextFieldContext.Provider value={{ slots: { test: { "aria-label": "test label" } } }}>
                <TextField data-testid="field" slot="test" />
            </TextFieldContext.Provider>
        );
        const element = screen.getByTestId("field");
        expect(element).toHaveAttribute("slot", "test");

        const input = screen.getByRole("textbox");
        expect(input).toHaveAttribute("aria-label", "test label");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLDivElement>();
        render(
            <TextField ref={ref} data-testid="field" label="Label" />
        );

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLDivElement).toBeTruthy();
    });

    it("should support input refs", () => {
        const ref = createRef<HTMLInputElement>();
        render(
            <TextField inputRef={ref} data-testid="field" label="Label" />
        );

        expect(ref.current).toBe(screen.getByRole("textbox"));
        expect(ref.current instanceof HTMLInputElement).toBeTruthy();
    });

    it("should support and merge input ref on context", () => {
        const inputRef = createRef<HTMLInputElement>();
        const contextInputRef = createRef<HTMLInputElement>();
        render(
            <TextFieldContext.Provider value={{ inputRef: contextInputRef }}>
                <TextField inputRef={inputRef} label="Label" />
            </TextFieldContext.Provider>
        );

        const element = screen.getByRole("textbox");
        expect(inputRef.current).toBe(element);
        expect(contextInputRef.current).toBe(element);
    });

    it("should only show clear button when the field contains text", () => {
        render(
            <TextField isClearable label="Label" />
        );

        const clearButton = screen.queryByRole("button");
        expect(clearButton).toBe(null);
    });

    it("should call onClear when a the clear button is pressed", async () => {
        const user = userEvent.setup();
        const handleClear = jest.fn();
        render(
            <TextField isClearable onClear={handleClear} defaultValue="There is some text in the input" label="Label" />
        );

        const clearButton = screen.getByLabelText("Clear");
        await user.click(clearButton);

        expect(handleClear).toHaveBeenCalledTimes(1);
    });

    it("should show character count when empty", () => {
        const defaultValue = "";
        const maxLength = 20;
        const expectedResult = maxLength - defaultValue.length;

        render(
            <TextField defaultValue={defaultValue} showCharacterCount maxLength={maxLength} label="Label" />
        );

        const characterCount = screen.queryByText(expectedResult.toString());
        expect(characterCount).toBeInTheDocument();
    });

    it("should show character count when maxed", () => {
        const defaultValue = "1111111111";

        render(
            <TextField defaultValue={defaultValue} showCharacterCount maxLength={defaultValue.length} label="Label" />
        );

        const characterCount = screen.queryByText(0);
        expect(characterCount).toBeInTheDocument();
    });

    it("should show character count", () => {
        const defaultValue = "1111111111";
        const maxLength = 20;
        const expectedResult = maxLength - defaultValue.length;

        render(
            <TextField defaultValue={defaultValue} showCharacterCount maxLength={maxLength} label="Label" />
        );

        const characterCount = screen.queryByText(expectedResult.toString());
        expect(characterCount).toBeInTheDocument();
    });
});

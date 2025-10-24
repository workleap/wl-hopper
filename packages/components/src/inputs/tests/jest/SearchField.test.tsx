import { render, screen } from "@hopper-ui/test-utils";
import { userEvent } from "@testing-library/user-event";
import { createRef } from "react";

import { SearchField } from "../../src/SearchField.tsx";
import { SearchFieldContext } from "../../src/SearchFieldContext.ts";

describe("SearchField", () => {
    it("should render with default class", () => {
        render(
            <SearchField data-testid="field" label="Label" />
        );

        const element = screen.getByTestId("field");
        expect(element).toHaveClass("hop-SearchField");
    });

    it("should support custom class", () => {
        render(
            <SearchField className="test" data-testid="field" label="Label" />
        );

        const element = screen.getByTestId("field");
        expect(element).toHaveClass("hop-SearchField");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(
            <SearchField data-testid="field" marginTop="stack-sm" style={{ marginBottom: "13px" }} label="Label" />
        );

        const element = screen.getByTestId("field");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(
            <SearchField data-testid="field" data-foo="bar" label="Label" />
        );

        const element = screen.getByTestId("field");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <SearchFieldContext.Provider value={{ slots: { test: { "aria-label": "test label" } } }}>
                <SearchField data-testid="field" slot="test" />
            </SearchFieldContext.Provider>
        );
        const element = screen.getByTestId("field");
        expect(element).toHaveAttribute("slot", "test");

        const input = screen.getByRole("searchbox");
        expect(input).toHaveAttribute("aria-label", "test label");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLDivElement>();
        render(
            <SearchField ref={ref} data-testid="field" label="Label" />
        );

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLDivElement).toBeTruthy();
    });

    it("should support input refs", () => {
        const ref = createRef<HTMLInputElement>();
        render(
            <SearchField inputRef={ref} data-testid="field" label="Label" />
        );

        expect(ref.current).toBe(screen.getByRole("searchbox"));
        expect(ref.current instanceof HTMLInputElement).toBeTruthy();
    });

    it("should support and merge input ref on context", () => {
        const inputRef = createRef<HTMLInputElement>();
        const contextInputRef = createRef<HTMLInputElement>();
        render(
            <SearchFieldContext.Provider value={{ inputRef: contextInputRef }}>
                <SearchField inputRef={inputRef} label="Label" />
            </SearchFieldContext.Provider>
        );

        const element = screen.getByRole("searchbox");
        expect(inputRef.current).toBe(element);
        expect(contextInputRef.current).toBe(element);
    });

    it("should call onClear when a the clear button is pressed", async () => {
        const user = userEvent.setup();
        const handleClear = jest.fn();
        render(
            <SearchField onClear={handleClear} defaultValue="There is some text in the input" label="Label" />
        );

        const clearButton = screen.getByLabelText("Clear");
        await user.click(clearButton);

        expect(handleClear).toHaveBeenCalledTimes(1);
    });
});

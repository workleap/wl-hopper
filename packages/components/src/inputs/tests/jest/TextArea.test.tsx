import { render, screen, waitFor } from "@hopper-ui/test-utils";
import { createRef } from "react";

import { TextArea } from "../../src/TextArea.tsx";
import { TextAreaContext } from "../../src/TextAreaContext.ts";

describe("TextArea", () => {
    beforeAll(() => {
        Object.defineProperty(document, "fonts", {
            value: { ready: Promise.resolve({}) }
        });
    });

    it("should render with default class", async () => {
        render(
            <TextArea data-testid="field" label="Label" />
        );

        const element = screen.getByTestId("field");
        await waitFor(() => expect(element).toHaveClass("hop-TextArea"));
    });

    it("should support custom class", async () => {
        render(
            <TextArea className="test" data-testid="field" label="Label" />
        );

        const element = screen.getByTestId("field");
        await waitFor(() => expect(element).toHaveClass("hop-TextArea"));
        await waitFor(() => expect(element).toHaveClass("test"));
    });

    it("should support custom style", async () => {
        render(
            <TextArea data-testid="field" marginTop="stack-sm" style={{ marginBottom: "13px" }} label="Label" />
        );

        const element = screen.getByTestId("field");
        await waitFor(() => expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" }));
    });

    it("should support DOM props", async () => {
        render(
            <TextArea data-testid="field" data-foo="bar" label="Label" />
        );

        const element = screen.getByTestId("field");
        await waitFor(() => expect(element).toHaveAttribute("data-foo", "bar"));
    });

    it("should support slots", async () => {
        render(
            <TextAreaContext.Provider value={{ slots: { test: { "aria-label": "test label" } } }}>
                <TextArea data-testid="field" slot="test" />
            </TextAreaContext.Provider>
        );
        const element = screen.getByTestId("field");
        await waitFor(() => expect(element).toHaveAttribute("slot", "test"));

        const input = screen.getByRole("textbox");
        await waitFor(() => expect(input).toHaveAttribute("aria-label", "test label"));
    });

    it("should support refs", async () => {
        const ref = createRef<HTMLDivElement>();
        render(
            <TextArea ref={ref} data-testid="field" label="Label" />
        );

        await waitFor(() => expect(ref.current).not.toBeNull());
        await waitFor(() => expect(ref.current instanceof HTMLDivElement).toBeTruthy());
    });

    it("should support input refs", async () => {
        const ref = createRef<HTMLTextAreaElement>();
        render(
            <TextArea inputRef={ref} data-testid="field" label="Label" />
        );

        await waitFor(() => expect(ref.current).toBe(screen.getByRole("textbox")));
        await waitFor(() => expect(ref.current instanceof HTMLTextAreaElement).toBeTruthy());
    });

    it("should support and merge input ref on context", async () => {
        const inputRef = createRef<HTMLTextAreaElement>();
        const contextInputRef = createRef<HTMLTextAreaElement>();
        render(
            <TextAreaContext.Provider value={{ inputRef: contextInputRef }}>
                <TextArea inputRef={inputRef} label="Label" />
            </TextAreaContext.Provider>
        );

        const element = screen.getByRole("textbox");
        await waitFor(() => expect(inputRef.current).toBe(element));
        await waitFor(() => expect(contextInputRef.current).toBe(element));
    });

    it("should show character count when empty", async () => {
        const defaultValue = "";
        const maxLength = 20;
        const expectedResult = maxLength - defaultValue.length;

        render(
            <TextArea defaultValue={defaultValue} showCharacterCount maxLength={maxLength} label="Label" />
        );

        const characterCount = screen.queryByText(expectedResult.toString());
        await waitFor(() => expect(characterCount).toBeInTheDocument());
    });

    it("should show character count when maxed", async () => {
        const defaultValue = "1111111111";

        render(
            <TextArea defaultValue={defaultValue} showCharacterCount maxLength={defaultValue.length} label="Label" />
        );

        const characterCount = screen.queryByText(0);
        await waitFor(() => expect(characterCount).toBeInTheDocument());
    });

    it("should show character count", async () => {
        const defaultValue = "1111111111";
        const maxLength = 20;
        const expectedResult = maxLength - defaultValue.length;

        render(
            <TextArea defaultValue={defaultValue} showCharacterCount maxLength={maxLength} label="Label" />
        );

        const characterCount = screen.queryByText(expectedResult.toString());
        await waitFor(() => expect(characterCount).toBeInTheDocument());
    });
});

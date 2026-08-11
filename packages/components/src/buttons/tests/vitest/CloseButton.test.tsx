import { act, render, screen, waitFor } from "@hopper-ui/test-utils";
import { createRef } from "react";

import { CloseButton } from "../../src/CloseButton.tsx";
import { CloseButtonContext } from "../../src/CloseButtonContext.ts";

describe("CloseButton", () => {
    it("should render with default class", () => {
        render(<CloseButton />);

        const element = screen.getByRole("button");
        expect(element).toHaveClass("hop-CloseButton");
    });

    it("should support custom class", () => {
        render(<CloseButton className="test" />);

        const element = screen.getByRole("button");
        expect(element).toHaveClass("hop-CloseButton");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<CloseButton marginTop="stack-sm" style={{ marginBottom: "13px" }} />);

        const element = screen.getByRole("button");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<CloseButton data-foo="bar" />);

        const element = screen.getByRole("button");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <CloseButtonContext.Provider value={{ slots: { test: { "aria-label": "test" } } }}>
                <CloseButton slot="test" />
            </CloseButtonContext.Provider>
        );

        const element = screen.getByRole("button");
        expect(element).toHaveAttribute("slot", "test");
        expect(element).toHaveAttribute("aria-label", "test");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLButtonElement>();
        render(<CloseButton ref={ref} />);

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLButtonElement).toBeTruthy();
    });

    it("should support form props", () => {
        render(<form id="foo"><CloseButton form="foo" formMethod="post" /></form>);

        const button = screen.getByRole("button");
        expect(button).toHaveAttribute("form", "foo");
        expect(button).toHaveAttribute("formMethod", "post");
    });

    // ***** Api *****
    it("should be focused on render when the focus api is called", async () => {
        const ref = createRef<HTMLButtonElement>();

        render(<CloseButton ref={ref} />);

        act(() => {
            ref.current?.focus();
        });

        await waitFor(() => expect(ref.current).toHaveFocus());
    });
});

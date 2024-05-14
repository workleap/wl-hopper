import { act, screen, waitFor, render } from "@hopper-ui/test-utils";
import { userEvent } from "@testing-library/user-event";
import { createRef } from "react";

import { ClearButton } from "../../src/ClearButton.tsx";
import { ClearButtonContext } from "../../src/ClearButtonContext.ts";

describe("ClearButton", () => {
    it("should render with default class", () => {
        render(<ClearButton />);

        const element = screen.getByRole("button");
        expect(element).toHaveClass("hop-ClearButton");
    });

    it("should support custom class", () => {
        render(<ClearButton className="test" />);

        const element = screen.getByRole("button");
        expect(element).toHaveClass("hop-ClearButton");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<ClearButton marginTop="stack-sm" style={{ marginBottom: "13px" }} />);

        const element = screen.getByRole("button");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<ClearButton data-foo="bar" />);

        const element = screen.getByRole("button");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <ClearButtonContext.Provider value={{ slots: { test: { "aria-label": "test" } } }}>
                <ClearButton slot="test" />
            </ClearButtonContext.Provider>
        );

        const element = screen.getByRole("button");
        expect(element).toHaveAttribute("slot", "test");
        expect(element).toHaveAttribute("aria-label", "test");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLButtonElement>();
        render(<ClearButton ref={ref} />);

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLButtonElement).toBeTruthy();
    });

    it("should support form props", () => {
        render(<form id="foo"><ClearButton form="foo" formMethod="post" /></form>);

        const button = screen.getByRole("button");
        expect(button).toHaveAttribute("form", "foo");
        expect(button).toHaveAttribute("formMethod", "post");
    });

    /** Loading */
    it("should show a spinner when the button is loading", async () => {
        render(<ClearButton isLoading />
        );

        const element = screen.getByRole("progressbar");
        expect(element).not.toBeNull();
    });

    it("should add data-loading and disabled attributes when the button is loading", async () => {
        render(<ClearButton isLoading />);

        const element = screen.getByRole("button");
        expect(element).toHaveAttribute("data-loading", "true");
        expect(element).toHaveAttribute("disabled");
    });

    it("should prevent onPress when the button is loading", async () => {
        const handler = jest.fn();
        const user = userEvent.setup();

        render(<ClearButton isLoading onPress={handler} />
        );

        const element = screen.getByRole("button");
        await user.click(element);

        expect(handler).not.toHaveBeenCalled();
    });

    // ***** Api *****
    it("should be focused on render when the focus api is called", async () => {
        const ref = createRef<HTMLButtonElement>();

        render(<ClearButton ref={ref} />);

        act(() => {
            ref.current?.focus();
        });

        await waitFor(() => expect(ref.current).toHaveFocus());
    });
});

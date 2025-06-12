import { render, screen } from "@hopper-ui/test-utils";
import { userEvent, waitFor } from "storybook/test";
import { act, createRef } from "react";

import { ToggleButton } from "../../src/ToggleButton.tsx";
import { ToggleButtonContext } from "../../src/ToggleButtonContext.ts";


describe("ToggleButton", () => {
    it("should render with default class", () => {
        render(<ToggleButton>Cutoff</ToggleButton>);

        const element = screen.getByRole("button");
        expect(element).toHaveClass("hop-ToggleButton");
    });

    it("should support custom class", () => {
        render(<ToggleButton className="test">Cutoff</ToggleButton>);

        const element = screen.getByRole("button");
        expect(element).toHaveClass("hop-ToggleButton");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<ToggleButton marginTop="stack-sm" style={{ marginBottom: "13px" }} >Cutoff</ToggleButton>);

        const element = screen.getByRole("button");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<ToggleButton data-foo="bar">Cutoff</ToggleButton>);

        const element = screen.getByRole("button");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <ToggleButtonContext.Provider value={{ slots: { test: { "aria-label": "test" } } }}>
                <ToggleButton slot="test">Cutoff</ToggleButton>
            </ToggleButtonContext.Provider>
        );

        const element = screen.getByRole("button");
        expect(element).toHaveAttribute("slot", "test");
        expect(element).toHaveAttribute("aria-label", "test");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLButtonElement>();
        render(<ToggleButton ref={ref}>Cutoff</ToggleButton>);

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLButtonElement).toBeTruthy();
    });

    /** Loading */
    it("should show a spinner when the button is loading", async () => {
        render(<ToggleButton isLoading>Loading Button</ToggleButton>);

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 3000));
        });

        const element = screen.getByRole("progressbar");
        expect(element).not.toBeNull();
    });

    it("should add aria-disabled attribute when the button is loading", async () => {
        render(<ToggleButton isLoading>Loading Button</ToggleButton>);

        const element = screen.getByRole("button");
        expect(element).toHaveAttribute("data-disabled");
    });

    it("should prevent onPress when the button is loading", async () => {
        const handler = jest.fn();
        const user = userEvent.setup();

        render(<ToggleButton isLoading onPress={handler}>Loading Button</ToggleButton>
        );

        const element = screen.getByRole("button");
        await user.click(element);

        expect(handler).not.toHaveBeenCalled();
    });

    // ***** Api *****
    it("should be focused on render when the focus api is called", async () => {
        const ref = createRef<HTMLButtonElement>();

        render(<ToggleButton ref={ref}>Cutoff</ToggleButton>);

        act(() => {
            ref.current?.focus();
        });

        await waitFor(() => expect(ref.current).toHaveFocus());
    });
});

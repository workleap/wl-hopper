import { act, render, screen, waitFor } from "@hopper-ui/test-utils";
import { userEvent } from "@testing-library/user-event";
import { createRef } from "react";

import { Button } from "../../src/Button.tsx";
import { ButtonContext } from "../../src/ButtonContext.ts";

describe("Button", () => {
    it("should render with default class", () => {
        render(<Button>Cutoff</Button>);

        const element = screen.getByRole("button");
        expect(element).toHaveClass("hop-Button");
    });

    it("should support custom class", () => {
        render(<Button className="test">Cutoff</Button>);

        const element = screen.getByRole("button");
        expect(element).toHaveClass("hop-Button");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<Button marginTop="stack-sm" style={{ marginBottom: "13px" }} >Cutoff</Button>);

        const element = screen.getByRole("button");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<Button data-foo="bar">Cutoff</Button>);

        const element = screen.getByRole("button");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <ButtonContext.Provider value={{ slots: { test: { "aria-label": "test" } } }}>
                <Button slot="test">Cutoff</Button>
            </ButtonContext.Provider>
        );

        const element = screen.getByRole("button");
        expect(element).toHaveAttribute("slot", "test");
        expect(element).toHaveAttribute("aria-label", "test");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLButtonElement>();
        render(<Button ref={ref}>Cutoff</Button>);

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLButtonElement).toBeTruthy();
    });

    it("should support form props", () => {
        render(<form id="foo"><Button form="foo" formMethod="post">Test</Button></form>);

        const button = screen.getByRole("button");
        expect(button).toHaveAttribute("form", "foo");
        expect(button).toHaveAttribute("formMethod", "post");
    });

    /** Loading */
    it("should add data-pending and aria-disabled attribute when the button is loading", async () => {
        render(<Button isLoading >Loading Button</Button>);

        const element = screen.getByRole("button");
        expect(element).toHaveAttribute("data-pending", "true");
        expect(element).toHaveAttribute("aria-disabled");
    });

    it("should prevent onPress when the button is loading", async () => {
        const handler = jest.fn();
        const user = userEvent.setup();

        render(<Button isLoading onPress={handler}>Loading Button</Button>
        );

        const element = screen.getByRole("button");
        await user.click(element);

        expect(handler).not.toHaveBeenCalled();
    });

    // ***** Api *****
    it("should be focused on render when the focus api is called", async () => {
        const ref = createRef<HTMLButtonElement>();

        render(<Button ref={ref}>Cutoff</Button>);

        act(() => {
            ref.current?.focus();
        });

        await waitFor(() => expect(ref.current).toHaveFocus());
    });
});

import { act, render, screen, waitFor } from "@hopper-ui/test-utils";
import { userEvent } from "@testing-library/user-event";
import { createRef, type PropsWithChildren } from "react";
import { createMemoryRouter, RouterProvider, useNavigate } from "react-router-dom";

import { HopperProvider } from "../../../hopper-provider/index.ts";
import { LinkButton } from "../../src/LinkButton.tsx";
import { LinkButtonContext } from "../../src/LinkButtonContext.ts";

function WithReactRouterProvider({ children }: PropsWithChildren) {
    const navigate = useNavigate();

    return (
        <HopperProvider colorScheme="light" navigate={navigate}>
            {children}
        </HopperProvider>
    );
}

describe("LinkButton", () => {
    it("should render with default class", () => {
        render(<LinkButton>Cutoff</LinkButton>);

        const element = screen.getByRole("link");
        expect(element).toHaveClass("hop-LinkButton");
    });

    it("should support custom class", () => {
        render(<LinkButton className="test">Cutoff</LinkButton>);

        const element = screen.getByRole("link");
        expect(element).toHaveClass("hop-LinkButton");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<LinkButton marginTop="stack-sm" style={{ marginBottom: "13px" }}>Cutoff</LinkButton>);

        const element = screen.getByRole("link");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<LinkButton data-foo="bar">Cutoff</LinkButton>);

        const element = screen.getByRole("link");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <LinkButtonContext.Provider value={{ slots: { test: { "aria-label": "test" } } }}>
                <LinkButton slot="test">Cutoff</LinkButton>
            </LinkButtonContext.Provider>
        );

        const element = screen.getByRole("link");
        expect(element).toHaveAttribute("slot", "test");
        expect(element).toHaveAttribute("aria-label", "test");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLAnchorElement>();
        render(<LinkButton href="https://www.google.com" ref={ref}>Cutoff</LinkButton>);

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLAnchorElement).toBeTruthy();
    });

    /** Link specific tests */
    it("should render as an anchor when the href prop is provided", () => {
        render(<LinkButton href="https://www.google.com">Go</LinkButton>);

        const element = screen.getByRole("link");
        expect(element).toBeInstanceOf(HTMLAnchorElement);
        expect(element).toHaveAttribute("href", "https://www.google.com");
    });

    it("should render as a span with role='link' when the href prop is not provided", () => {
        render(<LinkButton>Go</LinkButton>);

        const element = screen.getByRole("link");
        expect(element).toBeInstanceOf(HTMLSpanElement);
    });

    it("should call the navigate function when the href prop is provided and the provider has been set", async () => {
        const handler = jest.fn();
        const user = userEvent.setup();

        render(<HopperProvider colorScheme="light" navigate={handler}><LinkButton href="/123">Go</LinkButton></HopperProvider>);

        const element = screen.getByRole("link");

        await user.click(element);

        expect(handler).toHaveBeenCalled();
    });

    it("should call the navigate function when the href prop is provided and the provider has been set with react-router-dom's navigate function", async () => {
        const router = createMemoryRouter([{
            path: "/123",
            element: <div>test page</div>
        }, {
            path: "*",
            element: (
                <WithReactRouterProvider >
                    <LinkButton href="/123">Go</LinkButton>
                </WithReactRouterProvider>
            )
        }], {
            initialEntries: ["/"]
        });

        render(
            <RouterProvider router={router} />
        );

        const element = screen.getByRole("link");
        await userEvent.click(element);

        expect(screen.getByText("test page")).toBeInTheDocument();
    });

    // ***** Api *****
    it("should be focused on render when the focus api is called", async () => {
        const ref = createRef<HTMLAnchorElement>();

        render(<LinkButton href="https://www.google.com" ref={ref}>Cutoff</LinkButton>);

        act(() => {
            ref.current?.focus();
        });

        await waitFor(() => expect(ref.current).toHaveFocus());
    });
});

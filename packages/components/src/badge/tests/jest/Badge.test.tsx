import { render, screen } from "@hopper-ui/test-utils";
import { createRef } from "react";

import { Badge } from "../../src/Badge.tsx";
import { BadgeContext } from "../../src/BadgeContext.ts";

describe("Badge", () => {
    it("should render with default class", () => {
        render(<Badge data-testid="badge">12</Badge>);

        const element = screen.getByTestId("badge");
        expect(element).toHaveClass("hop-Badge");
    });

    it("should support custom class", () => {
        render(<Badge data-testid="badge" className="test">12</Badge>);

        const element = screen.getByTestId("badge");
        expect(element).toHaveClass("hop-Badge");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<Badge data-testid="badge" marginTop="stack-sm" style={{ marginBottom: "13px" }} >12</Badge>);

        const element = screen.getByTestId("badge");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<Badge data-testid="badge" data-foo="bar">12</Badge>);

        const element = screen.getByTestId("badge");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <BadgeContext.Provider value={{ slots: { test: { "aria-label": "test" } } }}>
                <Badge data-testid="badge" slot="test">12</Badge>
            </BadgeContext.Provider>
        );

        const element = screen.getByTestId("badge");
        expect(element).toHaveAttribute("slot", "test");
        expect(element).toHaveAttribute("aria-label", "test");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLSpanElement>();
        render(<Badge data-testid="badge" ref={ref}>12</Badge>);

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLSpanElement).toBeTruthy();
    });

    it("should support disabled state", () => {
        render(<Badge
            data-testid="badge"
            isDisabled
            className={({ isDisabled }) => (isDisabled ? "disabled" : "")}
        >12</Badge>);

        const element = screen.getByTestId("badge");

        expect(element).toHaveAttribute("data-disabled");
        expect(element).toHaveAttribute("aria-disabled");
        expect(element).toHaveClass("disabled");
    });

    it("should support indeterminate state", () => {
        render(<Badge
            data-testid="badge"
            isIndeterminate
            className={({ isIndeterminate }) => (isIndeterminate ? "indeterminate" : "")}
        >12</Badge>);

        const element = screen.getByTestId("badge");

        expect(element).toHaveAttribute("data-indeterminate");
        expect(element).toHaveClass("indeterminate");
    });
});

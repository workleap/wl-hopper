import { render, screen } from "@hopper-ui/test-utils";
import { createRef } from "react";

import { Card } from "../../src/Card.tsx";
import { CardContext } from "../../src/CardContext.ts";

describe("Card", () => {
    it("should render with default class", () => {
        render(<Card data-testid="Card">12</Card>);

        const element = screen.getByTestId("Card");
        expect(element).toHaveClass("hop-Card");
    });

    it("should support custom class", () => {
        render(<Card data-testid="Card" className="test">12</Card>);

        const element = screen.getByTestId("Card");
        expect(element).toHaveClass("hop-Card");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<Card data-testid="Card" marginTop="stack-sm" style={{ marginBottom: "13px" }} >12</Card>);

        const element = screen.getByTestId("Card");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<Card data-testid="Card" data-foo="bar">12</Card>);

        const element = screen.getByTestId("Card");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <CardContext.Provider value={{ slots: { test: { "aria-label": "test" } } }}>
                <Card data-testid="Card" slot="test">12</Card>
            </CardContext.Provider>
        );

        const element = screen.getByTestId("Card");
        expect(element).toHaveAttribute("slot", "test");
        expect(element).toHaveAttribute("aria-label", "test");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLDivElement>();
        render(<Card data-testid="Card" ref={ref}>12</Card>);

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLDivElement).toBeTruthy();
    });
});

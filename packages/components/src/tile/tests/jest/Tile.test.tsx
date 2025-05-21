import { render, screen } from "@hopper-ui/test-utils";
import { createRef } from "react";

import { Tile, TileContext } from "../../src/index.ts";

describe("Tile", () => {
    it("should render with default class", () => {
        render(<Tile id="12" data-testid="Tile">12</Tile>);

        const element = screen.getByRole("button");
        expect(element).toHaveClass("hop-Tile");
    });

    it("should support custom class", () => {
        render(<Tile id="12" className="test">12</Tile>);

        const element = screen.getByRole("button");
        expect(element).toHaveClass("hop-Tile");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<Tile id="12" marginTop="stack-sm" style={{ marginBottom: "13px" }} >12</Tile>);

        const element = screen.getByRole("button");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<Tile id="12" data-foo="bar">12</Tile>);

        const element = screen.getByRole("button");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <TileContext.Provider value={{ slots: { test: { "aria-label": "test", id: "12" } } }}>
                <Tile id="12" slot="test">12</Tile>
            </TileContext.Provider>
        );

        const element = screen.getByRole("button");
        expect(element).toHaveAttribute("slot", "test");
        expect(element).toHaveAttribute("aria-label", "test");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLButtonElement>();
        render(<Tile id="12" ref={ref}>12</Tile>);

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLButtonElement).toBeTruthy();
    });
});

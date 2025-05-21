/* eslint-disable testing-library/no-node-access */
/* Using closest to get the label is the best way, even react-aria does this. */
import { render, screen } from "@hopper-ui/test-utils";
import { createRef } from "react";

import { Tile, TileGroup, TileGroupContext } from "../../src/index.ts";

describe("TileGroup", () => {
    it("should render with default class", () => {
        render(<TileGroup aria-label="options"><Tile id="day">Day</Tile><Tile id="week">Week</Tile></TileGroup>);

        const element = screen.getByRole("radiogroup");
        expect(element).toHaveClass("hop-TileGroup");
    });

    it("should support custom class", () => {
        render(<TileGroup aria-label="options" className="test"><Tile id="option1">option 1</Tile><Tile id="option2">option 2</Tile></TileGroup>);

        const element = screen.getByRole("radiogroup");
        expect(element).toHaveClass("hop-TileGroup");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<TileGroup aria-label="options" marginTop="stack-sm" style={{ marginBottom: "13px" }}>
            <Tile id="option1">option 1</Tile>
            <Tile id="option2">option 2</Tile>
        </TileGroup>);

        const element = screen.getByRole("radiogroup");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<TileGroup aria-label="options" data-foo="bar"><Tile id="option1">option 1</Tile><Tile id="option2">option 2</Tile></TileGroup>);

        const element = screen.getByRole("radiogroup");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <TileGroupContext.Provider value={{ slots: { test: { "aria-label": "test" } } }}>
                <TileGroup slot="test"><Tile id="option1">option 1</Tile><Tile id="option2">option 2</Tile></TileGroup>
            </TileGroupContext.Provider>
        );

        const element = screen.getByRole("radiogroup");

        expect(element).toHaveAttribute("slot", "test");
        expect(element).toHaveAttribute("aria-label", "test");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLDivElement>();
        render(<TileGroup aria-label="options" ref={ref}><Tile id="option1">option 1</Tile><Tile id="option2">option 2</Tile></TileGroup>);

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLDivElement).toBeTruthy();
    });

    it("should be disabled and pass it to Tile.", () => {
        render(<TileGroup aria-label="options" isDisabled><Tile id="option1">option 1</Tile><Tile id="option2">option 2</Tile></TileGroup>);

        const element = screen.getByRole("radiogroup");
        expect(element).toHaveAttribute("data-disabled", "true");

        const [item] = screen.getAllByRole("radio");
        expect(item).toHaveAttribute("data-disabled", "true");

        expect(item).toBeDisabled();
    });
});

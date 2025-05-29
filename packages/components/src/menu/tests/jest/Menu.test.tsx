import { render, screen } from "@hopper-ui/test-utils";
import { createRef } from "react";

import { Button } from "../../../buttons/index.ts";
import { Menu, MenuContext, MenuItem, MenuTrigger } from "../../src/index.ts";

describe("Menu", () => {
    it("should render with default class", () => {
        render(
            <MenuTrigger isOpen>
                <Button>Menu Button</Button>
                <Menu>
                    <MenuItem>Test</MenuItem>
                </Menu>
            </MenuTrigger>
        );

        const element = screen.getByRole("menu");
        expect(element).toHaveClass("hop-Menu");
    });

    it("should support custom class", () => {
        render(
            <MenuTrigger isOpen>
                <Button>Menu Button</Button>
                <Menu className="test">
                    <MenuItem>Test</MenuItem>
                </Menu>
            </MenuTrigger>
        );

        const element = screen.getByRole("menu");
        expect(element).toHaveClass("hop-Menu");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(
            <MenuTrigger isOpen>
                <Button>Menu Button</Button>
                <Menu marginTop="stack-sm" style={{ marginBottom: "13px" }}>
                    <MenuItem>Test</MenuItem>
                </Menu>
            </MenuTrigger>);

        const element = screen.getByRole("menu");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(
            <MenuTrigger isOpen>
                <Button>Menu Button</Button>
                <Menu aria-label="options" data-foo="bar">
                    <MenuItem>Test</MenuItem>
                </Menu>
            </MenuTrigger>
        );

        const element = screen.getByRole("menu");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <MenuContext.Provider value={{ slots: { test: { "aria-label": "test" } } }}>
                <MenuTrigger isOpen>
                    <Button>Menu Button</Button>
                    <Menu slot="test">
                        <MenuItem>Test</MenuItem>
                    </Menu>
                </MenuTrigger>
            </MenuContext.Provider>
        );

        const element = screen.getByRole("menu");

        expect(element).toHaveAttribute("slot", "test");
        expect(element).toHaveAttribute("aria-label", "test");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLDivElement>();
        render(
            <MenuTrigger isOpen>
                <Button>Menu Button</Button>
                <Menu ref={ref}>
                    <MenuItem>Test</MenuItem>
                </Menu>
            </MenuTrigger>
        );

        expect(ref.current).not.toBeNull();
    });
});

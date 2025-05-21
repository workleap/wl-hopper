/* eslint-disable testing-library/no-node-access */
/* Using closest to get the label is the best way, even react-aria does this. */
import { render, screen } from "@hopper-ui/test-utils";
import { createRef } from "react";

import { Heading } from "../../../typography/index.ts";
import { CustomModal, CustomModalContext } from "../../src/index.ts";

describe("CustomModal", () => {
    it("should render with default class", () => {
        render(<CustomModal isOpen><Heading slot="title">Test</Heading></CustomModal>);

        const element = screen.getByRole("dialog");
        expect(element).toHaveClass("hop-CustomModal");
    });

    it("should support custom class", () => {
        render(<CustomModal isOpen className="test"><Heading slot="title">Test</Heading></CustomModal>);

        const element = screen.getByRole("dialog");
        expect(element).toHaveClass("hop-CustomModal");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<CustomModal isOpen marginTop="stack-sm" style={{ marginBottom: "13px" }}><Heading slot="title">Test</Heading></CustomModal>);

        const element = screen.getByRole("dialog");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<CustomModal isOpen aria-label="options" data-foo="bar"><Heading slot="title">Test</Heading></CustomModal>);

        const element = screen.getByRole("dialog");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <CustomModalContext.Provider value={{ slots: { test: { "aria-label": "test" } } }}>
                <CustomModal isOpen slot="test"><Heading slot="title">Test</Heading></CustomModal>
            </CustomModalContext.Provider>
        );

        const element = screen.getByRole("dialog");

        expect(element).toHaveAttribute("slot", "test");
        expect(element).toHaveAttribute("aria-label", "test");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLDivElement>();
        render(<CustomModal isOpen aria-label="options" ref={ref}><Heading slot="title">Test</Heading></CustomModal>);

        expect(ref.current).not.toBeNull();
    });
});

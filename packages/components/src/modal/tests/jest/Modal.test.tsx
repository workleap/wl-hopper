/* eslint-disable testing-library/no-node-access */
/* Using closest to get the label is the best way, even react-aria does this. */
import { render, screen } from "@hopper-ui/test-utils";
import { createRef } from "react";

import { Heading } from "../../../typography/index.ts";
import { Modal, ModalContext } from "../../src/index.ts";

describe("Modal", () => {
    it("should render with default class", () => {
        render(<Modal isOpen><Heading>Test</Heading></Modal>);

        const element = screen.getByRole("dialog");
        expect(element).toHaveClass("hop-Modal");
    });

    it("should support custom class", () => {
        render(<Modal isOpen className="test"><Heading>Test</Heading></Modal>);

        const element = screen.getByRole("dialog");
        expect(element).toHaveClass("hop-Modal");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<Modal isOpen marginTop="stack-sm" style={{ marginBottom: "13px" }}><Heading>Test</Heading></Modal>);

        const element = screen.getByRole("dialog");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<Modal isOpen aria-label="options" data-foo="bar"><Heading>Test</Heading></Modal>);

        const element = screen.getByRole("dialog");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <ModalContext.Provider value={{ slots: { test: { "aria-label": "test" } } }}>
                <Modal isOpen slot="test"><Heading>Test</Heading></Modal>
            </ModalContext.Provider>
        );

        const element = screen.getByRole("dialog");

        expect(element).toHaveAttribute("slot", "test");
        expect(element).toHaveAttribute("aria-label", "test");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLDivElement>();
        render(<Modal isOpen aria-label="options" ref={ref}><Heading>Test</Heading></Modal>);

        expect(ref.current).not.toBeNull();
    });
});


/* Using closest to get the label is the best way, even react-aria does this. */
import { render, screen } from "@hopper-ui/test-utils";
import { userEvent } from "@testing-library/user-event";
import { createRef } from "react";

import { Button } from "../../../buttons/index.ts";
import { Heading } from "../../../typography/index.ts";
import { Modal, ModalContext, ModalTrigger } from "../../src/index.ts";

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

    it("should call onModalChange when not in a trigger", async () => {
        const user = userEvent.setup();
        const onOpenChange = jest.fn();

        render((
            <Modal defaultOpen onOpenChange={onOpenChange}><Heading>Test</Heading></Modal>
        ));

        // Ensure modal is open
        expect(screen.getByRole("dialog")).toBeInTheDocument();

        // Press Escape
        await user.keyboard("{Escape}");

        // Check if handler was called with false
        expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it("should log warning when onModalChange called and inside a trigger", async () => {
        const logSpy = jest.spyOn(console, "warn").mockImplementation();
        const user = userEvent.setup();
        const onOpenChange = jest.fn();
        const modalOnOpenChange = jest.fn();

        render((
            <ModalTrigger defaultOpen onOpenChange={onOpenChange}>
                <Button>Open Modal</Button>
                <Modal onOpenChange={modalOnOpenChange}><Heading>Test</Heading></Modal>
            </ModalTrigger>
        ));

        // Ensure modal is open
        expect(screen.getByRole("dialog")).toBeInTheDocument();

        // Press Escape
        await user.keyboard("{Escape}");

        // Check if handler was called with false
        expect(onOpenChange).toHaveBeenCalledWith(false);
        expect(modalOnOpenChange).not.toHaveBeenCalledWith(false); // The behavior we are expecting is RAC's. When inside a trigger, the modal's onOpenChange is not called.
        expect(logSpy).toHaveBeenCalledWith("Modal: `onOpenChange` is not supported when using `ModalTrigger`. Use the `onOpenChange` prop of `ModalTrigger` instead. Refer to https://github.com/adobe/react-spectrum/issues/6547");
    });
});

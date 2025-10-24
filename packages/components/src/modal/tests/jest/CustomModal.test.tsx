import { render, screen } from "@hopper-ui/test-utils";
import { userEvent } from "@testing-library/user-event";
import { createRef } from "react";

import { Button } from "../../../buttons/index.ts";
import { Heading } from "../../../typography/index.ts";
import { CustomModal, CustomModalContext, CustomModalTrigger } from "../../src/index.ts";

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

    it("should call onModalChange when not in a trigger", async () => {
        const user = userEvent.setup();
        const onOpenChange = jest.fn();

        render((
            <CustomModal defaultOpen onOpenChange={onOpenChange}><Heading slot="title">Test</Heading></CustomModal>
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
            <CustomModalTrigger defaultOpen onOpenChange={onOpenChange}>
                <Button>Open Modal</Button>
                <CustomModal onOpenChange={modalOnOpenChange}><Heading slot="title">Test</Heading></CustomModal>
            </CustomModalTrigger>
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

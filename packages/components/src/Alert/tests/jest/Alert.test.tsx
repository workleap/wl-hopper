/* eslint-disable testing-library/no-node-access */
/* Using closest to get the label is the best way, even react-aria does this. */
import { render, screen } from "@hopper-ui/test-utils";
import { createRef } from "react";

import { Heading } from "../../../typography/index.ts";
import { Alert, AlertContext } from "../../src/index.ts";

describe("Alert", () => {
    it("should render with default class", () => {
        render(<Alert primaryButtonLabel="Confirm" wrapperProps={{ isOpen: true }}>
            <Heading>Test</Heading>
        </Alert>);

        const element = screen.getByRole("alertdialog");
        expect(element).toHaveClass("hop-Alert");
    });

    it("should support custom class", () => {
        render(<Alert primaryButtonLabel="Confirm" className="test" wrapperProps={{ isOpen: true }}>
            <Heading>Test</Heading>
        </Alert>);

        const element = screen.getByRole("alertdialog");
        expect(element).toHaveClass("hop-Alert");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<Alert primaryButtonLabel="Confirm" marginTop="stack-sm" style={{ marginBottom: "13px" }} wrapperProps={{ isOpen: true }}>
            <Heading>Test</Heading>
        </Alert>);

        const element = screen.getByRole("alertdialog");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<Alert primaryButtonLabel="Confirm" aria-label="alert options" data-foo="bar" wrapperProps={{ isOpen: true }}>
            <Heading>Test</Heading>
        </Alert>);

        const element = screen.getByRole("alertdialog");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <AlertContext.Provider value={{ slots: { test: { "aria-label": "test", primaryButtonLabel: "Confirm" } } }}>
                <Alert primaryButtonLabel="Confirm" slot="test" wrapperProps={{ isOpen: true }}>
                    <Heading>Test</Heading>
                </Alert>
            </AlertContext.Provider>
        );

        const element = screen.getByRole("alertdialog");

        expect(element).toHaveAttribute("slot", "test");
        expect(element).toHaveAttribute("aria-label", "test");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLDivElement>();
        render(<Alert primaryButtonLabel="Confirm" aria-label="alert options" ref={ref} wrapperProps={{ isOpen: true }}>
            <Heading>Test</Heading>
        </Alert>);

        expect(ref.current).not.toBeNull();
    });
});

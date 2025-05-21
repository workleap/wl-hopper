import { SlotProvider } from "@hopper-ui/components";
import { render, screen } from "@hopper-ui/test-utils";
import { createRef } from "react";
import { FieldErrorContext } from "react-aria-components";

import { ErrorMessage } from "../../src/ErrorMessage.tsx";
import { ErrorMessageContext } from "../../src/ErrorMessageContext.ts";

describe("ErrorMessage", () => {
    it("should render with default class", () => {
        render(
            <SlotProvider values={[
                [FieldErrorContext, {
                    isInvalid: true,
                    validationErrors: [] as never[],
                    validationDetails: {} as never
                }]
            ]}
            >
                <ErrorMessage>Test</ErrorMessage>
            </SlotProvider>
        );

        const element = screen.getByText("Test");
        expect(element).toHaveClass("hop-ErrorMessage");
    });

    it("should support custom class", () => {
        render(
            <SlotProvider values={[
                [FieldErrorContext, {
                    isInvalid: true,
                    validationErrors: [] as never[],
                    validationDetails: {} as never
                }]
            ]}
            >
                <ErrorMessage className="test">Test</ErrorMessage>
            </SlotProvider>
        );

        const element = screen.getByText("Test");
        expect(element).toHaveClass("hop-ErrorMessage");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(
            <SlotProvider values={[
                [FieldErrorContext, {
                    isInvalid: true,
                    validationErrors: [] as never[],
                    validationDetails: {} as never
                }]
            ]}
            >
                <ErrorMessage marginTop="stack-sm" style={{ marginBottom: "13px" }} >Test</ErrorMessage>
            </SlotProvider>
        );

        const element = screen.getByText("Test");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(
            <SlotProvider values={[
                [FieldErrorContext, {
                    isInvalid: true,
                    validationErrors: [] as never[],
                    validationDetails: {} as never
                }]
            ]}
            >
                <ErrorMessage data-foo="bar">Test</ErrorMessage>
            </SlotProvider>
        );

        const element = screen.getByText("Test");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <SlotProvider values={[
                [FieldErrorContext, {
                    isInvalid: true,
                    validationErrors: [] as never[],
                    validationDetails: {} as never
                }]
            ]}
            >
                <ErrorMessageContext.Provider value={{ slots: { test: { "aria-label": "test" } } }}>
                    <ErrorMessage slot="test">Test</ErrorMessage>
                </ErrorMessageContext.Provider>
            </SlotProvider>
        );

        const element = screen.getByText("Test");
        expect(element).toHaveAttribute("slot", "test");
        expect(element).toHaveAttribute("aria-label", "test");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLSpanElement>();
        render(
            <SlotProvider values={[
                [FieldErrorContext, {
                    isInvalid: true,
                    validationErrors: [] as never[],
                    validationDetails: {} as never
                }]
            ]}
            >
                <ErrorMessage ref={ref}>Test</ErrorMessage>
            </SlotProvider>
        );

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLSpanElement).toBeTruthy();
    });

    it("should support showing an icon by default", () => {
        render(
            <SlotProvider values={[
                [FieldErrorContext, {
                    isInvalid: true,
                    validationErrors: [] as never[],
                    validationDetails: {} as never
                }]
            ]}
            >
                <ErrorMessage>Test</ErrorMessage>
            </SlotProvider>
        );

        const element = screen.getByText("Test");
        const svgElement = element.querySelector(".hop-Icon");
        
        expect(svgElement).not.toBeNull();
    });

    it("should support hiding the icon", () => {
        render(
            <SlotProvider values={[
                [FieldErrorContext, {
                    isInvalid: true,
                    validationErrors: [] as never[],
                    validationDetails: {} as never
                }]
            ]}
            >
                <ErrorMessage hideIcon>Test</ErrorMessage>
            </SlotProvider>
        );

        const element = screen.getByText("Test");
        const svgElement = element.querySelector(".hop-Icon");
        
        expect(svgElement).toBeNull();
    });
});

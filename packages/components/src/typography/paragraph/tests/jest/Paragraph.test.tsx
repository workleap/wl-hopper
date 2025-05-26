import { render, screen } from "@hopper-ui/test-utils";
import { createRef } from "react";

import { ButtonGroupContext } from "../../../../buttons/src/ButtonGroupContext.ts";
import { TextContext } from "../../../text/index.ts";
import { Paragraph } from "../../src/Paragraph.tsx";

describe("Paragraph", () => {
    it("should render with default class", () => {
        render(<Paragraph>Test</Paragraph>);

        const element = screen.getByText("Test");
        expect(element).toHaveClass("hop-Text");
    });

    it("should support custom class", () => {
        render(<Paragraph className="test">Test</Paragraph>);

        const element = screen.getByText("Test");
        expect(element).toHaveClass("hop-Text");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<Paragraph marginTop="stack-sm" style={{ marginBottom: "13px" }}>Test</Paragraph>);

        const element = screen.getByText("Test");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<Paragraph data-foo="bar">Test</Paragraph>);

        const element = screen.getByText("Test");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <TextContext.Provider value={{ slots: { test: { "aria-label": "test" } } }}>
                <Paragraph slot="test">Test</Paragraph>
            </TextContext.Provider>
        );

        const element = screen.getByText("Test");
        expect(element).toHaveAttribute("slot", "test");
        expect(element).toHaveAttribute("aria-label", "test");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLParagraphElement>();
        render(<Paragraph ref={ref}>Test</Paragraph>);

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLParagraphElement).toBeTruthy();
    });

    it("should set size inherit on nested text", () => {
        render(<Paragraph>Test <Paragraph>Nested</Paragraph></Paragraph>);

        const element = screen.getByText("Nested");
        expect(element).toHaveClass("hop-Text--inherit");
    });

    it("should stop context propagation on nested text", () => {
        render(
            <ButtonGroupContext.Provider value={{ className: "testClass" }}>
                <Paragraph>Test <Paragraph>Nested</Paragraph></Paragraph>
            </ButtonGroupContext.Provider>
        );

        const element = screen.getByText("Nested");
        expect(element).not.toHaveClass("testClass");
    });
});

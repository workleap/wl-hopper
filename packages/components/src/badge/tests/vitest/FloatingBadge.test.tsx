import { Div } from "@hopper-ui/styled-system";
import { render, screen } from "@hopper-ui/test-utils";
import { createRef } from "react";

import { FloatingBadgeContext, Badge, FloatingBadge } from "../../index.ts";

describe("Badge", () => {
    it("should render with default class", () => {
        render(
            <FloatingBadge data-testid="floating-badge">
                <Div height="core_320" width="core_320" backgroundColor="primary-weak" />
                <Badge>Text</Badge>
            </FloatingBadge>
        );

        const element = screen.getByTestId("floating-badge");
        expect(element).toHaveClass("hop-FloatingBadge");
    });

    it("should support custom class", () => {
        render(
            <FloatingBadge data-testid="floating-badge" className="test">
                <Div height="core_320" width="core_320" backgroundColor="primary-weak" />
                <Badge>Text</Badge>
            </FloatingBadge>
        );

        const element = screen.getByTestId("floating-badge");
        expect(element).toHaveClass("hop-FloatingBadge");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(
            <FloatingBadge data-testid="floating-badge" marginTop="stack-sm" style={{ marginBottom: "13px" }}>
                <Div height="core_320" width="core_320" backgroundColor="primary-weak" />
                <Badge>Text</Badge>
            </FloatingBadge>
        );

        const element = screen.getByTestId("floating-badge");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(
            <FloatingBadge data-testid="floating-badge" data-foo="bar">
                <Div height="core_320" width="core_320" backgroundColor="primary-weak" />
                <Badge>Text</Badge>
            </FloatingBadge>
        );

        const element = screen.getByTestId("floating-badge");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <FloatingBadgeContext.Provider value={{ slots: { test: { "aria-label": "test" } } }}>
                <FloatingBadge data-testid="floating-badge" slot="test">
                    <Div height="core_320" width="core_320" backgroundColor="primary-weak" />
                    <Badge>Text</Badge>
                </FloatingBadge>
            </FloatingBadgeContext.Provider>
        );

        const element = screen.getByTestId("floating-badge");
        expect(element).toHaveAttribute("slot", "test");
        expect(element).toHaveAttribute("aria-label", "test");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLDivElement>();
        render(
            <FloatingBadge data-testid="floating-badge" ref={ref}>
                <Div height="core_320" width="core_320" backgroundColor="primary-weak" />
                <Badge>Text</Badge>
            </FloatingBadge>
        );

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLDivElement).toBeTruthy();
    });

    it("should render data attributes when it is a circle", () => {
        render(
            <FloatingBadge data-testid="floating-badge" overlap="circular">
                <Div height="core_320" width="core_320" borderRadius="circle" backgroundColor="primary-weak" />
                <Badge>Text</Badge>
            </FloatingBadge>
        );

        const element = screen.getByTestId("floating-badge");
        expect(element).toHaveAttribute("data-overlap", "circular");
    });

    it("should render data attribute for placement", () => {
        render(
            <FloatingBadge data-testid="floating-badge" placement="bottom right">
                <Div height="core_320" width="core_320" borderRadius="circle" backgroundColor="primary-weak" />
                <Badge>Text</Badge>
            </FloatingBadge>
        );

        const element = screen.getByTestId("floating-badge");
        expect(element).toHaveAttribute("data-placement", "bottom right");
    });
});

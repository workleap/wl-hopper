import { render, screen } from "@hopper-ui/test-utils";
import { createRef } from "react";

import { DisclosureHeader, DisclosurePanel } from "../../index.ts";
import { Disclosure } from "../../src/Disclosure.tsx";
import { DisclosureContext } from "../../src/DisclosureContext.ts";

describe("Disclosure", () => {
    it("should render with default class", () => {
        render(
            <Disclosure data-testid="disclosure">
                <DisclosureHeader>
                    Disclosure Header
                </DisclosureHeader>
                <DisclosurePanel>
                Disclosure Panel
                </DisclosurePanel>
            </Disclosure>
        );

        const element = screen.getByTestId("disclosure");
        expect(element).toHaveClass("hop-Disclosure");
    });

    it("should support custom class", () => {
        render(
            <Disclosure data-testid="disclosure" className="test">
                <DisclosureHeader>
                    Disclosure Header
                </DisclosureHeader>
                <DisclosurePanel>
                Disclosure Panel
                </DisclosurePanel>
            </Disclosure>
        );

        const element = screen.getByTestId("disclosure");
        expect(element).toHaveClass("hop-Disclosure");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(
            <Disclosure data-testid="disclosure" marginTop="stack-sm" style={{ marginBottom: "13px" }}>
                <DisclosureHeader>
                    Disclosure Header
                </DisclosureHeader>
                <DisclosurePanel>
                Disclosure Panel
                </DisclosurePanel>
            </Disclosure>
        );

        const element = screen.getByTestId("disclosure");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(
            <Disclosure data-testid="disclosure" data-foo="bar">
                <DisclosureHeader>
                    Disclosure Header
                </DisclosureHeader>
                <DisclosurePanel>
                Disclosure Panel
                </DisclosurePanel>
            </Disclosure>
        );

        const element = screen.getByTestId("disclosure");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <DisclosureContext.Provider value={{ slots: { test: { children: [], className: "test" } } }}>
                <Disclosure data-testid="disclosure" slot="test">
                    <DisclosureHeader>
                    Disclosure Header
                    </DisclosureHeader>
                    <DisclosurePanel>
                Disclosure Panel
                    </DisclosurePanel>
                </Disclosure>
            </DisclosureContext.Provider>
        );

        const element = screen.getByTestId("disclosure");
        expect(element).toHaveClass("test");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLDivElement>();
        render(
            <Disclosure data-testid="disclosure" ref={ref}>
                <DisclosureHeader>
                    Disclosure Header
                </DisclosureHeader>
                <DisclosurePanel>
                Disclosure Panel
                </DisclosurePanel>
            </Disclosure>
        );

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLDivElement).toBeTruthy();
    });

    it("should render a class for standalone variant by default", () => {
        render(
            <Disclosure data-testid="disclosure">
                <DisclosureHeader>
                    Disclosure Header
                </DisclosureHeader>
                <DisclosurePanel>
                Disclosure Panel
                </DisclosurePanel>
            </Disclosure>
        );

        const element = screen.getByTestId("disclosure");
        const button = screen.getByRole("button");
        expect(element).toHaveClass("hop-Disclosure--standalone");
        expect(button).toHaveClass("hop-DisclosureHeader__button--standalone");
    });

    it("should render a class for inline variant", () => {
        render(
            <Disclosure data-testid="disclosure" variant="inline">
                <DisclosureHeader>
                    Disclosure Header
                </DisclosureHeader>
                <DisclosurePanel>
                Disclosure Panel
                </DisclosurePanel>
            </Disclosure>
        );

        const element = screen.getByTestId("disclosure");
        const button = screen.getByRole("button");
        expect(element).toHaveClass("hop-Disclosure--inline");
        expect(button).toHaveClass("hop-DisclosureHeader__button--inline");
    });
});

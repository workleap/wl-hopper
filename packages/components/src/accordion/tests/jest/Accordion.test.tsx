import { render, screen } from "@hopper-ui/test-utils";
import { createRef } from "react";

import { Disclosure, DisclosureHeader, DisclosurePanel } from "../../../Disclosure/index.ts";
import { Accordion } from "../../src/Accordion.tsx";
import { AccordionContext } from "../../src/AccordionContext.ts";

describe("Accordion", () => {
    it("should render with default class", () => {
        render(
            <Accordion data-testid="accordion">
                <Disclosure data-testid="disclosure">
                    <DisclosureHeader>
                        Disclosure Header
                    </DisclosureHeader>
                    <DisclosurePanel>
                        Disclosure Panel
                    </DisclosurePanel>
                </Disclosure>
            </Accordion>
        );

        const element = screen.getByTestId("accordion");
        expect(element).toHaveClass("hop-Accordion");
    });

    it("should support custom class", () => {
        render(
            <Accordion data-testid="accordion" className="test">
                <Disclosure data-testid="disclosure">
                    <DisclosureHeader>
                        Disclosure Header
                    </DisclosureHeader>
                    <DisclosurePanel>
                        Disclosure Panel
                    </DisclosurePanel>
                </Disclosure>
            </Accordion>
        );

        const element = screen.getByTestId("accordion");
        expect(element).toHaveClass("hop-Accordion");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(
            <Accordion data-testid="accordion" marginTop="stack-sm" style={{ marginBottom: "13px" }}>
                <Disclosure data-testid="disclosure">
                    <DisclosureHeader>
                        Disclosure Header
                    </DisclosureHeader>
                    <DisclosurePanel>
                        Disclosure Panel
                    </DisclosurePanel>
                </Disclosure>
            </Accordion>
        );

        const element = screen.getByTestId("accordion");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(
            <Accordion data-testid="accordion" data-foo="bar">
                <Disclosure data-testid="disclosure">
                    <DisclosureHeader>
                        Disclosure Header
                    </DisclosureHeader>
                    <DisclosurePanel>
                        Disclosure Panel
                    </DisclosurePanel>
                </Disclosure>
            </Accordion>
        );

        const element = screen.getByTestId("accordion");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <AccordionContext.Provider value={{ slots: { test: { children: [], className: "test" } } }}>
                <Accordion data-testid="accordion" slot="test">
                    <Disclosure data-testid="disclosure">
                        <DisclosureHeader>
                            Disclosure Header
                        </DisclosureHeader>
                        <DisclosurePanel>
                            Disclosure Panel
                        </DisclosurePanel>
                    </Disclosure>
                </Accordion>
            </AccordionContext.Provider>
        );

        const element = screen.getByTestId("accordion");
        expect(element).toHaveClass("test");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLDivElement>();
        render(
            <Accordion data-testid="accordion" ref={ref}>
                <Disclosure data-testid="disclosure">
                    <DisclosureHeader>
                        Disclosure Header
                    </DisclosureHeader>
                    <DisclosurePanel>
                        Disclosure Panel
                    </DisclosurePanel>
                </Disclosure>
            </Accordion>
        );

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLDivElement).toBeTruthy();
    });

    it("should render a class for standalone variant by default", () => {
        render(
            <Accordion data-testid="accordion">
                <Disclosure data-testid="disclosure">
                    <DisclosureHeader>
                        Disclosure Header
                    </DisclosureHeader>
                    <DisclosurePanel>
                        Disclosure Panel
                    </DisclosurePanel>
                </Disclosure>
            </Accordion>
        );

        const element = screen.getByTestId("accordion");
        expect(element).toHaveClass("hop-Accordion--standalone");
    });

    it("should render a class for inline variant", () => {
        render(
            <Accordion data-testid="accordion" variant="inline">
                <Disclosure data-testid="disclosure">
                    <DisclosureHeader>
                        Disclosure Header
                    </DisclosureHeader>
                    <DisclosurePanel>
                        Disclosure Panel
                    </DisclosurePanel>
                </Disclosure>
            </Accordion>
        );

        const element = screen.getByTestId("accordion");
        expect(element).toHaveClass("hop-Accordion--inline");
    });
});

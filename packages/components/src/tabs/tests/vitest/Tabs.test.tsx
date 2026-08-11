import { render, screen } from "@hopper-ui/test-utils";
import { createRef } from "react";

import { Tab, TabList, TabPanel, Tabs, TabsContext } from "../../src/index.ts";

describe("Tabs", () => {
    it("should render with default class", () => {
        render(<Tabs data-testid="tabs" aria-label="test">test</Tabs>);

        const element = screen.getByTestId("tabs");
        expect(element).toHaveClass("hop-Tabs");
    });

    it("should support custom class", () => {
        render(<Tabs data-testid="tabs" aria-label="test" className="test">test</Tabs>);

        const element = screen.getByTestId("tabs");
        expect(element).toHaveClass("hop-Tabs");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<Tabs data-testid="tabs" aria-label="test" marginTop="stack-sm" style={{ marginBottom: "13px" }}>test</Tabs>);

        const element = screen.getByTestId("tabs");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<Tabs data-testid="tabs" aria-label="test" data-foo="bar">test</Tabs>);

        const element = screen.getByTestId("tabs");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <TabsContext.Provider value={{ slots: { test: { "aria-label": "test" } } }}>
                render(<Tabs data-testid="tabs" slot="test">test</Tabs>);
            </TabsContext.Provider>
        );

        const element = screen.getByTestId("tabs");

        expect(element).toHaveAttribute("slot", "test");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLDivElement>();
        const tabRef = createRef<HTMLDivElement>();
        const tabPanelRef = createRef<HTMLDivElement>();

        render(
            <Tabs ref={ref} aria-label="test">
                <TabList>
                    <Tab id="test" ref={tabRef}>Tab 1</Tab>
                </TabList>
                <TabPanel id="test" ref={tabPanelRef}>Panel 1</TabPanel>
            </Tabs>
        );

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLDivElement).toBeTruthy();

        expect(tabRef.current).not.toBeNull();
        expect(tabRef.current instanceof HTMLDivElement).toBeTruthy();

        expect(tabPanelRef.current).not.toBeNull();
        expect(tabPanelRef.current instanceof HTMLDivElement).toBeTruthy();
    });
});

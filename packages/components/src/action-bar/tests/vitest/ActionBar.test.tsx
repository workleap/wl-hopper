import { render, screen } from "@hopper-ui/test-utils";
import { userEvent } from "@testing-library/user-event";
import { act, createRef } from "react";

import { Button } from "../../../buttons/index.ts";
import { ActionBar, ActionBarContext } from "../../src/index.ts";

describe("ActionBar", () => {
    it("should render with default class", () => {
        render(
            <ActionBar data-testid="ActionBar" selectedItemCount={1}>
                <Button size="sm">Delete</Button>
            </ActionBar>
        );

        const element = screen.getByTestId("ActionBar");
        expect(element).toHaveClass("hop-ActionBar");
    });

    it("should support custom class", () => {
        render(
            <ActionBar data-testid="ActionBar" selectedItemCount={1} className="test">
                <Button size="sm">Delete</Button>
            </ActionBar>
        );

        const element = screen.getByTestId("ActionBar");
        expect(element).toHaveClass("hop-ActionBar");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(
            <ActionBar
                data-testid="ActionBar"
                selectedItemCount={1}
                marginTop="stack-sm"
                style={{ marginBottom: "13px" }}
            >
                <Button size="sm">Delete</Button>
            </ActionBar>
        );

        const element = screen.getByTestId("ActionBar");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(
            <ActionBar data-testid="ActionBar" selectedItemCount={1} data-foo="bar">
                <Button size="sm">Delete</Button>
            </ActionBar>
        );

        const element = screen.getByTestId("ActionBar");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <ActionBarContext.Provider value={{ slots: { test: { "aria-label": "test", children: null } } }}>
                <ActionBar data-testid="ActionBar" selectedItemCount={1} slot="test">
                    <Button size="sm">Delete</Button>
                </ActionBar>
            </ActionBarContext.Provider>
        );

        const element = screen.getByTestId("ActionBar");
        expect(element).toHaveAttribute("slot", "test");
        expect(element).toHaveAttribute("aria-label", "test");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLDivElement>();
        render(
            <ActionBar selectedItemCount={1} ref={ref}>
                <Button size="sm">Delete</Button>
            </ActionBar>
        );

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLDivElement).toBeTruthy();
    });

    it("should not render when selectedItemCount is 0", () => {
        render(
            <ActionBar data-testid="ActionBar" selectedItemCount={0}>
                <Button size="sm">Delete</Button>
            </ActionBar>
        );

        expect(screen.queryByTestId("ActionBar")).not.toBeInTheDocument();
    });

    it("should not render when selectedItemCount is omitted", () => {
        render(
            <ActionBar data-testid="ActionBar">
                <Button size="sm">Delete</Button>
            </ActionBar>
        );

        expect(screen.queryByTestId("ActionBar")).not.toBeInTheDocument();
    });

    it("should render the selected item count", () => {
        render(
            <ActionBar selectedItemCount={5}>
                <Button size="sm">Delete</Button>
            </ActionBar>
        );

        expect(screen.getByText("5 items selected")).toBeInTheDocument();
    });

    it("should render a message when every item is selected", () => {
        render(
            <ActionBar selectedItemCount="all">
                <Button size="sm">Delete</Button>
            </ActionBar>
        );

        expect(screen.getByText("All items selected")).toBeInTheDocument();
    });

    it("should render selectionText instead of the default text when given a node", () => {
        render(
            <ActionBar selectedItemCount={3} selectionText="3 people selected">
                <Button size="sm">Delete</Button>
            </ActionBar>
        );

        expect(screen.getByText("3 people selected")).toBeInTheDocument();
        expect(screen.queryByText("3 items selected")).not.toBeInTheDocument();
    });

    it("should call selectionText with the count when given a function", () => {
        const selectionText = vi.fn(({ selectedItemCount }) => `${selectedItemCount} people`);
        render(
            <ActionBar selectedItemCount={3} selectionText={selectionText}>
                <Button size="sm">Delete</Button>
            </ActionBar>
        );

        expect(selectionText).toHaveBeenCalledWith({ selectedItemCount: 3 });
        expect(screen.getByText("3 people")).toBeInTheDocument();
    });

    it("should render selectionText when every item is selected", () => {
        render(
            <ActionBar
                selectedItemCount="all"
                selectionText={({ selectedItemCount }) => `${selectedItemCount} people selected`}
            >
                <Button size="sm">Delete</Button>
            </ActionBar>
        );

        expect(screen.getByText("all people selected")).toBeInTheDocument();
    });

    it("should not render when selectedItemCount is 0, even with selectionText", () => {
        render(
            <ActionBar data-testid="ActionBar" selectedItemCount={0} selectionText="3 people selected">
                <Button size="sm">Delete</Button>
            </ActionBar>
        );

        expect(screen.queryByTestId("ActionBar")).not.toBeInTheDocument();
    });

    it("should call onClearSelection when the close button is pressed", async () => {
        const user = userEvent.setup();
        const onClearSelection = vi.fn();
        render(
            <ActionBar selectedItemCount={1} onClearSelection={onClearSelection}>
                <Button size="sm">Delete</Button>
            </ActionBar>
        );

        await user.click(screen.getByRole("button", { name: "Clear selection" }));

        expect(onClearSelection).toHaveBeenCalledTimes(1);
    });

    it("should call onClearSelection when the Escape key is pressed", async () => {
        const user = userEvent.setup();
        const onClearSelection = vi.fn();
        render(
            <ActionBar selectedItemCount={1} onClearSelection={onClearSelection}>
                <Button size="sm">Delete</Button>
            </ActionBar>
        );

        act(() => {
            screen.getByRole("button", { name: "Delete" }).focus();
        });
        await user.keyboard("{Escape}");

        expect(onClearSelection).toHaveBeenCalledTimes(1);
    });

    it("should render its children", () => {
        render(
            <ActionBar selectedItemCount={1}>
                <Button size="sm">Delete</Button>
            </ActionBar>
        );

        expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
    });
});

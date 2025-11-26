import { MultiSelect, Select, SelectItem } from "@hopper-ui/components";
import { render, screen, waitFor } from "@hopper-ui/test-utils";
import { userEvent } from "@testing-library/user-event";
import { createRef } from "react";

import { SelectContext } from "../../src/SelectContext.ts";

describe("Select", () => {
    it("should render with default class", () => {
        render(
            <Select aria-label="Animals" data-testid="select">
                <SelectItem>Item 1</SelectItem>
                <SelectItem>Item 2</SelectItem>
                <SelectItem>Item 3</SelectItem>
            </Select>
        );

        const element = screen.getByTestId("select");
        expect(element).toHaveClass("hop-Select");
    });

    it("should support custom class", () => {
        render(
            <Select aria-label="Animals" className="test" data-testid="select">
                <SelectItem>Item 1</SelectItem>
                <SelectItem>Item 2</SelectItem>
                <SelectItem>Item 3</SelectItem>
            </Select>
        );

        const element = screen.getByTestId("select");
        expect(element).toHaveClass("hop-Select");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(
            <Select aria-label="Animals" marginTop="stack-sm" style={{ marginBottom: "13px" }} data-testid="select">
                <SelectItem>Item 1</SelectItem>
                <SelectItem>Item 2</SelectItem>
                <SelectItem>Item 3</SelectItem>
            </Select>
        );

        const element = screen.getByTestId("select");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(
            <Select aria-label="Animals" data-foo="bar" data-testid="select">
                <SelectItem>Item 1</SelectItem>
                <SelectItem>Item 2</SelectItem>
                <SelectItem>Item 3</SelectItem>
            </Select>
        );

        const element = screen.getByTestId("select");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <SelectContext.Provider value={{ slots: { test: { "aria-label": "test" } } }}>
                <Select slot="test" data-testid="select">
                    <SelectItem>Item 1</SelectItem>
                    <SelectItem>Item 2</SelectItem>
                    <SelectItem>Item 3</SelectItem>
                </Select>
            </SelectContext.Provider>
        );

        const element = screen.getByTestId("select");
        const selectTrigger = screen.getByRole("button");
        expect(element).toHaveAttribute("slot", "test");
        expect(selectTrigger).toHaveAttribute("aria-label", "test");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLDivElement>();
        render(
            <Select ref={ref} aria-label="Animals">
                <SelectItem>Item 1</SelectItem>
                <SelectItem>Item 2</SelectItem>
                <SelectItem>Item 3</SelectItem>
            </Select>
        );

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLDivElement).toBeTruthy();
    });

    it("should support keyboard navigation with searchable select", async () => {
        const user = userEvent.setup();

        const SearchableSelect = () => {
            const items = [
                { id: "cat", name: "Cat" },
                { id: "dog", name: "Dog" },
                { id: "panda", name: "Panda" }
            ];

            return (
                <Select
                    aria-label="Animals"
                    items={items}
                    isFilterable
                    searchFieldProps={{ "aria-label": "Search animals" }}
                >
                    {(item: typeof items[0]) => <SelectItem id={item.id}>{item.name}</SelectItem>}
                </Select>
            );
        };

        render(<SearchableSelect />);

        const trigger = screen.getByRole("button");
        await user.click(trigger);

        await waitFor(() => {
            expect(screen.getByRole("listbox")).toBeInTheDocument();
        });

        // Navigate down through options
        await user.keyboard("{ArrowDown}");
        await waitFor(() => {
            expect(screen.getByRole("option", { name: "Cat" })).toHaveAttribute("data-focused", "true");
        });

        await user.keyboard("{ArrowDown}");
        await waitFor(() => {
            expect(screen.getByRole("option", { name: "Dog" })).toHaveAttribute("data-focused", "true");
        });

        // Navigate back up
        await user.keyboard("{ArrowUp}");
        await waitFor(() => {
            expect(screen.getByRole("option", { name: "Cat" })).toHaveAttribute("data-focused", "true");
        });
    });

    it("should support keyboard navigation with searchable multi-select", async () => {
        const user = userEvent.setup();

        const SearchableMultiSelect = () => {
            const items = [
                { id: "cat", name: "Cat" },
                { id: "dog", name: "Dog" },
                { id: "panda", name: "Panda" }
            ];

            return (
                <MultiSelect
                    aria-label="Animals"
                    items={items}
                    isFilterable
                    searchFieldProps={{ "aria-label": "Search animals" }}
                >
                    {(item: typeof items[0]) => <SelectItem id={item.id}>{item.name}</SelectItem>}
                </MultiSelect>
            );
        };

        render(<SearchableMultiSelect />);

        const trigger = screen.getByRole("button");
        await user.click(trigger);

        await waitFor(() => {
            expect(screen.getByRole("listbox")).toBeInTheDocument();
        });

        // Navigate down through options
        await user.keyboard("{ArrowDown}");
        await waitFor(() => {
            expect(screen.getByRole("option", { name: "Cat" })).toHaveAttribute("data-focused", "true");
        });

        await user.keyboard("{ArrowDown}");
        await waitFor(() => {
            expect(screen.getByRole("option", { name: "Dog" })).toHaveAttribute("data-focused", "true");
        });

        // Navigate back up
        await user.keyboard("{ArrowUp}");
        await waitFor(() => {
            expect(screen.getByRole("option", { name: "Cat" })).toHaveAttribute("data-focused", "true");
        });
    });
});

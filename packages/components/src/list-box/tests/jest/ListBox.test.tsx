import { render, screen } from "@hopper-ui/test-utils";
import { createRef } from "react";

import { Text } from "../../../typography/Text/index.ts";
import { ListBoxItem } from "../../src/index.ts";
import { ListBox } from "../../src/ListBox.tsx";
import { ListBoxContext } from "../../src/ListBoxContext.ts";

describe("ListBox", () => {
    it("should render with default class", () => {
        render(<ListBox aria-label="list of options">
            <ListBoxItem>Item 1</ListBoxItem>
            <ListBoxItem>Item 2</ListBoxItem>
            <ListBoxItem>Item 3</ListBoxItem>
        </ListBox>);

        const element = screen.getByRole("listbox");
        expect(element).toHaveClass("hop-ListBox");
    });

    it("should support custom class", () => {
        render(<ListBox aria-label="list of options" className="test">
            <ListBoxItem>Item 1</ListBoxItem>
            <ListBoxItem>Item 2</ListBoxItem>
            <ListBoxItem>Item 3</ListBoxItem>
        </ListBox>);

        const element = screen.getByRole("listbox");
        expect(element).toHaveClass("hop-ListBox");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<ListBox aria-label="list of options" marginTop="stack-sm" style={{ marginBottom: "13px" }}>
            <ListBoxItem>Item 1</ListBoxItem>
            <ListBoxItem>Item 2</ListBoxItem>
            <ListBoxItem>Item 3</ListBoxItem>
        </ListBox>);

        const element = screen.getByRole("listbox");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<ListBox aria-label="list of options" data-foo="bar">
            <ListBoxItem>Item 1</ListBoxItem>
            <ListBoxItem>Item 2</ListBoxItem>
            <ListBoxItem>Item 3</ListBoxItem>
        </ListBox>);

        const element = screen.getByRole("listbox");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <ListBoxContext.Provider value={{ slots: { test: { "aria-label": "test" } } }}>
                <ListBox slot="test">
                    <ListBoxItem>Item 1</ListBoxItem>
                    <ListBoxItem>Item 2</ListBoxItem>
                    <ListBoxItem>Item 3</ListBoxItem>
                </ListBox>
            </ListBoxContext.Provider>
        );

        const element = screen.getByRole("listbox");
        expect(element).toHaveAttribute("slot", "test");
        expect(element).toHaveAttribute("aria-label", "test");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLDivElement>();
        render(<ListBox ref={ref} aria-label="list of options">
            <ListBoxItem>Item 1</ListBoxItem>
            <ListBoxItem>Item 2</ListBoxItem>
            <ListBoxItem>Item 3</ListBoxItem>
        </ListBox>);

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLDivElement).toBeTruthy();
    });

    it("should support isInvalid prop", () => {
        render(<ListBox aria-label="list of options" isInvalid>
            <ListBoxItem>Item 1</ListBoxItem>
        </ListBox>);

        const element = screen.getByRole("option");
        expect(element).toHaveAttribute("data-invalid");
    });
});

describe("ListBoxItem", () => {
    it("should have a matching aria-labelledby and label ID", async () => {
        render(
            <ListBox aria-label="list of options">
                <ListBoxItem id="earth" data-testid="earth-item">Earth</ListBoxItem>
                <ListBoxItem id="jupiter">Jupiter</ListBoxItem>
                <ListBoxItem id="mars">Mars</ListBoxItem>
            </ListBox>
        );

        const firstItem = screen.getByTestId("earth-item");
        const label = screen.getByText("Earth");
        const labelId = label.getAttribute("id");
    
        expect(firstItem).toHaveAttribute("aria-labelledby", labelId);
    });
    
    it("should have a matching aria-describedBy and description ID", async () => {
        const descriptionText = "description here";
        render(
            <ListBox aria-label="list of options">
                <ListBoxItem id="earth" data-testid="earth-item" textValue="Earth">
                    <Text>Earth</Text><Text slot="description">{descriptionText}</Text>
                </ListBoxItem>
                <ListBoxItem id="jupiter">Jupiter</ListBoxItem>
                <ListBoxItem id="mars">Mars</ListBoxItem>
            </ListBox>
        );

        const firstItem = screen.getByTestId("earth-item");
        const description = screen.getByText(descriptionText);
        const descriptionId = description.getAttribute("id");
    
        expect(firstItem).toHaveAttribute("aria-describedBy", descriptionId);
    });

    it("should render with default class", () => {
        render(<ListBox aria-label="list of options">
            <ListBoxItem>Item 1</ListBoxItem>
        </ListBox>);

        const element = screen.getByRole("option");
        expect(element).toHaveClass("hop-ListBoxItem");
    });

    it("should support custom class", () => {
        render(<ListBox aria-label="list of options">
            <ListBoxItem className="test">Item 1</ListBoxItem>
        </ListBox>);

        const element = screen.getByRole("option");
        expect(element).toHaveClass("hop-ListBoxItem");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<ListBox aria-label="list of options">
            <ListBoxItem marginTop="stack-sm" style={{ marginBottom: "13px" }}>Item 1</ListBoxItem>
        </ListBox>);

        const element = screen.getByRole("option");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<ListBox aria-label="list of options">
            <ListBoxItem data-foo="bar">Item 1</ListBoxItem>
        </ListBox>);

        const element = screen.getByRole("option");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLDivElement>();
        render(<ListBox aria-label="list of options">
            <ListBoxItem ref={ref}>Item 1</ListBoxItem>
        </ListBox>);

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLDivElement).toBeTruthy();
    });

    it("should support isInvalid prop", () => {
        render(<ListBox aria-label="list of options">
            <ListBoxItem isInvalid>Item 1</ListBoxItem>
        </ListBox>);

        const element = screen.getByRole("option");
        expect(element).toHaveAttribute("data-invalid");
    });
});

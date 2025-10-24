import { render, screen } from "@hopper-ui/test-utils";
import { createRef } from "react";

import { Tag, TagGroup, TagGroupContext } from "../../src/index.ts";

describe("Tag", () => {
    it("should render with default class", () => {
        render(<TagGroup aria-label="options" data-testid="tag-group"><Tag id="option1">option 1</Tag></TagGroup>);

        const element = screen.getByTestId("tag-group");
        expect(element).toHaveClass("hop-TagGroup");
    });

    it("should support custom class", () => {
        render(<TagGroup aria-label="options" data-testid="tag-group" className="test"><Tag id="option1">option 1</Tag></TagGroup>);

        const element = screen.getByTestId("tag-group");
        expect(element).toHaveClass("hop-TagGroup");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<TagGroup aria-label="options" data-testid="tag-group" marginTop="stack-sm" style={{ marginBottom: "13px" }}><Tag id="option1">option 1</Tag></TagGroup>);

        const element = screen.getByTestId("tag-group");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<TagGroup aria-label="options" data-testid="tag-group" data-foo="bar"><Tag id="option1">option 1</Tag></TagGroup>);

        const element = screen.getByTestId("tag-group");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <TagGroupContext.Provider value={{ slots: { test: { "aria-label": "test" } } }}>
                <TagGroup
                    slot="test"
                    data-testid="tag-group"
                >
                    <Tag id="option1">option 1</Tag>
                </TagGroup>
            </TagGroupContext.Provider>
        );

        const element = screen.getByTestId("tag-group");
        const tagList = screen.getByRole("grid");

        expect(element).toHaveAttribute("slot", "test");
        expect(tagList).toHaveAttribute("aria-label", "test");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLDivElement>();
        render(
            <TagGroup
                aria-label="options"
                data-testid="tag-group"
                ref={ref}
            >
                <Tag id="option1">option 1</Tag>
            </TagGroup>
        );

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLDivElement).toBeTruthy();
    });

    it("should set the size class name and pass the size to the tag.", () => {
        const testId = "tag-option";
        render(
            <TagGroup aria-label="options" data-testid="tag-group" size="lg">
                <Tag id="option1" data-testid={testId}>option 1</Tag>
            </TagGroup>
        );

        const element = screen.getByTestId("tag-group");
        const tag = screen.getByTestId(testId);
        expect(element).toHaveClass("hop-TagGroup--lg");
        expect(tag).toHaveClass("hop-Tag--lg");
    });
});

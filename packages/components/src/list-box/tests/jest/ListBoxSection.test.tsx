import { render, screen } from "@hopper-ui/test-utils";
import { createRef } from "react";
import { ListBox } from "react-aria-components";

import { ListBoxSection } from "../../src/ListBoxSection.tsx";

describe("ListBoxSection", () => {
    it("should render with default class", () => {
        render(<ListBox aria-label="list-box"><ListBoxSection>Test</ListBoxSection></ListBox>);

        const element = screen.getByRole("group");
        expect(element).toHaveClass("hop-ListBoxSection");
    });

    it("should support custom class", () => {
        render(<ListBox aria-label="list-box"><ListBoxSection className="test">Test</ListBoxSection></ListBox>);

        const element = screen.getByRole("group");
        expect(element).toHaveClass("hop-ListBoxSection");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<ListBox aria-label="list-box"><ListBoxSection marginTop="stack-sm" style={{ marginBottom: "13px" }} >Test</ListBoxSection></ListBox>);

        const element = screen.getByRole("group");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<ListBox aria-label="list-box"><ListBoxSection data-foo="bar">Test</ListBoxSection></ListBox>);

        const element = screen.getByRole("group");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLDivElement>();
        render(<ListBox aria-label="list-box"><ListBoxSection ref={ref}>Test</ListBoxSection></ListBox>);

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLElement).toBeTruthy();
    });
});

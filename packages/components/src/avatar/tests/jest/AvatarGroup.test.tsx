import { render, screen } from "@hopper-ui/test-utils";
import { createRef } from "react";

import { AvatarGroup } from "../../src/AvatarGroup.tsx";
import { AvatarGroupContext } from "../../src/AvatarGroupContext.ts";

describe("AvatarGroup", () => {
    it("should render with default class", () => {
        render(<AvatarGroup />);

        const element = screen.getByRole("group");

        expect(element).toHaveClass("hop-AvatarGroup");
    });

    it("should support custom class", () => {
        render(<AvatarGroup className="test" />);

        const element = screen.getByRole("group");

        expect(element).toHaveClass("hop-AvatarGroup");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<AvatarGroup marginTop="stack-sm" style={{ marginBottom: "13px" }} />);

        const element = screen.getByRole("group");

        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<AvatarGroup data-foo="bar" />);

        const element = screen.getByRole("group");

        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <AvatarGroupContext.Provider value={{ slots: { test: { "aria-label": "test" } } }}>
                <AvatarGroup slot="test" />
            </AvatarGroupContext.Provider>
        );

        const element = screen.getByRole("group");
        expect(element).toHaveAttribute("slot", "test");
        expect(element).toHaveAttribute("aria-label", "test");
    });

    it("should apply default displayName", () => {
        expect(AvatarGroup.displayName).toBe("AvatarGroup");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLDivElement>();
        render(<AvatarGroup ref={ref} />);

        const element = screen.getByRole("group");

        expect(ref.current).toBe(element);
        expect(ref.current instanceof HTMLDivElement).toBeTruthy();
        expect(ref.current?.tagName.toUpperCase()).toBe("DIV");
    });
});

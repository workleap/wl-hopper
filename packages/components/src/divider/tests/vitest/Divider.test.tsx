import { render, screen } from "@hopper-ui/test-utils";
import { createRef } from "react";

import { Divider } from "../../src/Divider.tsx";
import { DividerContext } from "../../src/DividerContext.ts";

describe("Divider", () => {
    it("should render with default class", () => {
        render(<Divider />);

        const element = screen.getByRole("separator");
        expect(element).toHaveClass("hop-Divider");
    });

    it("should support custom class", () => {
        render(<Divider className="test" />);

        const element = screen.getByRole("separator");
        expect(element).toHaveClass("hop-Divider");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<Divider marginTop="stack-sm" style={{ marginBottom: "13px" }} />);

        const element = screen.getByRole("separator");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<Divider data-foo="bar" />);

        const element = screen.getByRole("separator");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <DividerContext.Provider value={{ slots: { test: { className: "test" } } }}>
                <Divider slot="test" />
            </DividerContext.Provider>
        );

        const element = screen.getByRole("separator");
        expect(element).toHaveAttribute("slot", "test");
        expect(element).toHaveClass("test");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLElement>();
        render(<Divider ref={ref} />);

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLElement).toBeTruthy();
    });
});

import { render, screen } from "@hopper-ui/test-utils";
import { createRef } from "react";

import { AvatarContext } from "../../src/AvatarContext.ts";
import { AnonymousAvatar } from "../../src/index.ts";

describe("AnonymousAvatar", () => {
    it("should render with default class", () => {
        render(<AnonymousAvatar aria-label="John Doe" />);

        const element = screen.getByRole("img", { name: "John Doe" });

        expect(element).toHaveClass("hop-AnonymousAvatar");
    });

    it("should support custom class", () => {
        render(<AnonymousAvatar aria-label="John Doe" className="test" />);

        const element = screen.getByRole("img", { name: "John Doe" });

        expect(element).toHaveClass("hop-AnonymousAvatar");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<AnonymousAvatar aria-label="John Doe" marginTop="stack-sm" style={{ marginBottom: "13px" }} />);

        const element = screen.getByRole("img", { name: "John Doe" });

        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<AnonymousAvatar aria-label="John Doe" data-foo="bar" />);

        const element = screen.getByRole("img", { name: "John Doe" });

        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <AvatarContext.Provider value={{ slots: { test: { "aria-label": "test", "name": "test" } } }}>
                <AnonymousAvatar slot="test" />
            </AvatarContext.Provider>
        );

        const element = screen.getByRole("img", { name: "test" });
        expect(element).toHaveAttribute("slot", "test");
        expect(element).toHaveAttribute("aria-label", "test");
    });

    it("should apply default displayName", () => {
        expect(AnonymousAvatar.displayName).toBe("AnonymousAvatar");
    });

    it("should have the provided aria-label if provided", async () => {
        render(
            <AnonymousAvatar aria-label="Maye Musk" />
        );

        expect(await screen.findByLabelText("Maye Musk")).not.toBeNull();
    });

    it("should support refs", () => {
        const ref = createRef<HTMLDivElement>();
        render(<AnonymousAvatar aria-label="John Doe" ref={ref} />);

        const element = screen.getByRole("img", { name: "John Doe" });

        expect(ref.current).toBe(element);
        expect(ref.current instanceof HTMLDivElement).toBeTruthy();
        expect(ref.current?.tagName.toUpperCase()).toBe("DIV");
    });

    it("should support disabled state", () => {
        render(<AnonymousAvatar
            aria-label="John Doe"
            isDisabled
            className={({ isDisabled }) => (isDisabled ? "disabled" : "")}
        />);

        const element = screen.getByRole("img", { name: "John Doe" });

        expect(element).toHaveAttribute("data-disabled");
        expect(element).toHaveClass("disabled");
    });
});

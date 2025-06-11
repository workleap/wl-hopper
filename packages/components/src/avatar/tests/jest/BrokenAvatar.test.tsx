import { render, screen } from "@hopper-ui/test-utils";
import { createRef } from "react";

import { AvatarContext } from "../../src/AvatarContext.ts";
import { BrokenAvatar } from "../../src/index.ts";

describe("BrokenAvatar", () => {
    it("should render with default class", () => {
        render(<BrokenAvatar aria-label="John Doe" />);

        const element = screen.getByRole("img", { name: "John Doe" });

        expect(element).toHaveClass("hop-BrokenAvatar");
    });

    it("should support custom class", () => {
        render(<BrokenAvatar aria-label="John Doe" className="test" />);

        const element = screen.getByRole("img", { name: "John Doe" });

        expect(element).toHaveClass("hop-BrokenAvatar");
        expect(element).toHaveClass("test");
    });

    it("should have role button when there's a onPress event", () => {
        render(<BrokenAvatar aria-label="John Doe" onPress={() => {}} />);

        const element = screen.getByRole("button", { name: "John Doe" });

        expect(element).toBeInTheDocument();
    });

    it("should support custom style", () => {
        render(<BrokenAvatar aria-label="John Doe" marginTop="stack-sm" style={{ marginBottom: "13px" }} />);

        const element = screen.getByRole("img", { name: "John Doe" });

        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<BrokenAvatar aria-label="John Doe" data-foo="bar" />);

        const element = screen.getByRole("img", { name: "John Doe" });

        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <AvatarContext.Provider value={{ slots: { test: { "aria-label": "test", "name": "test" } } }}>
                <BrokenAvatar slot="test" />
            </AvatarContext.Provider>
        );

        const element = screen.getByRole("img", { name: "test" });
        expect(element).toHaveAttribute("slot", "test");
        expect(element).toHaveAttribute("aria-label", "test");
    });

    it("should apply default displayName", () => {
        expect(BrokenAvatar.displayName).toBe("BrokenAvatar");
    });

    it("should have the provided aria-label if provided", async () => {
        render(
            <BrokenAvatar aria-label="Maye Musk" />
        );

        expect(await screen.findByLabelText("Maye Musk")).not.toBeNull();
    });

    it("should support refs", () => {
        const ref = createRef<HTMLDivElement>();
        render(<BrokenAvatar aria-label="John Doe" ref={ref} />);

        const element = screen.getByRole("img", { name: "John Doe" });

        expect(ref.current).toBe(element);
        expect(ref.current instanceof HTMLDivElement).toBeTruthy();
        expect(ref.current?.tagName.toUpperCase()).toBe("DIV");
    });

    it("should support disabled state", () => {
        render(<BrokenAvatar
            aria-label="John Doe"
            isDisabled
            className={({ isDisabled }) => (isDisabled ? "disabled" : "")}
        />);

        const element = screen.getByRole("img", { name: "John Doe" });

        expect(element).toHaveAttribute("data-disabled");
        expect(element).toHaveClass("disabled");
    });
});

import { render, screen } from "@hopper-ui/test-utils";
import { createRef } from "react";

import { Image } from "../../src/Image.tsx";
import { ImageContext } from "../../src/ImageContext.ts";

describe("Image", () => {
    it("should render with default class", () => {
        render(<Image src="https://i.pravatar.cc/96?img=1" alt="test" />);

        const element = screen.getByRole("img");
        expect(element).toHaveClass("hop-Image");
    });

    it("should support custom class", () => {
        render(<Image className="test" src="https://i.pravatar.cc/96?img=1" alt="test" />);

        const element = screen.getByRole("img");
        expect(element).toHaveClass("hop-Image");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<Image marginTop="stack-sm" style={{ marginBottom: "13px" }} src="https://i.pravatar.cc/96?img=1" alt="test" />);

        const element = screen.getByRole("img");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<Image data-foo="bar" src="https://i.pravatar.cc/96?img=1" alt="test" />);

        const element = screen.getByRole("img");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <ImageContext.Provider value={{ slots: { test: { "aria-label": "test" } } }}>
                <Image slot="test" src="https://i.pravatar.cc/96?img=1" alt="test" />
            </ImageContext.Provider>
        );

        const element = screen.getByRole("img");
        expect(element).toHaveAttribute("slot", "test");
        expect(element).toHaveAttribute("aria-label", "test");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLImageElement>();
        render(<Image ref={ref} src="https://i.pravatar.cc/96?img=1" alt="test" />);

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLImageElement).toBeTruthy();
    });
});

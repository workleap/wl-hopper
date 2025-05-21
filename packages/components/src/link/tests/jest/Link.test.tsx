import { render, screen } from "@hopper-ui/test-utils";
import { createRef } from "react";

import { Link } from "../../src/Link.tsx";
import { LinkContext } from "../../src/LinkContext.ts";

describe("Link", () => {
    it("should render with default class", () => {
        render(<Link href="#" />);

        const element = screen.getByRole("link");
        expect(element).toHaveClass("hop-Link");
    });

    it("should support custom class", () => {
        render(<Link href="#" className="test" />);

        const element = screen.getByRole("link");
        expect(element).toHaveClass("hop-Link");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<Link href="#" marginTop="stack-sm" style={{ marginBottom: "13px" }} />);

        const element = screen.getByRole("link");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<Link href="#" data-foo="bar" />);

        const element = screen.getByRole("link");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <LinkContext.Provider value={{ slots: { test: { "aria-label": "test" } } }}>
                <Link href="#" slot="test" />
            </LinkContext.Provider>
        );

        const element = screen.getByRole("link");
        expect(element).toHaveAttribute("slot", "test");
        expect(element).toHaveAttribute("aria-label", "test");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLAnchorElement>();
        render(<Link href="#" ref={ref} />);

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLAnchorElement).toBeTruthy();
    });

    it("should render target and rel when external", () => {
        render(<Link href="#" isExternal />);

        const element = screen.getByRole("link");
        expect(element).toHaveAttribute("rel", "noopener noreferrer");
        expect(element).toHaveAttribute("target", "_blank");
    });

    it("should render custom target and custom rel even when external", () => {
        render(<Link href="#" rel="test1" target="test2" isExternal />);

        const element = screen.getByRole("link");
        expect(element).toHaveAttribute("rel", "test1");
        expect(element).toHaveAttribute("target", "test2");
    });
});

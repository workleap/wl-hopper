import { render, screen } from "@hopper-ui/test-utils";
import { createRef, forwardRef, type Ref, type SVGProps } from "react";

import { createIcon, IconContext } from "../../src/index.ts";

/* eslint-disable max-len */
const CustomIcon16 = forwardRef((props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => <svg width={16} height={16} fill="none" viewBox="0 0 16 16" ref={ref} {...props}><path fill="currentColor" fillRule="evenodd" d="M8 13.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14M4.333 8a.75.75 0 0 1 .75-.75H7.25V5.083a.75.75 0 1 1 1.5 0V7.25h2.167a.75.75 0 1 1 0 1.5H8.75v2.167a.75.75 0 0 1-1.5 0V8.75H5.083a.75.75 0 0 1-.75-.75" /></svg>);
const CustomIcon24 = forwardRef((props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => <svg width={24} height={24} fill="none" viewBox="0 0 24 24" ref={ref} {...props}><path fill="currentColor" fillRule="evenodd" d="M12 19.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15m0 1.5a9 9 0 1 0 0-18 9 9 0 0 0 0 18m-5-9a.75.75 0 0 1 .75-.75h3.5v-3.5a.75.75 0 0 1 1.5 0v3.5h3.5a.75.75 0 0 1 0 1.5h-3.5v3.5a.75.75 0 0 1-1.5 0v-3.5h-3.5A.75.75 0 0 1 7 12" /></svg>);
const CustomIcon32 = forwardRef((props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => <svg width={32} height={32} fill="none" viewBox="0 0 32 32" ref={ref} {...props}><path fill="currentColor" fillRule="evenodd" d="M16 26c5.523 0 10-4.477 10-10S21.523 6 16 6 6 10.477 6 16s4.477 10 10 10m0 2c6.627 0 12-5.373 12-12S22.627 4 16 4 4 9.373 4 16s5.373 12 12 12M9 16a1 1 0 0 1 1-1h5v-5a1 1 0 1 1 2 0v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0v-5h-5a1 1 0 0 1-1-1" /></svg>);
/* eslint-enable max-len */

const CustomIcon = createIcon(CustomIcon16, CustomIcon24, CustomIcon32, "CustomIcon");

describe("create-icon", () => {
    it("should render with default class", () => {
        render(<CustomIcon />);

        const element = screen.getByRole("img", { hidden: true });

        expect(element).toHaveClass("hop-Icon");
    });

    it("should support custom class", () => {
        render(<CustomIcon className="test" />);

        const element = screen.getByRole("img", { hidden: true });

        expect(element).toHaveClass("hop-Icon");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<CustomIcon marginTop="stack-sm" style={{ marginBottom: "13px" }} />);

        const element = screen.getByRole("img", { hidden: true });

        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<CustomIcon data-foo="bar" />);

        const element = screen.getByRole("img", { hidden: true });

        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <IconContext.Provider value={{ slots: { test: { "aria-label": "test" } } }}>
                <CustomIcon slot="test" />
            </IconContext.Provider>
        );

        const element = screen.getByRole("img", { hidden: true });
        expect(element).not.toHaveAttribute("slot", "test"); // svg doesn't have slot attribute
        expect(element).toHaveAttribute("data-slot", "test");
        expect(element).toHaveAttribute("aria-label", "test");
    });

    it("should support refs", () => {
        const ref = createRef<SVGSVGElement>();
        render(<CustomIcon ref={ref} />);

        const element = screen.getByRole("img", { hidden: true });

        expect(ref.current).toBe(element);
        expect(ref.current instanceof SVGElement).toBeTruthy();
        expect(ref.current?.tagName.toUpperCase()).toBe("SVG");
    });

    it("applies default displayName", () => {
        expect(CustomIcon.displayName).toBe("CustomIcon");
    });

    it("chooses the right source when size sm", () => {
        const ref = createRef<SVGSVGElement>();
        render(<CustomIcon ref={ref} size="sm" />);

        const element = screen.getByRole("img", { hidden: true });

        expect(ref.current).toBe(element);
        expect(element).toHaveAttribute("viewBox", "0 0 16 16");
    });

    it("chooses the right source when size md", () => {
        const ref = createRef<SVGSVGElement>();
        render(<CustomIcon ref={ref} size="md" />);

        const element = screen.getByRole("img", { hidden: true });

        expect(ref.current).toBe(element);
        expect(element).toHaveAttribute("viewBox", "0 0 24 24");
    });

    it("chooses the right source when size lg", () => {
        const ref = createRef<SVGSVGElement>();
        render(<CustomIcon ref={ref} size="lg" />);

        const element = screen.getByRole("img", { hidden: true });

        expect(ref.current).toBe(element);
        expect(element).toHaveAttribute("viewBox", "0 0 32 32");
    });
});

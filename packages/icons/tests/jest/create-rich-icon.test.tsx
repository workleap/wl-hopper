import { render, screen } from "@hopper-ui/test-utils";
import { createRef, forwardRef, type Ref, type SVGProps } from "react";

import { createRichIcon, RichIconContext } from "../../src/index.ts";

/* eslint-disable max-len */
const CustomRichIcon24 = forwardRef((props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => <svg width={24} height={24} viewBox="0 0 24 24" ref={ref} {...props}><path fill="var(--hop-decorative-option7-surface)" d="M0 12C0 5.373 5.373 0 12 0s12 5.373 12 12-5.373 12-12 12S0 18.627 0 12" /><path fill="var(--hop-decorative-option7-icon)" d="M6.848 4.551a1.2 1.2 0 0 1 .849-.351H17.4a1.2 1.2 0 0 1 1.2 1.2v12.103a1.2 1.2 0 0 1-.352.849l-1.097 1.096a1.2 1.2 0 0 1-.848.352H6.6a1.2 1.2 0 0 1-1.2-1.2V6.497a1.2 1.2 0 0 1 .351-.848z" /><path fill="#fff" fillRule="evenodd" d="M7.8 5.2h9.6c.11 0 .2.09.2.2v12a.2.2 0 0 1-.2.2H7.8a.2.2 0 0 1-.2-.2v-12c0-.11.09-.2.2-.2m5.4 3.1h3v-1h-3zm3 3.6h-3v-1h3zm-3 3.6h3v-1h-3zm-1.427-8.377-1.757 2.19a.5.5 0 0 1-.743.04l-.98-.978L9 7.667l.585.585 1.408-1.755zm-1.757 5.533 1.757-2.19-.78-.626-1.408 1.755L9 11.01l-.707.708.98.979a.5.5 0 0 0 .743-.041m1.757 1.41-1.757 2.19a.5.5 0 0 1-.743.04l-.98-.978L9 14.61l.585.585 1.408-1.755z" /></svg>);
const CustomRichIcon32 = forwardRef((props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => <svg width={32} height={32} viewBox="0 0 32 32" ref={ref} {...props}><path fill="var(--hop-decorative-option7-surface)" d="M0 16C0 7.163 7.163 0 16 0s16 7.163 16 16-7.163 16-16 16S0 24.837 0 16" /><path fill="var(--hop-decorative-option7-icon)" d="M9.131 6.069a1.6 1.6 0 0 1 1.132-.469H23.2a1.6 1.6 0 0 1 1.6 1.6v16.137a1.6 1.6 0 0 1-.469 1.132L22.87 25.93a1.6 1.6 0 0 1-1.132.469H8.8a1.6 1.6 0 0 1-1.6-1.6V8.663a1.6 1.6 0 0 1 .469-1.132z" /><path fill="#fff" d="M10.4 6.6h12.8a.6.6 0 0 1 .6.6v16a.6.6 0 0 1-.6.6H10.4a.6.6 0 0 1-.6-.6v-16a.6.6 0 0 1 .6-.6" /><path fill="var(--hop-decorative-option7-icon)" fillRule="evenodd" d="M21.6 10.9h-4v-1h4zm0 4.8h-4v-1h4zm0 4.8h-4v-1h4zM15.463 9.523l-2.238 2.79a.5.5 0 0 1-.744.04l-1.188-1.187.707-.707.794.793 1.889-2.355zm0 4.457-2.238 2.79a.5.5 0 0 1-.744.04l-1.188-1.187.707-.707.794.793 1.889-2.355zm0 4.8-2.238 2.79a.5.5 0 0 1-.744.04l-1.188-1.187.707-.707.794.793 1.889-2.355z" /></svg>);
const CustomRichIcon40 = forwardRef((props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => <svg width={40} height={40} viewBox="0 0 40 40" ref={ref} {...props}><path fill="var(--hop-decorative-option7-surface)" d="M0 20C0 8.954 8.954 0 20 0s20 8.954 20 20-8.954 20-20 20S0 31.046 0 20" /><path fill="var(--hop-decorative-option7-icon)" d="M11.414 7.586A2 2 0 0 1 12.828 7H29a2 2 0 0 1 2 2v20.172a2 2 0 0 1-.586 1.414l-1.828 1.828a2 2 0 0 1-1.414.586H11a2 2 0 0 1-2-2V10.828a2 2 0 0 1 .586-1.414z" /><path fill="#fff" d="M13 8.25h16a.75.75 0 0 1 .75.75v20a.75.75 0 0 1-.75.75H13a.75.75 0 0 1-.75-.75V9a.75.75 0 0 1 .75-.75" /><path fill="var(--hop-decorative-option7-icon)" fillRule="evenodd" d="M27 13.625h-5v-1.25h5zm0 6h-5v-1.25h5zm0 6h-5v-1.25h5zm-7.671-13.721L16.53 15.39a.625.625 0 0 1-.93.051l-1.485-1.484.884-.884.992.991 2.361-2.944zm0 5.571-2.798 3.487a.625.625 0 0 1-.93.052l-1.485-1.485.884-.884.992.992 2.361-2.944zm0 6-2.798 3.487a.625.625 0 0 1-.93.052l-1.485-1.485.884-.884.992.992 2.361-2.944z" /></svg>);
/* eslint-enable max-len */

const CustomRichIcon = createRichIcon(CustomRichIcon24, CustomRichIcon32, CustomRichIcon40, "CustomRichIcon");

describe("create-rich-icon", () => {
    it("should render with default class", () => {
        render(<CustomRichIcon />);

        const element = screen.getByRole("img", { hidden: true });

        expect(element).toHaveClass("hop-RichIcon");
    });

    it("should support custom class", () => {
        render(<CustomRichIcon className="test" />);

        const element = screen.getByRole("img", { hidden: true });

        expect(element).toHaveClass("hop-RichIcon");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<CustomRichIcon marginTop="stack-sm" style={{ marginBottom: "13px" }} />);

        const element = screen.getByRole("img", { hidden: true });

        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<CustomRichIcon data-foo="bar" />);

        const element = screen.getByRole("img", { hidden: true });

        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <RichIconContext.Provider value={{ slots: { test: { "aria-label": "test" } } }}>
                <CustomRichIcon slot="test" />
            </RichIconContext.Provider>
        );

        const element = screen.getByRole("img", { hidden: true });
        expect(element).not.toHaveAttribute("slot", "test"); //
        expect(element).toHaveAttribute("data-slot", "test");
        expect(element).toHaveAttribute("aria-label", "test");
    });

    it("should support refs", () => {
        const ref = createRef<SVGSVGElement>();
        render(<CustomRichIcon ref={ref} />);

        const element = screen.getByRole("img", { hidden: true });

        expect(ref.current).toBe(element);
        expect(ref.current instanceof SVGElement).toBeTruthy();
        expect(ref.current?.tagName.toUpperCase()).toBe("SVG");
    });

    it("applies default displayName", () => {
        expect(CustomRichIcon.displayName).toBe("CustomRichIcon");
    });

    it("chooses the right source when size md", () => {
        const ref = createRef<SVGSVGElement>();
        render(<CustomRichIcon ref={ref} size="md" />);

        const element = screen.getByRole("img", { hidden: true });

        expect(ref.current).toBe(element);
        expect(element).toHaveAttribute("viewBox", "0 0 24 24");
    });

    it("chooses the right source when size lg", () => {
        const ref = createRef<SVGSVGElement>();
        render(<CustomRichIcon ref={ref} size="lg" />);

        const element = screen.getByRole("img", { hidden: true });

        expect(ref.current).toBe(element);
        expect(element).toHaveAttribute("viewBox", "0 0 32 32");
    });

    it("chooses the right source when size xl", () => {
        const ref = createRef<SVGSVGElement>();
        render(<CustomRichIcon ref={ref} size="xl" />);

        const element = screen.getByRole("img", { hidden: true });

        expect(ref.current).toBe(element);
        expect(element).toHaveAttribute("viewBox", "0 0 40 40");
    });
});

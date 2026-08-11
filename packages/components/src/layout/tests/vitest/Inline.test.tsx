import { render, screen } from "@hopper-ui/test-utils";
import { createRef, forwardRef } from "react";

import { Inline, type InlineProps } from "../../src/Inline.tsx";

const TestId = "TestId";

const Inlined = forwardRef<HTMLDivElement, Omit<InlineProps, "children">>((props, ref) => {
    return (
        <Inline
            data-testid={TestId}
            {...props}
            ref={ref}
        >
            <div>Alpha</div>
            <div>Bravo</div>
            <div>Charlie</div>
        </Inline>
    );
});

describe("Inline", () => {
    it("should render with custom class", () => {
        render(<Inlined className="test" />);

        const element = screen.getByTestId(TestId);
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<Inlined marginTop="stack-sm" style={{ marginBottom: "13px" }} />);

        const element = screen.getByTestId(TestId);
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<Inlined data-foo="bar" />);

        const element = screen.getByTestId(TestId);
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLDivElement>();
        render(<Inlined ref={ref} />);

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLDivElement).toBeTruthy();
    });
});

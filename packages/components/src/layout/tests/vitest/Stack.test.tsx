import { render, screen } from "@hopper-ui/test-utils";
import { createRef, forwardRef } from "react";

import { Stack, type StackProps } from "../../src/Stack.tsx";

const TestId = "TestId";

const Stacked = forwardRef<HTMLDivElement, Omit<StackProps, "children">>((props, ref) => {
    return (
        <Stack
            data-testid={TestId}
            {...props}
            ref={ref}
        >
            <div>Alpha</div>
            <div>Bravo</div>
            <div>Charlie</div>
        </Stack>
    );
});

describe("Stack", () => {
    it("should render with custom class", () => {
        render(<Stacked className="test" />);

        const element = screen.getByTestId(TestId);
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<Stacked marginTop="stack-sm" style={{ marginBottom: "13px" }} />);

        const element = screen.getByTestId(TestId);
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<Stacked data-foo="bar" />);

        const element = screen.getByTestId(TestId);
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLDivElement>();
        render(<Stacked ref={ref} />);

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLDivElement).toBeTruthy();
    });
});

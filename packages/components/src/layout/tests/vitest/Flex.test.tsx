import { render, screen } from "@hopper-ui/test-utils";
import { createRef, forwardRef } from "react";

import { Flex, type FlexProps } from "../../src/Flex.tsx";

const TestId = "TestId";

const Flexed = forwardRef<HTMLDivElement, Omit<FlexProps, "children">>((props, ref) => {
    return (
        <Flex
            data-testid={TestId}
            {...props}
            ref={ref}
        >
            <div>Alpha</div>
            <div>Bravo</div>
            <div>Charlie</div>
        </Flex>
    );
});

describe("Flex", () => {
    it("should render with custom class", () => {
        render(<Flexed className="test" />);

        const element = screen.getByTestId(TestId);
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<Flexed marginTop="stack-sm" style={{ marginBottom: "13px" }} />);

        const element = screen.getByTestId(TestId);
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<Flexed data-foo="bar" />);

        const element = screen.getByTestId(TestId);
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLDivElement>();
        render(<Flexed ref={ref} />);

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLDivElement).toBeTruthy();
    });
});

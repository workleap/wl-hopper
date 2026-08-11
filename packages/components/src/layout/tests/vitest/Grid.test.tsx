import { render, screen } from "@hopper-ui/test-utils";
import { createRef, forwardRef } from "react";

import { Grid, type GridProps } from "../../src/Grid.tsx";

const TestId = "TestId";

const SimpleGrid = forwardRef<HTMLDivElement, Omit<GridProps, "children">>((props, ref) => {
    return (
        <Grid
            data-testid={TestId}
            {...props}
            ref={ref}
        >
            <div>Alpha</div>
            <div>Bravo</div>
            <div>Charlie</div>
        </Grid>
    );
});

describe("Grid", () => {
    it("should render with custom class", () => {
        render(<SimpleGrid className="test" />);

        const element = screen.getByTestId(TestId);
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<SimpleGrid marginTop="stack-sm" style={{ marginBottom: "13px" }} />);

        const element = screen.getByTestId(TestId);
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<SimpleGrid data-foo="bar" />);

        const element = screen.getByTestId(TestId);
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLDivElement>();
        render(<SimpleGrid ref={ref} />);

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLDivElement).toBeTruthy();
    });
});

import { render, screen } from "@hopper-ui/test-utils";
import { createRef } from "react";

import { Box } from "../../src/Box.tsx";

describe("Box", () => {
    it("should render with default class", () => {
        render(<Box data-testid="Box">12</Box>);

        const element = screen.getByTestId("Box");
        expect(element).toHaveClass("hop-Box");
    });

    it("should support custom class", () => {
        render(<Box data-testid="Box" className="test">12</Box>);

        const element = screen.getByTestId("Box");
        expect(element).toHaveClass("hop-Box");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<Box data-testid="Box" marginTop="stack-sm" style={{ marginBottom: "13px" }} >12</Box>);

        const element = screen.getByTestId("Box");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<Box data-testid="Box" data-foo="bar">12</Box>);

        const element = screen.getByTestId("Box");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLSpanElement>();
        render(<Box data-testid="Box" as="span" ref={ref}>12</Box>);

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLSpanElement).toBeTruthy();
    });
});

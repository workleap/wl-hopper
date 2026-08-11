import { render, screen } from "@hopper-ui/test-utils";
import { createRef, forwardRef } from "react";

import { Button } from "../../src/Button.tsx";
import { ButtonGroup, type ButtonGroupProps } from "../../src/ButtonGroup.tsx";
import { ButtonGroupContext } from "../../src/ButtonGroupContext.ts";

const ExampleButtonGroup = forwardRef<HTMLDivElement, Omit<ButtonGroupProps, "children">>((props, ref) => {
    return (
        <ButtonGroup
            {...props}
            ref={ref}
            data-testid="button-group"
        >
            <Button variant="secondary">1</Button>
            <Button variant="secondary">2</Button>
        </ButtonGroup>
    );
});

describe("ButtonGroup", () => {
    it("should render with default class", () => {
        render(<ExampleButtonGroup />);

        const element = screen.queryByTestId("button-group");
        expect(element).toHaveClass("hop-ButtonGroup");
    });

    it("should support custom class", () => {
        render(<ExampleButtonGroup className="test" />);

        const element = screen.queryByTestId("button-group");
        expect(element).toHaveClass("hop-ButtonGroup");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        render(<ExampleButtonGroup marginTop="stack-sm" style={{ marginBottom: "13px" }} />);

        const element = screen.queryByTestId("button-group");
        expect(element).toHaveStyle({ marginTop: "var(--hop-space-stack-sm)", marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        render(<ExampleButtonGroup data-foo="bar" />);

        const element = screen.queryByTestId("button-group");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support slots", () => {
        render(
            <ButtonGroupContext.Provider value={{ slots: { test: { "aria-label": "test" } } }}>
                <ExampleButtonGroup slot="test" />
            </ButtonGroupContext.Provider>
        );

        const element = screen.queryByTestId("button-group");
        expect(element).toHaveAttribute("slot", "test");
        expect(element).toHaveAttribute("aria-label", "test");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLDivElement>();
        render(<ExampleButtonGroup ref={ref} />);

        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLDivElement).toBeTruthy();
    });
});

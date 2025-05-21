import { Text, Button } from "@hopper-ui/components";
import { render, screen, fireEvent } from "@hopper-ui/test-utils";
import { createRef, type RefObject } from "react";

import { Popover, type PopoverProps } from "../../src/Popover.tsx";
import { PopoverTrigger } from "../../src/PopoverTrigger.tsx";

interface SetupProps extends PopoverProps {
    "data-foo"?: string;
    ref?: RefObject<HTMLDivElement>;
}

const setUp = (props: SetupProps) => {
    return render(
        <PopoverTrigger>
            <Button>trigger</Button>
            <Popover {...props} data-testid="hopper-popover" />
        </PopoverTrigger>
    );
};

describe("Popover", () => {
    const popoverChildren = (
        <>
            <Text>Engagement score</Text>
            <span>The engagement score is the weighted average of the key metric scores below</span>
        </>
    );

    it("should render with default class", () => {
        setUp({ children: popoverChildren });

        fireEvent.click(screen.getByText("trigger"));
        const element = screen.getByTestId("hopper-popover");
        expect(element).toHaveClass("hop-Popover");
    });

    it("should support custom class", () => {
        setUp({ children: popoverChildren, className: "test" });

        fireEvent.click(screen.getByText("trigger"));
        const element = screen.getByTestId("hopper-popover");
        expect(element).toHaveClass("hop-Popover");
        expect(element).toHaveClass("test");
    });

    it("should support custom style", () => {
        setUp({ children: popoverChildren, style: { marginBottom: "13px" } });

        fireEvent.click(screen.getByText("trigger"));
        const element = screen.getByTestId("hopper-popover");
        expect(element).toHaveStyle({ marginBottom: "13px" });
    });

    it("should support DOM props", () => {
        setUp({ children: popoverChildren, "data-foo": "bar" });

        fireEvent.click(screen.getByText("trigger"));
        const element = screen.getByTestId("hopper-popover");
        expect(element).toHaveAttribute("data-foo", "bar");
    });

    it("should support refs", () => {
        const ref = createRef<HTMLDivElement>();
        setUp({ children: popoverChildren, ref });

        fireEvent.click(screen.getByText("trigger"));
        expect(ref.current).not.toBeNull();
        expect(ref.current instanceof HTMLDivElement).toBeTruthy();
    });
});

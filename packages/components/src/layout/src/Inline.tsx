import { type Ref, forwardRef } from "react";

import { Flex, type FlexProps } from "./Flex.tsx";

export interface InlineProps extends Omit<FlexProps, "direction" | "alignItems" | "justifyContent"> {
    /**
     * Whether or not to reverse the order of the elements.
     */
    reverse?: boolean;

    /**
     * An alias for the css justify-content property.
     */
    alignX?: FlexProps["justifyContent"];

    /**
     * An alias for the css align-items property.
     */
    alignY?: FlexProps["alignItems"];
}

function Inline(props: InlineProps, ref: Ref<HTMLDivElement>) {
    const { alignX, alignY = "center", gap = "inline-md", wrap = true, reverse, ...rest } = props;

    return (
        <Flex
            ref={ref}
            alignItems={alignY}
            justifyContent={alignX}
            direction={reverse ? "row-reverse" : "row"}
            gap={gap}
            wrap={wrap}
            {...rest}
        />
    );
}

/**
 * The Inline pattern is a layout primitive that can be used to stack elements in the horizontal direction and apply a space between them.
 *
 * [View Documentation](https://hopper.workleap.design/components/Inline)
 */
const _Inline = forwardRef<HTMLDivElement, InlineProps>(Inline);
_Inline.displayName = "Inline";

export { _Inline as Inline };

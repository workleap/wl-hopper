import { type Ref, forwardRef } from "react";

import { Flex, type FlexProps } from "./Flex.tsx";

export interface StackProps extends Omit<FlexProps, "direction" | "alignItems" | "justifyContent"> {
    /**
     * Whether or not to reverse the order of the elements.
     */
    reverse?: boolean;

    /**
     * An alias for the css align-items property.
     */
    alignX?: FlexProps["alignItems"];

    /**
     * An alias for the css justify-content property.
     */
    alignY?: FlexProps["justifyContent"];
}

function Stack(props: StackProps, ref: Ref<HTMLDivElement>) {
    const { reverse, alignX, alignY, gap = "stack-md", ...rest } = props;

    return (
        <Flex
            ref={ref}
            alignItems={alignX}
            justifyContent={alignY}
            direction={reverse ? "column-reverse" : "column"}
            gap={gap}
            {...rest}
        />
    );
}

/**
 * The Stack pattern is a layout primitive that can be used to stack elements in the vertical direction and apply a space between them.
 *
 * [View Documentation](https://hopper.workleap.design/components/Stack)
 */
const _Stack = forwardRef<HTMLDivElement, StackProps>(Stack);
_Stack.displayName = "Stack";

export { _Stack as Stack };

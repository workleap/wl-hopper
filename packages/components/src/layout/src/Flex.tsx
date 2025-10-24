import { Div, useResponsiveValue, type DivProps, type ResponsiveProp } from "@hopper-ui/styled-system";
import { forwardRef, type Ref } from "react";

export interface FlexProps
    extends Omit<DivProps,
        | "display"
        | "flexDirection"
        | "flexWrap"
        | "flexBasis"
        | "flexGrow"
        | "flexShrink"
    > {
    /**
     * The flex direction of the container. Can be row, column, row-reverse or column-reverse.
     */
    direction?: DivProps["flexDirection"];

    /**
     * Whether to wrap the flex items. The value can also be a boolean.
     */
    wrap?: DivProps["flexWrap"] | ResponsiveProp<boolean>;

    /**
     * An alias for the css flex-basis property.
     */
    basis?: DivProps["flexBasis"];

    /**
     * An alias for the css flex-grow property.
     */
    grow?: DivProps["flexGrow"];

    /**
     * An alias for the css flex-shrink property.
     */
    shrink?: DivProps["flexShrink"];

    /**
     * Whether to display the flex container as an inline element.
     */
    inline?: boolean;
}

function Flex(props: FlexProps, ref: Ref<HTMLDivElement>) {
    const {
        direction,
        inline,
        basis,
        grow,
        shrink,
        wrap: wrapProp,
        alignItems: alignItemsProp,
        justifyContent: justifyContentProp,
        alignContent: alignContentProp,
        ...otherProps
    } = props;

    const wrap = useResponsiveValue(wrapProp);
    const alignItems = useResponsiveValue(alignItemsProp);
    const justifyContent = useResponsiveValue(justifyContentProp);
    const alignContent = useResponsiveValue(alignContentProp);

    return (
        <Div
            ref={ref}
            display={inline ? "inline-flex" : "flex"}
            flexDirection={direction}
            flexBasis={basis}
            flexGrow={grow}
            flexShrink={shrink}
            flexWrap={flexWrapValue(wrap)}
            alignItems={flexAlignValue(alignItems)}
            justifyContent={flexAlignValue(justifyContent)}
            alignContent={flexAlignValue(alignContent)}
            {...otherProps}
        />
    );
}

/**
 * Normalize 'start' and 'end' alignment values to 'flex-start' and 'flex-end'
 * in flex containers for browser compatibility.
 */
function flexAlignValue<T>(value: T) {
    if (value === "start") {
        return "flex-start";
    }

    if (value === "end") {
        return "flex-end";
    }

    return value;
}

function flexWrapValue(value: DivProps["flexWrap"] | boolean) {
    if (typeof value === "boolean") {
        return value ? "wrap" : "nowrap";
    }

    return value;
}

/**
 * The Flex component is used to create a flex container and provides some shortcuts for the flex properties.
 *
 * [View Documentation](https://hopper.workleap.design/components/Flex)
 */
const _Flex = forwardRef<HTMLDivElement, FlexProps>(Flex);
_Flex.displayName = "Flex";

export { _Flex as Flex };

import { useStyledSystem, type StyledSystemProps } from "@hopper-ui/styled-system";
import clsx from "clsx";
import { forwardRef, type ComponentProps, type ElementType, type ForwardedRef } from "react";

export const GlobalBoxCssSelector = "hop-Box";

export type BoxProps<T extends ElementType = "div"> = StyledSystemProps & Omit<ComponentProps<T>, keyof StyledSystemProps> & {
    /**
         * The element type to render as.
         * @default "div"
         */
    as?: T;
};

const Box = <T extends ElementType = "div">(
    props: BoxProps<T>,
    ref: ForwardedRef<unknown>
) => {
    const { as: Component = "div" as T, ...restProps } = props;
    const { stylingProps, ...ownProps } = useStyledSystem(restProps);

    const { className, style, ...otherProps } = ownProps;

    const classNames = clsx(GlobalBoxCssSelector, stylingProps.className, className);
    const mergedStyle = {
        ...stylingProps.style,
        ...style
    };

    return (
        // It's too hard for typescript, a generic elementType, with generic props.
        // Basically, the interface is HTMLProps of the elementType + styled system props.
        // useStyledSystem removes the styled system props, so what is remaining is valid for the elementType.
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <Component
            ref={ref}
            className={classNames}
            style={mergedStyle}
            {...otherProps}
        />
    );
};

/**
 * A flexible container component that can render as any HTML element or React component.
 * Supports all styled system props for consistent spacing, layout, and styling.
 *
 * [View Documentation](https://hopper.workleap.design/components/Box)
 */
const _Box = forwardRef(Box) as <T extends ElementType = "div">(
    props: BoxProps<T> & { ref?: ForwardedRef<unknown> }
) => React.ReactElement;

export { _Box as Box };

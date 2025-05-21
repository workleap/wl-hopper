import { slot as slotFn, useResponsiveValue, useStyledSystem, type ResponsiveProp, type StyledComponentProps } from "@hopper-ui/styled-system";
import clsx from "clsx";
import {
    forwardRef,
    type CSSProperties, type ForwardedRef
} from "react";
import { Heading as RACHeading, useContextProps, type HeadingProps as RACHeadingProps } from "react-aria-components";

import { cssModule } from "../../../utils/index.ts";

import { HeadingContext } from "./HeadingContext.ts";

import styles from "./Heading.module.css";

export const GlobalHeadingCssSelector = "hop-Heading";

export type HeadingSize = "inherit" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

export interface HeadingProps extends StyledComponentProps<RACHeadingProps> {
    /**
     * The Typography Type Scale to use.
     * @default "md"
     */
    size?: ResponsiveProp<HeadingSize>;
}

function Heading(props: HeadingProps, ref: ForwardedRef<HTMLHeadingElement>) {
    [props, ref] = useContextProps(props, ref, HeadingContext);
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const { className, size: sizeProp, children, style, ...otherProps } = ownProps;

    const size = useResponsiveValue(sizeProp ?? "md");

    const classNames = clsx(
        GlobalHeadingCssSelector,
        cssModule(
            styles,
            "hop-Heading",
            size
        ),
        stylingProps.className,
        className
    );

    const mergedStyles: CSSProperties = {
        ...stylingProps.style,
        ...style
    };

    return (
        <RACHeading
            ref={ref}
            className={classNames}
            style={mergedStyles}
            {...otherProps}
        >
            {children}
        </RACHeading>
    );
}

/**
 * A primitive heading component matching Hopper's typography type scale.
 *
 * [View Documentation](https://hopper.workleap.design/components/Heading)
 */
const _Heading = slotFn("heading", forwardRef<HTMLHeadingElement, HeadingProps>(Heading));
_Heading.displayName = "Heading";

export { _Heading as Heading };

/**
 * Creates a Heading component with the specified level.
 * @param as
 */
function createHeading(as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6") {
    const level = parseInt(as[1]);

    return forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => {
        // eslint-disable-next-line
        return <_Heading {...props} ref={ref} level={level}/>;
    });
}

/**
 *
 * A primitive h1 component matching Hopper's typography type scale.
 *
 * [View Documentation](https://hopper.workleap.design/components/Heading)
 */
export const H1 = createHeading("h1");

/**
 *
 * A primitive h2 component matching Hopper's typography type scale.
 *
 * [View Documentation](https://hopper.workleap.design/components/Heading)
 */
export const H2 = createHeading("h2");

/**
 *
 * A primitive h3 component matching Hopper's typography type scale.
 *
 * [View Documentation](https://hopper.workleap.design/components/Heading)
 */
export const H3 = createHeading("h3");

/**
 *
 * A primitive h4 component matching Hopper's typography type scale.
 *
 * [View Documentation](https://hopper.workleap.design/components/Heading)
 */
export const H4 = createHeading("h4");

/**
 *
 * A primitive h5 component matching Hopper's typography type scale.
 *
 * [View Documentation](https://hopper.workleap.design/components/Heading)
 */
export const H5 = createHeading("h5");

/**
 *
 * A primitive h6 component matching Hopper's typography type scale.
 *
 * [View Documentation](https://hopper.workleap.design/components/Heading)
 */
export const H6 = createHeading("h6");

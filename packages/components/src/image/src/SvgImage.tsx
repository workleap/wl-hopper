import { type ResponsiveProp, type StyledSystemProps, useResponsiveValue, useStyledSystem } from "@hopper-ui/styled-system";
import clsx from "clsx";
import { type CSSProperties, type ElementType, type ForwardedRef, forwardRef, type HTMLProps } from "react";
import { useContextProps } from "react-aria-components";

import { type AccessibleSlotProps, type BaseComponentDOMProps, cssModule } from "../../utils/index.ts";

import { SvgImageContext } from "./SvgImageContext.ts";

import styles from "./SvgImage.module.css";

export const GlobalSvgImageCssSelector = "hop-SvgImage";

export interface SvgImageProps extends
    StyledSystemProps,
    AccessibleSlotProps,
    Omit<BaseComponentDOMProps, "children">,
    Omit<HTMLProps<SVGSVGElement>, "color" | "slot" | "content" | "height" | "width" | "src"> {
    /**
     * An SVG as a component.
     */
    src?: ResponsiveProp<ElementType>;
}

function SvgImage(props: SvgImageProps, ref: ForwardedRef<SVGSVGElement>) {
    [props, ref] = useContextProps(props, ref, SvgImageContext);

    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        className,
        style,
        src,
        ...otherProps
    } = ownProps;

    const classNames = clsx(
        className,
        GlobalSvgImageCssSelector,
        cssModule(
            styles,
            "hop-SvgImage"
        ),
        stylingProps.className
    );

    const mergedStyles: CSSProperties = {
        ...stylingProps.style,
        ...style
    };

    const SvgComponent = useResponsiveValue(src);

    if (!SvgComponent) {
        console.error("SvgImage component expects src");

        return null;
    }

    return <SvgComponent
        {...otherProps}
        className={classNames}
        style={mergedStyles}
        ref={ref}
        role="img"
    />;
}

/**
 * An SvgImage component that can be used to display SVGs.
 *
 * [View Documentation](https://hopper.workleap.design/components/SvgImage)
 */
const _SvgImage = forwardRef<SVGSVGElement, SvgImageProps>(SvgImage);
_SvgImage.displayName = "SvgImage";

export { _SvgImage as SvgImage };

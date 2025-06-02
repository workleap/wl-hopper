import { type ResponsiveProp, type StyledSystemProps, useResponsiveValue, useStyledSystem } from "@hopper-ui/styled-system";
import clsx from "clsx";
import { type CSSProperties, type ForwardedRef, forwardRef, type HTMLProps } from "react";
import { useContextProps } from "react-aria-components";

import { type AccessibleSlotProps, type BaseComponentDOMProps, ClearProviders, cssModule } from "../../utils/index.ts";

import { ImageContext, type ImageContextValue } from "./ImageContext.ts";

import styles from "./Image.module.css";

export const GlobalImageCssSelector = "hop-Image";

export interface ImageProps extends
    StyledSystemProps,
    AccessibleSlotProps,
    Omit<BaseComponentDOMProps, "children">,
    Omit<HTMLProps<HTMLImageElement>, "slot" | "color" | "content" | "height" | "width" | "src"> {
    /**
     * The image shape.
     */
    shape?: "straight" | "rounded" | "circular";
    /**
     * An image path.
     */
    src?: ResponsiveProp<string>;
}

function Image(props: ImageProps, ref: ForwardedRef<HTMLImageElement>) {
    [props, ref] = useContextProps(props, ref, ImageContext);

    const { stylingProps, ...ownProps } = useStyledSystem(props as ImageContextValue);
    const {
        className,
        style,
        shape,
        src,
        slot,
        alt,
        isHidden,
        clearContexts,
        ...otherProps
    } = ownProps;

    const srcValue = useResponsiveValue(src);

    if (isHidden) {
        return null;
    }

    if (alt === undefined) {
        console.warn(
            "The `alt` prop was not provided to an image. " +
            "Add `alt` text for screen readers, or set `alt=\"\"` prop to indicate that the image " +
            "is decorative or redundant with displayed text and should not be announced by screen readers."
        );
    }

    const classNames = clsx(
        className,
        GlobalImageCssSelector,
        cssModule(
            styles,
            "hop-Image",
            shape
        ),
        stylingProps.className
    );

    const mergedStyles: CSSProperties = {
        ...stylingProps.style,
        ...style
    };

    return (
        <ClearProviders values={clearContexts}>
            <img
                {...otherProps}
                alt={alt ?? ""}
                slot={slot ?? undefined}
                className={classNames}
                style={mergedStyles}
                ref={ref}
                src={srcValue}
            />
        </ClearProviders>
    );
}

/**
 * An image component that can be used to display images.
 *
 * [View Documentation](https://hopper.workleap.design/components/Image)
 */
const _Image = forwardRef<HTMLImageElement, ImageProps>(Image);
_Image.displayName = "Image";

export { _Image as Image };

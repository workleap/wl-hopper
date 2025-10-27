import { useResponsiveValue, useStyledSystem, type ResponsiveProp, type StyledComponentProps } from "@hopper-ui/styled-system";
import clsx from "clsx";
import { forwardRef, type CSSProperties, type ForwardedRef } from "react";
import { Provider, useContextProps } from "react-aria-components";

import { ImageContext } from "../../image/index.ts";
import { ClearProviders, cssModule, type BaseComponentDOMProps } from "../../utils/index.ts";

import { IllustrationContext, type IllustrationContextValue } from "./IllustrationContext.ts";

import styles from "./Illustration.module.css";

export const GlobalIllustrationCssSelector = "hop-Illustration";

export interface IllustrationProps extends StyledComponentProps<BaseComponentDOMProps> {
    /**
     * The orientation of the illustration.
     * @default "horizontal"
     */
    orientation?: ResponsiveProp<"horizontal" | "vertical">;
    /**
     * The illustration shape.
     * @default "straight"
     */
    shape?: "straight" | "rounded";
}

function Illustration(props: IllustrationProps, ref: ForwardedRef<HTMLDivElement>) {
    [props, ref] = useContextProps(props, ref, IllustrationContext);
    const { stylingProps, ...ownProps } = useStyledSystem(props as IllustrationContextValue);
    const {
        className,
        clearContexts,
        children,
        isHidden,
        orientation: orientationProp,
        shape = "straight",
        style,
        slot,
        ...otherProps
    } = ownProps;

    const orientation = useResponsiveValue(orientationProp) || "horizontal";

    if (isHidden) {
        return null;
    }

    const classNames = clsx(
        GlobalIllustrationCssSelector,
        cssModule(
            styles,
            GlobalIllustrationCssSelector,
            orientation,
            shape === "rounded" && "rounded"
        ),
        stylingProps.className,
        className
    );

    const mergedStyles: CSSProperties = {
        ...style,
        ...stylingProps.style
    };

    return (
        <ClearProviders values={clearContexts}>
            <div
                ref={ref}
                className={classNames}
                style={mergedStyles}
                slot={slot ?? undefined}
                {...otherProps}
            >
                <Provider
                    values={[
                        [ImageContext, { className: styles["hop-Illustration__image"] }]
                    ]}
                >
                    {children}
                </Provider>
            </div>
        </ClearProviders>
    );
}

/**
 * An illustration compose an image with a background color. Use an illustration as an hero in a modal.
 *
 * [View Documentation](https://hopper.workleap.design/components/Illustration)
 */
const _Illustration = forwardRef<HTMLDivElement, IllustrationProps>(Illustration);
_Illustration.displayName = "Illustration";

export { _Illustration as Illustration };

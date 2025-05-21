import { Div, useStyledSystem, type StyledSystemProps } from "@hopper-ui/styled-system";
import clsx from "clsx";
import { forwardRef, type CSSProperties, type ForwardedRef } from "react";
import { useContextProps } from "react-aria-components";

import { ButtonContext, ButtonGroupContext } from "../../buttons/index.ts";
import { ImageContext, SvgImageContext } from "../../Image/index.ts";
import { ContentContext } from "../../layout/index.ts";
import { HeadingContext } from "../../typography/Heading/index.ts";
import { cssModule, SlotProvider, type AccessibleSlotProps, type BaseComponentDOMProps } from "../../utils/index.ts";

import { IllustratedMessageContext } from "./IllustratedMessageContext.ts";

import styles from "./IllustratedMessage.module.css";

export const GlobalIllustratedMessageCssSelector = "hop-IllustratedMessage";

export type IllustratedMessageSize = "sm" | "md" | "lg";

export interface IllustratedMessageProps extends StyledSystemProps, AccessibleSlotProps, BaseComponentDOMProps {
    /**
     * The size of the IllustratedMessage.
     * @default "md"
     */
    size?: IllustratedMessageSize;
}

function IllustratedMessage(props: IllustratedMessageProps, ref: ForwardedRef<HTMLDivElement>) {
    [props, ref] = useContextProps(props, ref, IllustratedMessageContext);

    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        className,
        style,
        slot,
        children,
        size = "md",
        ...otherProps
    } = ownProps;

    const classNames = clsx(
        className,
        GlobalIllustratedMessageCssSelector,
        cssModule(
            styles,
            "hop-IllustratedMessage",
            size
        ),
        stylingProps.className
    );

    const mergedStyles: CSSProperties = {
        ...stylingProps.style,
        ...style
    };

    return (
        <Div
            {...otherProps}
            className={classNames}
            style={mergedStyles}
            ref={ref}
            slot={slot ?? undefined}
        >
            <SlotProvider
                values={[
                    [SvgImageContext, {
                        className: styles["hop-IllustratedMessage__image"]
                    }],
                    [ImageContext, {
                        className: styles["hop-IllustratedMessage__image"]
                    }],
                    [HeadingContext, {
                        className: styles["hop-IllustratedMessage__heading"]
                    }],
                    [ContentContext, {
                        className: styles["hop-IllustratedMessage__content"],
                        color: "neutral-weak"
                    }],
                    [ButtonGroupContext, {
                        className: styles["hop-IllustratedMessage__buttonGroup"]
                    }],
                    [ButtonContext, {
                        className: styles["hop-IllustratedMessage__button"]
                    }]
                ]}
            >
                {children}
            </SlotProvider>
        </Div>
    );
}

/**
 * An illustrated message display an image and a message, usually for an empty state or an error page.
 *
 * [View Documentation](https://hopper.workleap.design/components/IllustratedMessage)
 */
const _IllustratedMessage = forwardRef<HTMLDivElement, IllustratedMessageProps>(IllustratedMessage);
_IllustratedMessage.displayName = "IllustratedMessage";

export { _IllustratedMessage as IllustratedMessage };

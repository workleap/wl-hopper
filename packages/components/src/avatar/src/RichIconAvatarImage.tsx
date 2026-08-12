import { RichIconContext, type RichIconProps } from "@hopper-ui/icons";
import {
    type ResponsiveProp,
    type StyledSystemProps,
    slot as slotFn,
    useResponsiveValue,
    useStyledSystem
} from "@hopper-ui/styled-system";
import { type ComponentProps, type ForwardedRef, type HTMLAttributes, forwardRef } from "react";
import { type PressEvent, Pressable, mergeProps, useFocusRing } from "react-aria";
import { composeRenderProps, useContextProps } from "react-aria-components";

import {
    type AccessibleSlotProps,
    type RenderProps,
    type SizeAdapter,
    SlotProvider,
    composeClassnameRenderProps,
    cssModule,
    useRenderProps
} from "../../utils/index.ts";

import type { AvatarProps, AvatarSize } from "./Avatar.tsx";
import { RichIconAvatarImageContext } from "./RichIconAvatarImageContext.ts";

import styles from "./RichIconAvatarImage.module.css";

export const GlobalRichIconAvatarImageCssSelector = "hop-RichIconAvatarImage";

interface RichIconAvatarImageRenderProps {
    /**
     * Whether or not the avatar is disabled.
     */
    isDisabled?: boolean;
    /**
     * Whether or not the avatar is focus visible.
     */
    isFocusVisible?: boolean;
}

type OmittedDivProps = "slot" | "content" | "color" | "children" | "className" | "style";

export interface RichIconAvatarImageProps
    extends
        StyledSystemProps,
        AccessibleSlotProps,
        RenderProps<RichIconAvatarImageRenderProps>,
        Omit<HTMLAttributes<HTMLDivElement>, OmittedDivProps> {
    /**
     * Whether or not the avatar image is disabled.
     */
    isDisabled?: boolean;
    /**
     * The size of the image.
     * * @default "md"
     */
    size?: ResponsiveProp<AvatarSize>;
    /**
     * Called when the avatar is pressed
     */
    onPress?: (event: PressEvent) => void;
}

export const AvatarToIconSizeAdapter: SizeAdapter<AvatarProps["size"], RichIconProps["size"]> = {
    xs: "md",
    sm: "md",
    md: "lg",
    lg: "xl",
    xl: "xl",
    "2xl": "xl"
};

function RichIconAvatarImage(props: RichIconAvatarImageProps, ref: ForwardedRef<HTMLDivElement>) {
    [props, ref] = useContextProps(props, ref, RichIconAvatarImageContext);
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const { className, isDisabled, onPress, style, slot, size: sizeValue, ...otherProps } = ownProps;

    const { focusProps, isFocusVisible } = useFocusRing({ within: true });
    const isClickable = !!onPress;
    const size = useResponsiveValue(sizeValue) ?? "md";

    const classNames = composeClassnameRenderProps(
        className,
        GlobalRichIconAvatarImageCssSelector,
        cssModule(
            styles,
            "hop-RichIconAvatarImage",
            size,
            isClickable && "clickable",
            isFocusVisible && "focus-visible"
        ),
        stylingProps.className
    );

    const mergedStyles = composeRenderProps(style, prev => {
        return {
            ...stylingProps.style,
            ...prev
        };
    });

    const renderProps = useRenderProps<RichIconAvatarImageRenderProps>({
        ...props,
        className: classNames,
        style: mergedStyles,
        values: {
            isDisabled: isDisabled || false,
            isFocusVisible: isFocusVisible || false
        }
    });

    if (!props["aria-label"] && !props["aria-labelledby"]) {
        console.warn("An aria-label or aria-labelledby prop is required on RichIconAvatarImage for accessibility.");
    }

    const avatarImage = (extraProps: ComponentProps<"div">) => (
        <div
            {...mergeProps(otherProps, renderProps, extraProps)}
            ref={ref}
            slot={slot ?? undefined}
            data-disabled={isDisabled || undefined}
        >
            <SlotProvider
                values={[
                    [
                        RichIconContext,
                        {
                            className: styles["hop-RichIconAvatarImage__icon"],
                            size: AvatarToIconSizeAdapter[size]
                        }
                    ]
                ]}
            >
                {renderProps.children}
            </SlotProvider>
        </div>
    );

    if (onPress) {
        return <Pressable onPress={onPress}>{avatarImage({ role: "button", ...focusProps })}</Pressable>;
    }

    return avatarImage({ role: "img" });
}

/**
 * RichIconAvatarImage is a wrapper component that provides a consistent way to style the image of a RichIcon.
 *
 * [View Documentation](https://hopper.workleap.design/components/Avatar)
 */
const _RichIconAvatarImage = slotFn(
    "avatar",
    forwardRef<HTMLDivElement, RichIconAvatarImageProps>(RichIconAvatarImage)
);
_RichIconAvatarImage.displayName = "RichIconAvatarImage";

export { _RichIconAvatarImage as RichIconAvatarImage };

import { BrokenImageRichIcon } from "@hopper-ui/icons";
import { type ResponsiveProp, type StyledSystemProps, useResponsiveValue, useStyledSystem } from "@hopper-ui/styled-system";
import { type ForwardedRef, forwardRef } from "react";
import { mergeProps, type PressEvent } from "react-aria";
import { composeRenderProps, useContextProps } from "react-aria-components";

import { type AccessibleSlotProps, composeClassnameRenderProps, type RenderProps, useRenderProps } from "../../utils/index.ts";

import type { AvatarSize } from "./Avatar.tsx";
import { AvatarContext } from "./AvatarContext.ts";
import { RichIconAvatarImage } from "./RichIconAvatarImage.tsx";

export const GlobalBrokenAvatarCssSelector = "hop-BrokenAvatar";

interface BrokenAvatarRenderProps {
    /**
     * Whether or not the avatar is disabled.
     */
    isDisabled?: boolean;
}


export interface BrokenAvatarProps extends StyledSystemProps, AccessibleSlotProps, Omit<RenderProps<BrokenAvatarRenderProps>, "children"> {
    /**
     * Whether or not the avatar is disabled.
     */
    isDisabled?: boolean;
    /**
     * The size of the avatar.
     * * @default "md"
     */
    size?: ResponsiveProp<AvatarSize>;
    /**
     * Called when the avatar is pressed
     */
    onPress?: (event: PressEvent) => void;
}

function BrokenAvatar(props: BrokenAvatarProps, ref: ForwardedRef<HTMLDivElement>) {
    [props, ref] = useContextProps(props, ref, AvatarContext);
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        className,
        size: sizeValue,
        style,
        isDisabled,
        ...otherProps
    } = ownProps;

    const size = useResponsiveValue(sizeValue) ?? "md";

    const classNames = composeClassnameRenderProps(
        className,
        GlobalBrokenAvatarCssSelector,
        stylingProps.className
    );

    const mergedStyles = composeRenderProps(style, prev => {
        return {
            ...stylingProps.style,
            ...prev
        };
    });

    const renderProps = useRenderProps<BrokenAvatarRenderProps>({
        ...props,
        className: classNames,
        style: mergedStyles,
        values: {
            isDisabled: isDisabled || false
        }
    });

    return (
        <RichIconAvatarImage
            isDisabled={isDisabled}
            ref={ref}
            size={size}
            {...mergeProps(renderProps, otherProps)}
        >
            <BrokenImageRichIcon />
        </RichIconAvatarImage>
    );
}

/**
 * BrokenAvatars are used to represent broken users.
 *
 * [View Documentation](https://hopper.workleap.design/components/Avatar)
 */
const _BrokenAvatar = forwardRef<HTMLDivElement, BrokenAvatarProps>(BrokenAvatar);
_BrokenAvatar.displayName = "BrokenAvatar";

export { _BrokenAvatar as BrokenAvatar };

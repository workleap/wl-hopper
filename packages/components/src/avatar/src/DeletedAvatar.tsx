import { DeletedUserRichIcon } from "@hopper-ui/icons";
import { type ResponsiveProp, type StyledSystemProps, useResponsiveValue, useStyledSystem } from "@hopper-ui/styled-system";
import { type ForwardedRef, forwardRef } from "react";
import { mergeProps } from "react-aria";
import { composeRenderProps, useContextProps } from "react-aria-components";

import { Tooltip, TooltipTrigger } from "../../tooltip/index.ts";
import { type AccessibleSlotProps, type RenderProps, composeClassnameRenderProps, useRenderProps } from "../../utils/index.ts";

import type { AvatarSize } from "./Avatar.tsx";
import { AvatarContext } from "./AvatarContext.ts";
import { RichIconAvatarImage } from "./RichIconAvatarImage.tsx";

export const GlobalDeletedAvatarCssSelector = "hop-DeletedAvatar";

interface DeletedAvatarRenderProps {
    /**
     * Whether or not the avatar is disabled.
     */
    isDisabled?: boolean;
}


export interface DeletedAvatarProps extends StyledSystemProps, AccessibleSlotProps, Omit<RenderProps<DeletedAvatarRenderProps>, "children"> {
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
     * Whether or not to show the tooltip
     */
    showTooltip?: boolean;
}

function DeletedAvatar(props: DeletedAvatarProps, ref: ForwardedRef<HTMLDivElement>) {
    [props, ref] = useContextProps(props, ref, AvatarContext);
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        className,
        size: sizeValue,
        style,
        isDisabled,
        showTooltip,
        ...otherProps
    } = ownProps;

    const size = useResponsiveValue(sizeValue) ?? "md";

    const classNames = composeClassnameRenderProps(
        className,
        GlobalDeletedAvatarCssSelector,
        stylingProps.className
    );

    const mergedStyles = composeRenderProps(style, prev => {
        return {
            ...stylingProps.style,
            ...prev
        };
    });

    const renderProps = useRenderProps<DeletedAvatarRenderProps>({
        ...props,
        className: classNames,
        style: mergedStyles,
        values: {
            isDisabled: isDisabled || false
        }
    });

    const avatar = (
        <RichIconAvatarImage
            isDisabled={isDisabled}
            ref={ref}
            size={size}
            {...mergeProps(renderProps, otherProps)}
        >
            <DeletedUserRichIcon />
        </RichIconAvatarImage>
    );

    const ariaLabel = props["aria-label"] ?? props["aria-labelledby"];

    if (showTooltip && ariaLabel) {
        return (
            <TooltipTrigger>
                {avatar}
                <Tooltip>{ariaLabel}</Tooltip>
            </TooltipTrigger>
        );
    }

    return avatar;
}

/**
 * DeletedAvatars are used to represent deleted users.
 *
 * [View Documentation](https://hopper.workleap.design/components/Avatar)
 */
const _DeletedAvatar = forwardRef<HTMLDivElement, DeletedAvatarProps>(DeletedAvatar);
_DeletedAvatar.displayName = "DeletedAvatar";

export { _DeletedAvatar as DeletedAvatar };

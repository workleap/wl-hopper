import { AnonymousRichIcon } from "@hopper-ui/icons";
import { type ResponsiveProp, type StyledSystemProps, useResponsiveValue, useStyledSystem } from "@hopper-ui/styled-system";
import { type ForwardedRef, forwardRef } from "react";
import { mergeProps } from "react-aria";
import { composeRenderProps, useContextProps } from "react-aria-components";

import { Tooltip, TooltipTrigger } from "../../tooltip/index.ts";
import { type AccessibleSlotProps, type RenderProps, composeClassnameRenderProps, useRenderProps } from "../../utils/index.ts";

import type { AvatarSize } from "./Avatar.tsx";
import { AvatarContext } from "./AvatarContext.ts";
import { RichIconAvatarImage } from "./RichIconAvatarImage.tsx";

export const GlobalAnonymousAvatarCssSelector = "hop-AnonymousAvatar";

interface AnonymousAvatarRenderProps {
    /**
     * Whether or not the avatar is disabled.
     */
    isDisabled?: boolean;
}

export interface AnonymousAvatarProps extends StyledSystemProps, AccessibleSlotProps, Omit<RenderProps<AnonymousAvatarRenderProps>, "children"> {
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
     * Whether or not to show the tooltip.
     * The tooltip will show the content from the aria-label or aria-labelledby.
     * If both are provided, aria-label will be used.
     * If neither are provided, the tooltip will not be shown.
     * @default false
     */
    showTooltip?: boolean;
}

function AnonymousAvatar(props: AnonymousAvatarProps, ref: ForwardedRef<HTMLDivElement>) {
    [props, ref] = useContextProps(props, ref, AvatarContext);
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        className,
        style,
        size: sizeValue,
        showTooltip,
        ...otherProps
    } = ownProps;

    const size = useResponsiveValue(sizeValue) ?? "md";

    const classNames = composeClassnameRenderProps(
        className,
        GlobalAnonymousAvatarCssSelector,
        stylingProps.className
    );

    const mergedStyles = composeRenderProps(style, prev => {
        return {
            ...stylingProps.style,
            ...prev
        };
    });

    const renderProps = useRenderProps({
        ...otherProps,
        className: classNames,
        style: mergedStyles,
        values: {
            isDisabled: props.isDisabled || false
        }
    });

    const avatar = (
        <RichIconAvatarImage
            {...mergeProps(otherProps, renderProps)}
            ref={ref}
            size={size}
        >
            <AnonymousRichIcon />
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
 * AnonymousAvatars are used to represent users who wish to remain anonymous.
 *
 * [View Documentation](https://hopper.workleap.design/components/Avatar)
 */
const _AnonymousAvatar = forwardRef<HTMLDivElement, AnonymousAvatarProps>(AnonymousAvatar);
_AnonymousAvatar.displayName = "AnonymousAvatar";

export { _AnonymousAvatar as AnonymousAvatar };

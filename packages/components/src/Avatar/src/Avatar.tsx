import { BrokenImageRichIcon } from "@hopper-ui/icons";
import { type ResponsiveProp, slot as slotFn, type StyledSystemProps, useResponsiveValue, useStyledSystem } from "@hopper-ui/styled-system";
import { filterDOMProps, mergeProps } from "@react-aria/utils";
import { type ForwardedRef, forwardRef, type HTMLProps, type ReactElement, useMemo } from "react";
import { composeRenderProps, useContextProps } from "react-aria-components";

import { Text, type TextSize } from "../../typography/Text/index.ts";
import { type AccessibleSlotProps, ClearContainerSlots, composeClassnameRenderProps, cssModule, type RenderProps, type SizeAdapter, useRenderProps } from "../../utils/index.ts";

import { AvatarContext } from "./AvatarContext.ts";
import { RichIconAvatarImage } from "./RichIconAvatarImage.tsx";
import { useImageFallback } from "./useImageFallback.ts";

import styles from "./Avatar.module.css";

export const GlobalAvatarCssSelector = "hop-Avatar";
export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

type AvatarImageBaseProps = HTMLProps<HTMLImageElement>;

interface AvatarRenderProps {
    /**
     * Whether or not the avatar is disabled.
     */
    isDisabled?: boolean;
}

export interface AvatarProps extends StyledSystemProps, AccessibleSlotProps, Omit<RenderProps<AvatarRenderProps>, "children"> {
    /**
    * The src of the image to display if the image fails to load. If set to null, the initials will be displayed instead.
    * * @default "BrokenImageRichIcon"
    */
    fallbackSrc?: string | null;
    /**
     * Props to add to the img element when src is provided.
     */
    imageProps?: AvatarImageBaseProps;
    /**
     * Whether or not the avatar is disabled.
     */
    isDisabled?: boolean;
    /**
     * The name of the Avatar. This will be used for the alt text of the image or the initials if no image is provided.
     */
    name: string;
    /**
     * The size of the avatar.
     * * @default "md"
     */
    size?: ResponsiveProp<AvatarSize>;
    /**
     * The src of the image to display. If not provided, the initials will be displayed instead.
     */
    src?: string;
}

export const AvatarToTextSizeAdapter: SizeAdapter<AvatarSize, TextSize> = {
    xs: "xs",
    sm: "xs",
    md: "md",
    lg: "lg",
    xl: "xl",
    "2xl": "xl"
};

function getColorIndex(name: string, maxNumberOfColor: number) {
    let hashCode = 0;

    for (let i = name.length - 1; i >= 0; i--) {
        const character = name.charCodeAt(i);
        const shift = i % 8;

        hashCode ^= (character << shift) + (character >> (8 - shift));
    }

    return hashCode % maxNumberOfColor;
}

function getColorName(name: string) {
    const variantToUse = `option${getColorIndex(name, 8) + 1}`;

    return `decorative-${variantToUse}`;
}
export interface AvatarInitialsProps {
    /**
     * The name of the Avatar. This will be used for the alt text of the image or the initials if no image is provided.
     */
    name: string;
    /**
     * The size of the avatar.
     * * @default "md"
     */
    size: ResponsiveProp<AvatarSize>;
}

function AvatarInitials(props: AvatarInitialsProps) {
    const {
        name,
        size: sizeValue
    } = props;

    const size = useResponsiveValue(sizeValue) ?? "md";

    const initials = useMemo(() => {
        const cleanName = name.replace(/\s+/g, " ").trim();
        const [firstName, lastName] = cleanName.split(" ");
        const letters = firstName && lastName
            ? `${firstName.charAt(0)}${lastName.charAt(0)}`
            : firstName.charAt(0);

        return size === "xs" && letters.length > 1 ? letters.charAt(0) : letters;
    }, [name, size]);

    return (
        <Text
            size={AvatarToTextSizeAdapter[size]}
        >
            {initials}
        </Text>
    );
}

function Avatar(props: AvatarProps, ref: ForwardedRef<HTMLDivElement>) {
    [props, ref] = useContextProps(props, ref, AvatarContext);
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        "aria-label": ariaLabel,
        fallbackSrc,
        imageProps,
        isDisabled,
        name,
        size: sizeValue,
        slot,
        src,
        className,
        style,
        ...otherProps
    } = ownProps;
    const domProps = filterDOMProps(otherProps);

    const { onError, onLoad, ...otherImageProps } = imageProps ?? {};
    const { imageUrl, status } = useImageFallback({ src, fallbackSrc, onError, onLoad });
    const imageLoaded = status === "loaded";
    const imageFailed = status === "failed";

    const size = useResponsiveValue(sizeValue) ?? "md";
    const isFallbackInitials = fallbackSrc === null;
    const isBrokenImage = imageFailed && !isFallbackInitials;
    const isImage = src && !imageFailed && imageLoaded;
    const isInitials = !src || (!isImage && isFallbackInitials);

    const classNames = composeClassnameRenderProps(
        className,
        GlobalAvatarCssSelector,
        cssModule(
            styles,
            "hop-Avatar",
            size,
            isBrokenImage && "broken-image",
            isImage && "image",
            isInitials && getColorName(name)
        ),
        stylingProps.className
    );

    const mergedStyles = composeRenderProps(style, prev => {
        return {
            ...stylingProps.style,
            ...prev
        };
    });

    const renderProps = useRenderProps<AvatarRenderProps>({
        ...props,
        className: classNames,
        style: mergedStyles,
        values: {
            isDisabled: isDisabled || false
        }
    });

    if (isBrokenImage) {
        return (
            <RichIconAvatarImage
                {...mergeProps(domProps, renderProps)}
                aria-label={ariaLabel ?? name}
                isDisabled={isDisabled}
                ref={ref}
                size={size}
                slot={slot}
            >
                <BrokenImageRichIcon />
            </RichIconAvatarImage>
        );
    }

    let content: ReactElement | null = null;

    if (isInitials) {
        content = <AvatarInitials
            {...otherProps}
            name={name}
            size={size}
        />;
    }

    if (imageLoaded) {
        content = <img
            {...filterDOMProps(otherImageProps)}
            alt=""
            aria-hidden
            className={styles["hop-Avatar__image"]}
            onError={onError}
            src={imageUrl}
        />;
    }

    return (
        <div
            {...mergeProps(domProps, renderProps)}
            aria-label={ariaLabel ?? name}
            data-disabled={isDisabled || undefined}
            role="img"
            slot={slot ?? undefined}
            ref={ref}
        >
            <ClearContainerSlots>
                {content}
            </ClearContainerSlots>
        </div>
    );
}

/**
 * Avatars are used to show a thumbnail representation of an individual, team or group in the interface.
 *
 * [View Documentation](https://hopper.workleap.design/components/Avatar)
 */
const _Avatar = slotFn("avatar", forwardRef<HTMLDivElement, AvatarProps>(Avatar));
_Avatar.displayName = "Avatar";

export { _Avatar as Avatar };

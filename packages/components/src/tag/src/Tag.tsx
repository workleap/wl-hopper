import { IconContext } from "@hopper-ui/icons";
import {
    type ResponsiveProp,
    type StyledComponentProps,
    slot as slotFn,
    useResponsiveValue,
    useStyledSystem
} from "@hopper-ui/styled-system";
import { filterDOMProps, mergeProps, useObjectRef } from "@react-aria/utils";
import type { FocusableElement } from "@react-types/shared";
import clsx from "clsx";
import { type ElementType, type ForwardedRef, type MutableRefObject, forwardRef, useContext, useEffect, useMemo } from "react";
import { useFocusRing, useFocusable, useHover, useLink, usePress } from "react-aria";
import { Tag as RACTag, type TagProps as RACTagProps, composeRenderProps, useContextProps } from "react-aria-components";

import { AvatarContext, type AvatarProps } from "../../avatar/index.ts";
import { BadgeContext } from "../../badge/index.ts";
import { ClearButton, type ClearButtonProps } from "../../buttons/index.ts";
import { type FormStyleProps, useFormProps } from "../../form/index.ts";
import { useLocalizedString } from "../../i18n/index.ts";
import { IconListContext } from "../../icon-list/index.ts";
import { Spinner, type SpinnerProps } from "../../spinner/index.ts";
import { TextContext, type TextSize } from "../../typography/index.ts";
import {
    ClearContainerSlots,
    type SizeAdapter,
    SlotProvider,
    composeClassnameRenderProps,
    cssModule,
    ensureTextWrapper,
    useRenderProps
} from "../../utils/index.ts";
import { mapOrbiterToHopperVariants } from "../utils/Tag.utils.ts";

import { TagContext } from "./TagContext.ts";
import { InternalTagGroupContext } from "./TagGroupContext.ts";

import styles from "./Tag.module.css";

export const GlobalTagCssSelector = "hop-Tag";

export type TagSize = "sm" | "md" | "lg";
export type TagVariant = "neutral" | "subdued" | "progress" | "positive" | "caution" | "negative" | "option1" | "option2" | "option3" | "option4" | "option5" | "option6";

const TagToTextSizeAdapter: SizeAdapter<TagSize, TextSize> = {
    sm: "xs",
    md: "xs",
    lg: "sm"
};

const TagToAvatarSizeAdapter: SizeAdapter<TagSize, AvatarProps["size"]> = {
    sm: "xs",
    md: "xs",
    lg: "sm"
};

const TagToButtonSizeAdapter: SizeAdapter<TagSize, ClearButtonProps["size"]> = {
    sm: "md",
    md: "md",
    lg: "lg"
};

export interface TagProps extends StyledComponentProps<RACTagProps> {
    /**
     * Whether the tag is invalid or not.
     */
    isInvalid?: boolean;
    /**
     * Whether the tag is loading or not.
     */
    isLoading?: boolean;
    /**
     * The size of the tag.
     * @default "md"
     */
    size?: ResponsiveProp<TagSize>;
    /**
     * The visual style of the Tag.
     * @default "neutral"
     */
    variant?: TagVariant;
    /**
     * The props of the ClearButton.
     */
    clearButtonProps?: ClearButtonProps;
    /**
     * The props of the Spinner.
     */
    spinnerProps?: SpinnerProps;
    /**
     * This property is only available for Tag without a TagGroup.
     * Whether to exclude the element from the sequential tab order. If true,
     * the element will not be focusable via the keyboard by tabbing. This should
     * be avoided except in rare scenarios where an alternative means of accessing
     * the element or its functionality via the keyboard is available.
     */
    excludeFromTabOrder?: boolean;
}

function Tag(props: TagProps, ref: ForwardedRef<HTMLDivElement>) {
    [props, ref] = useContextProps(props, ref, TagContext);
    props = useFormProps(props as FormStyleProps); /* Needed because Tag has an extra size. */
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        className,
        children: childrenProp,
        isInvalid,
        isLoading,
        size: sizeProp,
        style: styleProp,
        textValue: textValueProp,
        variant = "neutral",
        clearButtonProps,
        spinnerProps,
        ...otherProps
    } = ownProps;

    const stringFormatter = useLocalizedString();
    const size = useResponsiveValue(sizeProp) ?? "md";
    const textValue = textValueProp ?? (typeof childrenProp === "string" ? childrenProp : undefined);
    const isStandalone = !useContext(InternalTagGroupContext).isInGroup;

    const classNames = composeClassnameRenderProps(
        className,
        GlobalTagCssSelector,
        cssModule(
            styles,
            "hop-Tag",
            size,
            mapOrbiterToHopperVariants(variant),
            isStandalone && "standalone"
        ),
        stylingProps.className
    );

    const style = composeRenderProps(styleProp, prev => {
        return {
            ...stylingProps.style,
            ...prev
        };
    });

    const children = composeRenderProps(childrenProp, prev => {
        return ensureTextWrapper(prev);
    });

    const { className: spinnerClassName, ...otherSpinnerProps } = spinnerProps ?? {};
    const spinnerClassNames = clsx(styles["hop-Tag__Spinner"], spinnerClassName);

    const { className: clearButtonClassName, ...otherClearButtonProps } = clearButtonProps ?? {};
    const clearButtonClassNames = clsx(styles["hop-Tag__remove-btn"], clearButtonClassName);

    const ElementType = isStandalone ? StandaloneTag : RACTag;

    return (
        <ElementType
            ref={ref}
            className={classNames}
            style={style}
            textValue={textValue}
            data-invalid={isInvalid || undefined}
            data-loading={isLoading || undefined}
            {...otherProps}
        >
            {tagProps => {
                const { allowsRemoving, isDisabled, isSelected } = tagProps;

                return (
                    <>
                        <ClearContainerSlots>
                            <SlotProvider
                                values={[
                                    [TextContext, {
                                        className: styles["hop-Tag__text"],
                                        size: TagToTextSizeAdapter[size]
                                    }],
                                    [IconListContext, {
                                        className: styles["hop-Tag__icon-list"],
                                        size: "sm"
                                    }],
                                    [IconContext, {
                                        className: styles["hop-Tag__icon"],
                                        size: "sm"
                                    }],
                                    [BadgeContext, {
                                        className: ({ variant: badgeVariant }) => {
                                            return cssModule(
                                                styles,
                                                "hop-Tag__badge",
                                                badgeVariant
                                            );
                                        },
                                        isDisabled: isDisabled
                                    }],
                                    [AvatarContext, {
                                        className: styles["hop-Tag__avatar"],
                                        isDisabled: isDisabled,
                                        size: TagToAvatarSizeAdapter[size]
                                    }]
                                ]}
                            >
                                {children(tagProps)}
                            </SlotProvider>
                        </ClearContainerSlots>
                        {(allowsRemoving && !isLoading) && (
                            <ClearButton
                                slot="remove"
                                isDisabled={isDisabled}
                                className={clearButtonClassNames}
                                aria-label={stringFormatter.format("Tag.removeAriaLabel")}
                                size={TagToButtonSizeAdapter[size]}
                                variant={variant}
                                isSelected={isSelected}
                                {...otherClearButtonProps}
                            />
                        )}
                        {isLoading && (
                            <Spinner
                                aria-label={stringFormatter.format("Tag.spinnerAriaLabel")}
                                size="sm"
                                className={spinnerClassNames}
                                {...otherSpinnerProps}
                            />
                        )}
                    </>
                );
            }}
        </ElementType>
    );
}

interface StandaloneTagProps extends RACTagProps {
    onRemove?: () => void;
    excludeFromTabOrder?: boolean;
}

function useNonLinkTagProps(props: Omit<StandaloneTagProps, "id">, ref: MutableRefObject<FocusableElement | null>) {
    const { focusableProps } = useFocusable(props, ref) ?? {};
    const { pressProps } = usePress({
        onPress: props.onPress,
        onPressChange: props.onPressChange,
        onPressStart: props.onPressStart,
        onPressEnd: props.onPressEnd,
        onPressUp: props.onPressUp,
        onClick: props.onClick,
        isDisabled: props.isDisabled,
        ref
    });

    return useMemo(() => {
        const domProps = filterDOMProps(props, { labelable: true, events: true, global: true });

        return mergeProps(domProps, focusableProps, pressProps);
    }, [props, focusableProps, pressProps]);
}

/**
 * A tag can also be rendered outside a TagGroup. In those cases, this component should be used.
 */
const StandaloneTag = forwardRef<FocusableElement, StandaloneTagProps>((props, ref) => {
    const {
        //  We don't want the Id in a standalone tag
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        id: _,
        ...propsWithoutId
    } = props;
    const objectRef = useObjectRef(ref);
    const { focusProps, isFocusVisible, isFocused } = useFocusRing({ within: true });
    const { hoverProps, isHovered } = useHover({
        onHoverStart: props.onHoverStart,
        onHoverChange: props.onHoverChange,
        onHoverEnd: props.onHoverEnd
    });

    const isLink = props.href != null;
    const ElementType: ElementType = isLink ? "a" : "div";

    const { linkProps } = useLink(propsWithoutId, objectRef);
    const nonLinkProps = useNonLinkTagProps(propsWithoutId, objectRef);
    const itemProps = isLink ? linkProps : nonLinkProps;

    const renderProps = useRenderProps({
        ...propsWithoutId,
        values: {
            isFocusVisible,
            isHovered,
            isDisabled: props.isDisabled ?? false,
            isFocused,
            isPressed: false,
            allowsRemoving: false,
            isSelected: false,
            selectionBehavior: "toggle",
            selectionMode: "none"
        }
    });

    useEffect(() => {
        if (!props.textValue) {
            console.warn("A `textValue` prop is required for <Tag> elements with non-plain text children for accessibility.");
        }

        if (props.onRemove) {
            console.warn("A <Tag> can't be removed if it's not rendered inside a <TagGroup>.");
        }
    }, [props.textValue, props.onRemove]);

    return (
        <ElementType
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ref={objectRef as any}
            aria-label={props.textValue}
            {...mergeProps(itemProps, focusProps, hoverProps)}
            {...renderProps}
            data-disabled={props.isDisabled || undefined}
            data-hovered={isHovered || undefined}
            data-focused={isFocused || undefined}
            data-focus-visible={isFocusVisible || undefined}
        />
    );
});

/**
 * A tag group is an interactive collection of labels, categories, keywords, or filters, with capabilities for keyboard navigation, selection, and removal.
 *
 * [View Documentation](https://hopper.workleap.design/components/TagGroup)
 */
const _Tag = slotFn("tag", forwardRef<HTMLDivElement, TagProps>(Tag));
_Tag.displayName = "Tag";

export { _Tag as Tag };

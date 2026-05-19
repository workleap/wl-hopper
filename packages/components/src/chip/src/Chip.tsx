import { IconContext } from "@hopper-ui/icons";
import {
    type ResponsiveProp,
    type StyledComponentProps,
    slot as slotFn,
    useResponsiveValue,
    useStyledSystem
} from "@hopper-ui/styled-system";
import clsx from "clsx";
import { type ForwardedRef, forwardRef, useContext } from "react";
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
    ensureTextWrapper
} from "../../utils/index.ts";

import { ChipContext } from "./ChipContext.ts";
import { InternalChipGroupContext } from "./ChipGroupContext.ts";

import styles from "./Chip.module.css";

export const GlobalChipCssSelector = "hop-Chip";

export type ChipSize = "sm" | "md" | "lg";

const ChipToTextSizeAdapter: SizeAdapter<ChipSize, TextSize> = {
    sm: "xs",
    md: "xs",
    lg: "sm"
};

const ChipToAvatarSizeAdapter: SizeAdapter<ChipSize, AvatarProps["size"]> = {
    sm: "xs",
    md: "xs",
    lg: "sm"
};

const ChipToButtonSizeAdapter: SizeAdapter<ChipSize, ClearButtonProps["size"]> = {
    sm: "md",
    md: "md",
    lg: "lg"
};

export interface ChipProps extends StyledComponentProps<RACTagProps> {
    /**
     * Whether the chip is invalid or not.
     */
    isInvalid?: boolean;
    /**
     * Whether the chip is loading or not.
     */
    isLoading?: boolean;
    /**
     * The size of the chip.
     * @default "md"
     */
    size?: ResponsiveProp<ChipSize>;
    /**
     * The props of the ClearButton.
     */
    clearButtonProps?: ClearButtonProps;
    /**
     * The props of the Spinner.
     */
    spinnerProps?: SpinnerProps;
}

function Chip(props: ChipProps, ref: ForwardedRef<HTMLDivElement>) {
    [props, ref] = useContextProps(props, ref, ChipContext);
    props = useFormProps(props as FormStyleProps); /* Needed because Chip has an extra size. */
    const { isInGroup } = useContext(InternalChipGroupContext);

    if (!isInGroup) {
        throw new Error("Chip cannot be rendered outside a ChipGroup.");
    }

    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        className,
        children: childrenProp,
        isInvalid,
        isLoading,
        size: sizeProp,
        style: styleProp,
        textValue: textValueProp,
        clearButtonProps,
        spinnerProps,
        ...otherProps
    } = ownProps;

    const stringFormatter = useLocalizedString();
    const size = useResponsiveValue(sizeProp) ?? "md";
    const textValue = textValueProp ?? (typeof childrenProp === "string" ? childrenProp : undefined);

    const classNames = composeClassnameRenderProps(
        className,
        GlobalChipCssSelector,
        cssModule(
            styles,
            "hop-Chip",
            size
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
    const spinnerClassNames = clsx(styles["hop-Chip__Spinner"], spinnerClassName);

    const { className: clearButtonClassName, ...otherClearButtonProps } = clearButtonProps ?? {};
    const clearButtonClassNames = clsx(styles["hop-Chip__remove-btn"], clearButtonClassName);

    return (
        <RACTag
            ref={ref}
            className={classNames}
            style={style}
            textValue={textValue}
            data-invalid={isInvalid || undefined}
            data-loading={isLoading || undefined}
            {...otherProps}
        >
            {chipProps => {
                const { allowsRemoving, isDisabled, isSelected } = chipProps;

                return (
                    <>
                        <ClearContainerSlots>
                            <SlotProvider
                                values={[
                                    [TextContext, {
                                        className: styles["hop-Chip__text"],
                                        size: ChipToTextSizeAdapter[size]
                                    }],
                                    [IconListContext, {
                                        className: styles["hop-Chip__icon-list"],
                                        size: "sm"
                                    }],
                                    [IconContext, {
                                        className: styles["hop-Chip__icon"],
                                        size: "sm"
                                    }],
                                    [BadgeContext, {
                                        className: ({ variant: badgeVariant }) => {
                                            return cssModule(
                                                styles,
                                                "hop-Chip__badge",
                                                badgeVariant
                                            );
                                        },
                                        isDisabled: isDisabled
                                    }],
                                    [AvatarContext, {
                                        className: styles["hop-Chip__avatar"],
                                        isDisabled: isDisabled,
                                        size: ChipToAvatarSizeAdapter[size]
                                    }]
                                ]}
                            >
                                {children(chipProps)}
                            </SlotProvider>
                        </ClearContainerSlots>
                        {(allowsRemoving && !isLoading) && (
                            <ClearButton
                                slot="remove"
                                isDisabled={isDisabled}
                                className={clearButtonClassNames}
                                aria-label={stringFormatter.format("Tag.removeAriaLabel")}
                                size={ChipToButtonSizeAdapter[size]}
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
        </RACTag>
    );
}

/**
 * A chip is an interactive item used for filtering and multi-selection scenarios. Chips must be rendered inside a ChipGroup.
 *
 * [View Documentation](https://hopper.workleap.design/components/ChipGroup)
 */
const _Chip = slotFn("chip", forwardRef<HTMLDivElement, ChipProps>(Chip));
_Chip.displayName = "Chip";

export { _Chip as Chip };

import { type StyledSystemProps, useStyledSystem } from "@hopper-ui/styled-system";
import { type ForwardedRef, forwardRef } from "react";
import { mergeProps } from "react-aria";
import { composeRenderProps } from "react-aria-components";

import { useLocalizedString } from "../../i18n/index.ts";
import { Text } from "../../typography/index.ts";
import {
    type AccessibleSlotProps,
    type RenderProps,
    composeClassnameRenderProps,
    cssModule,
    useRenderProps
} from "../../utils/index.ts";

import styles from "./RemainingCharacterCount.module.css";

interface RemainingCharacterCountRenderProps {
    isDisabled: boolean;
    isInvalid: boolean;
}

export interface RemainingCharacterCountProps
    extends StyledSystemProps, AccessibleSlotProps, Omit<RenderProps<RemainingCharacterCountRenderProps>, "children"> {
    count: number;
    isDisabled?: boolean;
    isInvalid?: boolean;
}

export const GlobalRemainingCharacterCountCssSelector = "hop-RemainingCharacterCount";

function RemainingCharacterCount(props: RemainingCharacterCountProps, ref: ForwardedRef<HTMLSpanElement>) {
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const { className, style, slot, count, isDisabled, isInvalid, ...textProps } = ownProps;
    const stringFormatter = useLocalizedString();

    const accessibilityString = stringFormatter.format("Input.charactersLeft", { charLeft: count });

    const classNames = composeClassnameRenderProps(
        className,
        GlobalRemainingCharacterCountCssSelector,
        cssModule(styles, "hop-RemainingCharacterCount")
    );

    const mergedStyles = composeRenderProps(style, prev => {
        return {
            ...stylingProps.style,
            ...prev
        };
    });

    const renderProps = useRenderProps<RemainingCharacterCountRenderProps>({
        ...props,
        className: classNames,
        style: mergedStyles,
        values: {
            isDisabled: isDisabled || false,
            isInvalid: isInvalid || false
        }
    });

    return (
        <Text
            {...mergeProps(textProps, renderProps)}
            ref={ref}
            aria-label={accessibilityString}
            data-disabled={isDisabled || undefined}
            data-invalid={isInvalid || undefined}
            role="status"
            slot={slot || undefined}
            size="xs"
        >
            {count}
        </Text>
    );
}

/**
 * The RemainingCharacterCount component displays the number of characters remaining.
 */
const _RemainingCharacterCount = forwardRef<HTMLSpanElement, RemainingCharacterCountProps>(RemainingCharacterCount);
_RemainingCharacterCount.displayName = "RemainingCharacterCount";

export { _RemainingCharacterCount as RemainingCharacterCount };

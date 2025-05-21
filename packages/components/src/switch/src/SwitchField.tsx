import {
    useResponsiveValue,
    useStyledSystem,
    type ResponsiveProp,
    type StyledSystemProps
} from "@hopper-ui/styled-system";
import { useSlotId } from "@react-aria/utils";
import { forwardRef, type ForwardedRef, type ReactNode } from "react";
import { mergeProps } from "react-aria";
import { composeRenderProps, useContextProps } from "react-aria-components";

import { Text, type TextSize } from "../../typography/index.ts";
import { composeClassnameRenderProps, cssModule, SlotProvider, useRenderProps, type AccessibleSlotProps, type FieldSize, type RenderProps, type SizeAdapter } from "../../utils/index.ts";

import { SwitchContext } from "./SwitchContext.ts";
import { SwitchFieldContext } from "./SwitchFieldContext.ts";

import styles from "./SwitchField.module.css";

export const GlobalSwitchFieldCssSelector = "hop-SwitchField";

const SwitchToDescriptionSizeAdapter: SizeAdapter<FieldSize, TextSize> = {
    sm: "xs",
    md: "sm"
};

interface SwitchFieldRenderProps {
    /**
     * Whether the switch field is disabled.
     */
    isDisabled?: boolean;
}

export interface SwitchFieldProps extends RenderProps<SwitchFieldRenderProps>, StyledSystemProps, AccessibleSlotProps {
    /**
     * The description of the switch field.
     */
    description?: ReactNode;
    /**
     * Whether the switch field is disabled.
     */
    isDisabled?: boolean;
    /**
     * A switch field can vary in size.
     * @default "md"
     */
    size?: ResponsiveProp<FieldSize>;
}

function SwitchField(props: SwitchFieldProps, ref: ForwardedRef<HTMLDivElement>) {
    [props, ref] = useContextProps(props, ref, SwitchFieldContext);

    const { stylingProps, ...ownProps } = useStyledSystem(props);

    const {
        className,
        description,
        isDisabled,
        size: sizeProp = "md",
        slot,
        style,
        ...otherProps
    } = ownProps;

    const size = useResponsiveValue(sizeProp) ?? "md";

    const descriptionId = useSlotId([Boolean(description)]);

    const classNames = composeClassnameRenderProps(
        className,
        GlobalSwitchFieldCssSelector,
        cssModule(
            styles,
            "hop-SwitchField",
            size
        ),
        stylingProps.className
    );

    const mergedStyles = composeRenderProps(style, prev => {
        return {
            ...stylingProps.style,
            ...prev
        };
    });

    const renderProps = useRenderProps({
        className: classNames,
        style: mergedStyles,
        values: {
            isDisabled: isDisabled || false
        },
        ...otherProps
    });

    return (
        <SlotProvider
            values={[
                [SwitchContext, {
                    className: styles["hop-SwitchField__switch"],
                    size: size,
                    isDisabled: isDisabled,
                    "aria-describedby": descriptionId
                }]
            ]}
        >
            <div
                ref={ref}
                slot={slot ?? undefined}
                data-disabled={isDisabled}
                {...mergeProps(renderProps, otherProps)}
            >
                {renderProps.children}
                {description && (
                    <Text
                        id={descriptionId}
                        className={styles["hop-SwitchField__description"]}
                        size={SwitchToDescriptionSizeAdapter[size]}
                        slot="description"
                    >
                        {description}
                    </Text>
                )}
            </div>
        </SlotProvider>
    );
}

/**
 * The Switch Field component is a container for a switch and a description.
 *
 * [View Documentation](https://hopper.workleap.design/components/Switch)
 */
const _SwitchField = forwardRef<HTMLDivElement, SwitchFieldProps>(SwitchField);
_SwitchField.displayName = "SwitchField";

export { _SwitchField as SwitchField };

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
import {
    ClearContainerSlots,
    composeClassnameRenderProps,
    cssModule,
    SlotProvider,
    useRenderProps,
    type AccessibleSlotProps,
    type FieldSize,
    type RenderProps,
    type SizeAdapter
} from "../../utils/index.ts";

import { RadioContext } from "./RadioContext.ts";
import { RadioFieldContext } from "./RadioFieldContext.ts";

import styles from "./RadioField.module.css";

export const GlobalRadioFieldCssSelector = "hop-RadioField";

const RadioToDescriptionSizeAdapter: SizeAdapter<FieldSize, TextSize> = {
    sm: "xs",
    md: "sm"
};

interface RadioFieldRenderProps {
    /**
     * Whether the radio field is disabled.
     */
    isDisabled?: boolean;
}

export interface RadioFieldProps extends StyledSystemProps, AccessibleSlotProps, RenderProps<RadioFieldRenderProps> {
    /**
     * The description of the checkbox field.
     */
    description?: ReactNode;
    /**
     * Whether the radio field is disabled.
     */
    isDisabled?: boolean;
    /**
     * A radio can vary in size.
     * @default "md"
     */
    size?: ResponsiveProp<FieldSize>;
}

function RadioField(props: RadioFieldProps, ref: ForwardedRef<HTMLDivElement>) {
    [props, ref] = useContextProps(props, ref, RadioFieldContext);
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        className,
        description,
        isDisabled,
        size: sizeProp = "md",
        style,
        slot,
        ...otherProps
    } = ownProps;

    const size = useResponsiveValue(sizeProp) ?? "md";

    const classNames = composeClassnameRenderProps(
        className,
        GlobalRadioFieldCssSelector,
        cssModule(
            styles,
            "hop-RadioField",
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

    const renderProps = useRenderProps<RadioFieldRenderProps>({
        ...props,
        className: classNames,
        style: mergedStyles,
        values: {
            isDisabled: isDisabled || false
        }
    });

    const descriptionId = useSlotId([Boolean(description)]);

    return (
        <ClearContainerSlots>
            <SlotProvider
                values={[
                    [RadioContext, {
                        className: styles["hop-RadioField__radio"],
                        size: size,
                        isDisabled: isDisabled,
                        "aria-describedby": descriptionId
                    }]
                ]}
            >
                <div
                    {...mergeProps(otherProps, renderProps)}
                    ref={ref}
                    slot={slot ?? undefined}
                    data-disabled={isDisabled}
                >
                    {renderProps.children}
                    {description && (
                        <Text
                            id={descriptionId}
                            className={styles["hop-RadioField__description"]}
                            size={RadioToDescriptionSizeAdapter[size]}
                            slot="description"
                        >
                            {description}
                        </Text>
                    )}
                </div>
            </SlotProvider>
        </ClearContainerSlots>
    );
}

/**
 * The Radio Field component is a container for a radio and a description.
 *
 * [View Documentation](https://hopper.workleap.design/components/RadioGroup)
 */
const _RadioField = forwardRef<HTMLDivElement, RadioFieldProps>(RadioField);
_RadioField.displayName = "RadioField";

export { _RadioField as RadioField };

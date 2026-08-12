import {
    type ResponsiveProp,
    type StyledSystemProps,
    useResponsiveValue,
    useStyledSystem
} from "@hopper-ui/styled-system";
import { useSlotId } from "@react-aria/utils";
import { type ForwardedRef, type ReactNode, forwardRef } from "react";
import { mergeProps } from "react-aria";
import { composeRenderProps, useContextProps } from "react-aria-components";

import { useFormProps } from "../../form/index.ts";
import { Text, type TextSize } from "../../typography/index.ts";
import {
    type AccessibleSlotProps,
    ClearContainerSlots,
    type FieldSize,
    type RenderProps,
    type SizeAdapter,
    SlotProvider,
    composeClassnameRenderProps,
    cssModule,
    useRenderProps
} from "../../utils/index.ts";

import { CheckboxContext } from "./CheckboxContext.ts";
import { CheckboxFieldContext } from "./CheckboxFieldContext.ts";

import styles from "./CheckboxField.module.css";

export const GlobalCheckboxFieldCssSelector = "hop-CheckboxField";

const CheckboxToDescriptionSizeAdapter: SizeAdapter<FieldSize, TextSize> = {
    sm: "xs",
    md: "sm"
};

interface CheckboxFieldRenderProps {
    /**
     * Whether the checkbox field is disabled.
     */
    isDisabled?: boolean;
}

export interface CheckboxFieldProps
    extends StyledSystemProps, AccessibleSlotProps, RenderProps<CheckboxFieldRenderProps> {
    /**
     * The description of the checkbox field.
     */
    description?: ReactNode;
    /**
     * Whether the checkbox field is disabled.
     */
    isDisabled?: boolean;
    /**
     * A checkbox field can vary in size.
     * @default "md"
     */
    size?: ResponsiveProp<FieldSize>;
}

function CheckboxField(props: CheckboxFieldProps, ref: ForwardedRef<HTMLDivElement>) {
    [props, ref] = useContextProps(props, ref, CheckboxFieldContext);
    props = useFormProps(props);
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const { className, description, isDisabled, size: sizeProp = "md", style, slot, ...otherProps } = ownProps;

    const size = useResponsiveValue(sizeProp) ?? "md";

    const classNames = composeClassnameRenderProps(
        className,
        GlobalCheckboxFieldCssSelector,
        cssModule(styles, "hop-CheckboxField", size),
        stylingProps.className
    );

    const mergedStyles = composeRenderProps(style, prev => {
        return {
            ...stylingProps.style,
            ...prev
        };
    });

    const renderProps = useRenderProps<CheckboxFieldRenderProps>({
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
                    [
                        CheckboxContext,
                        {
                            className: styles["hop-CheckboxField__checkbox"],
                            size,
                            isDisabled,
                            "aria-describedby": descriptionId
                        }
                    ]
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
                            className={styles["hop-CheckboxField__description"]}
                            size={CheckboxToDescriptionSizeAdapter[size]}
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
 * The Checkbox Field component is a container for a checkbox and a description.
 *
 * [View Documentation](https://hopper.workleap.design/components/Checkbox)
 */
const _CheckboxField = forwardRef<HTMLDivElement, CheckboxFieldProps>(CheckboxField);
_CheckboxField.displayName = "CheckboxField";

export { _CheckboxField as CheckboxField };

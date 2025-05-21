import {
    type ResponsiveProp,
    type StyledComponentProps,
    type StyledSystemProps,
    useResponsiveValue,
    useStyledSystem
} from "@hopper-ui/styled-system";
import clsx from "clsx";
import { type ForwardedRef, forwardRef } from "react";
import type { Orientation } from "react-aria";
import {
    RadioGroup as RACRadioGroup,
    type RadioGroupProps as RACRadioGroupProps,
    composeRenderProps,
    useContextProps
} from "react-aria-components";

import { ErrorMessage } from "../../error-message/index.ts";
import { useFormProps } from "../../form/index.ts";
import { HelperMessage } from "../../helper-message/index.ts";
import { RadioContext, RadioFieldContext } from "../../radio/index.ts";
import { Label } from "../../typography/Label/index.ts";
import { type BaseComponentDOMProps, type FieldProps, type InputGroupVariant, SlotProvider, composeClassnameRenderProps, cssModule } from "../../utils/index.ts";

import { RadioGroupContext } from "./RadioGroupContext.ts";

import styles from "./RadioGroup.module.css";

export const GlobalRadioGroupCssSelector = "hop-RadioGroup";

export type RadioListProps = StyledSystemProps & BaseComponentDOMProps;

export interface RadioGroupProps extends StyledComponentProps<Omit<RACRadioGroupProps, "orientation">>, FieldProps {
    /**
     * The props of the list element that wraps the Radio components.
     */
    listProps?: RadioListProps;
    /**
     * A RadioGroup can be displayed horizontally or vertically.
     * @default "vertical"
     */
    orientation?: ResponsiveProp<Orientation>;
    /**
     * A RadioGroup has two variants: borderless and bordered.
     * @default "borderless"
     */
    variant?: InputGroupVariant;
}

function RadioGroup(props: RadioGroupProps, ref: ForwardedRef<HTMLDivElement>) {
    [props, ref] = useContextProps(props, ref, RadioGroupContext);
    props = useFormProps(props);
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const { stylingProps: listStylingProps, ...listProps } = useStyledSystem(ownProps.listProps ?? {});
    const {
        className,
        children: childrenProp,
        description,
        errorMessage,
        isDisabled,
        isInvalid,
        isRequired,
        label,
        orientation: orientationProp = "vertical",
        size: sizeProp = "md",
        style: styleProp,
        variant = "borderless",
        necessityIndicator,
        ...otherProps
    } = ownProps;

    const {
        className: listClassName,
        slot: listSlot,
        style: listStyleProp,
        ...otherListProps
    } = listProps;

    const orientation = useResponsiveValue(orientationProp) ?? "vertical";
    const size = useResponsiveValue(sizeProp) ?? "md";

    const classNames = composeClassnameRenderProps(
        className,
        GlobalRadioGroupCssSelector,
        cssModule(
            styles,
            "hop-RadioGroup",
            size,
            variant
        ),
        stylingProps.className
    );

    const listClassNames = clsx(
        styles["hop-RadioGroup__list"],
        listClassName,
        listStylingProps.className
    );

    const style = composeRenderProps(styleProp, prev => {
        return {
            ...stylingProps.style,
            ...prev
        };
    });

    const listStyle = {
        ...listStylingProps.style,
        ...listStyleProp
    };

    const children = composeRenderProps(childrenProp, prev => {
        return (
            <div
                className={listClassNames}
                slot={listSlot ?? undefined}
                style={listStyle}
                {...otherListProps}
            >
                {prev}
            </div>
        );
    });

    return (
        <SlotProvider
            values={[
                [RadioContext, {
                    className: styles["hop-RadioGroup__radio"],
                    size: size
                }],
                [RadioFieldContext, {
                    className: styles["hop-RadioGroup__radio"],
                    size: size,
                    isDisabled: isDisabled
                }]
            ]}
        >
            <RACRadioGroup
                ref={ref}
                className={classNames}
                style={style}
                isInvalid={isInvalid}
                isDisabled={isDisabled}
                isRequired={isRequired}
                orientation={orientation}
                {...otherProps}
            >
                {radioGroupRenderProps => (
                    <>
                        {label && (
                            <Label
                                className={styles["hop-RadioGroup__label"]}
                                isRequired={isRequired}
                                necessityIndicator={necessityIndicator}
                            >
                                {label}
                            </Label>
                        )}
                        {children(radioGroupRenderProps)}
                        {description && (
                            <HelperMessage className={styles["hop-RadioGroup__helper-message"]} hideIcon>
                                {description}
                            </HelperMessage>
                        )}
                        <ErrorMessage className={styles["hop-RadioGroup__error-message"]} hideIcon>
                            {errorMessage}
                        </ErrorMessage>
                    </>
                )}
            </RACRadioGroup>
        </SlotProvider>
    );
}

/**
 * The RadioGroup component is used to group multiple Radio or RadioField components together.
 *
 * [View Documentation](https://hopper.workleap.design/components/RadioGroup)
 */
const _RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(RadioGroup);
_RadioGroup.displayName = "RadioGroup";

export { _RadioGroup as RadioGroup };

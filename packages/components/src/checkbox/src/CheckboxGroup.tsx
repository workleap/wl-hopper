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
    CheckboxGroup as RACCheckboxGroup,
    type CheckboxGroupProps as RACCheckboxGroupProps,
    composeRenderProps,
    useContextProps
} from "react-aria-components";

import { CheckboxContext, CheckboxFieldContext } from "../../checkbox/index.ts";
import { ErrorMessage } from "../../error-message/index.ts";
import { useFormProps } from "../../form/index.ts";
import { HelperMessage } from "../../helper-message/index.ts";
import { FieldLabel } from "../../typography/index.ts";
import { type BaseComponentDOMProps, type FieldProps, type InputGroupVariant, SlotProvider, composeClassnameRenderProps, cssModule } from "../../utils/index.ts";

import { CheckboxGroupContext } from "./CheckboxGroupContext.ts";

import styles from "./CheckboxGroup.module.css";

export const GlobalCheckboxGroupCssSelector = "hop-CheckboxGroup";

export type CheckboxListProps = StyledSystemProps & BaseComponentDOMProps;

export interface CheckboxGroupProps extends StyledComponentProps<RACCheckboxGroupProps>, FieldProps {
    /**
     * The props of the list element that wraps the Checkbox components.
     */
    listProps?: CheckboxListProps;
    /**
     * A CheckboxGroup can be displayed horizontally or vertically.
     * @default "vertical"
     */
    orientation?: ResponsiveProp<Orientation>;
    /**
     * A CheckboxGroup has two variants: borderless and bordered.
     * @default "borderless"
     */
    variant?: InputGroupVariant;
    /**
     * If `true`, the CheckboxGroup will take all available width.
     * @default false
     */
    isFluid?: ResponsiveProp<boolean>;
}

function CheckboxGroup(props: CheckboxGroupProps, ref: ForwardedRef<HTMLDivElement>) {
    [props, ref] = useContextProps(props, ref, CheckboxGroupContext);
    props = useFormProps(props);
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const { stylingProps: listStylingProps, ...listProps } = useStyledSystem(ownProps.listProps ?? {});
    const {
        className,
        children: childrenProp,
        contextualHelp,
        description,
        errorMessage,
        isDisabled,
        isInvalid,
        isRequired,
        label,
        necessityIndicator,
        orientation: orientationProp = "vertical",
        size: sizeProp = "md",
        style: styleProp,
        variant = "borderless",
        isFluid: isFluidProp,
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
    const isFluid = useResponsiveValue(isFluidProp) ?? false;

    const classNames = composeClassnameRenderProps(
        className,
        GlobalCheckboxGroupCssSelector,
        cssModule(
            styles,
            "hop-CheckboxGroup",
            isFluid && "fluid",
            size,
            variant
        ),
        stylingProps.className
    );

    const listClassNames = clsx(
        styles["hop-CheckboxGroup__list"],
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
                [CheckboxContext, {
                    className: styles["hop-CheckboxGroup__checkbox"],
                    size: size
                }],
                [CheckboxFieldContext, {
                    className: styles["hop-CheckboxGroup__checkbox"],
                    size: size,
                    isDisabled: isDisabled
                }]
            ]}
        >
            <RACCheckboxGroup
                ref={ref}
                className={classNames}
                style={style}
                isInvalid={isInvalid}
                isDisabled={isDisabled}
                isRequired={isRequired}
                data-orientation={orientation}
                {...otherProps}
            >
                {checkboxGroupRenderProps => (
                    <>
                        <FieldLabel
                            className={styles["hop-CheckboxGroup__label"]}
                            contextualHelp={contextualHelp}
                            isRequired={isRequired}
                            necessityIndicator={necessityIndicator}
                        >
                            {label}
                        </FieldLabel>
                        {children(checkboxGroupRenderProps)}
                        {description && (
                            <HelperMessage className={styles["hop-CheckboxGroup__helper-message"]} hideIcon>
                                {description}
                            </HelperMessage>
                        )}
                        <ErrorMessage className={styles["hop-CheckboxGroup__error-message"]} hideIcon>
                            {errorMessage}
                        </ErrorMessage>
                    </>
                )}
            </RACCheckboxGroup>
        </SlotProvider>
    );
}

/**
 * The CheckboxGroup component is used to group multiple Checkbox or CheckboxField components together.
 *
 * [View Documentation](https://hopper.workleap.design/components/CheckboxGroup)
 */
const _CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(CheckboxGroup);
_CheckboxGroup.displayName = "CheckboxGroup";

export { _CheckboxGroup as CheckboxGroup };

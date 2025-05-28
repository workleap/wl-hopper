import { AngleDownIcon, AngleUpIcon, IconContext } from "@hopper-ui/icons";
import {
    useResponsiveValue,
    useStyledSystem,
    type ResponsiveProp,
    type StyledComponentProps
} from "@hopper-ui/styled-system";
import { mergeRefs } from "@react-aria/utils";
import { useControlledState } from "@react-stately/utils";
import clsx from "clsx";
import { forwardRef, useCallback, type ForwardedRef, type MutableRefObject, type ReactNode } from "react";
import { useObjectRef } from "react-aria";
import {
    composeRenderProps,
    Button as RACButton,
    NumberField as RACNumberField,
    useContextProps,
    type NumberFieldProps as RACNumberFieldProps
} from "react-aria-components";

import { ErrorMessage } from "../../error-message/index.ts";
import { useFormProps } from "../../form/index.ts";
import { HelperMessage } from "../../helper-message/index.ts";
import { FieldLabel, TextContext } from "../../typography/index.ts";
import {
    ClearContainerSlots,
    composeClassnameRenderProps,
    cssModule,
    ensureTextWrapper,
    SlotProvider,
    type FieldProps
} from "../../utils/index.ts";

import { Input } from "./Input.tsx";
import { InputGroup, type InputGroupProps } from "./InputGroup.tsx";
import { NumberFieldContext } from "./NumberFieldContext.ts";

import styles from "./NumberField.module.css";

export const GlobalNumberFieldCssSelector = "hop-NumberField";

export interface NumberFieldProps extends Omit<StyledComponentProps<RACNumberFieldProps>, "children">, FieldProps {
    /**
     * An icon or text to display at the start of the input.
     */
    prefix?: ReactNode;

    /**
     * If `true`, the NumberField will take all available width.
     * @default false
     */
    isFluid?: ResponsiveProp<boolean>;

    /**
     * A ref for the HTML input element.
     */
    inputRef?: MutableRefObject<HTMLInputElement | null>;

    /**
     * The props for the InputGroup.
     */
    inputGroupProps?: InputGroupProps;
}

interface StepperButtonProps {
    direction: "decrement" | "increment";
}

const StepperButton = ({ direction }: StepperButtonProps) => {
    const StepperIcon = direction === "increment" ? AngleUpIcon : AngleDownIcon;
    const stepperClasses = cssModule(
        styles,
        "hop-NumberField__stepper-button",
        direction
    );

    return (
        <RACButton
            className={stepperClasses}
            slot={direction}
        >
            <StepperIcon
                className={styles["hop-NumberField__stepper-button__icon"]}
                size={{
                    base: "md",
                    xs: "sm"
                }}
            />
        </RACButton>
    );
};

function NumberField(props: NumberFieldProps, ref: ForwardedRef<HTMLDivElement>) {
    // we extract the inputRef props, since we want to manually merge it with the context props.
    const {
        inputRef: userProvidedInputRef = null,
        ...propsWithoutRef
    } = props;
    [props, ref] = useContextProps(propsWithoutRef, ref, NumberFieldContext);
    props = useFormProps(props);
    const { stylingProps, ...ownProps } = useStyledSystem(props);

    const {
        className,
        contextualHelp,
        style: styleProp,
        size,
        prefix,
        onChange: onChangeProp,
        defaultValue,
        value: valueProp,
        isFluid: isFluidProp,
        isDisabled,
        isInvalid,
        isRequired,
        necessityIndicator,
        inputGroupProps,
        label,
        description,
        errorMessage,
        ...otherProps
    } = ownProps;

    const inputRef = useObjectRef(mergeRefs(userProvidedInputRef, props.inputRef !== undefined ? props.inputRef : null));
    const isFluid = useResponsiveValue(isFluidProp) ?? false;

    const classNames = composeClassnameRenderProps(
        className,
        GlobalNumberFieldCssSelector,
        cssModule(
            styles,
            "hop-NumberField",
            isFluid && "fluid"
        ),
        stylingProps.className
    );

    const style = composeRenderProps(styleProp, prev => {
        return {
            ...stylingProps.style,
            ...prev
        };
    });

    const handleTextChanged = useCallback((value: number) => {
        onChangeProp?.(value);
    }, [onChangeProp]);

    const [value, onChange] = useControlledState<number>(valueProp, defaultValue || 0, handleTextChanged);

    const prefixMarkup = prefix ? (
        <SlotProvider values={[
            [TextContext, { size, className: styles["hop-NumberField__prefix"] }],
            [IconContext, { size, className: styles["hop-NumberField__prefix"] }]
        ]}
        >
            {ensureTextWrapper(prefix)}
        </SlotProvider>
    ) : null;

    const { className: inputGroupClassName, ...otherInputGroupProps } = inputGroupProps ?? {};
    const inputGroupClassNames = clsx(styles["hop-NumberField__InputGroup"], inputGroupClassName);

    const inputMarkup = (
        <ClearContainerSlots>
            <InputGroup
                isFluid
                className={inputGroupClassNames}
                isDisabled={isDisabled}
                isInvalid={isInvalid}
                {...otherInputGroupProps}
            >
                {prefixMarkup}
                <Input ref={inputRef} className={styles["hop-NumberField__input"]} size={size} />
                <div className={styles["hop-NumberField__steppers"]}>
                    <StepperButton direction="increment" />
                    <StepperButton direction="decrement" />
                </div>
            </InputGroup>
        </ClearContainerSlots>
    );

    const childrenMarkup = (
        <>
            <FieldLabel
                className={styles["hop-NumberField__Label"]}
                contextualHelp={contextualHelp}
                isRequired={isRequired}
                necessityIndicator={necessityIndicator}
            >
                {label}
            </FieldLabel>
            {inputMarkup}
            {description && <HelperMessage className={styles["hop-NumberField__HelperMessage"]}>{description}</HelperMessage>}
            <ErrorMessage className={styles["hop-NumberField__ErrorMessage"]}>{errorMessage}</ErrorMessage>
        </>
    );

    return (
        <RACNumberField
            ref={ref}
            value={value}
            style={style}
            className={classNames}
            onChange={onChange}
            isDisabled={isDisabled}
            isInvalid={isInvalid}
            isRequired={isRequired}
            {...otherProps}
        >
            {childrenMarkup}
        </RACNumberField>
    );
}

/**
 * A number field allows a user to enter a number value with a keyboard or increment and decrement buttons.
 *
 * [View Documentation](https://hopper.workleap.design/components/NumberField)
 */
const _NumberField = forwardRef<HTMLDivElement, NumberFieldProps>(NumberField);
_NumberField.displayName = "NumberField";

export { _NumberField as NumberField };

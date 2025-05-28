import { IconContext } from "@hopper-ui/icons";
import {
    useIsomorphicLayoutEffect,
    useResponsiveValue,
    useStyledSystem,
    type ResponsiveProp,
    type StyledComponentProps
} from "@hopper-ui/styled-system";
import { mergeRefs } from "@react-aria/utils";
import { useControlledState } from "@react-stately/utils";
import clsx from "clsx";
import { forwardRef, useCallback, useState, type ForwardedRef, type MutableRefObject, type ReactNode } from "react";
import { useObjectRef } from "react-aria";
import {
    composeRenderProps,
    TextField as RACTextField,
    useContextProps,
    type TextFieldProps as RACTextFieldProps
} from "react-aria-components";

import { ClearButton } from "../../buttons/index.ts";
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
    useTruncatedText,
    type FieldProps
} from "../../utils/index.ts";

import { Input } from "./Input.tsx";
import { InputGroup, type InputGroupProps } from "./InputGroup.tsx";
import { RemainingCharacterCount, type RemainingCharacterCountProps } from "./RemainingCharacterCount.tsx";
import { TextFieldContext } from "./TextFieldContext.ts";

import styles from "./TextField.module.css";

export const GlobalTextFieldCssSelector = "hop-TextField";

export interface TextFieldProps extends Omit<StyledComponentProps<RACTextFieldProps>, "children">, FieldProps {
    /**
     * An icon or text to display at the start of the input.
     */
    prefix?: ReactNode;

    /**
     * True to display the number of remaining allowed characters on the right of the input. Requires a valid value in the "maxLength" prop.
     * @default false
     */
    showCharacterCount?: boolean;

    /**
     * Whether the TextField is clearable.
     */
    isClearable?: boolean;

    /**
     * The placeholder text when the TextField is empty.
     */
    placeholder?: string;

    /**
     * This should only be used with the `showCharacterCount` prop.
     * If `true`, the TextField will allow the text to go over the max length, but it will add an error look to the character count.
     */
    allowExceedingMaxLength?: boolean;

    /**
     * Handler that is called when the clear button is pressed.
     */
    onClear?: () => void;

    /**
     * If `true`, the TextField will take all available width.
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

    /**
     * The props for the RemainingCharacterCount.
     */
    remainingCharacterCountProps?: RemainingCharacterCountProps;
}

function TextField(props: TextFieldProps, ref: ForwardedRef<HTMLDivElement>) {
    // we extract the inputRef props, since we want to manually merge it with the context props.
    const {
        inputRef: userProvidedInputRef = null,
        ...propsWithoutRef
    } = props;
    [props, ref] = useContextProps(propsWithoutRef, ref, TextFieldContext);
    props = useFormProps(props);
    const { stylingProps, ...ownProps } = useStyledSystem(props);

    const [characterCount, setCharacterCount] = useState(() => props.value?.length ?? props.defaultValue?.length ?? 0);

    const {
        className,
        style: styleProp,
        size,
        prefix,
        showCharacterCount,
        maxLength,
        placeholder,
        isClearable,
        onChange: onChangeProp,
        onClear,
        defaultValue,
        value: valueProp,
        isFluid: isFluidProp,
        isDisabled,
        isInvalid,
        isRequired,
        allowExceedingMaxLength,
        necessityIndicator,
        inputGroupProps,
        remainingCharacterCountProps,
        label,
        contextualHelp,
        description,
        errorMessage,
        ...otherProps
    } = ownProps;

    const inputRef = useObjectRef(mergeRefs(userProvidedInputRef, props.inputRef !== undefined ? props.inputRef : null));
    const isFluid = useResponsiveValue(isFluidProp) ?? false;
    const overMaxLength = !!maxLength && characterCount > maxLength;

    const classNames = composeClassnameRenderProps(
        className,
        GlobalTextFieldCssSelector,
        cssModule(
            styles,
            "hop-TextField",
            isClearable && "clearable",
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

    const handleTextChanged = useCallback((value: string) => {
        setCharacterCount(value.length);

        onChangeProp?.(value);
    }, [onChangeProp]);

    const truncateText = useTruncatedText();
    const [value, onChange] = useControlledState<string>(valueProp, defaultValue || "", handleTextChanged);

    const handleClear = useCallback(() => {
        onChange("");
        onClear?.();
    }, [onChange, onClear]);

    const showClearButton = isClearable && characterCount !== 0;

    if (showCharacterCount && !maxLength) {
        console.warn("If showCharacterCount is true, maxLength must be set to the maximum number of characters allowed in the TextField.");
    }

    if (allowExceedingMaxLength && !showCharacterCount) {
        console.warn("If allowExceedingMaxLength is true, showCharacterCount must also be true.");
    }

    const prefixMarkup = prefix ? (
        <SlotProvider values={[
            [TextContext, { size, className: styles["hop-TextField__prefix"] }],
            [IconContext, { size, className: styles["hop-TextField__prefix"] }]
        ]}
        >
            {ensureTextWrapper(prefix)}
        </SlotProvider>
    ) : null;

    // truncateText needs to be called here instead of in handleTextChanged because handleTextChanged is not called when there is a defaultValue on load.
    // If the default text goes over the maxLength, it is truncated.
    useIsomorphicLayoutEffect(() => {
        if (!allowExceedingMaxLength) {
            const newValue = truncateText(value, maxLength);
            onChange(newValue);
        }
    }, [value]);

    const { className: inputGroupClassName, ...otherInputGroupProps } = inputGroupProps ?? {};
    const inputGroupClassNames = clsx(styles["hop-TextField__InputGroup"], inputGroupClassName);

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
                <Input ref={inputRef} placeholder={placeholder} size={size} />

                {showCharacterCount && maxLength &&
                    <RemainingCharacterCount
                        count={maxLength - characterCount}
                        isInvalid={overMaxLength}
                        isDisabled={isDisabled}
                        {...remainingCharacterCountProps}
                    />
                }
                {showClearButton && <ClearButton isDisabled={isDisabled} size="lg" onPress={handleClear} />}
            </InputGroup>
        </ClearContainerSlots>
    );

    const childrenMarkup = (
        <>
            {label && <FieldLabel className={styles["hop-TextField__Label"]} isRequired={isRequired} necessityIndicator={necessityIndicator} contextualHelp={contextualHelp}>{label}</FieldLabel>}
            {inputMarkup}
            {description && <HelperMessage className={styles["hop-TextField__HelperMessage"]}>{description}</HelperMessage>}
            <ErrorMessage className={styles["hop-TextField__ErrorMessage"]}>{errorMessage}</ErrorMessage>
        </>
    );

    return (
        <RACTextField
            ref={ref}
            value={value}
            style={style}
            className={classNames}
            maxLength={!allowExceedingMaxLength ? maxLength : undefined}
            onChange={onChange}
            isDisabled={isDisabled}
            isInvalid={isInvalid}
            isRequired={isRequired}
            {...otherProps}
        >
            {childrenMarkup}
        </RACTextField>
    );
}

/**
 * A text field allows a user to enter a plain text value with a keyboard.
 *
 * [View Documentation](https://hopper.workleap.design/components/TextField)
 */
const _TextField = forwardRef<HTMLDivElement, TextFieldProps>(TextField);
_TextField.displayName = "TextField";

export { _TextField as TextField };

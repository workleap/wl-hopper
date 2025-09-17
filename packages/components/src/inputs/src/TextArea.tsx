import { useIsomorphicLayoutEffect, useResponsiveValue, useStyledSystem, type ResponsiveProp, type StyledComponentProps } from "@hopper-ui/styled-system";
import { useIsSSR } from "@react-aria/ssr";
import { mergeRefs } from "@react-aria/utils";
import { useControlledState } from "@react-stately/utils";
import clsx from "clsx";
import { forwardRef, useCallback, useMemo, useState, type ForwardedRef, type MutableRefObject } from "react";
import { useObjectRef } from "react-aria";
import { composeRenderProps, TextArea as RACTextArea, TextField as RACTextField, useContextProps, type TextFieldProps as RACTextFieldProps } from "react-aria-components";

import { ErrorMessage } from "../../error-message/index.ts";
import { useFormProps } from "../../form/index.ts";
import { HelperMessage } from "../../helper-message/index.ts";
import { FieldLabel } from "../../typography/index.ts";
import { ClearContainerSlots, composeClassnameRenderProps, cssModule, isUndefined, useFontFaceReady, useTruncatedText, type FieldProps } from "../../utils/index.ts";

import { InputGroup, type InputGroupProps } from "./InputGroup.tsx";
import { RemainingCharacterCount, type RemainingCharacterCountProps } from "./RemainingCharacterCount.tsx";
import { TextAreaContext } from "./TextAreaContext.ts";

import styles from "./TextArea.module.css";

export const GlobalTextAreaCssSelector = "hop-TextArea";
const DefaultMinimumTextAreaRows = 3;

export type ResizeMode = "none" | "vertical";

export interface TextAreaProps extends Omit<StyledComponentProps<RACTextFieldProps>, "children">, FieldProps {
    /**
     * True to display the number of remaining allowed characters on the right of the input. Requires a valid value in the "maxLength" prop.
     */
    showCharacterCount?: boolean;

    /**
     * The minimum number of visible text lines.
     * @default 3
     */
    minRows?: number;

    /**
     * The maximum number of visible text lines before displaying a scrollbar.
     */
    maxRows?: number;

    /**
     * The placeholder text when the TextArea is empty.
     */
    placeholder?: string;

    /**
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-rows).
     */
    rows?: number;

    /**
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-cols).
     */
    cols?: number;

    /**
     * If `true`, the TextArea will take all available width.
     */
    isFluid?: ResponsiveProp<boolean>;

    /**
     * This should only be used with the `showCharacterCount` prop.
     * If `true`, the TextArea will allow the text to go over the max length, but it will add an error look to the character count.
     */
    allowExceedingMaxLength?: boolean;

    /**
     * The resize mode value of the TextArea. It's equivalent to the CSS resize property.
     * @default "none"
     */
    resizeMode?: ResponsiveProp<ResizeMode>;

    /**
     * A ref for the HTML textarea element.
     */
    inputRef?: MutableRefObject<HTMLTextAreaElement | null>;

    /**
     * The props for the InputGroup.
     */
    inputGroupProps?: InputGroupProps;

    /**
     * The props for the  RemainingCharacterCount.
     */
    remainingCharacterCountProps?: RemainingCharacterCountProps;
}

const pxToInt = (value?: string) => {
    return value ? parseInt(value.replace("px", ""), 10) : 0;
};

function getBodyElement(isSSR: boolean) {
    return !isSSR ? document.body : undefined;
}

function useCalculateRowHeight(input: HTMLTextAreaElement | null) {
    const isSSR = useIsSSR();
    const fontsLoaded = useFontFaceReady();

    return useMemo(() => {
        if (!input || !fontsLoaded) {
            return 0;
        }

        const { font, lineHeight } = window.getComputedStyle(input);

        if (lineHeight !== "normal") { return pxToInt(lineHeight); }

        const element = document.createElement("span");

        element.style.visibility = "hidden";
        element.style.position = "absolute";
        element.style.font = font;
        element.innerText = "LineHeightHelper";

        getBodyElement(isSSR)?.appendChild(element);

        const height = element.getBoundingClientRect().height;

        getBodyElement(isSSR)?.removeChild(element);

        return height;
    }, [input, fontsLoaded, isSSR]);
}

function TextArea(props: TextAreaProps, ref: ForwardedRef<HTMLDivElement>) {
    // we extract the inputRef props, since we want to manually merge it with the context props.
    const {
        inputRef: userProvidedInputRef = null,
        ...propsWithoutRef
    } = props;
    [props, ref] = useContextProps(propsWithoutRef, ref, TextAreaContext);
    props = useFormProps(props);
    const { stylingProps, ...ownProps } = useStyledSystem(props);

    const [characterCount, setCharacterCount] = useState(() => props.value?.length ?? props.defaultValue?.length ?? 0);

    const {
        className,
        contextualHelp,
        style: styleProp,
        size: sizeProp,
        showCharacterCount,
        maxLength,
        placeholder,
        onChange: onChangeProp,
        defaultValue,
        minRows = DefaultMinimumTextAreaRows,
        maxRows,
        cols,
        rows: rowsProp,
        value: valueProp,
        resizeMode: resizeModeProp,
        isFluid: isFluidProp,
        isDisabled,
        isInvalid,
        isRequired,
        allowExceedingMaxLength,
        necessityIndicator,
        inputGroupProps,
        remainingCharacterCountProps,
        label,
        description,
        errorMessage,
        ...otherProps
    } = ownProps;

    const mergedTextAreaRef = useObjectRef(mergeRefs(userProvidedInputRef, props.inputRef !== undefined ? props.inputRef : null));
    const isFluid = useResponsiveValue(isFluidProp) ?? false;
    const resizeMode = useResponsiveValue(resizeModeProp) ?? "none";
    const overMaxLength = !!maxLength && characterCount > maxLength;
    const size = useResponsiveValue(sizeProp) ?? "md";

    const classNames = composeClassnameRenderProps(
        className,
        GlobalTextAreaCssSelector,
        cssModule(
            styles,
            "hop-TextArea",
            isFluid && "fluid",
            !isUndefined(maxRows) && "max-rows"
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

    if (showCharacterCount && !maxLength) {
        console.warn("If showCharacterCount is true, maxLength must be set to the maximum number of characters allowed in the TextArea.");
    }

    if (allowExceedingMaxLength && !showCharacterCount) {
        console.warn("If allowExceedingMaxLength is true, showCharacterCount must also be true.");
    }

    const rowHeight = useCalculateRowHeight(mergedTextAreaRef.current);
    const defaultNumberOfRows = maxRows && maxRows < minRows ? maxRows : minRows;
    const [rows, setRows] = useState(rowsProp ?? defaultNumberOfRows);
    const truncateText = useTruncatedText();
    const [value, onChange] = useControlledState<string>(valueProp, defaultValue || "", handleTextChanged);

    const adjustRows = useCallback(() => {
        const input = mergedTextAreaRef.current;
        if (rowHeight === 0 || !input) {
            // rowHeight is not calculated yet or input was not found, we can't adjust the height.
            return;
        }
        const { paddingBottom, paddingTop } = window.getComputedStyle(input);
        const originalRows = input.rows;
        const originalOverflow = input.style.overflow;

        // Setting rows to 1 allows us to get the actual height of the text and allow the textarea to shrink when removing text.
        input.rows = 1;
        input.style.overflow = "hidden";

        const padding = pxToInt(paddingTop) + pxToInt(paddingBottom);
        const currentRowsWithText = Math.floor((input.scrollHeight - padding) / rowHeight);

        input.rows = originalRows;
        input.style.overflow = originalOverflow;

        if (rowsProp) {
            // If a number of rows is specified, we need to adjust the height
            setRows(rowsProp);
        } else if (maxRows && currentRowsWithText >= maxRows) {
            // If the number of rows with text is greater than or equal to the max rows, we need to adjust the height
            setRows(maxRows);
        } else {
            // If the number of rows is not specified or currentRowsWithText is less than maxRows, we adjust to the default or current text rows
            setRows(Math.max(currentRowsWithText, minRows));
        }
    }, [mergedTextAreaRef, rowHeight, minRows, maxRows, rowsProp]);

    // adjustRows needs to be called here instead of in handleTextChanged because handleTextChanged is not called when there is a defaultValue on load.
    // truncateText also needs to be here so that if the default text goes over the maxLength, it is truncated.
    useIsomorphicLayoutEffect(() => {
        if (!allowExceedingMaxLength) {
            const newValue = truncateText(value, maxLength);
            onChange(newValue);
        }
        adjustRows();
    }, [value, adjustRows]);

    const { className: inputGroupClassName, ...otherInputGroupProps } = inputGroupProps ?? {};
    const inputGroupClassNames = clsx(styles["hop-TextArea__InputGroup"], inputGroupClassName);
    const textAreaClassNames = cssModule(
        styles,
        "hop-TextArea__textarea",
        size,
        showCharacterCount && maxLength && "with-character-count"
    );

    const { className: remainingCharacterCountClassName, ...otherRemainingCharacterCountProps } = remainingCharacterCountProps ?? {};
    const remainingCharacterCountClassNames = clsx(styles["hop-TextArea__RemainingCharacterCount"], remainingCharacterCountClassName);

    const inputMarkup = (
        <ClearContainerSlots>
            <InputGroup
                isFluid
                className={inputGroupClassNames}
                isDisabled={isDisabled}
                isInvalid={isInvalid}
                {...otherInputGroupProps}
            >
                <RACTextArea
                    ref={mergedTextAreaRef}
                    placeholder={placeholder}
                    cols={cols}
                    rows={rows}
                    className={textAreaClassNames}
                />

                {showCharacterCount && maxLength &&
                    <RemainingCharacterCount
                        className={remainingCharacterCountClassNames}
                        count={maxLength - characterCount}
                        isInvalid={overMaxLength}
                        isDisabled={isDisabled}
                        {...otherRemainingCharacterCountProps}
                    />
                }
            </InputGroup>
        </ClearContainerSlots>
    );

    const childrenMarkup = (
        <>
            <FieldLabel
                className={styles["hop-TextArea__Label"]}
                contextualHelp={contextualHelp}
                isRequired={isRequired}
                necessityIndicator={necessityIndicator}
            >
                {label}
            </FieldLabel>
            {inputMarkup}
            {description && <HelperMessage className={styles["hop-TextArea__HelperMessage"]}>{description}</HelperMessage>}
            <ErrorMessage className={styles["hop-TextArea__ErrorMessage"]}>{errorMessage}</ErrorMessage>
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
            data-resize-mode={resizeMode}
            {...otherProps}
        >
            {childrenMarkup}
        </RACTextField>
    );
}

/**
 * A textarea field allows a user to enter a plain text value with a keyboard.
 *
 * [View Documentation](https://hopper.workleap.design/components/TextArea)
 */
const _TextArea = forwardRef<HTMLDivElement, TextAreaProps>(TextArea);
_TextArea.displayName = "TextArea";

export { _TextArea as TextArea };

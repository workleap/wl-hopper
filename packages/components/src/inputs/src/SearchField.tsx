import { IconContext, SearchIcon } from "@hopper-ui/icons";
import {
    useResponsiveValue,
    useStyledSystem,
    type ResponsiveProp,
    type StyledComponentProps
} from "@hopper-ui/styled-system";
import { mergeRefs } from "@react-aria/utils";
import clsx from "clsx";
import { forwardRef, type ForwardedRef, type MutableRefObject, type ReactNode } from "react";
import { useObjectRef } from "react-aria";
import {
    composeRenderProps,
    SearchField as RACSearchField,
    useContextProps,
    type SearchFieldProps as RACSearchFieldProps
} from "react-aria-components";

import { ClearButton, type ClearButtonProps } from "../../buttons/index.ts";
import { ErrorMessage } from "../../error-message/index.ts";
import { useFormProps } from "../../form/index.ts";
import { HelperMessage } from "../../helper-message/index.ts";
import { FieldLabel } from "../../typography/index.ts";
import { ClearContainerSlots, composeClassnameRenderProps, cssModule, SlotProvider, type FieldProps } from "../../utils/index.ts";

import { Input } from "./Input.tsx";
import { InputGroup, type InputGroupProps } from "./InputGroup.tsx";
import { SearchFieldContext } from "./SearchFieldContext.ts";

import styles from "./SearchField.module.css";

export const GlobalSearchFieldCssSelector = "hop-SearchField";

export interface SearchFieldProps extends Omit<StyledComponentProps<RACSearchFieldProps>, "children">, FieldProps {

    /**
     * Whether the SearchField is clearable.
     * @default true
     */
    isClearable?: boolean;

    /**
     * The placeholder text when the SearchField is empty.
     */
    placeholder?: string;

    /**
     * If `true`, the SearchField will take all available width.
     * @default false
     */
    isFluid?: ResponsiveProp<boolean>;

    /**
     * An icon to display at the start of the input.
     */
    icon?: ReactNode | null;

    /**
     * A ref for the HTML input element.
     */
    inputRef?: MutableRefObject<HTMLInputElement | null>;

    /**
     * The props for the InputGroup.
     */
    inputGroupProps?: InputGroupProps;

    /**
     * The props for the EmbeddedButton.
     */
    clearButtonProps?: ClearButtonProps;
}

function SearchField(props: SearchFieldProps, ref: ForwardedRef<HTMLDivElement>) {
    // we extract the inputRef props, since we want to manually merge it with the context props.
    const {
        inputRef: userProvidedInputRef = null,
        ...propsWithoutRef
    } = props;
    [props, ref] = useContextProps(propsWithoutRef, ref, SearchFieldContext);
    props = useFormProps(props);
    const { stylingProps, ...ownProps } = useStyledSystem(props);

    const {
        className,
        contextualHelp,
        style: styleProp,
        size,
        placeholder,
        isClearable = true,
        isFluid: isFluidProp,
        icon = <SearchIcon />,
        isDisabled,
        isInvalid,
        isRequired,
        necessityIndicator,
        inputGroupProps,
        clearButtonProps,
        isReadOnly,
        label,
        description,
        errorMessage,
        ...otherProps
    } = ownProps;

    const inputRef = useObjectRef(mergeRefs(userProvidedInputRef, props.inputRef !== undefined ? props.inputRef : null));
    const isFluid = useResponsiveValue(isFluidProp) ?? false;

    const classNames = composeClassnameRenderProps(
        className,
        GlobalSearchFieldCssSelector,
        cssModule(
            styles,
            "hop-SearchField",
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

    const { className: inputGroupClassName, ...otherInputGroupProps } = inputGroupProps ?? {};
    const inputGroupClassNames = clsx(styles["hop-SearchField__InputGroup"], inputGroupClassName);

    const { className: clearButtonClassName, ...otherClearButtonProps } = clearButtonProps ?? {};
    const clearButtonClassNames = clsx(styles["hop-SearchField__ClearButton"], clearButtonClassName);

    const inputMarkup = (
        <ClearContainerSlots>
            <InputGroup
                isDisabled={isDisabled}
                isInvalid={isInvalid}
                isFluid
                className={inputGroupClassNames}
                {...otherInputGroupProps}
            >
                <SlotProvider values={[
                    [IconContext, {
                        className: styles["hop-SearchField__prefix"]
                    }]
                ]}
                >
                    {icon}
                </SlotProvider>
                <Input size={size} ref={inputRef} placeholder={placeholder} />
                {isClearable && !isReadOnly &&
                    <ClearButton size="lg" isDisabled={isDisabled} className={clearButtonClassNames} {...otherClearButtonProps} />}
            </InputGroup>
        </ClearContainerSlots>
    );

    const childrenMarkup = (
        <>
            <FieldLabel
                className={styles["hop-SearchField__Label"]}
                contextualHelp={contextualHelp}
                isRequired={isRequired}
                necessityIndicator={necessityIndicator}
            >
                {label}
            </FieldLabel>
            {inputMarkup}
            {description && <HelperMessage className={styles["hop-SearchField__HelperMessage"]}>{description}</HelperMessage>}
            <ErrorMessage className={styles["hop-SearchField__ErrorMessage"]}>{errorMessage}</ErrorMessage>
        </>
    );

    return (
        <RACSearchField
            ref={ref}
            style={style}
            className={classNames}
            isDisabled={isDisabled}
            isInvalid={isInvalid}
            isRequired={isRequired}
            {...otherProps}
        >
            {childrenMarkup}
        </RACSearchField>
    );
}

/**
 * A specialized text input for [search input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/search).
 *
 * [View Documentation](https://hopper.workleap.design/components/SearchField)
 */
const _SearchField = forwardRef<HTMLDivElement, SearchFieldProps>(SearchField);
_SearchField.displayName = "SearchField";

export { _SearchField as SearchField };

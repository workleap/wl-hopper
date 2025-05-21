import {
    useResponsiveValue,
    useStyledSystem,
    type ResponsiveProp,
    type StyledComponentProps
} from "@hopper-ui/styled-system";
import clsx from "clsx";
import { forwardRef, useContext, useMemo, type CSSProperties, type ForwardedRef } from "react";
import {
    Form as RACForm,
    type FormProps as RACFormProps
} from "react-aria-components";

import { cssModule, type FieldSize, type NecessityIndicator } from "../../utils/index.ts";

import { FormContext } from "./FormContext.ts";

import styles from "./Form.module.css";

export const GlobalFormCssSelector = "hop-Form";

export interface FormStyleProps {
    /**
     * Whether the form elements are disabled.
     */
    isDisabled?: boolean;

    /**
     * If `true`, the Form will take all available width.
     */
    isFluid?: ResponsiveProp<boolean>;

    /**
     * Whether the required state should be shown as an asterisk or a label, which would display (Optional) on all non required field labels.
     */
    necessityIndicator?: NecessityIndicator;

    /**
     * The size of the fields and buttons within the form.
     * @default "md"
     */
    size?: ResponsiveProp<FieldSize>;
}

export interface FormProps extends StyledComponentProps<RACFormProps>, FormStyleProps {}

export function useFormProps<T extends FormStyleProps>(props: T): T {
    const ctx = useContext(FormContext);

    return useMemo(() => {
        let result: T = props;

        if (ctx) {
            result = { ...props };

            // This is a subset of mergeProps. We just need to merge non-undefined values.
            for (const key in ctx) {
                if (result[key as keyof T] === undefined) {
                    result[key as keyof T] = ctx[key as keyof FormStyleProps] as T[keyof T];
                }
            }
        }

        return result;
    }, [ctx, props]);
}

function Form(props: FormProps, ref: ForwardedRef<HTMLFormElement>) {
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        className,
        children,
        style,
        isFluid,
        isDisabled,
        necessityIndicator,
        size: sizeProp,
        ...otherProps
    } = ownProps;

    const size = useResponsiveValue(sizeProp) ?? "md";

    const classNames = clsx(
        GlobalFormCssSelector,
        cssModule(
            styles,
            "hop-Form"
        ),
        stylingProps.className,
        className
    );

    const mergedStyles: CSSProperties = {
        ...stylingProps.style,
        ...style
    };

    return (
        <FormContext.Provider value={{ isDisabled, isFluid, necessityIndicator, size }}>
            <RACForm
                ref={ref}
                className={classNames}
                style={mergedStyles}
                {...otherProps}
            >
                {children}
            </RACForm>
        </FormContext.Provider>
    );
}

/**
 * Forms are commonly used to provide user interaction in web applications.
 *
 * [View Documentation](https://hopper.workleap.design/components/Form)
 */
const _Form = forwardRef<HTMLFormElement, FormProps>(Form);
_Form.displayName = "Form";

export { _Form as Form };

import {
    Div,
    useStyledSystem,
    type DivProps,
    type StyledComponentProps
} from "@hopper-ui/styled-system";
import clsx from "clsx";
import type { CSSProperties, ReactNode } from "react";

import { useFormProps } from "../../../form/index.ts";
import { useLocalizedString } from "../../../i18n/index.ts";
import { cssModule, type NecessityIndicator } from "../../../utils/index.ts";

import { Label, type LabelProps } from "./Label.tsx";

import styles from "./FieldLabel.module.css";

export const GlobalFieldLabelCssSelector = "hop-FieldLabel";

export interface FieldLabelProps extends StyledComponentProps<LabelProps> {
    /**
     * The contextual help to be displayed next to the label
     */
    contextualHelp?: ReactNode;
    /**
     * The props of the wrapper
     */
    wrapperProps?: DivProps;
    /**
     * Whether to show a required state.
     */
    isRequired?: boolean;
    /**
     * Whether the required state should be shown as an asterisk or a label, which would display (Optional) on all non required field labels.
     */
    necessityIndicator?: NecessityIndicator;
}

export function FieldLabel(props: FieldLabelProps) {
    props = useFormProps(props);
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const stringFormatter = useLocalizedString();
    const {
        className,
        children,
        style,
        contextualHelp,
        isRequired,
        necessityIndicator,
        wrapperProps,
        ...otherProps
    } = ownProps;

    const classNames = clsx(
        className,
        GlobalFieldLabelCssSelector,
        cssModule(
            styles,
            GlobalFieldLabelCssSelector
        ),
        stylingProps.className
    );

    const mergedStyles: CSSProperties = {
        ...stylingProps.style,
        ...style
    };

    if (!children) {
        return null;
    }

    const necessityLabel = isRequired ? stringFormatter.format("Label.necessityLabel.required") : stringFormatter.format("Label.necessityLabel.optional");

    const requiredIndicator = <span aria-hidden="true" aria-label={necessityLabel} className={styles["hop-Label__indicator"]}>*</span>;

    const label = <Label
        {...otherProps}
        className={classNames}
        style={mergedStyles}
    >
        {children}
        {necessityIndicator === "label" && !isRequired && <span className={styles["hop-FieldLabel__label-indicator"]}> ({necessityLabel})</span>}
        {necessityIndicator === "asterisk" && isRequired && requiredIndicator}
    </Label>;

    if (!contextualHelp) {
        return label;
    }

    return (
        <Div className={clsx(wrapperProps?.className, styles["hop-FieldLabel__wrapper"])}>
            {label}
            {contextualHelp}
        </Div>
    );
}

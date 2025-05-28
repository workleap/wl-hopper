import {
    Div,
    useStyledSystem,
    type DivProps,
    type StyledComponentProps
} from "@hopper-ui/styled-system";
import clsx from "clsx";
import type { CSSProperties, ReactNode } from "react";

import { cssModule } from "../../../utils/index.ts";

import { Label, type LabelProps } from "./Label.tsx";

import styles from "./FieldLabel.module.css";

export const GlobalFieldLabelCssSelector = "hop-FieldLabel";

export interface FieldLabelProps extends StyledComponentProps<LabelProps> {
    /**
     * Whether the required state should be shown as an asterisk or a label, which would display (Optional) on all non required field labels.
     */
    contextualHelp?: ReactNode;
    wrapperProps?: DivProps;
}

export function FieldLabel(props: FieldLabelProps) {
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        className,
        children,
        style,
        contextualHelp,
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

    if (!contextualHelp) {
        return (
            <Label
                {...otherProps}
                className={classNames}
                style={mergedStyles}
            >
                {children}
            </Label>
        );
    }

    return (
        <Div className={clsx(wrapperProps?.className, styles["hop-FieldLabel__wrapper"])}>
            <Label
                {...otherProps}
                className={classNames}
                style={mergedStyles}
            >
                {children}
            </Label>
            {contextualHelp}
        </Div>
    );
}

import {
    useStyledSystem,
    type StyledComponentProps
} from "@hopper-ui/styled-system";
import { filterDOMProps } from "@react-aria/utils";
import clsx from "clsx";
import { forwardRef, type CSSProperties, type ForwardedRef } from "react";
import { Label as RACLabel, useContextProps, type LabelProps as RACLabelProps } from "react-aria-components";

import { useFormProps } from "../../../Form/index.ts";
import { useLocalizedString } from "../../../i18n/index.ts";
import { cssModule, type NecessityIndicator } from "../../../utils/index.ts";

import { LabelContext } from "./LabelContext.ts";

import styles from "./Label.module.css";

export const GlobalLabelCssSelector = "hop-Label";

export interface LabelProps extends StyledComponentProps<RACLabelProps> {
    /**
     * Whether the label shows a required state.
     */
    isRequired?: boolean;

    /**
     * Whether the required state should be shown as an asterisk or a label, which would display (Optional) on all non required field labels.
     */
    necessityIndicator?: NecessityIndicator;
}

function Label(props: LabelProps, ref: ForwardedRef<HTMLLabelElement>) {
    [props, ref] = useContextProps(props, ref, LabelContext);
    props = useFormProps(props);
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        className,
        children,
        slot,
        style,
        isRequired,
        necessityIndicator,
        ...otherProps
    } = ownProps;

    const stringFormatter = useLocalizedString();

    const classNames = clsx(
        className,
        GlobalLabelCssSelector,
        cssModule(
            styles,
            "hop-Label"
        ),
        stylingProps.className
    );

    const mergedStyles: CSSProperties = {
        ...stylingProps.style,
        ...style
    };

    const necessityLabel = isRequired ? stringFormatter.format("Label.necessityLabel.required") : stringFormatter.format("Label.necessityLabel.optional");

    const requiredIndicator = <span aria-hidden="true"
        aria-label={necessityLabel}
        className={styles["hop-Label__indicator"]}
    >*</span>;

    const filteredProps = filterDOMProps(otherProps, { labelable: true });

    return (
        <RACLabel
            ref={ref}
            className={classNames}
            slot={slot || undefined}
            style={mergedStyles}
            {...filteredProps}
        >
            {children}
            {necessityIndicator === "label" && !isRequired && <span className={styles["hop-Label__label-indicator"]}> ({necessityLabel})</span>}
            {necessityIndicator === "asterisk" && isRequired && requiredIndicator}
        </RACLabel>
    );
}

/**
 * A primitive label component matching Hopper's typography type scale.
 *
 * [View Documentation](https://hopper.workleap.design/components/Label)
 */
const _Label = forwardRef<HTMLLabelElement, LabelProps>(Label);
_Label.displayName = "Label";

export { _Label as Label };

import {
    useStyledSystem,
    type StyledComponentProps
} from "@hopper-ui/styled-system";
import { filterDOMProps } from "@react-aria/utils";
import clsx from "clsx";
import { forwardRef, type CSSProperties, type ForwardedRef } from "react";
import { Label as RACLabel, useContextProps, type LabelProps as RACLabelProps } from "react-aria-components";

import { cssModule } from "../../../utils/index.ts";

import { LabelContext } from "./LabelContext.ts";

import styles from "./Label.module.css";

export const GlobalLabelCssSelector = "hop-Label";

export interface LabelProps extends StyledComponentProps<RACLabelProps> {

}

function Label(props: LabelProps, ref: ForwardedRef<HTMLLabelElement>) {
    [props, ref] = useContextProps(props, ref, LabelContext);

    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        className,
        children,
        slot,
        style,
        ...otherProps
    } = ownProps;

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

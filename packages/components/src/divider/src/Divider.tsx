import { useStyledSystem, type StyledComponentProps } from "@hopper-ui/styled-system";
import clsx from "clsx";
import { forwardRef, type CSSProperties, type ForwardedRef } from "react";
import { Separator as RACSeparator, useContextProps, type SeparatorProps as RACSeparatorProps } from "react-aria-components";

import { cssModule } from "../../utils/index.ts";

import { DividerContext } from "./DividerContext.ts";

import styles from "./Divider.module.css";

export const GlobalDividerCssSelector = "hop-Divider";

export interface DividerProps extends StyledComponentProps<RACSeparatorProps> {}

function Divider(props: DividerProps, ref: ForwardedRef<HTMLElement>) {
    [props, ref] = useContextProps(props, ref, DividerContext);
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        className,
        style,
        orientation,
        ...otherProps
    } = ownProps;

    const classNames = clsx(
        GlobalDividerCssSelector,
        cssModule(
            styles,
            "hop-Divider",
            orientation
        ),
        stylingProps.className,
        className
    );

    const mergedStyles: CSSProperties = {
        ...stylingProps.style,
        ...style
    };

    return (
        <RACSeparator
            ref={ref}
            className={classNames}
            style={mergedStyles}
            orientation={orientation}
            {...otherProps}
        />
    );
}

/**
 * The Divider separates the distinguishes sections of content or groups.
 *
 * [View Documentation](https://hopper.workleap.design/components/Divider)
 */
const _Divider = forwardRef<HTMLElement, DividerProps>(Divider);
_Divider.displayName = "Divider";

export { _Divider as Divider };

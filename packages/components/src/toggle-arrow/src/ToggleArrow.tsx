import { AngleDownIcon } from "@hopper-ui/icons";
import { useStyledSystem, type StyledComponentProps } from "@hopper-ui/styled-system";
import clsx from "clsx";
import { forwardRef, type ForwardedRef } from "react";
import { useContextProps } from "react-aria-components";

import { cssModule, type BaseComponentDOMProps } from "../../utils/index.ts";

import { ToggleArrowContext } from "./ToggleArrowContext.ts";

import styles from "./ToggleArrow.module.css";

export const GlobalToggleArrowCssSelector = "hop-ToggleArrow";

export interface ToggleArrowProps extends Omit<StyledComponentProps<BaseComponentDOMProps>, "children"> {
    /**
     * Whether the arrow is in an expanded state.
     */
    isExpanded?: boolean;
}

function ToggleArrow(props:ToggleArrowProps, ref: ForwardedRef<SVGSVGElement>) {
    [props, ref] = useContextProps(props, ref, ToggleArrowContext);
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        className,
        isExpanded,
        style: styleProp,
        ...otherProps
    } = ownProps;

    const classNames = clsx(
        GlobalToggleArrowCssSelector,
        cssModule(
            styles,
            "hop-ToggleArrow"
        ),
        stylingProps.className,
        className
    );

    const style = {
        ...stylingProps.style,
        ...styleProp
    };

    return (
        <AngleDownIcon
            ref={ref}
            className={classNames}
            style={style}
            size="sm"
            data-expanded={isExpanded || undefined}
            {...otherProps}
        />
    );
}

/**
 * A simple arrow icon for expanding and collapsing content.
 */
const _ToggleArrow = forwardRef<SVGSVGElement, ToggleArrowProps>(ToggleArrow);
_ToggleArrow.displayName = "ToggleArrow";

export { _ToggleArrow as ToggleArrow };

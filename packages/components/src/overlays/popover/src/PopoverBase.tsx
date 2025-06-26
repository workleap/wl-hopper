import { getRootCSSClasses, useColorSchemeContext, useResponsiveValue, useStyledSystem, type ResponsiveProp, type StyledComponentProps } from "@hopper-ui/styled-system";
import { forwardRef, type ForwardedRef } from "react";
import type { Placement } from "react-aria";
import {
    composeRenderProps,
    Popover as RACPopover,
    useContextProps,
    type PopoverProps as RACPopoverProps
} from "react-aria-components";

import { composeClassnameRenderProps, cssModule } from "../../../utils/index.ts";

import { PopoverBaseContext } from "./PopoverBaseContext.ts";

import styles from "./PopoverBase.module.css";

export const GlobalPopoverBaseCssSelector = "hop-PopoverBase";

export interface PopoverBaseProps extends StyledComponentProps<Omit<RACPopoverProps, "placement">> {
    /**
     * The placement of the popover with respect to its anchor element.
     * @default "bottom"
     */
    placement?: ResponsiveProp<Placement>;
}

function PopoverBase(props: PopoverBaseProps, ref: ForwardedRef<HTMLElement>) {
    [props, ref] = useContextProps(props, ref, PopoverBaseContext);
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const { colorScheme } = useColorSchemeContext();

    const {
        children,
        className,
        placement: placementProp,
        style: styleProp,
        containerPadding,
        ...otherProps
    } = ownProps;

    const placement = useResponsiveValue(placementProp) ?? "bottom";

    const popoverClassNames = composeClassnameRenderProps(
        className,
        GlobalPopoverBaseCssSelector,
        cssModule(
            styles,
            "hop-PopoverBase"
        ),
        getRootCSSClasses(colorScheme),
        stylingProps.className
    );

    const style = composeRenderProps(styleProp, prev => {
        let extraStyles = {};
        if (containerPadding) {
            extraStyles = {
                ...extraStyles,
                "--container-padding": `${containerPadding}px`
            };
        }

        return {
            ...stylingProps.style,
            ...extraStyles,
            ...prev
        };
    });

    return (
        <RACPopover
            ref={ref}
            style={style}
            className={popoverClassNames}
            containerPadding={containerPadding}
            placement={placement}
            {...otherProps}
        >
            {children}
        </RACPopover>
    );
}


/**
 * A simple React Aria Popover with hopper's styling
 *
 * [View Documentation](https://hopper.workleap.design/components/PopoverBase)
 */
const _PopoverBase = forwardRef<HTMLElement, PopoverBaseProps>(PopoverBase);
_PopoverBase.displayName = "PopoverBase";

export { _PopoverBase as PopoverBase };

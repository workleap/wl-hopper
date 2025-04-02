import { getRootCSSClasses, useColorSchemeContext, useStyledSystem, type StyledComponentProps, type StyledSystemProps } from "@hopper-ui/styled-system";
import clsx from "clsx";
import { forwardRef, useContext, type CSSProperties, type ForwardedRef } from "react";
import { Provider, Tooltip as RACTooltip, useContextProps, type TooltipProps as RACTooltipProps } from "react-aria-components";

import { TextContext } from "../../typography/index.ts";
import { cssModule, ensureTextWrapper, type BaseComponentDOMProps } from "../../utils/index.ts";

import { TooltipContext } from "./TooltipContext.ts";
import { TooltipTriggerContext } from "./TooltipTriggerContext.ts";

import styles from "./Tooltip.module.css";

export const GlobalTooltipCssSelector = "hop-Tooltip";

type PropsToOmit = "children" | "className" | "style" | "UNSTABLE_portalContainer" | "isEntering" | "isExiting" | "placement" | "containerPadding" | "offset" | "crossOffset" | "shouldFlip" | "arrowBoundaryOffset" | "isOpen" | "defaultOpen" | "onOpenChange";

export type TooltipContainerProps = Omit<BaseComponentDOMProps, "slot"> & StyledSystemProps;

export interface TooltipProps extends
    Omit<RACTooltipProps, PropsToOmit>,
    StyledComponentProps<BaseComponentDOMProps> {
}

function Tooltip(props: TooltipProps, ref: ForwardedRef<HTMLDivElement>) {
    [props, ref] = useContextProps(props, ref, TooltipContext);
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const { colorScheme } = useColorSchemeContext();
    const { containerPadding, crossOffset, offset, placement = "top", shouldFlip } = useContext(TooltipTriggerContext);

    const {
        className,
        children,
        style,
        ...otherProps
    } = ownProps;

    const classNames = clsx(
        GlobalTooltipCssSelector,
        clsx(getRootCSSClasses(colorScheme)),
        cssModule(
            styles,
            "hop-Tooltip",
            placement
        ),
        stylingProps.className,
        className
    );

    const mergedStyles: CSSProperties = {
        ...style,
        ...stylingProps.style
    };

    return (
        <Provider
            values={[
                [TextContext, {
                    size: "xs"
                }]
            ]}
        >
            <RACTooltip
                ref={ref}
                style={mergedStyles}
                className={classNames}
                containerPadding={containerPadding}
                crossOffset={crossOffset}
                offset={offset}
                placement={placement}
                shouldFlip={shouldFlip}
                {...otherProps}
            >
                {ensureTextWrapper(children)}
            </RACTooltip>
        </Provider>
    );
}

/**
 * Tooltips display additional information upon hover or focus that is contextual, helpful, and nonessential while providing the ability to communicate and give clarity to a user.
 *
 * [View Documentation](https://hopper.workleap.design/components/Tooltip)
 */
const _Tooltip = forwardRef<HTMLDivElement, TooltipProps>(Tooltip);
_Tooltip.displayName = "Tooltip";

export { _Tooltip as Tooltip };

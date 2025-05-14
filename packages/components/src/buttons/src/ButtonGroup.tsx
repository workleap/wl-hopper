import { slot as slotFn, useResponsiveValue, useStyledSystem, type ResponsiveProp, type StyledComponentProps } from "@hopper-ui/styled-system";
import clsx from "clsx";
import { forwardRef, type CSSProperties, type ForwardedRef, type HTMLAttributes } from "react";
import type { Orientation } from "react-aria";
import { useContextProps } from "react-aria-components";

import { SlotProvider, cssModule, type Align } from "../../utils/index.ts";
import type { ButtonSize } from "../utils/index.ts";

import { ButtonContext } from "./ButtonContext.ts";
import { ButtonGroupContext } from "./ButtonGroupContext.ts";
import { LinkButtonContext } from "./LinkButtonContext.ts";

import styles from "./ButtonGroup.module.css";

export interface ButtonGroupProps extends StyledComponentProps<HTMLAttributes<HTMLDivElement>> {
    /**
   * The axis the ButtonGroup should align with.
   * @default 'horizontal'
   */
    orientation?: ResponsiveProp<Orientation>;

    /** Whether the Buttons in the ButtonGroup are all disabled. */
    isDisabled?: boolean;

    /** Whether the Buttons in the ButtonGroup are all fluid. */
    isFluid?: ResponsiveProp<boolean>;

    /**
     * The size of the buttons in the ButtonGroup.
     * @default "md"
     */
    size?: ResponsiveProp<ButtonSize>;

    /**
     * Whether elements are forced onto one line or can wrap onto multiple rows.
     * @default true
     */
    wrap?: ResponsiveProp<boolean>;

    /**
   * The alignment of the buttons within the ButtonGroup.
   * @default 'start'
   */
    align?: ResponsiveProp<Align>;
}

export const GlobalButtonGroupCssSelector = "hop-ButtonGroup";

function ButtonGroup(props: ButtonGroupProps, ref: ForwardedRef<HTMLDivElement>) {
    [props, ref] = useContextProps(props, ref, ButtonGroupContext);

    const { stylingProps, ...ownProps } = useStyledSystem(props);

    const {
        children,
        size: sizeProp,
        isFluid: isFluidProp,
        isDisabled = false,
        className,
        align: alignProp,
        style: styleProp,
        orientation: orientationProp,
        wrap: wrapProp,
        ...otherProps
    } = ownProps;

    const align = useResponsiveValue(alignProp);
    const size = useResponsiveValue(sizeProp) ?? "md";
    const isFluid = useResponsiveValue(isFluidProp) ?? false;
    const wrap = useResponsiveValue(wrapProp) ?? true;
    const orientation = useResponsiveValue(orientationProp) ?? "horizontal";

    const classNames = clsx(
        className,
        GlobalButtonGroupCssSelector,
        cssModule(
            styles,
            "hop-ButtonGroup",
            size,
            align,
            isFluid && "fluid",
            wrap && "wrap",
            orientation
        ),
        stylingProps.className
    );

    const style: CSSProperties = {
        ...stylingProps.style,
        ...styleProp
    };

    return (
        <div
            {...otherProps}
            ref={ref}
            className={classNames}
            style={style}
            slot={props.slot || undefined}
        >
            <SlotProvider values={[
                [ButtonContext, {
                    size,
                    isDisabled,
                    isFluid
                }],
                [LinkButtonContext, {
                    size,
                    isDisabled,
                    isFluid
                }]
            ]}
            >
                {children}
            </SlotProvider>
        </div>
    );
}

/**
 * ButtonGroup handles the spacing and orientation for a grouping of buttons whose actions are related to each other.
 *
 * [View Documentation](https://hopper.workleap.design/components/ButtonGroup)
 */
const _ButtonGroup = slotFn("button-group", forwardRef(ButtonGroup));

_ButtonGroup.displayName = "ButtonGroup";

export { _ButtonGroup as ButtonGroup };

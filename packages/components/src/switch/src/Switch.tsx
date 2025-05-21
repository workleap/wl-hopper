import { IconContext } from "@hopper-ui/icons";
import {
    type ResponsiveProp,
    type StyledComponentProps,
    useResponsiveValue,
    useStyledSystem
} from "@hopper-ui/styled-system";
import { type ForwardedRef, forwardRef } from "react";
import {
    Switch as RACSwitch,
    type SwitchProps as RACSwitchProps,
    composeRenderProps,
    useContextProps
} from "react-aria-components";

import { IconListContext } from "../../icon-list/index.ts";
import { TextContext } from "../../typography/Text/index.ts";
import {
    ClearContainerSlots,
    type FieldSize,
    SlotProvider,
    composeClassnameRenderProps,
    cssModule,
    ensureTextWrapper
} from "../../utils/index.ts";

import { SwitchContext } from "./SwitchContext.ts";

import styles from "./Switch.module.css";

export const GlobalSwitchCssSelector = "hop-Switch";

export interface SwitchProps extends StyledComponentProps<RACSwitchProps> {
    /**
     * A Switch can vary in size.
     * @default "md"
     */
    size?: ResponsiveProp<FieldSize>;
}

function Switch(props: SwitchProps, ref: ForwardedRef<HTMLLabelElement>) {
    [props, ref] = useContextProps(props, ref, SwitchContext);
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        className,
        children: childrenProp,
        size: sizeProp = "md",
        style: styleProp,
        ...otherProps
    } = ownProps;

    const size = useResponsiveValue(sizeProp) ?? "md";

    const classNames = composeClassnameRenderProps(
        className,
        GlobalSwitchCssSelector,
        cssModule(
            styles,
            "hop-Switch",
            size
        ),
        stylingProps.className
    );

    const style = composeRenderProps(styleProp, prev => {
        return {
            ...stylingProps.style,
            ...prev
        };
    });

    const children = composeRenderProps(childrenProp, prev => {
        return ensureTextWrapper(prev);
    });

    return (
        <RACSwitch
            ref={ref}
            className={classNames}
            style={style}
            {...otherProps}
        >
            {switchProps => {
                return (
                    <>
                        <div className={styles["hop-Switch__indicator"]} />
                        <ClearContainerSlots>
                            <SlotProvider
                                values={[
                                    [TextContext, {
                                        className: styles["hop-Switch__text"],
                                        size: size
                                    }],
                                    [IconListContext, {
                                        className: styles["hop-Switch__icon-list"],
                                        size: size
                                    }],
                                    [IconContext, {
                                        className: styles["hop-Switch__icon"],
                                        size: size
                                    }]
                                ]}
                            >
                                {children(switchProps)}
                            </SlotProvider>
                        </ClearContainerSlots>
                    </>
                );
            }}
        </RACSwitch>
    );
}

/**
 * A switch is used to quickly switch between two possible states. They are commonly used for “on/off” switches.
 *
 * [View Documentation](https://hopper.workleap.design/components/Switch)
 */
const _Switch = forwardRef<HTMLLabelElement, SwitchProps>(Switch);
_Switch.displayName = "Switch";

export { _Switch as Switch };

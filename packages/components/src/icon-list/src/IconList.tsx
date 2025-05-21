import { IconContext, type IconSize } from "@hopper-ui/icons";
import { slot as slotFn, useStyledSystem, type ResponsiveProp, type StyledSystemProps } from "@hopper-ui/styled-system";
import clsx from "clsx";
import { forwardRef, type CSSProperties, type ForwardedRef } from "react";
import { useContextProps } from "react-aria-components";

import type { BaseComponentDOMProps } from "../../utils/index.ts";
import { SlotProvider } from "../../utils/index.ts";

import { IconListContext } from "./IconListContext.ts";

import styles from "./IconList.module.css";

export const GlobalIconListCssSelector = "hop-IconList";

export interface IconListProps extends StyledSystemProps, BaseComponentDOMProps {
    /**
    * The size of the icon.
    */
    size?: ResponsiveProp<IconSize>;
}

function IconList(props:IconListProps, ref: ForwardedRef<HTMLSpanElement>) {
    [props, ref] = useContextProps(props, ref, IconListContext);

    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const { children, style, className, slot, size, ...otherProps } = ownProps;

    const classNames = clsx(
        className,
        GlobalIconListCssSelector,
        styles["hop-IconList"],
        stylingProps.className
    );

    const mergedStyles: CSSProperties = {
        ...stylingProps.style,
        ...style
    };

    return (
        <span
            ref={ref}
            className={classNames}
            style={mergedStyles}
            slot={slot ?? undefined}
            {...otherProps}
        >
            <SlotProvider values={[
                [IconContext, {
                    size
                }]
            ]}
            >
                {children}
            </SlotProvider>
        </span>
    );
}

/**
 * A component that allows you to render a list of icons
 *
 * [View Documentation](https://hopper.workleap.design/components/IconList)
 */
const _IconList = slotFn("icon", forwardRef<HTMLSpanElement, IconListProps>(IconList));
_IconList.displayName = "IconList";

export { _IconList as IconList };

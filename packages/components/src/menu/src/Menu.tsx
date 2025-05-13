import { useStyledSystem, type StyledComponentProps } from "@hopper-ui/styled-system";
import type { forwardRefType } from "@react-types/shared";
import clsx from "clsx";
import { forwardRef, useContext, type CSSProperties, type ForwardedRef, type NamedExoticComponent, type ReactNode } from "react";
import type { Placement } from "react-aria";
import {
    Menu as RACMenu,
    useContextProps,
    type MenuProps as RACMenuProps
} from "react-aria-components";

import { PopoverBase } from "../../overlays/index.ts";
import { cssModule } from "../../utils/index.ts";

import { InternalMenuContext, MenuContext } from "./MenuContext.ts";
import type { MenuTriggerProps } from "./MenuTrigger.tsx";
import { InternalMenuTriggerContext } from "./MenuTriggerContext.ts";

import styles from "./Menu.module.css";

export const GlobalMenuCssSelector = "hop-Menu";

// TODO: Check if all these props are used - Add to migration notes if not
export interface MenuProps<T> extends StyledComponentProps<RACMenuProps<T>> {}

function Menu<T extends object>(props: MenuProps<T>, ref: ForwardedRef<HTMLDivElement>) {
    [props, ref] = useContextProps(props, ref, MenuContext);
    const { isSubmenu } = useContext(InternalMenuContext);
    const menuTriggerContext = useContext(InternalMenuTriggerContext);
    const { stylingProps, ...ownProps } = useStyledSystem(props);

    const { align = "start", direction = "bottom", allowFlip } = menuTriggerContext ?? {};

    let initialPlacement: Placement = `${direction} ${align}`;

    if (isSubmenu) {
        initialPlacement = "end top" as Placement;
    }

    const {
        className,
        style,
        children,
        slot,
        ...otherProps
    } = ownProps;

    const classNames = clsx(
        className,
        GlobalMenuCssSelector,
        cssModule(
            styles,
            GlobalMenuCssSelector,
            (!!menuTriggerContext || isSubmenu) && "popover"
        ),
        stylingProps.className
    );

    const mergedStyles: CSSProperties = {
        ...style,
        ...stylingProps.style
    };

    const content = (
        <InternalMenuContext.Provider value={{ isSubmenu: true }}>
            <RACMenu
                ref={ref}
                slot={slot}
                className={classNames}
                style={mergedStyles}
                {...otherProps}
            >
                {children}
            </RACMenu>
        </InternalMenuContext.Provider>
    );

    if (menuTriggerContext || isSubmenu) {
        return (
            <PopoverBase
                ref={ref}
                slot={slot}
                placement={initialPlacement}
                shouldFlip={allowFlip}
                aria-label="TESTTT"
                // TODO: Check if this is correct
                // For submenus, the offset from the edge of the popover should be 10px.
                // Subtract 8px for the padding around the parent menu.
                offset={isSubmenu ? -2 : 8}
                // Offset by padding + border so that the first item in a submenu lines up with the parent menu item.
                crossOffset={isSubmenu ? -9 : 0}
                {...otherProps}
            >
                {content}
            </PopoverBase>
        );
    }

    return content;
}

/**
 * A menu offers a list of choices to the user, such as a set of actions or functions.
 *
 * [View Documentation](https://hopper.workleap.design/components/Menu)
 */
const _Menu = (forwardRef as forwardRefType)(Menu);
(_Menu as NamedExoticComponent).displayName = "Menu";

export { _Menu as Menu };

// This is purely so that storybook generates the types for both Menu and MenuTrigger
interface ICombined<T extends object> extends MenuProps<T>, Omit<MenuTriggerProps, "children"> {}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function CombinedMenu<T extends object>(props: ICombined<T>): ReactNode {
    return <div />;
}


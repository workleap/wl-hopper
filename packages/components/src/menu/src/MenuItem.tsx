import { AngleRightIcon, CheckmarkIcon, IconContext } from "@hopper-ui/icons";
import { useResponsiveValue, useStyledSystem, type ResponsiveProp, type StyledComponentProps } from "@hopper-ui/styled-system";
import clsx from "clsx";
import { forwardRef, type CSSProperties, type ForwardedRef, type ReactNode } from "react";
import { DEFAULT_SLOT, MenuItem as RACMenuItem, useContextProps, type MenuItemProps as RACMenuItemProps } from "react-aria-components";

import { AvatarContext } from "../../avatar/index.ts";
import { IconListContext } from "../../icon-list/index.ts";
import { Text, TextContext } from "../../typography/index.ts";
import { cssModule, SlotProvider } from "../../utils/index.ts";

import { MenuItemContext } from "./MenuItemContext.ts";

import styles from "./MenuItem.module.css";

export const GlobalMenuItemCssSelector = "hop-MenuItem";

export type MenuItemSize = "xs" | "sm" | "md" | "lg";

export interface MenuItemProps extends StyledComponentProps<RACMenuItemProps> {
    /**
     * The contents of the item.
     */
    children: ReactNode;
    /**
     * Whether or not the item is invalid
     */
    isInvalid?: boolean;
    /**
     * The size of the MenuItem.
     * @default "sm"
     */
    size?: ResponsiveProp<MenuItemSize>;
    /**
    * Whether the menu should close when the menu item is selected.
    */
    shouldCloseOnSelect?: boolean;

}

const MenuItem = (props: MenuItemProps, ref: ForwardedRef<HTMLDivElement>) => {
    [props, ref] = useContextProps(props, ref, MenuItemContext);
    const { style, ...ownProps } = useStyledSystem(props);
    const { children, stylingProps, className, isInvalid, size: sizeProp, shouldCloseOnSelect, ...otherProps } = ownProps;
    const size = useResponsiveValue(sizeProp) || "sm";
    const textValue = props.textValue || (typeof children === "string" ? children : undefined);

    const classNames = clsx(
        className,
        GlobalMenuItemCssSelector,
        cssModule(
            styles,
            GlobalMenuItemCssSelector,
            isInvalid && "invalid",
            size
        ),
        stylingProps.className
    );

    const mergedStyles: CSSProperties = {
        ...style,
        ...stylingProps.style
    };

    return (
        <RACMenuItem
            {...otherProps}
            textValue={textValue}
            ref={ref}
            style={mergedStyles}
            className={classNames}

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore - Undocumented prop in RACMenuItem. They will implement it in the future, but for now we need to use it.
            // https://github.com/adobe/react-spectrum/issues/8208
            closeOnSelect={shouldCloseOnSelect}
        >
            {renderProps => {
                const { selectionMode, hasSubmenu, isSelected } = renderProps;

                return (
                    <>
                        <SlotProvider
                            values={[
                                [AvatarContext, {
                                    size: "sm",
                                    className: styles["hop-MenuItem__avatar"]
                                }],
                                [IconContext, {
                                    slots: {
                                        [DEFAULT_SLOT]: {
                                            className: styles["hop-MenuItem__icon"]
                                        },
                                        "end-icon": {
                                            className: styles["hop-MenuItem__end-icon"]
                                        }
                                    }
                                }],
                                [IconListContext, {
                                    slots: {
                                        "end-icon": {
                                            className: styles["hop-MenuItem__end-icon"]
                                        }
                                    }
                                }],
                                [TextContext, {
                                    slots: {
                                        [DEFAULT_SLOT]: {
                                            slot: "label",
                                            className: styles["hop-MenuItem__text"],
                                            size: size === "lg" ? "md" : "sm"
                                        },
                                        "description": {
                                            className: styles["hop-MenuItem__description"],
                                            size: "xs"
                                        }
                                    }
                                }]
                            ]}
                        >
                            {selectionMode !== "none" && !hasSubmenu && isSelected &&
                                <CheckmarkIcon className={styles["hop-MenuItem__checkmark"]} size="sm" />
                            }
                            {typeof children === "string" ? <Text>{children}</Text> : children}
                            {renderProps.hasSubmenu && (
                                <AngleRightIcon size="sm" slot="end-icon" className={styles["hop-MenuItem__arrow"]} />
                            )}
                        </SlotProvider>
                    </>
                );
            }}
        </RACMenuItem>
    );
};

const _MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(MenuItem);
_MenuItem.displayName = "MenuItem";

export { _MenuItem as MenuItem };

import { CheckmarkIcon, IconContext } from "@hopper-ui/icons";
import { useStyledSystem, type StyledComponentProps } from "@hopper-ui/styled-system";
import clsx from "clsx";
import { useRef, type CSSProperties, type ReactNode } from "react";
import { DEFAULT_SLOT, MenuItem as RACMenuItem, type MenuItemRenderProps, type MenuItemProps as RACMenuItemProps } from "react-aria-components";

import { AvatarContext } from "../../avatar/index.ts";
import { Text, TextContext } from "../../typography/index.ts";
import { cssModule, SlotProvider } from "../../utils/index.ts";

import styles from "./MenuItem.module.css";

export const GlobalMenuItemCssSelector = "hop-MenuItem";

export interface MenuItemProps extends StyledComponentProps<RACMenuItemProps> {
    /**
     * The contents of the item.
     */
    children: ReactNode;
}

export function MenuItem(props: MenuItemProps) {
    const { style, ...ownProps } = useStyledSystem(props);
    const { children, stylingProps, className, ...otherProps } = ownProps;
    const ref = useRef(null);
    const textValue = props.textValue || (typeof children === "string" ? children : undefined);

    const classNames = (renderProps: MenuItemRenderProps) => clsx(
        className,
        GlobalMenuItemCssSelector,
        cssModule(
            styles,
            GlobalMenuItemCssSelector,
            ((renderProps.hasSubmenu && renderProps.isOpen) || renderProps.isFocused) && "focused"
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
                                [TextContext, {
                                    slots: {
                                        "label": {
                                            className: styles["hop-MenuItem__text"]
                                        },
                                        "description": {
                                            className: styles["hop-MenuItem__description"]
                                        }
                                    }
                                }]
                            ]}
                        >
                            {selectionMode !== "none" && !hasSubmenu && isSelected &&
                                <CheckmarkIcon className={styles["hop-MenuItem__checkmark"]} />
                            }
                            {typeof children === "string" ? <Text slot="label">{children}</Text> : children}
                        </SlotProvider>
                    </>
                );
            }}
        </RACMenuItem>
    );
}

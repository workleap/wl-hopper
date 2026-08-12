"use client";
import { IconContext } from "@/components/icon/IconContext.ts";
import clsx from "clsx";
import { DEFAULT_SLOT, Provider, Link as RACLink, type LinkProps as RACLinkProps } from "react-aria-components";
import "./button.css";

export interface LinkButtonProps extends RACLinkProps {
    variant?: "primary" | "secondary" | "ghost";
    size?: "sm" | "md";
    className?: string;
}

const LinkButton = ({ variant = "primary", size = "md", className, children, ...rest }: LinkButtonProps) => {
    const classes = clsx(
        "hd-btn",
        {
            [`hd-btn--${variant}`]: variant !== "primary",
            [`hd-btn--${size}`]: size !== "md"
        },
        className
    );

    return (
        <Provider
            values={[
                [
                    IconContext,
                    {
                        slots: {
                            [DEFAULT_SLOT]: {
                                className: "hd-btn__icon"
                            },
                            "end-icon": {
                                className: "hd-btn__end-icon"
                            }
                        }
                    }
                ]
            ]}
        >
            <RACLink className={classes} {...rest}>
                {children}
            </RACLink>
        </Provider>
    );
};

export default LinkButton;

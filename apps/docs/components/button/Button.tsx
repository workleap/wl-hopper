"use client";

import { IconContext } from "@/components/icon/IconContext.ts";
import clsx from "clsx";
import { DEFAULT_SLOT, Provider, Button as RACButton, type ButtonProps as RACButtonProps } from "react-aria-components";
import "./button.css";

export interface ButtonProps extends RACButtonProps {
    variant?: "primary" | "secondary" | "ghost";
    size?: "sm" | "md";
    className?: string;
}

const Button = ({ variant = "primary", size = "md", className, children, ...rest }: ButtonProps) => {
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
            <RACButton className={classes} {...rest}>
                {children}
            </RACButton>
        </Provider>
    );
};

export default Button;

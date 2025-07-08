"use client";

import { IconContext as HopperIconContext } from "@hopper-ui/icons";
import clsx from "clsx";
import {
    DEFAULT_SLOT,
    Provider,
    Link as RACLink,
    type LinkProps as RACLinkProps
} from "react-aria-components";
import "./link.css";

export interface LinkProps extends RACLinkProps {
    underline?: boolean;
}

const Link = ({ href, children, underline = false, ...rest }: LinkProps) => {
    const classes = clsx("hd-link", {
        "hd-link--underline": underline
    });

    return (
        <Provider values={[
            [HopperIconContext, {
                slots: {
                    [DEFAULT_SLOT]: {
                        className: "hd-link__icon",
                        size: "sm"
                    },
                    "end-icon": {
                        className: "hd-link__end-icon",
                        size: "sm"
                    }
                }
            }]
        ]}
        >
            <RACLink className={classes} href={href} target="_blank" {...rest}>
                {children}
            </RACLink>
        </Provider>
    );
};

export default Link;

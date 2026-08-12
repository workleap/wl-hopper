import clsx from "clsx";

import { Link as RACLink, type LinkProps as RACLinkProps } from "react-aria-components";
import "./iconButton.css";

const IconButtonClass = "hd-icon-button";

const IconButton = (props: RACLinkProps) => {
    const { children, className, ...rest } = props;

    return (
        <RACLink className={clsx(IconButtonClass, className)} {...rest}>
            {children}
        </RACLink>
    );
};

export default IconButton;

import clsx from "clsx";

import { Button as RACButton, type ButtonProps as RACButtonProps } from "react-aria-components";
import "./iconButton.css";

const IconButtonClass = "hd-icon-button";

const IconButton = (props: RACButtonProps) => {
    const { children, className, ...rest } = props;

    return (
        <RACButton className={clsx(IconButtonClass, className)} {...rest}>
            {children}
        </RACButton>
    );
};

export default IconButton;

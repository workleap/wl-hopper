import clsx from "clsx";
import type { ComponentProps } from "react";

import "./cardLinkList.css";

export interface CardLinkListProps extends ComponentProps<"div">{
    size: "sm" | "md";
}

const CardLinkList = ({ children, size = "md", className, ...rest }: CardLinkListProps) => {
    const cardLinkListClass = clsx("hd-cardlink-list", {
        [`hd-cardlink-list--${size}`]: size
    }, className);

    return (
        <div className={cardLinkListClass} {...rest}>
            {children}
        </div>
    );
};

export default CardLinkList;

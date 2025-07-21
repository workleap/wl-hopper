import clsx from "clsx";
import type { ComponentProps, ReactNode } from "react";

import Link from "next/link";
import "./cardLink.css";

export interface CardLinkProps extends ComponentProps<"a">{
    href: string;
    type: "primary" | "secondary";
    title: string;
    size: "sm" | "md";
    description?: string;
    children: ReactNode;
}

const CardLink = ({ children, className, title, size = "md", type = "primary", description = "md", href, ...rest }: CardLinkProps) => {
    const cardLinkClass = clsx("hd-cardlink", {
        [`hd-cardlink--${type}`]: type,
        [`hd-cardlink--${size}`]: size
    }, className);

    return (
        <Link className={cardLinkClass} {...rest} href={href}>
            {children && <div className="hd-cardlink__logo">
                {children}
            </div>}
            <div className="hd-cardlink__copy">
                <h3 className="hd-cardlink__title">{title}</h3>
                <p className="hd-cardlink__description">{description}</p>
            </div>
        </Link>
    );
};

export default CardLink;

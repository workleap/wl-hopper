import clsx from "clsx";
import type { ComponentProps } from "react";

import "./cardLink.css";

export interface CardLinkProps extends ComponentProps<"a">{
    href: string;
    type: "primary" | "secondary";
    title: string;
    description: string;
    children: React.ReactNode;
}

const CardLink = ({ children, className, title, type = "primary", description = "md", href, ...rest }: CardLinkProps) => {
    const cardLinkClass = clsx("hd-cardlink", {
        [`hd-cardlink--${type}`]: type
    }, className);

    return (
        <a className={cardLinkClass} {...rest} href={href}>
            <div className="hd-cardlink__logo">
                {children}
            </div>
            <div className="hd-cardlink__copy">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </a>
    );
};

export default CardLink;

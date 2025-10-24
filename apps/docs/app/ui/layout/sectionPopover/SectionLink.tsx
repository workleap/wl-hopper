import type { FC, ReactNode } from "react";
import { UseSectionLinkContext } from "./sectionLinkContext";

interface SectionLinkProps {
    children: ReactNode;
    className: string;
    href: string;
}

const SectionLink: FC<SectionLinkProps> = ({ children, className, href }) => {
    const { onClick } = UseSectionLinkContext();

    /* This has to be an a, not a link: https://github.com/vercel/next.js/issues/49612 */
    return (
        <a
            className={className}
            href={href}
            onClick={onClick}
        >
            {children}
        </a>
    );
};

export default SectionLink;

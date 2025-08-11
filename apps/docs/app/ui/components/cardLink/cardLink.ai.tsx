
export interface CardLinkProps {
    href: string;
    title: string;
    description?: string;
}

const CardLink = ({ title, description, href }: CardLinkProps) => {
    return (
        <li>
            <a href={href}>
                {title}
            </a>:
            <span>{description}</span>
        </li>
    );
};

export default CardLink;

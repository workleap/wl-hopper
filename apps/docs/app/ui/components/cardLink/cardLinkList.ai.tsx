import type { ReactNode } from "react";

export interface CardLinkListProps {
    children: ReactNode;
}

const CardLinkList = ({ children }: CardLinkListProps) => {
    return (
        <ul>
            {children}
        </ul>
    );
};

export default CardLinkList;

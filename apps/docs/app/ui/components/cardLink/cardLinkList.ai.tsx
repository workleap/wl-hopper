
export interface CardLinkListProps {
    children: React.ReactNode;
}

const CardLinkList = ({ children }: CardLinkListProps) => {
    return (
        <ul>
            {children}
        </ul>
    );
};

export default CardLinkList;

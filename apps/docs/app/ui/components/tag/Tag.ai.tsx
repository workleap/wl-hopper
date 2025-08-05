import type { ReactNode } from "react";

interface TagProps {
    children: ReactNode;
}

const Tag = ({ children }: TagProps) => {
    return <i>{children}</i>;
};

export default Tag;

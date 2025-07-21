import type { ReactNode } from "react";

import "./tag.css";

interface TagProps {
    children: ReactNode;
}

const Tag = ({ children }: TagProps) => {
    return (
        <span className="hd-tag">
            {children}
        </span>
    );
};

export default Tag;

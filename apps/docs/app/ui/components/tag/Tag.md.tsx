
import type { ReactNode } from "react";
import React from "react";


interface TagProps {
    children: ReactNode;
}

const Tag = ({ children }: TagProps) => {
    return <>
        <i>{children}</i>
    </>;
};

export default Tag;

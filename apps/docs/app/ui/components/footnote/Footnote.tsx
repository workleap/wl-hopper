import type { FC, ReactNode } from "react";
import "./footnote.css";

interface FootnoteProps {
    children: ReactNode;
    name: string;
}

const Footnote: FC<FootnoteProps> = ({ children, name }) => {
    return (
        <div className="hd-footnote" id={name}>
            {children}
        </div>
    );
};

export default Footnote;

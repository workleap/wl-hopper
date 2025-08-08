import type { ReactNode } from "react";

export interface ExpandProps {
    children: ReactNode;
}

const Expand = ({ children }: ExpandProps) => {
    return children;
};

export default Expand;

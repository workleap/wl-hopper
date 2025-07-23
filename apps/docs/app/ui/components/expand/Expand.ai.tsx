import type { ReactNode } from "react";
import type { DisclosureProps } from "react-aria-components";


export interface ExpandProps extends DisclosureProps {
    title: ReactNode;
}

const Expand = ({ children }: ExpandProps) => {
    return children;
};

export default Expand;

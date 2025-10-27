import clsx from "clsx";
import type { ReactNode } from "react";

import "./wrapper.css";

interface WrapperProps {
    children: ReactNode;
    type?: "with-sidebar" | "fluid";
    className?: string;
}

const Wrapper = ({ children, type = "fluid", className }: WrapperProps) => {
    return (
        <div className={
            clsx(
                "hd-layout__wrapper",
                {
                    [`hd-layout__${type}`]: type
                },
                className
            )
        }
        >
            {children}
        </div>
    );
};

export default Wrapper;

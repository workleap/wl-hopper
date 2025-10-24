"use client";

import CopyButton from "@/components/copyButton/CopyButton.tsx";
import type { FC, ReactNode } from "react";

import "./iconItem.css";

export interface IconItemProps {
    children: ReactNode;
    copyString: string;
    name: string;
}

const IconItem: FC<IconItemProps> = ({ children, copyString, name }) => {
    return (
        <>
            <div className="hd-icon-item">
                <div className="hd-icon-item-content">
                    <span className="hd-icon-item__icon">
                        <CopyButton className="hd-icon-item-copy" text={copyString} variant="ghost">
                            {children}
                        </CopyButton>
                    </span>
                    <div className="hd-icon-item__title">
                        {name}
                    </div>
                </div>
            </div>
        </>
    );
};

export default IconItem;

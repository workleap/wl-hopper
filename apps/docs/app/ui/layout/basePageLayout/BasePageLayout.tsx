import type { ReactNode } from "react";
import Aside from "../aside/Aside";
import SubHeader, { type SubHeaderProps } from "../subHeader/SubHeader";

interface BasePageLayoutProps {
    children: ReactNode;
    sectionsLinks: SubHeaderProps["links"];
    showSections?: boolean;
}

export const BasePageLayout = ({ children, sectionsLinks, showSections = true }: BasePageLayoutProps) => {
    return (
        <>
            {showSections && <SubHeader links={sectionsLinks} />}
            <div className="hd-container">
                {showSections && <Aside title="On this page" links={sectionsLinks} />}
                <main>{children}</main>
            </div>
        </>
    );
};

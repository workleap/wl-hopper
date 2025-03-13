import { allStyledSystems } from "@/.contentlayer/generated";
import type { ReactNode } from "react";
import getPageLinks from "../lib/getPageLinks";
import { SidebarLayout } from "../ui/layout/sidebarLayout";

export default function StyledSystemLayout({ children }: { children: ReactNode }) {
    const allLinks = getPageLinks(allStyledSystems, {
        order: ["overview"]
    });

    return (
        <SidebarLayout links={allLinks}>
            {children}
        </SidebarLayout>
    );
}

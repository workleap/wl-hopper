import { allIcons } from "@/.contentlayer/generated";
import getPageLinks from "@/app/lib/getPageLinks";
import { SidebarLayout } from "@/app/ui/layout/sidebarLayout";
import type { ReactNode } from "react";

export default function IconLayout({ children }: { children: ReactNode }) {
    const allIconLinks = getPageLinks(allIcons, {
        order: ["overview", "react-icons", "SVG-icons", "advanced"],
        sectionTitles: {
            "SVG-icons": "Other Frameworks Icons"
        }
    });

    return (
        <SidebarLayout links={allIconLinks}>
            {children}
        </SidebarLayout>
    );
}

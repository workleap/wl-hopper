import { allComponents } from "@/.contentlayer/generated";
import getPageLinks from "@/app/lib/getPageLinks.ts";
import { SidebarLayout } from "@/app/ui/layout/sidebarLayout";
import path from "path";
import type { ReactNode } from "react";

async function ComponentsLayout({ children }: { children: ReactNode }) {
    const links = getPageLinks(allComponents, {
        order: [
            "overview",
            "concepts",
            "application",
            "layout",
            "buttons",
            "collections",
            "date-and-time",
            "forms",
            "icons",
            "navigation",
            "overlays",
            "pickers",
            "status",
            "content",
            "placeholders",
            "building-blocks"
        ],
        // the components paths are slightly different than the other pages
        // we want the URLS to be /components/ComponentName
        pathAccessor: item => path.join("components", item.slug)
    });

    return (
        <SidebarLayout links={links}>
            {children}
        </SidebarLayout>
    );
}

export default ComponentsLayout;

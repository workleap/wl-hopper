import { allShadcnExtensions } from "@/.contentlayer/generated";
import type { ReactNode } from "react";
import getPageLinks from "../lib/getPageLinks";
import { SidebarLayout } from "../ui/layout/sidebarLayout";

export default function ShadcnExtensionLayout({ children }: { children: ReactNode }) {
    const allLinks = getPageLinks(allShadcnExtensions, {
        order: ["overview", "components"]
    });

    return <SidebarLayout links={allLinks}>{children}</SidebarLayout>;
}

import { allTokens } from "@/.contentlayer/generated";
import getPageLinks from "@/app/lib/getPageLinks";
import { SidebarLayout } from "@/app/ui/layout/sidebarLayout";
import type { ReactNode } from "react";

export default function TokenLayout({ children }: { children: ReactNode }) {
    const allTokenLinks = getPageLinks(allTokens, {
        order: ["overview", "semantic", "core"]
    });

    return (
        <SidebarLayout links={allTokenLinks}>
            {children}
        </SidebarLayout>
    );
}

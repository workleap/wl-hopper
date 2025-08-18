import getPageLinks from "@/app/lib/getPageLinks";
import { SidebarLayout } from "@/app/ui/layout/sidebarLayout";
import { allGettingStarteds } from "contentlayer/generated";
import type { ReactNode } from "react";

export default function GettingStartedLayout({ children }: { children: ReactNode }) {
    const allGettingStartedLinks = getPageLinks(allGettingStarteds, {
        order: ["overview", "installation-path", "ai-for-agents", "advanced-options", "guides"],
        sectionTitles: {
            "ai-for-agents": "AI for Agents"
        }
    });

    return (
        <SidebarLayout links={allGettingStartedLinks}>
            {children}
        </SidebarLayout>
    );
}

import type { ReactNode } from "react";

import { SidebarProvider } from "@/context/sidebar/SidebarProvider";

import Sidebar from "@/app/ui/layout/sidebar/Sidebar.tsx";
import Wrapper from "@/app/ui/layout/wrapper/Wrapper";

export default function PlaygroundLayout({ children }: { children: ReactNode }) {
    const links = {
        id: "playground",
        title: "Playground",
        linkItems: [
            {
                id: "codeblock",
                title: "Codeblock",
                path: "playground/codeblock"
            },
            {
                id: "headings-link",
                title: "Heading link",
                path: "playground/headings-link"
            },
            {
                id: "typography",
                title: "Typography",
                path: "playground/typography"
            },
            {
                id: "text-flow",
                title: "Text flow",
                path: "playground/text"
            }
        ]
    };

    return (
        <SidebarProvider>
            <Wrapper type="with-sidebar">
                <Sidebar links={[links]} />
                {children}
            </Wrapper>
        </SidebarProvider>
    );
}

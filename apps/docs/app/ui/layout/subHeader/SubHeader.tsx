"use client";

import SectionPopover from "@/app/ui/layout/sectionPopover/sectionPopover";
import Wrapper from "@/app/ui/layout/wrapper/Wrapper";
import { useSidebar } from "@/context/sidebar/SidebarProvider";
import { useIsMobile } from "@/hooks/useIsMobile.ts";

import SidePanel from "./assets/side-panel.svg";

import IconButton from "@/components/iconButton/IconButton";
import "./subHeader.css";

interface Link {
    title: string;
    url: string;
    id: string;
    level?: number;
}

export interface SubHeaderProps {
    links: Link[];
}

const SubHeader = ({ links }: SubHeaderProps) => {
    const sidebarContext = useSidebar();
    const isInSidebar = !!sidebarContext;
    const isMobile = useIsMobile("48rem");

    if (!isMobile) {
        return null;
    }

    return (
        <div className="hd-sub-header">
            <Wrapper>
                <div className="sub-header-container">
                    {isInSidebar && (
                        <IconButton type="button" aria-label="Open sidebar" className="hd-sub-header__sidebar-button" onPress={sidebarContext?.toggleSidebar}>
                            <SidePanel className="hd-sub-header__button-icon" />
                        </IconButton>
                    )}
                    {!isInSidebar && <div></div>}
                    <SectionPopover links={links} />
                </div>
            </Wrapper>
        </div>
    );
};

export default SubHeader;

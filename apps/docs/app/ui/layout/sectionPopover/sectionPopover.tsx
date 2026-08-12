"use client";

import { Popover, PopoverContext, PopoverTrigger } from "@/components/popover/Popover.tsx";
import { SlotProvider } from "@hopper-ui/components";
import { type PropsWithoutRef, type ReactNode, useState } from "react";
import { Button, ButtonContext } from "react-aria-components";
import SectionLink from "./SectionLink";
import SectionLinkArrow from "./sectionLinkArrow";
import { ArrowContext } from "./sectionLinkArrowContext";
import { SectionLinkContext } from "./sectionLinkContext";

import ChevronIcon from "./assets/chevron-icon.svg";
import "./sectionPopover.css";

interface Link {
    title: string;
    url: string;
    id: string;
    level?: number;
}

interface SectionPopoverProps {
    links: Link[];
}

const ToggleTrigger = ({ children }: { children: ReactNode }) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    return (
        <SlotProvider
            values={[
                [
                    PopoverContext,
                    {
                        isOpen: isPopoverOpen,
                        onOpenChange: setIsPopoverOpen,
                        placement: "bottom",
                        crossOffset: -32
                    }
                ],
                [
                    ArrowContext,
                    {
                        isOpen: isPopoverOpen
                    }
                ],
                [
                    ButtonContext,
                    {
                        onPress: () => setIsPopoverOpen(!isPopoverOpen)
                    }
                ],
                [
                    SectionLinkContext,
                    {
                        onClick: () => setIsPopoverOpen(!isPopoverOpen)
                    }
                ]
            ]}
        >
            {children}
        </SlotProvider>
    );
};

const SectionPopover = ({ links }: PropsWithoutRef<SectionPopoverProps>) => {
    const listItems = links.map(link => (
        <li className="hd-section-popover__list-item" key={link.id}>
            {/* This has to be an a, not a link: https://github.com/vercel/next.js/issues/49612 */}
            <SectionLink
                href={link.url}
                className={`hd-section-popover__list-link hd-section-popover__list-link-${link.level}`}
            >
                {link.title}
            </SectionLink>
        </li>
    ));

    return (
        listItems.length > 0 && (
            <ToggleTrigger>
                <PopoverTrigger>
                    <Button className="hd-section-popover__button">
                        On this page
                        <SectionLinkArrow src={ChevronIcon} />
                    </Button>
                    <Popover aria-label="On this page" className="hd-section-popover">
                        <div className="hd-section-popover__wrapper">
                            <SectionLink className="hd-section-popover__top-section" href="#hd-header">
                                Return to top
                            </SectionLink>
                            <div className="hd-section-popover__container">
                                <ul className="hd-section-popover__list">{listItems}</ul>
                            </div>
                        </div>
                    </Popover>
                </PopoverTrigger>
            </ToggleTrigger>
        )
    );
};

export default SectionPopover;

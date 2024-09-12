"use client";

import { Icon } from "@/components/icon";
import { Popover, PopoverContext, PopoverTrigger } from "@/components/popover/Popover.tsx";
import { SlotProvider } from "@hopper-ui/components";
import { useState, type PropsWithoutRef, type ReactNode } from "react";
import { Button, ButtonContext } from "react-aria-components";

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
        <SlotProvider values={[
            [PopoverContext, {
                isOpen: isPopoverOpen,
                onOpenChange: setIsPopoverOpen,
                placement: "bottom start",
                offset: 20
            }],
            [ButtonContext, {
                onPress: () => setIsPopoverOpen(!isPopoverOpen)
            }]
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
            <a
                href={link.url}
                className={`hd-section-popover__list-link hd-section-popover__list-link-${link.level}`}
            >
                {link.title}
            </a>
        </li>
    ));

    return (
        <>
            {listItems.length > 0 && (
                <ToggleTrigger>
                    <PopoverTrigger>
                        <Button className="hd-section-popover__button">
                            On this page
                            <Icon slot="icon" className="hd-section-popover__button-icon" src={ChevronIcon} />
                        </Button>
                        <Popover
                            aria-label="On this page"
                            className="hd-section-popover"
                        >
                            <div className="hd-section-popover__wrapper">
                                <a className="hd-section-popover__top-section" href="#top">Return to top</a>
                                <div className="hd-section-popover__container">
                                    <ul className="hd-section-popover__list">
                                        {listItems}
                                    </ul>
                                </div>
                            </div>
                        </Popover>
                    </PopoverTrigger>
                </ToggleTrigger>
            )}
        </>
    );
};

export default SectionPopover;

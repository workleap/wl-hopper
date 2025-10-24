"use client";

import { useHeadsObserver } from "@/hooks/useHeadsObserver";
import clsx from "clsx";
import type { PropsWithoutRef } from "react";
import { useEffect, useState } from "react";

import "./aside.css";

interface Link {
    title: string;
    url: string;
    id: string;
    level?: number;
}

interface AsideProps {
    title: string;
    links: Link[];
}

const Aside = ({ title, links }: PropsWithoutRef<AsideProps>) => {
    const titleHeight = 28;
    const { activeId, setNextActiveId } = useHeadsObserver();
    const activeIndex = links.findIndex(link => {
        return link.url === `#${activeId}`;
    });

    useEffect(() => {
        window.addEventListener("scroll", setNextActiveId);

        return () => {
            window.removeEventListener("scroll", setNextActiveId);
        };
    }, [setNextActiveId]);

    const [isOpen, setIsOpen] = useState(false);

    const toggleList = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleWindowResize = () => {
            if (window.innerWidth < 768 || window.innerWidth > 992) {
                setIsOpen(false);
            }
        };

        window.addEventListener("resize", handleWindowResize);
    }, [isOpen]);

    const listItems = links.map(link => (
        <li
            className={clsx("hd-aside__item", {
                "hd-aside__item--active": link.url === `#${activeId}` && "hd-aside__item--active"
            })}
            key={link.url}
        >
            {/* This has to be an a, not a link: https://github.com/vercel/next.js/issues/49612 */}
            <a href={link.url} className={`hd-aside__link hd-aside__link-level-${link.level}`}>
                {link.title}
            </a>
        </li>
    ));

    return (
        <aside className="hd-aside">
            {listItems.length > 0 && (
                <>
                    <span className="hd-aside__title">{title}</span>
                    <button type="button" className="hd-aside__button" onClick={toggleList}>
                        {title}
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            className="hd-aside__button-icon"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M4 6L8 10L12 6"
                                strokeWidth="1.33333"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                    <div className="hd-aside__container">
                        {activeIndex !== -1 && (
                            <span
                                className={clsx("hd-aside__marker", activeIndex === -1 && "hd-aside__marker--hide")}
                                style={{ top: activeIndex * titleHeight + "px" }}
                            >
                            </span>
                        )}
                        <ul className={clsx("hd-aside__list", isOpen ? "hd-aside__item--active" : "hd-aside__list--closed")}>
                            {listItems}
                        </ul>
                    </div>
                </>
            )}
        </aside>
    );
};

export default Aside;

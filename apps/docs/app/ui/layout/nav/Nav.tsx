"use client";

import type { NavItem } from "@/configs/navigation";
import { FeatureFlagContext } from "@/context/feature/FeatureFlagProvider.tsx";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type PropsWithoutRef, useContext } from "react";

import "./nav.css";

const Nav = ({ items }: { items: PropsWithoutRef<NavItem[]> }) => {
    const featureFlags = useContext(FeatureFlagContext);
    const pathname = usePathname()!;
    let firstPathLevel: string;

    if (pathname) {
        firstPathLevel = pathname.split("/")[1].trim();
    }

    const navItems = items.map(item => {
        const { path, label, status } = item;
        const pathShortened = path.split("/")[1].trim();

        const isActive = pathShortened === firstPathLevel && firstPathLevel !== "";

        return (
            <li key={label}
                className={clsx("hd-nav__list-item", isActive && "hd-nav__list-item--active", (!featureFlags.alpha && status !== "ready") && "hd-nav__link--disabled")}
            >
                <Link href={path} className="hd-nav__link">
                    {label} {label === "Components" && <span className="hd-nav__link-tag">Preview</span>}
                </Link>
            </li>
        );
    });

    return (
        <nav className="hd-nav" aria-label="Main" data-orientation="horizontal" dir="ltr">
            <ul className="hd-nav__list">
                {navItems}
            </ul>
        </nav>
    );
};

export default Nav;

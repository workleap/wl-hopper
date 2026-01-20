"use client";

import Wrapper from "@/app/ui/layout/wrapper/Wrapper";
import IconButton from "@/components/iconButton/IconButton";
import ColorSchemeSwitch from "@/components/themeSwitch/ColorSchemeSwitch";
import { navigation } from "@/configs/navigation";
import { type ColorScheme, ThemeContext } from "@/context/theme/ThemeProvider.tsx";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";

import CloseIcon from "./assets/close.svg";
import GithubLogo from "./assets/github.svg";
import HopperLogo from "./assets/hopper-logo.svg";

import ThemeSwitch from "@/components/themeSwitch/ThemeSwitch";
import "./mobileMenu.css";

interface MobileMenuProps {
    onClose?: () => void;
    isOpen: boolean;
}

const MobileMenu = ({ onClose, isOpen }: MobileMenuProps) => {
    const pathname = usePathname();
    let firstPathLevel: string;

    const { colorScheme, setColorScheme, theme, setTheme } = useContext(ThemeContext);
    const [isAnimating, setIsAnimating] = useState(false);
    const [animationDirection, setAnimationDirection] = useState<"opening" | "closing">("opening");

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
            setAnimationDirection("opening");
        } else {
            setAnimationDirection("closing");
        }

        const animationTimeout = setTimeout(() => {
            setIsAnimating(false);
        }, 300);

        return () => clearTimeout(animationTimeout);
    }, [isOpen]);

    if (pathname) {
        firstPathLevel = pathname.split("/")[1].trim();
    }

    useEffect(() => {
        const handleWindowResize = () => {
            if (window.innerWidth > 600) {
                onClose?.();
            }
        };

        if (isOpen) {
            window.addEventListener("resize", handleWindowResize);
        }
    }, [isOpen, onClose]);

    const toggleTheme = () => {
        const theme: ColorScheme = colorScheme === "dark"
            ? "light"
            : "dark";

        setColorScheme(theme);
    };

    const navItems = navigation.map(item => {
        const { path, label, status } = item;
        const pathShortened = path.split("/")[1].trim();

        const isActive = pathShortened === firstPathLevel && firstPathLevel !== "";

        return (
            <li key={label}>
                <Link
                    href={path}
                    className={clsx("hd-mobile-menu-nav-list__link", isActive && "hd-mobile-menu-nav-list__link--active", status !== "ready" && "hd-mobile-menu-nav-list__link--disabled")}
                    onClick={onClose}
                >
                    {label}
                </Link>
            </li>
        );
    });

    return (
        <div
            className={clsx("hd-mobile-menu", isAnimating && "hd-mobile-menu--is-animating", `hd-mobile-menu--${animationDirection}`)}
        >
            <div className="hd-mobile-menu__header">
                <Wrapper className="hd-flex">
                    <Link href="/" className="hd-brand" aria-label="Hopper Brand">
                        <HopperLogo />
                    </Link>
                    <IconButton onPress={onClose} className="hd-mobile-menu__close">
                        <CloseIcon className="hd-mobile-menu__close-icon" />
                    </IconButton>
                </Wrapper>
            </div>
            <div className="hd-mobile-menu__container">
                <div className="hd-mobile-menu-nav">
                    <ul className="hd-mobile-menu-nav-list">
                        {navItems}
                    </ul>
                </div>
                <div className="hd-mobile-menu-footer">
                    <nav>
                        <ul className="hd-mobile-menu-footer-list">
                            <li>
                                <Link
                                    href="https://github.com/workleap/wl-hopper"
                                    target="_blank"
                                    className="hd-mobile-menu-footer-link"
                                >
                                    <GithubLogo />
                                    GitHub
                                </Link>
                            </li>
                            <li>
                                <ColorSchemeSwitch
                                    onChange={toggleTheme}
                                    colorScheme={colorScheme!}
                                    text="Appearance"
                                    className="hd-mobile-menu-footer-button"
                                />
                            </li>
                            <li>
                                <ThemeSwitch
                                    onThemeChange={setTheme}
                                    theme={theme!}
                                    className="hd-mobile-menu-footer-button"
                                    text="Select theme"
                                />
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;

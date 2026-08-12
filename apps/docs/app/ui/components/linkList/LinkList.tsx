"use client";

import LinkButton from "@/components/button/LinkButton.tsx";
import { ExternalLinkIcon, GithubIcon, Icon, type IconProps, NpmIcon, WaiAriaIcon } from "@/components/icon";
import clsx from "clsx";

import "./linkList.css";

export interface Links {
    name: string;
    src: string;
    label: string;
}

export interface LinkListProps {
    links: Links[];
    className?: string;
}

export default function LinkList({ links, className }: LinkListProps) {
    return (
        <div className={clsx("hd-link-list", className)}>
            {links.map((link, key) => {
                let icon;
                switch (link.name) {
                    case "github":
                        icon = GithubIcon;
                        break;
                    case "npm":
                        icon = NpmIcon;
                        break;
                    case "issue":
                        icon = ExternalLinkIcon;
                        break;
                    case "wai-aria":
                        icon = WaiAriaIcon;
                        break;
                }

                return (
                    <LinkButton
                        size="sm"
                        variant="ghost"
                        href={link.src}
                        target="_blank"
                        key={`link-list-${key.toString()}`}
                    >
                        {link.label}
                        <Icon src={icon as IconProps["src"]} />
                    </LinkButton>
                );
            })}
        </div>
    );
}

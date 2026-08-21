"use client";
import LinkButton from "@/components/button/LinkButton";
import { ExternalLinkIcon, Icon } from "@/components/icon";

export const GithubButton = () => {
    return (
        <LinkButton href="https://github.com/workleap/wl-hopper" variant="secondary" target="_blank">
            GitHub
            <Icon src={ExternalLinkIcon} slot="end-icon" />
        </LinkButton>
    );
};

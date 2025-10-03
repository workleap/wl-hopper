"use client";

import LinkList, { type Links } from "@/app/ui/components/linkList/LinkList.tsx";
import Tag from "@/app/ui/components/tag/Tag";
import Title from "@/app/ui/components/title/Title";
import Link from "@/components/link/Link";
import { ThemeContext } from "@/context/theme/ThemeProvider";
import { Content, Callout as HopperCallout, Heading as HopperHeading, HopperProvider, type ColorScheme } from "@hopper-ui/components";
import clsx from "clsx";
import { useContext } from "react";
import "./heading.css";

export interface HeadingProps {
    title: string;
    tag?: string;
    alpha?: string;
    description?: string;
    className?: string;
    links?: Links[];
}

const Heading = ({ title, tag, alpha, className, description, links }: HeadingProps) => {
    const { colorMode } = useContext(ThemeContext);

    return (
        <div className={clsx("hd-heading", className)}>
            <div className="hd-heading__title">
                <Title level={1}>{title}</Title>
                {tag && <Tag>{tag}</Tag>}
            </div>
            <div className="hd-heading__ai">
                <span className="hd-heading__ai-tag">AI Tip</span> Want to skip the docs? Use the <Link underline href="/getting-started/ai-for-agents/mcp-server">MCP Server</Link>
            </div>
            {alpha && (
                <div className="hd-heading__alpha">
                    <HopperProvider colorScheme={colorMode as ColorScheme}>
                        <HopperCallout variant="warning">
                            <HopperHeading>Alpha component</HopperHeading>
                            <Content>{alpha}</Content>
                        </HopperCallout>
                    </HopperProvider>
                </div>
            )}
            {description && <p className="hd-heading__description">{description}</p>}
            {links && <LinkList className="hd-heading__links" links={links} />}
        </div>
    );
};

export default Heading;

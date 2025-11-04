"use client";

import LinkList, { type Links } from "@/app/ui/components/linkList/LinkList.tsx";
import { PageHeader } from "@/app/ui/components/pageHeader/PageHeader";
import Tag from "@/app/ui/components/tag/Tag";
import AICallout from "@/components/ai-callout/AICallout";
import { ThemeContext } from "@/context/theme/ThemeProvider";
import { Content, Callout as HopperCallout, Heading as HopperHeading, HopperProvider } from "@hopper-ui/components";
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
    aiDocAbsolutePath?: string | null;
}

const Heading = ({ title, tag, alpha, className, description, links, aiDocAbsolutePath }: HeadingProps) => {
    const { colorMode } = useContext(ThemeContext);

    return (
        <div className={clsx("hd-heading", className)}>
            <div className="hd-heading__title">
                <PageHeader title={title} aiDocAbsolutePath={aiDocAbsolutePath} />
                {tag && <Tag>{tag}</Tag>}
            </div>
            {alpha && (
                <div className="hd-heading__alpha">
                    <HopperProvider colorScheme={colorMode}>
                        <HopperCallout variant="warning">
                            <HopperHeading>Alpha component</HopperHeading>
                            <Content>{alpha}</Content>
                        </HopperCallout>
                    </HopperProvider>
                </div>
            )}
            {description && <p className="hd-heading__description">{description}</p>}
            {links && <LinkList className="hd-heading__links" links={links} />}
            <AICallout />
        </div>
    );
};

export default Heading;

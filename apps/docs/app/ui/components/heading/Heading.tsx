"use client";

import LinkList, { type Links } from "@/app/ui/components/linkList/LinkList.tsx";
import Tag from "@/app/ui/components/tag/Tag";
import Title from "@/app/ui/components/title/Title";
import { ThemeContext } from "@/context/theme/ThemeProvider";
import { Callout, type ColorScheme, Content, Heading as HopperHeading, HopperProvider } from "@hopper-ui/components";
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
            {alpha && (
                <div className="hd-heading__alpha">
                    <HopperProvider colorScheme={colorMode as ColorScheme}>
                        <Callout variant="warning">
                            <HopperHeading>Alpha component</HopperHeading>
                            <Content>{alpha}</Content>
                        </Callout>
                    </HopperProvider>
                </div>
            )}
            {description && <p className="hd-heading__description">{description}</p>}
            {links && <LinkList className="hd-heading__links" links={links} />}
        </div>
    );
};

export default Heading;

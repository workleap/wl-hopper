"use client";

import { allComponents } from "@/.contentlayer/generated";

import Card from "@/app/ui/components/card/Card";
import Title from "@/app/ui/components/title/Title";
import { EmptyComponent, Icon } from "@/components/icon";
import { OverviewComponents } from "@/examples/overview";
import Link from "next/link";

export interface OverviewTileProps {
    title: string;
}

const OverviewTile = ({ title }: OverviewTileProps) => {
    const ComponentIcon = OverviewComponents[title] || EmptyComponent;

    const filteredComponents = allComponents.filter(component => component.title === title);

    return (
        <>
            {filteredComponents.map(component => (
                <Card align="start" ghost className="hd-component-overview-item" key={component._id}>
                    <Link
                        className="hd-component-overview-item__link"
                        href={`/components/${component.slug}`}
                    >
                        <div className="hd-component-overview-item__img">
                            <Icon src={ComponentIcon} />
                        </div>
                        <div className="hd-component-overview-item__caption">
                            <Title
                                level={3}
                                className="hd-component-overview-item__title"
                            >{component.title}
                            </Title>
                            <p className="hd-component-overview-item__description">{component.description}</p>
                        </div>
                    </Link>
                </Card>
            ))}
        </>
    );
};

export default OverviewTile;

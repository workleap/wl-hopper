"use client";

import Title from "@/app/ui/components/title/Title.tsx";
import { ThemeContext } from "@/context/theme/ThemeProvider.tsx";
import { HopperProvider } from "@hopper-ui/components";

import { useContext } from "react";
import OverviewTile from "./overviewTile/OverviewTile.tsx";

import "./overview.css";
import { allComponents, categories } from "./util.ts";

const Overview = () => {
    const { colorMode } = useContext(ThemeContext);
    const theme = colorMode!;

    const overviewSection = categories.map(category => {
        if (!category) {
            return null;
        }

        return (
            <div className="hd-component-overview-category" key={category}>
                <Title
                    level={2}
                    interactive
                    className="hd-component-overview-category__title"
                >{category}
                </Title>
                <HopperProvider colorScheme={theme}>
                    <div className="hd-component-overview">
                        {allComponents.filter(component =>
                            component.category &&
                            component.category === category &&
                            (component.status === "ready" ||
                                component.status === undefined)
                        ).map(component => {
                            return (
                                <OverviewTile title={component.title} key={component._id} />
                            );
                        })}
                    </div>
                </HopperProvider>
            </div>
        );
    });

    return (
        <div className="hd-component-overview-wrapper">
            {overviewSection}
        </div>
    );
};

export default Overview;

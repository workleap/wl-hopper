"use client";

import { allComponents } from "@/.contentlayer/generated";

import Title from "@/app/ui/components/title/Title.tsx";
import { type ColorScheme, ThemeContext } from "@/context/theme/ThemeProvider.tsx";
import { HopperProvider } from "@hopper-ui/components";

import { useContext } from "react";
import OverviewTile from "./overviewTile/OverviewTile.tsx";

import "./overview.css";

const ignoreCategories = ["application"];
const sortOrder = [
    "layout",
    "buttons",
    "collections",
    "forms",
    "icons",
    "navigation",
    "overlays",
    "pickers",
    "status",
    "content",
    "placeholders",
    "building blocks"
];

const categories = Array.from(new Set(allComponents.map(component => component.category))).filter(x => x && !ignoreCategories.includes(x)).sort((a, b) => {
    const aIndex = sortOrder.indexOf(a!);
    const bIndex = sortOrder.indexOf(b!);

    if (aIndex === -1 && bIndex === -1) {
        return 0;
    }

    if (aIndex === -1) {
        return 1;
    }

    if (bIndex === -1) {
        return -1;
    }

    return aIndex - bIndex;
});

const Overview = () => {
    const { colorMode } = useContext(ThemeContext);
    const theme = colorMode as ColorScheme;

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
                >{category}</Title>
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

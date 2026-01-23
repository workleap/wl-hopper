"use client";

import OverviewTile from "@/app/ui/components/overview/overviewTile/OverviewTile";
import { ThemeContext } from "@/context/theme/ThemeProvider.tsx";
import { HopperProvider } from "@hopper-ui/components";
import { useContext } from "react";

import "./composedComponents.css";

interface ComposedComponentsProps {
    components: string[];
}

const ComposedComponents = ({ components }: ComposedComponentsProps) => {
    const { colorScheme, theme } = useContext(ThemeContext);

    const sortedComponents = [...components].sort((a, b) => a.localeCompare(b));

    return (
        <HopperProvider theme={theme} colorScheme={colorScheme}>
            <div className="hd-composed-components__wrapper">
                {sortedComponents.map(component => (
                    <OverviewTile title={component} key={component} />
                ))}
            </div>
        </HopperProvider>
    );
};

export default ComposedComponents;

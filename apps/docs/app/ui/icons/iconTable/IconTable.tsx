"use client";

import { HopperProvider } from "@hopper-ui/components";
import * as IconLibrary from "@hopper-ui/icons";
import IconItem from "./IconItem";

import { ThemeContext } from "@/context/theme/ThemeProvider";
import { useContext } from "react";
import "./iconTable.css";

interface IconTableProps {
    size: "sm" | "md" | "lg" | "xl";
    type: "svg" | "react";
    items: typeof IconLibrary.iconNames | typeof IconLibrary.richIconNames;
    filter?: string;
}

function toKebabCase(str: string) {
    return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

function getIconNumericSize(iconSize: "sm" | "md" | "lg" | "xl") {
    switch (iconSize) {
        case "sm":
            return "16";
        case "md":
            return "24";
        case "lg":
            return "32";
        case "xl":
            return "40";
    }
}

function IconTable({ size, type, items, filter }: IconTableProps) {
    const { colorScheme, theme } = useContext(ThemeContext);
    const listItems = items.filter(name => {
        const formattedName = name.replace("RichIcon", "").replace("Icon", "");

        return !filter || formattedName.toLowerCase().includes(filter.trim().toLowerCase());
    }).map(name => {
        const formattedName = name.replace("RichIcon", "").replace("Icon", "");
        const copyString = type === "react"
            ? `${name}`
            : `${toKebabCase(formattedName).toLowerCase()}-${getIconNumericSize(size)}.svg`;

        const Component = IconLibrary[name];

        return (
            <IconItem copyString={copyString} name={formattedName} key={name} >
                <Component size={size} />
            </IconItem>
        );
    });

    return (
        <HopperProvider theme={theme} colorScheme={colorScheme}>
            <div className="hd-icon-table">
                {listItems}
            </div>
        </HopperProvider>
    );
}

export default IconTable;

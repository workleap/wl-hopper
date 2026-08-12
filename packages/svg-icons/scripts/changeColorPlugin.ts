import type { XastElement } from "svgo";

import {
    DecorativeOption7IconColor,
    DecorativeOption7SurfaceColor,
    PrimaryIconColor,
    WarningWeakIconColor,
    White,
    WhiteHexadecimal
} from "./constants.ts";

const colors: { [key: string]: string } = {
    [PrimaryIconColor]: `var(--hop-Icon-placeholder-primary-icon, ${PrimaryIconColor})`,
    [WarningWeakIconColor]: `var(--hop-Icon-placeholder-warning-icon-weak, ${WarningWeakIconColor})`,
    [White]: `var(--hop-RichIcon-placeholder-fill, ${WhiteHexadecimal})`,
    [WhiteHexadecimal]: `var(--hop-RichIcon-placeholder-fill, ${WhiteHexadecimal})`,
    [DecorativeOption7IconColor]: `var(--hop-RichIcon-placeholder-shadow, ${DecorativeOption7IconColor})`,
    [DecorativeOption7SurfaceColor]: `var(--hop-RichIcon-placeholder-background, ${DecorativeOption7SurfaceColor})`
};

const colorsProps = new Set(["color", "fill", "flood-color", "lighting-color", "stop-color", "stroke"]);

export const changeColorPlugin = {
    name: "changeColorPlugin",
    description: "Change the color of the SVGs",
    fn: () => {
        return {
            element: {
                enter: (node: XastElement) => {
                    for (const [nodeName, nodeValue] of Object.entries(node.attributes)) {
                        if (colorsProps.has(nodeName)) {
                            let value = nodeValue;

                            if (colors[value]) {
                                value = colors[value];
                            }
                            node.attributes[nodeName] = value;
                        }
                    }
                }
            }
        };
    }
};

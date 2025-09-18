import type { XastElement } from "svgo";

import { colors } from "./svgoConfig.ts";

const colorsProps = new Set([
    "color",
    "fill",
    "flood-color",
    "lighting-color",
    "stop-color",
    "stroke"
]);

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

import type { Config } from "svgo";

import { changeColorPlugin } from "./changeColorPlugin.ts";
import {
    DecorativeOption7IconColor,
    DecorativeOption7SurfaceColor,
    NeutralIconColor,
    PrimaryIconColor,
    WarningWeakIconColor,
    White,
    WhiteHexadecimal
} from "./constants.ts";

export const colors: { [key: string]: string } = {
    [PrimaryIconColor]: `var(--hop-Icon-placeholder-primary-icon, ${PrimaryIconColor})`,
    [WarningWeakIconColor]: `var(--hop-Icon-placeholder-warning-icon-weak, ${WarningWeakIconColor})`,
    [White]: `var(--hop-RichIcon-placeholder-fill, ${WhiteHexadecimal})`,
    [WhiteHexadecimal]: `var(--hop-RichIcon-placeholder-fill, ${WhiteHexadecimal})`,
    [DecorativeOption7IconColor]: `var(--hop-RichIcon-placeholder-shadow, ${DecorativeOption7IconColor})`,
    [DecorativeOption7SurfaceColor]: `var(--hop-RichIcon-placeholder-background, ${DecorativeOption7SurfaceColor})`
};

const config: Config = {
    multipass: true,
    plugins: [
        {
            name: "preset-default",
            params: {
                overrides: {
                    /**
                     * viewBox is needed in order to produce 20px by 20px containers
                     * with smaller icons inside.
                     */
                    removeViewBox: false,
                    /**
                     * Some of our icons have multiple fill colors. We want to keep them, but replace the main icon color
                     * with the currentColor value. This allows us to change the color of the icon with the color CSS property.
                     */
                    convertColors: {
                        currentColor: NeutralIconColor
                    }

                }
            }
        },
        /**
         * Converts presentation attributes in element styles to the equivalent XML attribute.
         * Presentation attributes can be used in both attributes and styles, but in most cases it'll take fewer bytes to use attributes
         */
        { name: "convertStyleToAttrs" },
        /**
         * Remove all <style> elements from the document.
         */
        { name: "removeStyleElement" },
        /**
         * Sorts attributes in all elements in the document. This does not reduce the size of the SVG, but improves readability
         */
        { name: "sortAttrs" },
        /**
         * SVGs can be interactive through JavaScript.
         * However, unless the SVG is coming from a trusted source, it's strongly advised to strip off JavaScript to avoid XSS attacks.
         *
         * Since we're not using JavaScript in our SVGs, we can safely remove the script element.
         */
        { name: "removeScripts" },
        /**
         * Removes the clip-rule attribute from all elements.
         * In the unit tests, we make sure that there is no clipPath in our svgs. Yet for some reason
         * clip-rule are in almost all of our svgs. So to save some extra bytes, we remove them.
         */
        {
            name: "removeAttrs",
            params: {
                attrs: "clip-rule"
            }
        },
        // Since we want to be able to set the svg color using both the color props and the fill props, we need to remove the fill attribute from the svg and the paths
        {
            name: "removeAttrs",
            params: {
                attrs: ["svg:fill:none", "*:fill:currentColor"]
            }
        },
        changeColorPlugin
    ]
};

export default config;

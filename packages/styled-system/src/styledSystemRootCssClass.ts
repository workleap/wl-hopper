import type { ColorScheme } from "@hopper-ui/components";

import packageJson from "../package.json" with { type: "json" };

export const HopperRootCssClass = "hop";

// We read the version from the packageJson and replace all dots with dashes.
// This ensures that multiple versions of the Styled System can be used on the same page.
export const StyledSystemRootCssClass = `${HopperRootCssClass}-${packageJson.version.replaceAll(".", "-")}`;

/**
 * The CSS Variables that are used by the Styled System are injected targeting those classes.
 * Therefore, any portaled component or any Hopper Provider must have one of these classes on the root element.
 */
export function getRootCSSClasses(colorScheme: ColorScheme) {
    return [
        HopperRootCssClass,
        `${HopperRootCssClass}-${colorScheme}`,
        StyledSystemRootCssClass,
        `${StyledSystemRootCssClass}-${colorScheme}`
    ].join(" ");
}

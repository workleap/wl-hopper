import type { ColorScheme } from "@hopper-ui/components";

import { HopperRootCssClass, StyledSystemRootCssClass } from "./tokens/generated/styledSystemToTokenMappings.ts";

// This ensures that multiple versions of the Styled System can be used on the same page.
export { HopperRootCssClass, StyledSystemRootCssClass };

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

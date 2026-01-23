import type { ColorScheme } from "./color-scheme/ColorSchemeContext.ts";
import { HopperRootCssClass, StyledSystemRootCssClass } from "./tokens/generated/styledSystemConstants.ts";
/**
 * The CSS Variables that are used by the Styled System are injected targeting those classes.
 * Therefore, any portaled component or any Hopper Provider must have one of these classes on the root element.
 */
export function getRootCSSClasses(colorScheme: ColorScheme, theme: string): string {
    return [
        HopperRootCssClass,
        `${HopperRootCssClass}-${colorScheme}`,
        `${HopperRootCssClass}-${theme}`,
        `${HopperRootCssClass}-${theme}-${colorScheme}`,
        StyledSystemRootCssClass,
        `${StyledSystemRootCssClass}-${colorScheme}`,
        `${StyledSystemRootCssClass}-${theme}`,
        `${StyledSystemRootCssClass}-${theme}-${colorScheme}`
    ].join(" ");
}

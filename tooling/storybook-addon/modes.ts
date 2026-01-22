import type { ColorSchemeGlobalKey, ColorSchemeKeys } from "./color-scheme.ts";
import type { LocaleGlobalKey, LocaleKeys } from "./locale.ts";
import { type ViewportKeys } from "./viewports.ts";

export interface Mode {
    viewport?: ViewportKeys;
    [ColorSchemeGlobalKey]?: ColorSchemeKeys;
    [LocaleGlobalKey]?: LocaleKeys;
}

export const allColorModes = {
    "light": { colorScheme: "light" },
    "dark": { colorScheme: "dark" }
} satisfies Record<string, Mode>;

export const allViewportModes = {
    xs: { viewport: "xs" },
    sm: { viewport: "sm" },
    md: { viewport: "md" },
    lg: { viewport: "lg" },
    xl: { viewport: "xl" }
} satisfies Record<ViewportKeys, Mode>;

